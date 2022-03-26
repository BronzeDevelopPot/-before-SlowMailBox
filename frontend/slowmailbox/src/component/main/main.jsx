import { React } from 'react';
import "./main.css";

const Main = () => {
  return (
    <main>
      <div className="mailbox">
        <p className="post">P O S T</p>

        <div className="size1"></div>
        <div className="size1"></div>

        <div className="boxline">
          <div className="size2"></div>
          <div className="wayin"></div>
        </div>

        <div className="wayout"></div>
      </div>
    
      <div className="sendline">
        <button className="sendbutton">전송</button>
      </div>
      <div className="shareline">
        <button className="sharebutton">내 우체통 공유하기 (Link 공유)</button>
      </div>
    </main>
  );
};

export default Main;
