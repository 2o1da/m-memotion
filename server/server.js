require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const lyricsFinder = require("lyrics-finder");

const app = express();
app.use(cors());
app.use(express.json());
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const SpotifyWebApi = require("spotify-web-api-node");
const s = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

app.post("/token", (req, res) => {
  s.clientCredentialsGrant()
    .then(data => {
      s.setAccessToken(data.body.access_token);
      console.log("토큰 :", data.body.access_token);
      res.json({ AT: data.body.access_token });
    })
    .catch(err => {
      console.log("에러 :", err);
    });
});

app.get("/lyrics", async (req, res) => {
  const lyrics = (await lyricsFinder(req.query.artist, req.query.track)) || "가사 읎다";

  res.json({ lyrics });
});

app.listen(3001, () => {
  console.log("3001포트 접속완료\n");
});
