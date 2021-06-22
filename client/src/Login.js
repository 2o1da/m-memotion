import React, { useEffect, useState } from "react";
import axios from "axios";

import { clientId, clientSecret } from "./spotify";

function Login(props) {
  const [token, setToken] = useState("");
  const [track, setTracks] = useState([]);

  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      data: "grant_type=client_credentials",
    })
      .then((res) => {
        setToken(res.data.access_token);

        axios(`https://api.spotify.com/v1/search?q=beatles&type=artist,track,album`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }).then((trackresponse) => {
          const items = trackresponse.data.albums["items"];
          let temp = [...track];
          items.map((e, i) => {
            temp.push(e["images"][1]["url"]);
            setTracks(temp);
          });
        });
      })
      .catch((err) => {
        console.log("에러 :", err);
      });
  }, []);

  return (
    <div>
      <h1>LOGIN.js</h1>
      {track.map((e) => {
        return (
          <li>
            <img src={`${e}`}></img>
          </li>
        );
      })}
    </div>
  );
}

export default Login;
