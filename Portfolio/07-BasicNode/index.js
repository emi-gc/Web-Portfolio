console.log('Hello, world');
const sw = require('star-wars-quotes');

console.log(sw());

const superheroes = require('superheroes');
const supervillains = require('supervillains');

const hero = superheroes.random();
const villain = supervillains.random();

console.log(`${hero} battles ${villain}!`);

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'input.txt');

fs.readFile(filePath, 'utf8', (_error, message) => {
    console.log(message);
});