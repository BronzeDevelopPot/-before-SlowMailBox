import { React } from "react";
import "./login.css";
import { KAKAO_AUTH_URL } from "./auth";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <login>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"
      ></link>

      <div id="ownglyph">
        <p className="title">추억의 느린 우체통</p>
        <img
          className="vending_machine"
          src={process.env.PUBLIC_URL + "/img/postmailVendingmachine.png"}
        ></img>
        <p className="signup_promotion">느린우체통 만들기</p>

        <a href={KAKAO_AUTH_URL}>
          <div className="kakao_login_button">
            <img src="/img/kakao_login_large_wide.png"></img>
          </div>
        </a>

        <Link to="/list">
          <button>리스트페이지이동</button>
        </Link>
      </div>
    </login>
  );
};

export default Login;
