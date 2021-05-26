const koiraModel = require('../model/koiraModel');

/**
 * Http tyyppi on GET
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
const koti = (req, res, next) => {
    res.render('index');
}

/**
 * Http tyyppi on GET
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
const lisaaSivu = (req, res, next) => {
    try {
        const viesti = req.query.viesti;

        if (viesti) {
            res.render('lisaaKoira', { viesti: viesti });
            return;
        }

        res.render('lisaaKoira');
    } catch (error) {
        const viesti = encodeURI('Olkaa hyvä ja ottakaa yhteys asiakas palveluun!');
        res.redirect(`/virhe?viesti=${viesti}`);
    }
}

/**
 * HTTP tyyppi on GET
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
const paivitaSivu = (req, res, next) => {
    try {
        const viesti = req.query.viesti;

        if (viesti) {
            res.render('lisaaKoira', { viesti: viesti });
            return;
        }

        res.render('paivita');
    } catch (error) {
        console.log(error);

        const viesti = encodeURI('Olkaa hyvä ja ottakaa yhteys asiakas palveluun!');
        res.redirect(`/virhe?viesti=${viesti}`);
    }
}

/**
 * Http tyyppi on POST
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
const lisaaKoira = async (req, res, next) => {
    try {
        const { numero, rotu, painoKg, syntymavuosi, pituus } = req.body;

        const koiranTiedot = {
            numero: parseInt(numero),
            rotu: rotu,
            painoKg: parseInt(painoKg),
            syntymavuosi: parseInt(syntymavuosi),
            pituus: parseInt(pituus)
        };

        let koiranLisaysKysely = await koiraModel.lisaa(koiranTiedot);

        if (!koiranLisaysKysely.virhe) {
            const viesti = encodeURI('Lisäys onnistui!');
            res.redirect(`/koira/lisaa?viesti=${viesti}`);
        } else {
            const viesti = encodeURI('Ei voitu lisätä!');
            res.redirect(`/virhe?viesti=${viesti}`);
        }
    } catch (error) {
        console.log(error);

        const viesti = encodeURI('Olkaa hyvä ja ottakaa yhteys asiakas palveluun!');
        res.redirect(`/virhe?viesti=${viesti}`);
    }
}

/**
 * HTTP tyyppi on POST
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
const paivitaKoira = async (req, res, next) => {
    try {
        const { numero, rotu, painoKg, syntymavuosi, pituus } = req.body;

        const koiranTiedot = {
            numero: parseInt(numero),
            rotu: !rotu ? undefined : rotu,
            painoKg: !painoKg ? undefined : parseInt(painoKg),
            syntymavuosi: !syntymavuosi ? undefined : parseInt(syntymavuosi),
            pituus: !pituus ? undefined : parseInt(pituus)
        };

        let koiranPaivitysKysely = await koiraModel.paivita(koiranTiedot);

        if (!koiranPaivitysKysely.eiLoydy && !koiranPaivitysKysely.virhe) {
            const viesti = encodeURI('Päivitys onnistui');
            res.redirect(`/koira/paivita?viesti=${viesti}`);
        } else {
            const viesti = encodeURI('Ei voitu päivittää!');
            res.redirect(`/virhe?viesti=${viesti}`);
        }
    } catch (error) {
        console.log(error);

        const viesti = encodeURI('Olkaa hyvä ja ottakaa yhteys asiakas palveluun!');
        res.redirect(`/virhe?viesti=${viesti}`);
    }
}

/**
 * Http tyyppi on GET
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
const haeKaikki = async (req, res, next) => {
    let koiraKysely = await koiraModel.haeMonta({});

    if (koiraKysely.tulos && !koiraKysely.virhe) {
        res.render('kaikki', { koirat: koiraKysely.tulos });
    } else {
        res.render('kaikki');
    }
}

/**
 * HTTP tyyppi on POST
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
const haeYksi = async (req, res, next) => {
    try {
        const { numero } = req.body;

        let koiraKysely = await koiraModel.haeYksi({ numero: parseInt(numero) });

        if (koiraKysely.tulos && !koiraKysely.virhe) {
            res.render('yksi', { koira: koiraKysely.tulos });
        } else {
            const viesti = encodeURI('Koiraa ei löytynyt tai sitä ei voitu hakea.');
            res.redirect(`/virhe?viesti=${viesti}`);
        }
    } catch (error) {
        console.log(error);

        const viesti = encodeURI('Olkaa hyvä ja ottakaa yhteys asiakas palveluun!');
        res.redirect(`/virhe?viesti=${viesti}`);
    }

}

/**
 * HTTP typpi on GET
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @returns 
 */
const etsiSivu = (req, res, next) => {
    try {
        const viesti = req.query.viesti;

        if (viesti) {
            res.render('etsi', { viesti: viesti });
            return;
        }

        res.render('etsi');
    } catch (error) {
        console.log(error);

        const viesti = encodeURI('Olkaa hyvä ja ottakaa yhteys asiakas palveluun!');
        res.redirect(`/virhe?viesti=${viesti}`);
    }
}

/**
 * HTTP tyyppi on GET
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
const poistoSivu = (req, res, next) => {
    try {
        const viesti = req.query.viesti;

        if (typeof viesti != 'undefined') {
            res.render('poisto', { viesti: viesti });
            return;
        }

        res.render('poisto');
    } catch (error) {
        console.log(error);

        const viesti = encodeURI('Olkaa hyvä ja ottakaa yhteys asiakas palveluun!');
        res.redirect(`/virhe?viesti=${viesti}`);
    }
}

/**
 * HTTP tyyppi on POST
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
const poisto = async (req, res, next) => {
    try {
        const numero = req.body.numero;

        let poistoKysely = await koiraModel.poista({ numero: parseInt(numero) });

        if (!poistoKysely.eiLoydy && !poistoKysely.virhe) {
            const viesti = encodeURI('Poisto toteutui onnistuneesti.');
            res.redirect(`/koira/poista?viesti=${viesti}`);
        } else {
            const viesti = encodeURI('Poistoa ei voitu toteuttaa.');
            res.redirect(`/virhe?viesti=${viesti}`);
        }
    } catch (error) {
        console.log(error);

        const viesti = encodeURI('Olkaa hyvä ja ottakaa yhteys asiakas palveluun!');
        res.redirect(`/virhe?viesti=${viesti}`);
    }
}

/**
 * HTTP tyyppi on GET
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
const virhe = (req, res, next) => {
    try {
        const viesti = req.query.viesti;

        console.log(viesti);

        res.render('virhe', { viesti: viesti });
    } catch (error) {
        console.log(error);
        res.end();
    }
}

module.exports = {
    koti,
    lisaaSivu,
    paivitaSivu,
    lisaaKoira,
    paivitaKoira,
    haeKaikki,
    etsiSivu,
    haeYksi,
    poistoSivu,
    poisto,
    virhe
};