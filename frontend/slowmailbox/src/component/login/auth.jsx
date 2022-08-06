/* import React from "react";

const Auth = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  return <div>{code}</div>;
};
export default Auth; */

const REST_API_KEY = "56f791ec799f052735e5e219dcbec6b7";
const REDIRECT_URI =  "http://localhost:3000/auth/kakao/callback";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;