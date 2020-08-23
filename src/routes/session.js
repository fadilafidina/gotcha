import { Router } from 'express';

const router = Router();

// put all of the routes onto the router
// then only at the end we add it to the app
// this is what makes it modular
router.get('/', (req, res) => {
    return res.send(req.context.models.users[req.context.me.id]);
});

export default router;

// module.exports = router;