import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { useEffect, useRef } from 'react';

const Editor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const startState = EditorState.create({
        doc: '// Start coding...',
        extensions: [
          basicSetup,
          javascript(),
          oneDark,
          keymap.of(defaultKeymap),
        ],
      });

      const view = new EditorView({
        state: startState,
        parent: editorRef.current,
      });

      return () => view.destroy();
    }
  }, []);

  return <div ref={editorRef} className="flex-1 bg-[#1e1e1e]" />;
};

export default Editor;