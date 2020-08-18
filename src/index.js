import 'dotenv/config';
import express from 'express';
import cors from 'cors';

console.log("Hi sdfsd");

console.log(process.env.MY_SECRET);

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello world hahhhh');
});

app.get('/example', (req, res) => {
    res.send('Hello world hahhhh from example');
});

app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`));
