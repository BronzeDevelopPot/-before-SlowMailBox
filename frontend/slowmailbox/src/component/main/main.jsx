import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./main.css";

const Main = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/list")
    .then((response) => {
      console.log(response.data);
      setName(response.data.userName + " 님의 우체통");
    })
    .catch((error) => console.log(error));
  }, []);

  return (
    <main>
      <div id="ownglyph">
        <p className="user_box"> {name} </p>
        <div>
          <img className="post_box" src={process.env.PUBLIC_URL + "/img/postmailVendingmachine.png"} />
          <div className="mailbox">
            <Link to="/arrive">
              <button className="my_mail">♥</button>
            </Link>
          </div>
        </div>

        <div className="footer_Line">
          <div>
            <Link to="/letter">
              <button className="sendbutton">전송</button>
            </Link>
          </div>
          <div>
            <button className="sharebutton">
              내 우체통 공유하기 (Link 복사)
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
