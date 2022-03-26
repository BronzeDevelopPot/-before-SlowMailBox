import { Link } from "react-router-dom";
import "./letter.css";

const Letter = () => {
  return (
    <div>
      <div>
        <textarea rows="33" cols="40" className="textArea"></textarea>
      </div>
      <div className="letter_sendline">
        <button className="letter_send">작성</button>
      </div>
    </div>
  );
};

export default Letter;
