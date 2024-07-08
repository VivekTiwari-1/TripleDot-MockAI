import React, { useState, useEffect } from "react";
import { js_beautify } from "js-beautify";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // Import the CSS file for syntax highlighting

const formatCode = (code, language) => {
  try {
    const beautifyOptions = {
      indent_size: 2,
      space_in_empty_paren: true,
    };

    return js_beautify(code, beautifyOptions);
  } catch (error) {
    console.error("Error formatting code:", error);
    return code; // Return original code if formatting fails
  }
};

const highlightCode = (code, language) => {
  try {
    return hljs.highlight(code, { language }).value;
  } catch (error) {
    console.error("Error highlighting code:", error);
    return code; // Return original code if highlighting fails
  }
};

const FormatCode = ({ code, language }) => {
  const [formattedCode, setFormattedCode] = useState("");

  useEffect(() => {
    const formatted = formatCode(code, language);
    const highlighted = highlightCode(formatted, language);
    setFormattedCode(highlighted);
  }, [code, language]);

  return (
    <div>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: formattedCode }}></code>
      </pre>
    </div>
  );
};

export default FormatCode;
