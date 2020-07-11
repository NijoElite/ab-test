const { Router } = require('express');
const apiRouter = require('./api');

const router = new Router();

router.use('/api', apiRouter);

module.exports = router;
