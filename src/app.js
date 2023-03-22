import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('index.ejs', { user : 'test'});
});

app.listen(port, () => {
    console.log(`Server started, running on port ${port}`);
});

/* API URL */
// 'https://api.weatherapi.com/v1/current.json?key=' + process.env.WEATHER_API_KEY + '&q=LOC';