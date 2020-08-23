import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import models from './models';
import routes from './routes';

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
});

// https://expressjs.com/en/guide/routing.html
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);


app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`));
