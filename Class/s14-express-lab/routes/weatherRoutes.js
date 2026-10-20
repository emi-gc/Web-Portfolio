import express from "express";

const router = express.router();

const cities = {
  GDL: {lat: 20.6597, long: -103.349},
  LSN: {lat: 46.52, long: 6.63},
};

// http://localhost:3000/api/weather/weatherGDL
app.get("/weatherGDL", async (req, res) => {
  const respString = await getWeatherFrom(20.6766, -103.3475, "Guadalajara");
  res.send(respString);
});
 
app.get("/weatherLSN", async (req, res) => {
  const respString = await getWeatherFrom(46.52, 6.63, "Lausanne");
  res.send(respString);
});

app.get("/weather/:city", async (req, res) => {
  const city = req.params;
  if(!city) 
    next (new WeatherError("City code required", 400, "/weather/:city"));
  if(!cities[city]) 
    next (new WeatherError("city code invalid",  400, "/weather/:city"));
  const { lat, long, name } = cities[city];
  const respString = await getWeatherFrom(lat, long, name);
  res.send(respString);
});

export default router;