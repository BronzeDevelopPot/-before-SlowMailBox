import { useState, useRef } from "react";
import "./mail.css";
import DomToImage from "dom-to-image";
import { saveAs } from "file-saver";

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

  return (
    <div id="ownglyph">
      <div ref={letterRef} className="downloadArea">
        <div className="letter">
          <div className="textArea_style">여기 편지 내용이요..</div>
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
