"use client";
// components/CodeEditor.js

import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";

const CodeEditor = () => {
  const editorRef = useRef(null);
  const [output, setOutput] = useState("");

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const runCode = () => {
    const code = editorRef.current.getValue();
    try {
      // Using new Function to execute the code (for demonstration purposes only)
      const result = new Function(code)();
      setOutput(result);
    } catch (err) {
      setOutput(err.toString());
    }
  };

  return (
    <div>
      <Editor
        height="60vh"
        width="45vw"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue="// Write your code here"
        onMount={handleEditorDidMount}
      />
      <Button onClick={runCode} className="mt-4">
        Check for Errors
      </Button>
      <div>
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;
