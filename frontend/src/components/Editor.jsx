import React from 'react';
import MonacoEditor from '@monaco-editor/react';

const Editor = () => {
  return (
    <div className="flex-1 bg-[#1e1e1e]">
      <MonacoEditor
        height="100%"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue="// Start coding..."
      />
    </div>
  );
};

export default Editor;