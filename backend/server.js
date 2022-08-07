const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
const axios = require("axios");
const qs = require("qs");
const session = require("express-session");
var cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const path = require("path"); // 경로를 쉽게 다루기 위함
const { isNativeError } = require("util/types");
require("dotenv").config(); // 환경변수 사용을 위함
app.use(express.urlencoded({ extended: true })); // 요청에서 온 데이터를 쉽게 처리하기 위함
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../frontend/slowmailbox/build")));

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
});

app.use(
  session({
    secret: "ras",
    resave: true,
    secure: false,
    saveUninitialized: false,
  })
);

const kakao = {
  clientID: process.env.KAKAO_ID,
  clientSecret: process.env.Secret,
  redirectURL: process.env.Redirect_URL,
};

app.get("/auth/kakao", (req, res) => {
  const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectURL}&response_type=code&scope=profile_nickname,account_email`;
  res.redirect(kakaoAuthURL);
});

app.get("/auth/kakao/callback", async (req, res) => {
  try {
    token = await axios({
      method: "POST",
      url: "https://kauth.kakao.com/oauth/token",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        grant_type: "authorization_code",
        client_id: kakao.clientID,
        client_secret: kakao.clientSecret,
        redirectUri: kakao.redirectURL,
        code: req.query.code,
      }),
    });
  } catch (err) {
    res.json(err.data);
  }
  let user;
  try {
    console.log(token);
    user = await axios({
      method: "get",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `Bearer ${token.data.access_token}`,
      },
    });

    // mongoDB에 user data 삽입
    db.collection("users").insertOne(
      {
        _id: user.data.id,
        nickname: user.data.kakao_account.profile.nickname,
        email: user.data.kakao_account.email,
      },
      function (e, result) {
        console.log("success");
      }
    );
  } catch (e) {
    res.json(e.data);
  }

  console.log(user.data);

  req.session.kakao = user.data;

  res.send("success");
});

app.get("/auth/kakao", (req, res) => {
  const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectURL}&response_type=code&scope=profile_nickname,account_email`;
  res.redirect(kakaoAuthURL);
});

app.get("/auth/kakao/callback", async (req, res) => {
  try {
    token = await axios({
      method: "POST",
      url: "https://kauth.kakao.com/oauth/token",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        grant_type: "authorization_code",
        client_id: kakao.clientID,
        client_secret: kakao.clientSecret,
        redirectUri: kakao.redirectURL,
        code: req.query.code,
      }),
    });
  } catch (err) {
    res.json(err.data);
  }
  let user;
  try {
    console.log(token);
    user = await axios({
      method: "get",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `Bearer ${token.data.access_token}`,
      },
    });

    db.collection("users").insertOne(
      { _id: user.data.id, email: user.data.kakao_account.email },
      function (e, result) {
        console.log("유저 정보!");
      }
    );
  } catch (e) {
    res.json(e.data);
  }

  // console.log(user.data.kakao_account.profile);
  // console.log(user.data.id);
  // console.log(user.data.kakao_account.email);

  req.session.kakao = user.data;

  res.send("success");
});

app.get(kakao.redirectURL);

var db; // 몽고디비 연결 ↓
MongoClient.connect(process.env.DB_URL, function (e, client) {
  if (e) return console.log(e);
  db = client.db("SlowMailBox"); // 'SlowMailBox'라는 데이터베이스에 접속

  app.listen(process.env.PORT, function () {
    // 3000포트에 서버 열기
    console.log("listening on 3000");
  });
});

app.get("/", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../frontend/slowmailbox/build/index.html")
  );
});

// 편지 내용 받아서 DB에 저장하는 API
app.post("/send", function (req, res) {
  res.send("전송 완료");
  // 총 편지 개수 가져와 total 변수에 저장
  db.collection("counter").findOne(
    { name: "총 편지 개수" },
    function (e, result) {
      var total = result.totalLetter;
      // 요청에서 넘어온 편지 내용을 'post' 컬렉션에 저장
      db.collection("post").insertOne(
        {
          _id: total + 1,
          from: req.body.name,
          sendDate: req.body.year + req.body.month + req.body.date,
          arriveDate: req.body.year + req.body.month + req.body.date,
          text: req.body.text,
        },
        function (e, result) {
          console.log("편지가 정상적으로 전송되었습니다.");
          // 총 편지 개수 +1 하여 수정
          db.collection("counter").updateOne(
            { name: "총 편지 개수" },
            { $inc: { totalLetter: 1 } },
            function (e, result) {
              if (e) return console.log(e);
            }
          );
        }
      );
    }
  );
});

// DB에서 편지 내용 불러오는 API
app.get("/arrive", function (req, res) {
  /* req.body._id = parseInt(req.body._id); */
  // 요청에서 넘어온 편지 고유번호를 이용하여 DB에서 편지 찾기(임시로 아무 숫자 넣어놓음)
  db.collection("post").findOne(
    { _id: 1 } /* 원래 코드 => req.body */,
    function (e, result) {
      if (e) return console.log(e);
      console.log(result);
      // 응답으로 object나 array 자료형을 보낼 때 json() 사용
      res.json(result);
      // 성공적으로 편지 불러올 시 200 응답 코드 보냄
      // res.status(200).send({ message : '과거에서 온 편지가 도착하였습니다.'});
    }
  );
});

// 세션 이용하여 현재 로그인한 유저의 우편함 페이지 접속
app.get("/list", function (req, res) {
    console.log(req.session.kakao.id);
    db.collection("mailbox").findOne(
        { userID : req.session.kakao.id },
        function (e, result) {
            if (e) return console.log(e);
            console.log(result);
            res.json(result);
        }
    );
});
 
// 리액트에서 라우팅하도록 전권 넘김
app.get("*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../frontend/slowmailbox/build/index.html")
  );
});