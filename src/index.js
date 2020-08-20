import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { v4 as uuid } from 'uuid';

// console.log("Hi sdfsd");

// console.log(process.env.MY_SECRET);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    req.me = users[1];
    next();
})

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

app.get('/messages/:messageId', (req, res) => {
    return res.send(Object.values(messages[req.params.messageId]));
});

app.post('/messages', (req, res) => {
    const id = uuid();

    console.log(req.body);
    const message =  {
        id,
        text: req.body.text,
        userId: req.me.id,
    };
    messages[id] = message;

    return res.send(message);
});

app.delete('/messages/:messageId', (req, res) => {
    const {
      [req.params.messageId]: message,
      ...otherMessages
    } = messages;
   
    messages = otherMessages;
   
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

app.get('/session', (req, res) => {
    return res.send(users[req.me.id]);
  });
   

app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`));
