import React, { useState, useEffect } from 'react';
import './App.css';
import EditorWrapper from './editor/EditorWrapper';
import TerminalWrapper from './terminal/TerminalWrapper';
import axios from 'axios';

function App() {
  const [showEmulator, setShowEmulator] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
  const [code, setCode] = useState('');

  axios.defaults.baseURL = "http://localhost:5000";

  const handleModelSelection = (event) => {
    setSelectedModel(event.target.value);
    console.log(`Selected model: ${event.target.value}`);
  };

  useEffect(() => {
    if (window.api && window.api.send) {
      window.api.send('subscription-check');
      window.api.on('subscription-status', (event, isSubscribed) => {
        if (!isSubscribed) {
          alert('Please subscribe to continue using this app.');
        }
      });
    }
  }, []);

  return (
    <div className="App">
      <div className="layout">
        <div className="editor">
          <EditorWrapper />
        </div>
        <div className="terminal">
          <TerminalWrapper />
        </div>
      </div>
      <div>
        <h1>App Loaded!</h1>
      </div>
    </div>
  );
}

export default App;