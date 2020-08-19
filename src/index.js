import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { v4 as uuid } from 'uuid';

// console.log("Hi sdfsd");

// console.log(process.env.MY_SECRET);

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

let users = {
    1: {
        id: '1',
        username: 'Robin Wieruch',
    },
    2: {
        id: '2',
        username: 'Dave Davids',
    },
};

let messages = {
    1: {
        id: '1',
        text: 'Hello World',
        userId: '1',
    },
    2: {
        id: '2',
        text: 'By World',
        userId: '2',
    },
};

app.get('/users', (req, res) => {
    res.send(Object.values(users));
});

app.get('/users/:userId', (req, res) => {
    res.send(users[req.params.userId]);
});

app.get('/messages', (req, res) => {
    return res.send(Object.values(messages));
});

app.post('/messages', (req, res) => {
    const id = uuid();

    console.log(req.body);
    const message =  {
        id,
        text: req.body.text,
    };
    message.id = id;

    return res.send(message);
});

app.post('/users', (req, res) => {
    res.send('Received POST method');
});

app.delete('/users/:userId', (req, res) => {
    res.send(`Received DELETE method for ${req.params.userId}`);
});

app.get('/example', (req, res) => {
    res.send('Hello world hahhhh from example');
});

app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`));
