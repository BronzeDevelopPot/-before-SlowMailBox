import { React } from 'react';
import {Link} from 'react-router-dom';
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
        <Link to="/Letter"><button className="sendbutton">전송</button></Link>
      </div>
      <div className="shareline">
        <button className="sharebutton">내 우체통 공유하기 (Link 복사)</button>
      </div>
      
    </main>
  );
};

export default Main;
