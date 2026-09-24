import express from 'express'
//const express = require('express');

const app = express();
app.use(express.json());

const scientists = [
    { id: 1, name: "Dr. Elena Rostova", department: "Climate", projects: 4 },
    { id: 2, name: "Prof. Marcus Vance", department: "Oceanography", projects: 2 },
    { id: 3, name: "Dr. Aisha Khan", department: "Climate", projects: 7 }
];

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
app.get("/api/scientists/:id", (req, res) => {
  const scientistId = parseInt(req.params.id, 10);
  const scientist = scientists.find((scientist) => scientist.id === scientistId);
  if(!scientist) {
    return res.json({ success: false, errorMsg: "No scientist found"});
  }
  else return res.json({success: true, data: scientist});

});

app.get('/about', (req, res) => {
  res.send('This is my WebApp Class Project');
})


// /greet?name?=****&city=****
app.get('/greet', (req, res) => {
    const { name, city } = req.query
  res.send(`hello ${name}, how is the weather in ${city}`);
})

app.post('/about', (req, res) => {
  res.send('This is still my WebApp Class Project, but secure');
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})