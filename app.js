const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve static files from the current directory

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const cityname = req.body.City;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityname +
    "&appid=d5f4a9021acbefbd1cb2de5b93297b37";
  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp1 = weatherData.main.temp;
      const temp2 = weatherData.weather[0].description;
      console.log(response.statusCode);
      // res.write(
      //   "<h1 style='color: #333; font-size: 24px;'>The Weather in " +
      //     cityname +
      //     " is currently " +
      //     temp2 +
      //     ".</h1>"
      // );
      // res.write(
      //   "<h1 style='color: #555; font-size: 20px;'>The temperature is " +
      //     temp1 +
      //     ".</h1>"
      // );
      // const icon = weatherData.weather[0].icon;
      // const imurl =
      //   "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      // res.write(
      //   "<img src=" +
      //     imurl +
      //     " style='width: 100px; height: 100px;'>"
      // );

      res.write(
  "<div style='display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;'>"
);
res.write(
  "<h1 style='color: #333; font-size: 24px;'>The Weather in " +
    cityname +
    " is currently " +
    temp2 +
    ".</h1>"
);
res.write(
  "<h1 style='color: #555; font-size: 20px;'>The temperature is " +
    temp1 +
    ".</h1>"
);
const icon = weatherData.weather[0].icon;
const imurl =
  "http://openweathermap.org/img/wn/" + icon + "@2x.png";
res.write(
  "<img src=" +
    imurl +
    " style='width: 100px; height: 100px;'>"
);
res.write("</div>");



      res.send();
    });
  });
});

app.listen("3000");
