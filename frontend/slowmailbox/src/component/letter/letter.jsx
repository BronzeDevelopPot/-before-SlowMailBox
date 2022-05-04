import Modal from "./modal/modal";
import { React } from "react";
import { useState } from "react";
import "./letter.css";

const Letter = () => {
  const [modal, setModal] = useState(false);

  const onClick = () => {
    setModal(true);
  };

  /* textarea 글자 수 제한 */
  const checkLength = (e, setLength) => {
    const targetText = e.target.value;
    const textLength = e.target.value.length;

    if (textLength <= 300) {
      setLength(e.target.value.length);
    } else {
      e.target.value = targetText.substr(0, 300);
      setLength(196);
    }
  };

  return (
    <div id="ownglyph">
      <div>{modal === true ? <Modal></Modal> : null}</div>
      <div className="letter">
        <textarea className="textArea_style" onChange={checkLength}></textarea>
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
