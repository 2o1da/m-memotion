import React, { useState, useEffect, useRef } from "react";
import "./TypeWriter.css";

const TypeWriter = ({ text }) => {
  const index = useRef(0);
  const [currentText, setText] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setText(value => value + text.charAt(index.current));
      index.current += 1;
    }, 150);
  }, [currentText]);

  return (
    <div>
      {/* <h1>{currentText}</h1> */}
      <h3>Memo your memory and emotion about music.</h3>
    </div>
  );
};

export default TypeWriter;
