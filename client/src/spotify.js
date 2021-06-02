const redirectUri = "http://localhost:3000/";
const clientId = "7021f5b339514fd6a5b2064441891fea";
const clientSecret = "d0bd3e25e75e4d11bab762115baff179";

// POST
const clientCredentialsFlow = "https://accounts.spotify.com/api/token";
// GET
const serachApi = "https://api.spotify.com/v1/search";

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[0]);

      return initial;
    }, {});
};

//export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
