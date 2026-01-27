import React, { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { history, historyKeymap } from '@codemirror/history';
import { foldGutter, foldKeymap } from '@codemirror/fold';
import { indentOnInput } from '@codemirror/language';
import { lineNumbers, highlightActiveLineGutter } from '@codemirror/gutter';
import { highlightSelectionMatches } from '@codemirror/search';
import { bracketMatching } from '@codemirror/matchbrackets';
import { closeBrackets, closeBracketsKeymap } from '@codemirror/closebrackets';
import { autocompletion, completionKeymap } from '@codemirror/autocomplete';

const EditorWrapper = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const editor = new EditorView({
        state: EditorState.create({
          doc: '// Écrivez votre code ici',
          extensions: [
            basicSetup,
            javascript(),
            oneDark,
            lineNumbers(),
            highlightActiveLineGutter(),
            highlightSelectionMatches(),
            history(),
            foldGutter(),
            indentOnInput(),
            bracketMatching(),
            closeBrackets(),
            autocompletion(),
            keymap.of([...defaultKeymap, ...historyKeymap, ...foldKeymap, ...closeBracketsKeymap, ...completionKeymap]),
          ],
        }),
        parent: editorRef.current,
      });

      return () => {
        editor.destroy();
      };
    }
  }, []);

  return <div ref={editorRef} style={{ height: '100%', width: '100%' }} />;
};

export default EditorWrapper;