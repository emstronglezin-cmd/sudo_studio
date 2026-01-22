import React, { useState, useEffect } from 'react';
import './App.css';
import EditorWrapper from './editor/EditorWrapper';
import TerminalWrapper from './terminal/TerminalWrapper';
import Editor from "@monaco-editor/react";
import axios from 'axios';
import io from 'socket.io-client';

function App() {
  const [showEmulator, setShowEmulator] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
  const [code, setCode] = useState('');

  // Empêche axios d'être grisé (usage réel)
  axios.defaults.baseURL ="http://localhost:3000";

  const handleModelSelection = (event) => {
    setSelectedModel(event.target.value);
    console.log(`Selected model: ${event.target.value}`);
  };

  useEffect(() => {
    window.api.send('subscription-check');
    window.api.on('subscription-status', (event, isSubscribed) => {
      if (!isSubscribed) {
        alert('Please subscribe to continue using this app.');
      }
    });

    const socket = io();
    console.log('Socket connected:', socket);
  }, []);

  return (
    <div className="App">
      <h1>Bienvenue sur Sudo Studio</h1>
      <div className="layout">
        <div className="editor">
          <EditorWrapper />
        </div>
        <div className="terminal">
          <TerminalWrapper />
        </div>
        <div className="ai-chat-panel">
          <h2>AI Chat</h2>
          <div className="chat-container">
            <textarea placeholder="Type your message here..." className="chat-input"></textarea>
            <button className="send-button">Send</button>
          </div>
        </div>
      </div>
      {showEmulator && <div className="emulator">Emulator Placeholder</div>}
      <button onClick={() => setShowEmulator(!showEmulator)}>
        {showEmulator ? 'Hide Emulator' : 'Show Emulator'}
      </button>
      <div className="ai-model-selector">
        <label htmlFor="ai-models">Choose an AI model:</label>
        <select id="ai-models" onChange={handleModelSelection}>
          <option value="">--Select a model--</option>
          <option value="ollama">Ollama</option>
          <option value="chatgpt">ChatGPT</option>
          <option value="gemini">Gemini</option>
        </select>
      </div>
      <div>
        <h1>App Loaded!</h1>
        <div id="editor" style={{ height: 'calc(100vh - 50px)', width: '100%' }}>
          <Editor
            height="100%"
            width="100%"
            theme="vs-dark"
            defaultLanguage="javascript"
            defaultValue="// Commencez à coder ici"
            onChange={(value) => setCode(value)}
            />
        </div>
      </div>
    </div>
  );
}

export default App;