const tietokantaYhteys = require('../kirjastot/tietokantaYhteys');

const sqlHaeKaikki = 'SELECT * FROM koira;';
const sqlHaeYksiNumerolla = 'SELECT * FROM koira WHERE numero = ?;';
const sqlLisaa = 'INSERT INTO koira (numero, rotu, painoKg, syntymavuosi, pituus) VALUES (?, ?, ?, ?, ?);';
const sqlPaivita = 'UPDATE koira SET rotu = ?, painoKg = ?, syntymavuosi = ?, pituus = ? WHERE numero = ?;';
const sqlPoista = 'DELETE FROM koira WHERE numero = ?;';

const haeMonta = async (parametrit, yhteys) => {
    try {
        if (!yhteys) {
            if (!parametrit && Object.keys(parametrit).length > 0) {
                const { } = parametrit;
                // TODO: filtteri isolle haulle. esim. haku rodulla.
            } else {
                let tulos = await tietokantaYhteys.suoritaHaku(sqlHaeKaikki, []);

                return {
                    tulos: tulos,
                    virhe: false
                };
            }
        } else {
            if (!parametrit && Object.keys(parametrit).length > 0) {
                const { } = parametrit;
                // TODO: filtteri isolle haulle. esim. haku rodulla.
            } else {
                let tulos = await tietokantaYhteys.suoritaHaku(sqlHaeKaikki, [], yhteys);

                return {
                    tulos: tulos,
                    virhe: false
                };
            }
        }
    } catch (error) {
        console.log(error);

        return {
            virhe: true
        };
    }
}

const haeYksi = async (parametrit, yhteys) => {
    const { numero } = parametrit;

    try {
        if (typeof numero != 'undefined') {
            let tulos;

            if (!yhteys) {
                tulos = await tietokantaYhteys.suoritaHaku(sqlHaeYksiNumerolla, [numero]);
            } else {
                tulos = await tietokantaYhteys.suoritaHaku(sqlHaeYksiNumerolla, [numero], yhteys);
            }

            return {
                tulos: tulos[0],
                virhe: false
            };
        } else {
            return {
                virhe: true
            };
        }

    } catch (error) {
        console.log(error);

        return {
            virhe: true
        };
    }
}

const poista = async (parametrit, yhteys) => {
    const { numero } = parametrit;

    if (typeof numero != 'undefined') {
        try {
            if (!yhteys) {
                const yhteys = await tietokantaYhteys.getPool().getConnection();

                let koiraKysely = await haeYksi({ numero }, yhteys);

                if (koiraKysely.tulos) {
                    let tulos = await tietokantaYhteys.suoritaMuutos(sqlPoista, [numero], yhteys);

                    yhteys.release();

                    if (tulos.muutettu) {
                        return {
                            eiLoydy: false,
                            virhe: false
                        };
                    } else {
                        console.log('Ei muutettu.');

                        return {
                            eiLoydy: false,
                            virhe: true
                        };
                    }
                } else {
                    console.log('Ei löydy.');

                    return {
                        eiLoydy: true,
                        virhe: true
                    };
                }
            } else {
                let koiraKysely = await haeYksi({ numero }, yhteys);

                if (koiraKysely.tulos) {
                    let tulos = await tietokantaYhteys.suoritaMuutos(sqlPoista, [numero], yhteys);

                    if (tulos.muutettu) {
                        return {
                            eiLoydy: false,
                            virhe: false
                        };
                    } else {
                        console.log('Ei muutettu.');

                        return {
                            eiLoydy: false,
                            virhe: true
                        };
                    }
                } else {
                    return {
                        eiLoydy: true,
                        virhe: true
                    };
                }
            }
        } catch (error) {
            console.log(error);

            return {
                virhe: true
            };
        }
    } else {
        console.log('Numero puuttuu!');
        return {
            virhe: true
        };
    }
}

const paivita = async (parametrit, yhteys) => {
    const { numero, rotu, painoKg, syntymavuosi, pituus } = parametrit;

    if (typeof numero != 'undefined') {
        try {
            if (!yhteys) {
                const yhteys = await tietokantaYhteys.getPool().getConnection();

                const koiraKysely = await haeYksi({ numero }, yhteys);

                if (koiraKysely) {
                    let muutokset = {
                        rotu: typeof rotu == 'undefined' ? koiraKysely.tulos.rotu : rotu,
                        painoKg: typeof painoKg == 'undefined' ? koiraKysely.tulos.painoKg : painoKg,
                        syntymavuosi: typeof syntymavuosi == 'undefined' ? koiraKysely.tulos.syntymavuosi : syntymavuosi,
                        pituus: typeof pituus == 'undefined' ? koiraKysely.tulos.pituus : pituus
                    };

                    let tulos = await tietokantaYhteys.suoritaMuutos(sqlPaivita,
                        [muutokset.rotu, muutokset.painoKg, muutokset.syntymavuosi, muutokset.pituus, numero],
                        yhteys);

                    yhteys.release();

                    if (tulos.muutettu) {
                        return {
                            eiLoydy: false,
                            virhe: false
                        };
                    } else {
                        return {
                            virhe: true
                        };
                    }
                } else {
                    return {
                        eiLoydy: true,
                        virhe: false
                    };
                }
            } else {
                const koiraKysely = await haeYksi({ numero }, yhteys);

                if (koiraKysely) {
                    let muutokset = {
                        rotu: typeof rotu == 'undefined' ? koiraKysely.tulos.rotu : rotu,
                        painoKg: typeof painoKg == 'undefined' ? koiraKysely.tulos.painoKg : painoKg,
                        syntymavuosi: typeof syntymavuosi == 'undefined' ? koiraKysely.tulos.syntymavuosi : syntymavuosi,
                        pituus: typeof pituus == 'undefined' ? koiraKysely.tulos.pituus : pituus
                    };

                    let tulos = await tietokantaYhteys.suoritaMuutos(sqlPaivita,
                        [muutokset.rotu, muutokset.painoKg, muutokset.syntymavuosi, muutokset.pituus, numero],
                        yhteys);

                    if (tulos.muutettu) {
                        return {
                            eiLoydy: false,
                            virhe: false
                        };
                    } else {
                        return {
                            virhe: true
                        };
                    }
                } else {
                    return {
                        eiLoydy: true,
                        virhe: false
                    };
                }
            }
        } catch (error) {
            console.log(error);

            return {
                virhe: true
            };
        }
    } else {
        return {
            virhe: true
        };
    }
}

const lisaa = async (parametrit, yhteys) => {
    const { numero, rotu, painoKg, syntymavuosi, pituus } = parametrit;

    const koiranTiedotOk = typeof numero != 'undefined' &&
        typeof rotu != 'undefined' &&
        typeof painoKg != 'undefined' &&
        typeof syntymavuosi != 'undefined' &&
        typeof pituus != 'undefined';

    try {
        if (koiranTiedotOk) {

            let tulos;

            if (!yhteys) {
                tulos = await tietokantaYhteys.suoritaMuutos(sqlLisaa,
                    [numero, rotu, painoKg, syntymavuosi, pituus]);
            } else {
                tulos = await tietokantaYhteys.suoritaMuutos(sqlLisaa,
                    [numero, rotu, painoKg, syntymavuosi, pituus], yhteys);
            }

            if (tulos.muutettu) {
                return {
                    virhe: false
                }
            } else {
                console.log('Lisäystä ei tapahtunut.');

                return {
                    virhe: true
                }
            }
        } else {
            return {
                virhe: true
            }
        }
    } catch (error) {
        console.log(error);

        return {
            virhe: true
        }
    }
}

module.exports = {
    lisaa,
    paivita,
    haeYksi,
    poista,
    haeMonta
};