const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const aiModelsManager = require('./ai/aiModelsManager');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Autoriser uniquement le frontend local
    methods: ['GET', 'POST'],
  },
});

const PORT = 3000;

app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Endpoint to list available models
app.get('/api/models', (req, res) => {
  const models = aiModelsManager.listModels();
  res.json(models);
});

// Endpoint to download a model
app.post('/api/models/download', async (req, res) => {
  const { modelName, url } = req.body;

  if (!modelName || !url) {
    return res.status(400).json({ error: 'Model name and URL are required.' });
  }

  try {
    const modelPath = await aiModelsManager.downloadModel(modelName, url);
    res.json({ message: `Model ${modelName} downloaded successfully.`, path: modelPath });
  } catch (error) {
    res.status(500).json({ error: 'Failed to download model.' });
  }
});

// Endpoint to delete a model
app.delete('/api/models/:modelName', (req, res) => {
  const { modelName } = req.params;

  try {
    aiModelsManager.deleteModel(modelName);
    res.json({ message: `Model ${modelName} deleted successfully.` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete model.' });
  }
});

io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté');

  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté');
  });
});

server.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});