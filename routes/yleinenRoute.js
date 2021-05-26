const express = require('express');
const router = express.Router();

const koiraController = require('../controller/koiraController');

router.get('/', koiraController.koti);
router.get('/virhe', koiraController.virhe);

module.exports = router;