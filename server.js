require("dotenv").config();
const { createServer } = require("http");
const cors = require("cors");
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");
// const fetch = require("fetch");
const fetch = require("node-fetch");

// app.set("port", process.env.PORT || 3001);
const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 3001);

const app = express();
app.set("port", process.env.PORT || 3001);

app.use(morgan("dev"));

// // Set up a whitelist and check against it(for production):
// var whitelist = [
//   "http://localhost:3000",
//   "http://localhost:3001",
//   "https://api.darksky.net",
//   "https://dictionaryapi.com",
//   "https://cors-anywhere.herokuapp.com/https://api.darksky.net",
//   "https://cors-anywhere.herokuapp.com/https://dictionaryapi.com",
// ];
// var corsOptions = {
//   origin: function(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// Then pass them to cors:
app.use(cors());

app.use(compression());

app.disable("x-powered-by");

app.get("/api", (req, res) => {
  // Take the query from Client.js(passing around variables without this.state.inputCityName issues)
  const lat = req.query.lat;
  const lon = req.query.lon;
  console.log("lat: ", lat);
  console.log("lon: ", lon);
  console.log(`3`);
  const word = req.query.word;
  console.log("word: ", word);
  console.log(`4`);

  // Test sites in dealing with CORS
  // const proxyurl = "https://cors-anywhere.herokuapp.com/";
  // const URL = "https://api.github.com/users/milleriishaun";
  const URL1 = `https://api.darksky.net/forecast/${process.env.REACT_APP_WEATHER_KEY}/${lat},${lon}?exclude=daily,alerts,flags`;
  console.log(
    `
    URL1:
    `,
    URL1
  );

  if (lat && lon) {
    fetch(URL1, {
      method: "GET",
      // mode: "no-cors",
      // accept: "application/json",
      headers: {
        // "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // "X-Requested-With": "XMLHttpRequest",
        // "Access-Control-Allow-Origin": "http://localhost:3001",
        // "Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS",
        accept: "application/json",
        // Origin: "http://localhost:3001",
      },
      // "X-Requested-With": "XMLHttpRequest",
      // body: JSON.stringify(data)
    })
      .then(function(response) {
        console.log(`show response ok?: `, response.ok);
        return response.json();
      })
      .then(function(data) {
        // Absolutely need the data sent
        res.send(data);
        console.log("show data: ", JSON.stringify(data));
      })
      .catch(function(e) {
        console.log(`res err: `, e);
      });
  }

  const URL2 = `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.REACT_APP_DICTIONARY_KEY}`;

  if (word) {
    fetch(URL2, {
      // Method: "GET",
      // Accept: "application/json",
      // "X-Requested-With": "XMLHttpRequest",
    })
      .then(function(response) {
        console.log(`show response: `, response);
        return response.json();
      })
      .then(function(data) {
        // Absolutely need the data sent
        res.send(data);
        console.log("show data: ", JSON.stringify(data));
      })
      .catch(function(e) {
        console.log(`res err: `, e);
      });
    console.log(`URL1: `, URL1);
  }
});

// Node/Express we'd like it to serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    // Send any other requests to the index.html page
    console.log(`hit Herokuproxy(${PORT}) or express proxy(port3001)`);
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`Server started and listening on ${PORT}`);
});
