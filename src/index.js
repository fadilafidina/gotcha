import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import models, { connectDb } from './models';
import { v4 as uuid } from 'uuid';
import routes from './routes';
import { model } from 'mongoose';

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

const eraseDatabaseOnSync = true;

connectDb().then(async () => {
    if (eraseDatabaseOnSync) {
        await Promise.all([
            models.User.deleteMany({}),
            models.Message.deleteMany({}),
        ]);

        createUsersWithMessages();
    };

    app.listen(process.env.PORT, () =>
        console.log(`listening on port ${process.env.PORT}`));
})

const createUsersWithMessages = async () => {
    const user1 = new models.User({
        username: 'fad'
    })

    const message1 = new models.Message({
        text: 'This is the text of the message',
        user: user1.id,
    });

    await user1.save();
    await message1.save();
}