import express from 'express'
//const express = require('express');

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.get('/about', (req, res) => {
  res.send(';lakskjdf;lakssdjf');
})

app.get('/greet', (req, res) => {
    const { name, city } = req.query
  res.send(`hello ${name}, how is the weather in ${city}`);
})

app.post('/about', (req, res) => {
  res.send('bombocclatt');
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})