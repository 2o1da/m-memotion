import "bootstrap/dist/css/bootstrap.min.css";
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

  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + new Buffer("7021f5b339514fd6a5b2064441891fea" + ":" + "d0bd3e25e75e4d11bab762115baff179").toString("base64"),
      },
      data: "grant_type=client_credentials",
    }).then(res => {
      setToken(res.data.access_token);
    });

    axios("https://api.spotify.com/v1/search?q=the+beatles&type=track,album,artist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(res => {
      setArtist(res.data.tracks.items[0].album.artists[0].name);
      setTitle(res.data.tracks.items[0].name);
      setAlbum(res.data.tracks.items[0].album.name);
      setCover(res.data.tracks.items[0].album.images[1].url);
      setDate(res.data.tracks.items[0].album.release_date);
    });
  }, []);

  return (
    <ListGroup>
      <ListGroup.Item>
        <img src={cover}></img>
      </ListGroup.Item>
      <ListGroup.Item>
        <h3>{`${artist} - ${title}`}</h3>
      </ListGroup.Item>
      <ListGroup.Item>
        <p>{`Album : ${album}`} </p>
      </ListGroup.Item>
      <ListGroup.Item>
        {" "}
        <p>{`Release date : ${date}`}</p>
      </ListGroup.Item>
      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
    </ListGroup>
  );
}

export default App;
