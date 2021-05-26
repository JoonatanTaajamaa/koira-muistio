const tarkastaLisays = (req, res, next) => {
    const { numero, rotu, painoKg, syntymavuosi, pituus } = req.body;

    const tarkastaNumero = !numero || isNaN(parseInt(numero));
    const tarkastaRotu = !rotu || rotu.length > 26;
    const tarkastaPainoKg = !painoKg || isNaN(parseInt(painoKg));
    const tarkastaSyntymavuosi = !syntymavuosi || isNaN(parseInt(syntymavuosi));
    const tarkastaPituus = !pituus || isNaN(parseInt(pituus));

    if (tarkastaNumero ||
        tarkastaRotu ||
        tarkastaPainoKg ||
        tarkastaSyntymavuosi ||
        tarkastaPituus) {

        const viesti = encodeURI('Tiedot ovat epäkelpoiset.');
        return res.redirect(`/koira/lisaa?viesti=${viesti}`);
    }

    next();
}

const tarkastaMuutos = (req, res, next) => {
    const { numero, rotu, painoKg, syntymavuosi, pituus } = req.body;

    const tarkastaNumero = !numero || isNaN(parseInt(numero));
    const tarkastaRotu = (rotu && rotu.length > 26);
    const tarkastaPainoKg = (painoKg && isNaN(parseInt(painoKg)));
    const tarkastaSyntymavuosi = (syntymavuosi && isNaN(parseInt(syntymavuosi)));
    const tarkastaPituus = (pituus && isNaN(parseInt(pituus)));

    if (tarkastaNumero ||
        tarkastaRotu ||
        tarkastaPainoKg ||
        tarkastaSyntymavuosi ||
        tarkastaPituus) {

        const viesti = encodeURI('Tiedot ovat epäkelpoiset.');
        return res.redirect(`/koira/paivita?viesti=${viesti}`);
    }

    next();
}

module.exports = {
    tarkastaLisays,
    tarkastaMuutos
};