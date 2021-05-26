const express = require('express');
const router = express.Router();

const koiraController = require('../controller/koiraController');
const koiraMiddleware = require('../middleware/koiraMiddleware');

router.get('/lisaa', koiraController.lisaaSivu);
router.post('/lisaa', koiraMiddleware.tarkastaLisays, koiraController.lisaaKoira);
router.get('/paivita', koiraController.paivitaSivu);
router.post('/paivita', koiraMiddleware.tarkastaMuutos, koiraController.paivitaKoira);
router.get('/kaikki', koiraController.haeKaikki);
router.get('/etsi', koiraController.etsiSivu);
router.post('/yksi', koiraController.haeYksi);
router.get('/poista', koiraController.poistoSivu);
router.post('/poista', koiraController.poisto);

module.exports = router;