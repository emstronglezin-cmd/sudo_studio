import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';

const EditorWrapper = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const editor = monaco.editor.create(editorRef.current, {
        value: '// Écrivez votre code ici',
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true,
      });

      // Configuration des workers pour Electron
      window.MonacoEnvironment = {
        getWorkerUrl: function (moduleId, label) {
          if (label === 'json') {
            return './monaco-editor/json.worker.js';
          }
          if (label === 'css' || label === 'scss' || label === 'less') {
            return './monaco-editor/css.worker.js';
          }
          if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return './monaco-editor/html.worker.js';
          }
          if (label === 'typescript' || label === 'javascript') {
            return './monaco-editor/ts.worker.js';
          }
          return './monaco-editor/editor.worker.js';
        },
      };

      return () => {
        editor.dispose();
      };
    }
  }, []);

  return <div ref={editorRef} style={{ height: '100vh', width: '100%' }} />;
};

export default EditorWrapper;