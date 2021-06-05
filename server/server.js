const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const lyricsFinder = require("lyrics-finder");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const SpotifyWebApi = require("spotify-web-api-node");
const s = new SpotifyWebApi({
  clientId: "7021f5b339514fd6a5b2064441891fea",
  clientSecret: "d0bd3e25e75e4d11bab762115baff179",
  redirectUri: "http://naver.com",
});

app.get("/token", (req, res) => {
  s.clientCredentialsGrant()
    .then(data => {
      console.log(data.body.access_token);
    })
    .catch(err => {
      console.log("에러 :", err);
    });

  res.send("토큰 페이지");
});

app.get("/lyrics", async (req, res) => {
  console.log("가사 내놔라");
  const lyrics = (await lyricsFinder(req.query.artist, req.query.track)) || "가사 읎다";
  res.json({ lyrics });
  console.log("가사 가져옴");
  console.log(req.query);
});

app.listen(3001, () => {
  console.log("접속완료");
});
