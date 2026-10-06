import express from 'express';
import axios from 'axios';
import {getWeatherFrom} from './services/meteo-service.js';
//const express = require('express');

const app = express();
app.use(express.json());

const initiatives = [];
const scientists = [
    { id: 1, name: "Dr. Elena Rostova", department: "Climate", projects: 4 },
    { id: 2, name: "Prof. Marcus Vance", department: "Oceanography", projects: 2 },
    { id: 3, name: "Dr. Aisha Khan", department: "Climate", projects: 7 }
];

class WeatherError extends Error {
  constructor(message, statusCode, rootCauseClass) {
    super(message);
    this.name = "WeatherError";
    this.statusCode = statusCode;
    this.rootCauseClass = rootCauseClass;
  }
}

app.get('/', (req, res) => {
  res.send('Hello World');
})

// /api/scientist?dept=****
app.get('/api/scientist', (req, res) => {
  const { dept } = req.query;
  if(dept) {
  // const result = [];
  // for (const scientist of scientists) {
  //   if(scientist.department === dept) {
  //     result.push(scientist);
  //   }
  // } return result;
  const result = scientists.filter((scientist) => scientist.department.toLowerCase() === dept.toLowerCase());
  if (result && result.length > 0) {
  return res.json({
    msg: "hello",
    deptScientists: result,
    dept,
    count: result.length,
    });
  } else {
  return res.json({
    errorMsg: `No result for department ${dept}`,
    dept, 
  
  });
  }
  }
});

// /api/scientists/:id
app.get("/api/scientists/:id/profile/:keyword", (req, res) => {
    const scientistId = parseInt(req.params.id, 10);
    const scientist = scientists.find(
        (scientist) => scientist.id === scientistId,
    );
    if(!scientist){
        return res.json({ success: false, errorMsg: "No scientist found."});
    }
    res.json({
        success: true,
        data: scientist,
    });
});

app.get("/api/initiatives", (req, res) => {
  console.log("get initiatives request received");
  res.json({ initiatives, status: "Ok" });
});

app.post("/api/initiatives", (req, res) => {
  const {title,budget, department } = req.body;
  const initiative = {title, budget, department};
  initiatives.push(initiative);
  res.json({ title, budget, department });

});

app.get('/about', (req, res) => {
  res.send('This is my WebApp Class Project');
})


// /greet?name?=****&city=****
app.get('/greet', (req, res) => {
    const { name, city } = req.query
  res.send(`hello ${name}, how is the weather in ${city}`);
})

app.post('/about', (req, res, next) => {
  next(res.send('This is still my WebApp Class Project, but secure'));
})

app.get('/about', (req, res, next) => {
  next(res.send('Second endpoint'));
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})

app.get("/weatherGDL", async (req, res) => {
  const respString = await getWeatherFrom(20.6766, -103.3475, "Guadalajara");
  res.send(respString);
});
 
app.get("/weatherLSN", async (req, res) => {
  const respString = await getWeatherFrom(46.52, 6.63, "Lausanne");
  res.send(respString);
});

const cities = {
  GDL: {lat: 20.6597, long: -103.349},
  LSN: {lat: 46.52, long: 6.63},
};

app.get("/weather/:city", async (req, res) => {
  const city = req.params;
  if(!city) next (new Error("City code required"));
  if(!city[city]) next (new Error("city code invalid"));
  const { lat, long } = cities[city];
  const respString = await getWeatherFrom(lat, long, city);
  res.send(respString);
});

app.all("*", (req, res) => {
  next (new Error("Endpoint not found"));
});