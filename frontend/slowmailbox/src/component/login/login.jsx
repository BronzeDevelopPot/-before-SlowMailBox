import { React } from "react";
import { Link } from "react-router-dom";
import "./login.css";

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
          src="/login_img/postmailVendingmachine.png"
        ></img>
        <p className="signup_promotion">느린우체통 만들기</p>
        
        <Link to="/main">
          <img
          className="kakao_login_button"
          src="/login_img/kakao_login_large_wide.png"
        ></img>
        </Link>
      </div>
    </login>
  );
};

export default Login;
