const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const axios = require('axios');
const qs = require('qs');
const session = require('express-session');
var cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const path = require('path'); // 경로를 쉽게 다루기 위함
require('dotenv').config(); // 환경변수 사용을 위함
app.use(express.urlencoded({extended: true})); // 요청에서 온 데이터를 쉽게 처리하기 위함
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/slowmailbox/build')));

app.set('view engine', 'html');
nunjucks.configure('views', {
    express:app,
})

app.use(session({
    secret: 'ras',
    resave: true,
    secure: false,
    saveUninitialized: false,
}))

const kakao = {
    clientID: process.env.KAKAO_ID,
    clientSecret: process.env.Secret,
    redirectURL: process.env.Redirect_URL 
}

app.get('/auth/kakao', (req, res) => {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectURL}&response_type=code&scope=profile_nickname,account_email`;
    res.redirect(kakaoAuthURL);
})

app.get('/auth/kakao/callback', async(req, res) => {
    try{
    token = await axios({
        method: 'POST',
        url: 'https://kauth.kakao.com/oauth/token',
        headers:{
            'content-type':'application/x-www-form-urlencoded'
        },
        data:qs.stringify({
            grant_type: 'authorization_code',
            client_id:kakao.clientID,
            client_secret:kakao.clientSecret,
            redirectUri:kakao.redirectURL,
            code:req.query.code,
        })
    })
}catch(err){
    res.json(err.data);
}
    let user;
    try{
        console.log(token);
        user = await axios({
            method:'get',
            url:'https://kapi.kakao.com/v2/user/me',
            headers:{
                Authorization: `Bearer ${token.data.access_token}`
            }
        })
    }catch(e){
        res.json(e.data);
    }
    console.log(user);
 
    req.session.kakao = user.data;
    
    res.send('success');
})

app.get(kakao.redirectURL)

var db; // 몽고디비 연결 ↓
MongoClient.connect(process.env.DB_URL, function(err, client){
    if (err) return console.log(err);
    db = client.db('SlowMailBox'); // 'SlowMailBox'라는 데이터베이스에 접속

    app.listen(process.env.PORT, function() { // 8080포트에 서버 열기
        console.log('listening on 8080');
    });
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../frontend/slowmailbox/build/index.html'));
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../frontend/slowmailbox/build/index.html'));
});

// 서버는 잘 오픈되는데 프론트엔드쪽에서 빌드가 안 돼서 "http://localhost:8080/"로 들어가면 오류 날 것임

// 편지 내용 받아서 DB에 저장하는 API
// app.post('/send', function(req, res) {
//     res.send('전송 완료');
//     // 총 편지 개수 가져와 total 변수에 저장
//     db.collection('counter').findOne({ name : '총 편지 개수' }, function(e, result) {
//         var total = result.totalLetter;
//         // 요청에서 넘어온 편지 내용을 'post' 컬렉션에 저장
//         db.collection('post').insertOne(
//         { _id : total + 1, from : req.body.???, sendDate : req.body.???, arriveDate : req.body.???, text : req.body.??? }, function(e, result) {
//             console.log('편지가 정상적으로 전송되었습니다.');
//             // 총 편지 개수 +1 하여 수정
//             db.collection('counter').updateOne({ name : '총 편지 개수' }, { $inc : { totalLetter : 1 } }, function(e, result) {
//                 if(e) return console.log(e);
//             });
//         });
//     });
// });