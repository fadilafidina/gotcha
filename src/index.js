import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import models, { users, messages} from './models';
import { v4 as uuid } from 'uuid';

// console.log("Hi sdfsd");

// console.log(process.env.MY_SECRET);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    req.context = {
        models,
        me: models.users[1],
    };
    next();
})

app.get('/users', (req, res) => {
    res.send(Object.values(req.context.models.users));
});

app.get('/users/:userId', (req, res) => {
    res.send(req.context.models.users[req.params.userId]);
});

app.get('/messages/:messageId', (req, res) => {
    return res.send(Object.values(req.context.models.messages[req.params.messageId]));
});

app.post('/messages', (req, res) => {
    const id = uuid();

    console.log(req.body);
    const message =  {
        id,
        text: req.body.text,
        userId: req.context.me.id,
    };
    req.context.models.messages[id] = message;

    return res.send(message);
});

app.delete('/messages/:messageId', (req, res) => {
    const {
      [req.params.messageId]: message,
      ...otherMessages
    } = req.context.models.messages;
   
    req.context.models.messages = otherMessages;
   
    return res.send(message);
  });

app.get('/session', (req, res) => {
    return res.send(req.context.models.users[req.context.me.id]);
  });
   

app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`));
