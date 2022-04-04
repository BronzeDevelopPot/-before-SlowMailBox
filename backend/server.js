const express = require('express');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config(); // 환경변수 사용을 위함
const app = express();
app.use(express.urlencoded({extended: true})); // 요청에서 온 데이터를 쉽게 처리하기 위함

var db; // 몽고디비 연결 ↓
MongoClient.connect(process.env.DB_URL, function(err, client){
    if (err) return console.log(err);
    db = client.db('SlowMailBox') // 'SlowMailBox'라는 데이터베이스에 접속

    app.listen(process.env.PORT, function() { // 8080포트에 서버 열기
        console.log('listening on 8080');
    });
});