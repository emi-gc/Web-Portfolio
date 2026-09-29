import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

const scientists = [
    { id: 1, name: "Dr. Elena Rostova", department: "Climate", projects: 4 },
    { id: 2, name: "Prof. Marcus Vance", department: "Oceanography", projects: 2 },
    { id: 3, name: "Dr. Aisha Khan", department: "Climate", projects: 7 }
];

const initiatives = [];

app.get('/', (req, res) => {
    res.send('<h1>SustainHub API is running</h1>');
});

app.get('/api/scientists', (req, res) => {
  const { dept } = req.query;

  // response for requests without a department
  if (!dept) {
    return res.status(200).json(scientists);
  }

  // collect scientists from the requested department
  const result = [];
  for (const scientist of scientists) {
    if (scientist.department.toLowerCase() === dept.toLowerCase()) {
      result.push(scientist);
    }
  }

  // return the filtered array directly, including an empty array if nothing matches
  return res.status(200).json(result);
});

app.get('/api/scientists/:id', (req, res) => {
  const scientistId = parseInt(req.params.id, 10);
  const scientist = scientists.find(
    (scientist) => scientist.id === scientistId
  );

  if (!scientist) {
    //  404 status when the scientist does not exist
    return res.status(404).json({ error: 'No scientist found.' });
  }

  // return the scientist object directly with the required success status
  return res.status(200).json(scientist);
});

app.post('/api/initiatives', (req, res) => {
  // empty body check before reading its fields
  if (!req.body) {
    return res.status(400).json({ error: 'Title, budget, and department are required.' });
  }

  const { title, budget, department } = req.body;

  // missing field checks, budget of zero still counts as a provided value
  if (!title || budget === undefined || budget === null || budget === '' || !department) {
    return res.status(400).json({ error: 'Title, budget, and department are required.' });
  }

  // id based on the number of initiatives already stored
  const initiative = {
    id: initiatives.length + 1,
    title: title,
    budget: budget,
    department: department
  };

  initiatives.push(initiative);

  // 201 status and return the saved object with its id
  return res.status(201).json(initiative);
});

app.listen(PORT, () => {
    console.log(`🚀 SustainHub API Server running at http://localhost:${PORT}`);
});
