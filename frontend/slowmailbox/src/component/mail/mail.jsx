import { useState, useEffect, useRef } from "react";
import "./mail.css";
import DomToImage from "dom-to-image";
import { saveAs } from "file-saver";
import axios from "axios";

const Mail = () => {
  const imgName = "Test";
  const letterRef = useRef();

  const onDownloadBtn = () => {
    const letter = letterRef.current;
    DomToImage.toBlob(letter, {
      width: 440 * 21.4,
      height: 700 * 21.4,
      style: {
        transform: "scale(" + 20 + ")",
        transformOrigin: "top left",
      },
    }).then((Blob) => {
      saveAs(Blob, imgName + ".png");
    });
  };


  const [mail, setMail] = useState("");

  useEffect(()=> {
    axios.get("http://localhost:3000/arrive")
    .then(response => {
      console.log(response.data);
      setMail(response.data.text);
    })
    .catch(error => console.log(error));
  },[])


  return (
    <div id="ownglyph">
      <div ref={letterRef} className="downloadArea" style={{ backgroundImage: 'url(/letter_img/letter02.png)' }}>
        <div className="letter">
          <div className="textArea_style"> {mail} </div>
        </div>
      </div>

      <div className="imageDownload_line">
        <button className="imageDownloadBtn" onClick={onDownloadBtn}>
          이미지로 저장하기
        </button>
      </div>
    </div>
  );
};

export default Mail;
