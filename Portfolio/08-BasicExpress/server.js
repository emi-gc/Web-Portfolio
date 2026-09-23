import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'node:url';

const app = express();
const PORT = 3000;

// reads html form fields and put them in req.body.
app.use(bodyParser.urlencoded({ extended: false }));

// display calculator.
app.get('/', (req, res) => {
    res.sendFile(fileURLToPath(new URL('./index.html', import.meta.url)));
});

// handle form
app.post('/', (req, res) => {
    const weight = Number(req.body.weight);
    const height = Number(req.body.height);

    if (
        !Number.isFinite(weight) || weight <= 0 ||
        !Number.isFinite(height) || height <= 0
    ) {
        return res.status(400).send('you do not weigh negative or zero kg and you do not have negative or zero height');
    }

    const bmi = (weight / height ** 2) * 10000;
    res.send(`Your BMI is ${bmi.toFixed(2)}`);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});