import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./main.css";

const Main = () => {
  const [name, setName] = useState("");
  const [envelope, setEnvelope] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/list")
      .then((response) => {
        console.log(response.data);
        setName(response.data.userName);

        for (let i = 0; i < response.data.letter.length; i++) {
          setEnvelope(response.data.letter.dif[i]);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const Envelope = (n) => {
    for (let i = 0; i < envelope.length; i++) {
      if (envelope[i] == n) {
        return (
          <Link to="/arrive">
            <img src="/img/envelope.png" className="envelope_image" />
          </Link>
        );
      }
    }
  }


  return (
    <main>
      <div id="ownglyph">
        <p className="user_box"> {name} 님의 우체통 </p>
        <div>
          <img className="post_box" src="/img/postmailVendingmachine.png" />
          <div className="mailbox">
            <div className="envelope_top_box">
              <div className="first_box">
                { Envelope(1) }
              </div>
              <div className="second_box">
                { Envelope(2) }
              </div>
              <div className="third_box">
                { Envelope(3) }
              </div>
              <div className="forth_box">
                { Envelope(4) }
              </div>
              <div className="fifth_box">
                { Envelope(5) }
              </div>
            </div>

            <div className="envelope_middle_box">
              <div className="sixth_box">
                { Envelope(6) }
              </div>
              <div className="seventh_box">
                { Envelope(7) }
              </div>
              <div className="eighth_box">
                { Envelope(8) }
              </div>
              <div className="ninth_box">
                { Envelope(9) }
              </div>
              <div className="tenth_box">
                { Envelope(10) }
              </div>
            </div>

            <div className="envelope_bottom_box">
              <div className="eleventh_box">
                { Envelope(11) }
              </div>
              <div className="twelfth_box">
                { Envelope(12) }
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
