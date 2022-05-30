import { React } from "react";
import { Link } from "react-router-dom";
import "./main.css";

const Main = () => {
  return (
    <main>
      <div id="ownglyph">
        <p className="user_box">00님의 우체통</p>
        <div>
          <div className="mailbox">
            <Link to="/mail">
              <button className="my_mail">♥</button>
            </Link>
          </div>
        </div>
        <div className="sendline">
          <Link to="/letter"><button className="sendbutton">전송</button></Link>
        </div>
        <div className="shareline">
          <button className="sharebutton">내 우체통 공유하기 (Link 복사)</button>
        </div>
      </div>
      
    </main>
  );
};

export default Main;
