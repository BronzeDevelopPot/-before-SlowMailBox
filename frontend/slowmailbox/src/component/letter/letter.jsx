import Modal from "./modal/modal";
import { React } from "react";
import { useState } from "react";
import "./letter.css";


/* contributors test로 이 글은 신경쓰지 마세요. pull하고 지워주십셔 */

const Letter = () => {
  const [modal, setModal] = useState(false);

  const onClick = () => {
    setModal(true);
  };
  
  const [inputText, setInputText] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };


  return (
    <div id="ownglyph">
      <div>{modal === true ? <Modal inputText={inputText}></Modal> : null}</div>
      <div className="letter">
        <textarea className="textArea_style" onChange={onChange} value={inputText} maxLength={300} rows={1}></textarea>
      </div>

      <div className="letter_sendline">
        <button className="letter_send" onClick={onClick}>
          작성
        </button>
      </div>
    </div>
  );
};

export default Letter;