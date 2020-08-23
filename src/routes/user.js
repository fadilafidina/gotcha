import { Router } from 'express';

const router = Router();

// do not need to define the resource in the uri
// since it's done in the mounting process of the route 
router.get('/', (req, res) => {
    res.send(Object.values(req.context.models.users));
});

router.get('/:userId', (req, res) => {
    res.send(req.context.models.users[req.params.userId]);
});

export default router;
// module.exports = router;
