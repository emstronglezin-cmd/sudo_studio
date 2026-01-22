import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { io } from 'socket.io-client';

const TerminalWrapper = () => {
  const terminalRef = useRef(null);

  useEffect(() => {
    const terminal = new Terminal();
    terminal.open(terminalRef.current);
    terminal.write('Bienvenue dans le terminal Sudo Studio\r\n');

    const socket = io('http://localhost:3000', { transports: ['websocket'] }); // URL explicite pour le backend

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div ref={terminalRef} style={{ height: '100%', width: '100%' }} />;
};

export default TerminalWrapper;