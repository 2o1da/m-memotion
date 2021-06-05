import TypeWriter from "./TypeWriter";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { clientId, clientSecret, redirectUri } from "./spotify";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, ListGroup, InputGroup, FormControl, Button, CardGroup, Card } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-js";

function App() {
  const [token, setToken] = useState("");
  const [artist, setArtist] = useState([]);
  const [title, setTitle] = useState([]);
  const [album, setAlbum] = useState([]);
  const [cover, setCover] = useState([]);
  const [date, setDate] = useState([]);
  const [input, setInput] = useState([]);
  const [lyrics, setLyrics] = useState("");

  const [newCover, setNewCover] = useState([]);
  const [newArtist, setNewArtist] = useState([]);
  const [newAlbum, setNewAlbum] = useState([]);
  const [newUrl, setNewUrl] = useState([]);

  let spotifyApi = new SpotifyWebApi();

  function sayHello() {
    console.log("헬로");
  }
  console.log("하이");
  sayHello();

  useEffect(async () => {
    await axios
      .post("http://localhost:3001/token")
      .then(res => {
        setToken(res.data.AT);
        spotifyApi.setAccessToken(res.data.AT);
      })
      .catch(() => {
        console.log("토큰 가져오는데 에러");
        window.location = "http://daum.net";
      });

    // Get New Release
    spotifyApi.getNewReleases({ limit: 3, offset: 0, country: "KR" }).then(
      function (data) {
        const items = data.albums.items;

        let tempCover = [...newCover];
        let tempArtist = [...newArtist];
        let tempAlbum = [...newAlbum];
        let tempUrl = [...newUrl];

        items.map((e, i) => {
          tempCover.push(e.images[1].url);
          setNewCover(tempCover);

          tempArtist.push(e.artists[0].name);
          setNewArtist(tempArtist);

          tempAlbum.push(e.name);
          setNewAlbum(tempAlbum);

          tempUrl.push(e.external_urls.spotify);
          setNewUrl(tempUrl);
        });

        return;
      },
      function (err) {
        console.error(err);
        return;
      }
    );
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: "let it be",
          artist: "beatles",
        },
      })
      .then(res => {
        setLyrics(res.data.lyrics);
      });
  }, []);

  /*
  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        method: "POST",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      data: "grant_type=client_credentials",
    }).then(res => {
      console.log("왜 못가져오노");
    });
  }, []);
*/
  async function addMusic() {
    await axios(`https://api.spotify.com/v1/search?q=${input}&type=track&limit=20`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(res => {
      console.log("addMusic 실행");
      const item = res.data.tracks.items;
      let tempArtist = [...artist];
      let tempTitle = [...title];
      let tempCover = [...cover];

      item.map((e, i) => {
        tempArtist.push(e.album.artists[0].name);
        setArtist(tempArtist);

        tempTitle.push(e.name);
        setTitle(tempTitle);

        setAlbum(e.album.name);

        tempCover.push(e.album.images[1].url);
        setCover(tempCover);

        setDate(e.album.release_date);
      });
    });
  }

  return (
    <div id="bg" stlye={{ position: "relative" }}>
      <h2 id="title" style={{ color: "white", padding: "35px", textAlign: "center", fontSize: "50px", fontWeight: "700" }}>
        M-MEMOTION
      </h2>
      <TypeWriter text={"M-MEMOTION"} />
      <InputGroup style={{ width: "70vw", margin: "auto" }}>
        <FormControl
          onChange={e => {
            setInput(e.target.value);
            console.log(e.target.value);
          }}
          onKeyDown={() => {
            setArtist([]);
            setTitle([]);
            setAlbum([]);
            setCover([]);
            setDate([]);
          }}
          onKeyUp={() => addMusic()}
          type="text"
          placeholder="Artist, songs, or albums"
        />
        <InputGroup.Append>
          <Button onClick={() => addMusic()} variant="outline-secondary" style={{ color: "white" }}>
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>

      <ListGroup id="item-list" style={{ width: "70vw", margin: "auto", position: "absoulte", zIndex: "-1" }}>
        {title.map((e, i) => {
          {
            return (
              <ListGroup.Item style={{ padding: "5px" }}>
                <img src={cover[i]} style={{ width: "55px", marginRight: "10px" }}></img>
                <span>{`${artist[i]} - ${e}`}</span>
              </ListGroup.Item>
            );
          }
        })}
      </ListGroup>

      <Container style={{ display: "flex", justifyContent: "center" }}>
        {newCover.map((e, i) => {
          {
            return (
              <Card style={{ width: "18rem", margin: "20px" }}>
                <Card.Img variant="top" src={newCover[i]} style={{ padding: "10px" }} />
                <Card.Body style={{ position: "relative" }}>
                  <Button variant="secondary" style={{ position: "absolute", right: "0", bottom: "0", margin: "10px" }} href={newUrl[i]} target={"_blank"}>
                    Detail
                  </Button>
                  <Card.Title>{newAlbum[i]}</Card.Title>
                  <Card.Text style={{ margin: "0" }}>{newArtist[i]}</Card.Text>
                </Card.Body>
              </Card>
            );
          }
        })}
      </Container>

      <Container>
        <div className="text-center" style={{ whiteSpace: "pre", color: "white", marginTop: "30px" }}>
          {lyrics}
        </div>
      </Container>
      <footer>Copyright © 2021 김다솔 All rights reserved</footer>
    </div>
  );
}

export default App;

/*
            <div style={{ display: "flex" }}>
              <img src={cover} style={{ width: "200px", padding: "10px" }}></img>
              <div style={{ padding: "10px" }}>
                <p>{`${artist} - ${title}`}</p>
                <p>{`Album : ${album}`} </p>
                <p>{`Release date : ${date}`}</p>
              </div>
            </div>
            */
