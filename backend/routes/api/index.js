const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const albumsRouter = require("./albums.js")

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use("/albums", albumsRouter)

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

module.exports = router;
