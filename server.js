import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require('express');
const app = express();
const args = require('minimist')(process.argv.slice(2));
import { coinFlip,  coinFlips, countFlips, flipACoin } from './modules/coin.mjs';


const port = args['port'] || 5000; 

app.get("/app/", (req, res) => {
    res.status(200).contentType('json').send("200 OK"); 
});

app.get("/app/flip/", (req, res) => {
    res.status(200).contentType('json').json({"flip": `${coinFlip()}`}); 
});

app.get("/app/flip/:number", (req, res) => {
    const raw = coinFlips(req.params.number); 
    const summary = countFlips(raw);
    res.status(200).contentType('json').json({raw: raw, summary: summary}); 
});

app.get("/app/flip/call/:call", (req, res) => {
    if (req.params.call === 'heads' || req.params.call === 'tails') {
        let results = flipACoin(req.params.call); 
        res.status(200).contentType('json').json(results); 
    }
    else {
        res.status(400).contentType('json').send('Bad Request'); 
    }
});

app.use((req, res) => {
    res.status(404).contentType('json').send('404 Not found'); 
}); 

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});