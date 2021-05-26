const Tietokanta = require('./tietokanta');

const yhteys = new Tietokanta({
    host: 'localhost',
    port: 3306,
    database: 'koiratietokanta',
    user: 'raimo',
    password: 'eBshciiK',
    connectionLimit: 50
});

module.exports = yhteys;
