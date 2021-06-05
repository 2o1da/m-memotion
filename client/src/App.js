import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, ListGroup, InputGroup, FormControl, Button } from "react-bootstrap";

function App() {
  const [token, setToken] = useState("");
  const [artist, setArtist] = useState([]);
  const [title, setTitle] = useState([]);
  const [album, setAlbum] = useState([]);
  const [cover, setCover] = useState([]);
  const [date, setDate] = useState([]);
  const [input, setInput] = useState([]);
  const [lyrics, setLyrics] = useState("");

  let prev = null;
  /*
  function sayHello() {
    console.log("헬로");
  }
  console.log("하이");
  sayHello();

  useEffect(() => {
    axios
      .get("http://localhost:3001/token")
      .then(res => {
        console.log(res.data);
        s.setAccessToken(res.data.accessToken);
        setToken(res.data.accessToken);
        window.history.pushState({}, null, "/");
        console.log("토근가져옴");
      })
      .catch(() => {
        window.location = "/";
      });
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
*/
  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa("7021f5b339514fd6a5b2064441891fea" + ":" + "d0bd3e25e75e4d11bab762115baff179"),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then(res => {
      console.log("왜안되노");
    });
  }, []);

  const addMusic = async () => {
    await axios(`https://api.spotify.com/v1/search?q=${input}&type=track&limit=10`, {
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
  };

  return (
    <div id="bg">
      <h1 style={{ color: "white", padding: "35px", textAlign: "center", fontSize: "50px", fontWeight: "700" }}>M-MEMOTION</h1>
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
      <ListGroup id="item-list" style={{ width: "70vw", margin: "auto" }}>
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

      <Container>
        <div className="text-center" style={{ whiteSpace: "pre", color: "white", marginTop: "30px" }}>
          {lyrics}
        </div>
      </Container>
    </div>
  );
}

export default App;
