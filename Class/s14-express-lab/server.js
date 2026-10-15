import express from 'express';
// import axios from 'axios';
import {getWeatherFrom} from './services/meteo-service.js';
//const express = require('express');
import weatherRoutes from "./routes/weatherRoutes.js";
import {WeatherError, errorMiddleware} from "./errors/error-handler.js";
import { AppError } from '../s17-routing-lab/utils/appError.js';
import { loadEnvFile } from "node:process";
import {connectDB} from "./config/db.js";
import mongoose from 'mongoose';
import { createUser } from "./services/user-service.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const initiatives = [];
const scientists = [
    { id: 1, name: "Dr. Elena Rostova", department: "Climate", projects: 4 },
    { id: 2, name: "Prof. Marcus Vance", department: "Oceanography", projects: 2 },
    { id: 3, name: "Dr. Aisha Khan", department: "Climate", projects: 7 }
];

loadEnvFile();
const dbuser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbName = 'test';

const mongoURL = `mongodb+srv://${dbuser}:${dbPass}@cluster0.mgz6yfx.mongodb.net/${dbName}`
connectDB(mongoURL);

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader.startsWith('Bearer ')) {
    return next(new AppError('Unauthorized: Missing or invalid token header.', 401));
  }
  const token = authHeader.split(' ')[1];
  if (token === 'sustain-user-token') {
    req.user = { id: 101, name: 'Elena (Researcher)', role: 'user'};
    return next();
  } else if (token === 'sustain-admin-token') {
    req.user = { id: 999, name: 'Prof. Gabriel (Admin)', role: 'admin'};
    return next();
  }
  return next(new AppError('Unauthorized: Missing or invalid token header.', 401));
};

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

app.post('/api/users', async (req, res) => {
  const { username, name, email, password } = req.body || {};

  if ([username, email, password].some(value => typeof value !== 'string' || !value.trim())) {
    return res.status(400).json({ success: false, message: 'Username, email, and password are required.' });
  }
  if (name !== undefined && typeof name !== 'string') {
    return res.status(400).json({ success: false, message: 'Name must be text.' });
  }

  try {
    const user = await createUser({ username, name, email, password });
    return res.status(201).json({
      success: true,
      message: 'User created successfully.',
      user: { id: user._id, username: user.username, name: user.name, email: user.email },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'Username already exists.' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: 'Invalid user information.' });
    }
    console.error('Failed to create user:', error.message);
    return res.status(500).json({ success: false, message: 'Unable to create user. Please try again.' });
  }
});

app.get('/about', (req, res) => {
  req._internalMsg =('This is my WebApp Class Project');
  next();
},
(req, res, next) => {
  res.send(`Second endpoint. ${req._internalMsg}`);
});


// /greet?name?=****&city=****
app.get('/greet', (req, res) => {
    const { name, city } = req.query
  res.send(`hello ${name}, how is the weather in ${city}`);
});

app.post('/about', (req, res) => {
  next(res.send('This is still my WebApp Class Project, but secure'));
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
});
app.use("/api/weather", protect, weatherRoutes);

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
  if(!city) 
    next (new WeatherError("City code required", 400, "/weather/:city"));
  if(!cities[city]) 
    next (new WeatherError("city code invalid",  400, "/weather/:city"));
  const { lat, long } = cities[city];
  const respString = await getWeatherFrom(lat, long, city);
  res.send(respString);
});

app.use((error, req, res, next) => {
  if (err instanceof WeatherError) {
    const msg = err.message = err.message || err.rootCauseClass || "Unknown error";
    res
    .status(err.statusCode || 500 )
    .json({error: err.message, rootCause: err.rootCauseClass});
  }
  res.status(500).json({error: err.message || "Unknown error"});
});

app.all("/{*splat}", (req, res, next) => {
  next (new Error("Endpoint not found"));
});

app.use(errorMiddleware);