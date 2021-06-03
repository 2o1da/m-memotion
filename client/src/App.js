import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, ListGroup } from "react-bootstrap";

function App() {
  const [token, setToken] = useState("");
  const [artist, setArtist] = useState([]);
  const [title, setTitle] = useState([]);
  const [album, setAlbum] = useState([]);
  const [cover, setCover] = useState([]);
  const [date, setDate] = useState([]);

  useEffect(async () => {
    await axios("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + new Buffer("7021f5b339514fd6a5b2064441891fea" + ":" + "d0bd3e25e75e4d11bab762115baff179").toString("base64"),
      },
      data: "grant_type=client_credentials",
    }).then(res => {
      setToken(res.data.access_token);
    });

    await axios("https://api.spotify.com/v1/search?q=the+beatles&type=track&limit=20", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(res => {
      const item = res.data.tracks.items;

      let temp = [...title];
      let temp2 = [...cover];
      item.map((e, i) => {
        setArtist(...artist, e.album.artists[0].name);

        temp.push(e.name);
        setTitle(temp);

        setAlbum(e.album.name);

        temp2.push(e.album.images[1].url);
        setCover(temp2);
        setDate(e.album.release_date);
      });
    });
  }, []);

  return (
    <div id="bg">
      <h1 style={{ color: "white" }}>M-MEMOTION</h1>

      <ListGroup>
        {title.map((e, i) => {
          {
            return (
              <ListGroup.Item>
                <img src={cover[i]} style={{ width: "75px", marginRight: "10px" }}></img>
                {e}
              </ListGroup.Item>
            );
          }
        })}
      </ListGroup>
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
