import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./main.css";

const Main = () => {
  const [name, setName] = useState("");
  const [envelope, setEnvelope] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3000/list")
      .then((response) => {
        console.log(response.data);
        setName(response.data.userName);
        setEnvelope(response.data.letter.dif[0]);
      })
      .catch((error) => console.log(error));
  }, []);


  
  return (
    <main>
      <div id="ownglyph">
        <p className="user_box"> {name} 님의 우체통 </p>
        <div>
          <img className="post_box" src="/img/postmailVendingmachine.png" />
          <div className="mailbox">
            <div className="envelope_top_box">
              <div className="first_box">
                {envelope == 1 && (
                  <Link to="/arrive">
                    <img src="/img/envelope.png" />
                  </Link>
                )}
              </div>
              <div className="second_box">
                {envelope == 2 && (
                  <Link to="/arrive">
                    <img src="/img/envelope.png" />
                  </Link>
                )}
              </div>
              <div className="third_box">
                {envelope == 3 && (
                  <Link to="/arrive">
                    <img src="/img/envelope.png" />
                  </Link>
                )}
              </div>
              <div className="forth_box">
                {envelope == 4 && (
                  <Link to="/arrive">
                    <img src="/img/envelope.png" />
                  </Link>
                )}
              </div>
              <div className="fifth_box">
                {envelope == 5 && (
                  <Link to="/arrive">
                    <img src="/img/envelope.png" />
                  </Link>
                )}
              </div>
            </div>

            <div className="envelope_middle_box">
              <div className="sixth_box">
                {envelope == 6 && (
                  <Link to="/arrive">
                    <img src="/img/envelope.png" />
                  </Link>
                )}
              </div>
              <div className="seventh_box">
                {envelope == 7 && (
                  <Link to="/arrive">
                    <img src="/img/envelope.png" />
                  </Link>
                )}
              </div>
              <div className="eighth_box">
                {envelope == 8 && (
                  <Link to="/arrive">
                    <img src="/img/envelope.png" />
                  </Link>
                )}
              </div>
              <div className="ninth_box">
                {envelope == 9 && (
                  <Link to="/arrive">
                    <img src="/img/envelope.png" />
                  </Link>
                )}
              </div>
              <div className="tenth_box">
                {envelope == 10 && (
                  <Link to="/arrive">
                    <img src="/img/envelope.png" />
                  </Link>
                )}
              </div>
            </div>

            <div className="envelope_bottom_box">
              <div className="eleventh_box">
                {envelope == 11 && (
                  <Link to="/arrive">
                    <img src="/img/envelope.png" />
                  </Link>
                )}
              </div>
              <div className="twelfth_box">
                {envelope == 12 && (
                  <Link to="/arrive">
                    <img src="/img/envelope.png" />
                  </Link>
                )}
              </div>
            </div>
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
