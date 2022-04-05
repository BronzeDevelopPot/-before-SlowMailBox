const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const axios = require('axios');
const qs = require('qs');
const session = require('express-session');
const MongoClient = require('mongodb').MongoClient;
const path = require('path'); // 경로를 쉽게 다루기 위함
require('dotenv').config(); // 환경변수 사용을 위함
app.use(express.urlencoded({extended: true})); // 요청에서 온 데이터를 쉽게 처리하기 위함

app.set('view engine', 'html');
nunjucks.configure('views', {
    express:app,
})

app.use(session({
    secret: 'aaa',
    resave: true,
    secure: false,
    saveUninitialized:false,
}))

const kakao = {
    clientID: 'env.KAKAO_ID',
    clientSecret: 'env.Secret',
    redirectURL: 'env.Redirect_URL' 
}

app.get('/auth/kakao',(req,res)=>{
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectURL}&response_type=code&scope=profile_nickname,account_email`;
    res.redirect(kakaoAuthURL);
})

var db; // 몽고디비 연결 ↓
MongoClient.connect(process.env.DB_URL, function(err, client){
    if (err) return console.log(err);
    db = client.db('SlowMailBox'); // 'SlowMailBox'라는 데이터베이스에 접속

    app.listen(process.env.PORT, function() { // 8080포트에 서버 열기
        console.log('listening on 8080');
    });
});

app.use(express.static(path.join(__dirname, '../frontend/slowmailbox/build')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../frontend/slowmailbox/build/index.html'));
});