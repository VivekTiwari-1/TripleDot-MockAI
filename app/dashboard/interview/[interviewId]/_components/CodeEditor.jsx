"use client";

import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";

const CodeEditor = ({ onValueChange, language }) => {
  const editorRef = useRef(null);
  const [output, setOutput] = useState("");
  const [value, setValue] = useState();

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    setValue(language?.toLowerCase());
  }, [language]);

  const extractCode = () => {
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      onValueChange(code); // This will pass the value of code in parent element
    }
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
      <div className="border-2 border-neutral-700">
        <Editor
          height="65vh"
          width="45vw"
          theme="vs-dark"
          defaultLanguage={value}
          defaultValue="// Write your code here"
          onMount={handleEditorDidMount}
        />
      </div>
      <div className="flex justify-end">
        <div className="flex gap-4">
          <Button onClick={runCode} className="mt-4">
            Check Errors
          </Button>
          <Button onClick={extractCode} className="mt-4">
            Save
          </Button>
        </div>
      </div>
      <div
        className={`bg-gray-200 text-red-600 rounded-lg mt-2 ${
          output ? "p-2" : ""
        }`}
      >
        {output}
      </div>
    </div>
  );
};

export default CodeEditor;
