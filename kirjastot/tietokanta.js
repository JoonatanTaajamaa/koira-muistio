const mariadb = require('mariadb');

class Tietokanta {
    constructor(optiot) {
        this.pool = mariadb.createPool(optiot);
    }

    suoritaHaku(sql, params, yhteys) {
        return new Promise(async (resolve, reject) => {
            let uusiYhteys = false;
            
            try {
                if (!yhteys) {
                    yhteys = await this.pool.getConnection();
                    uusiYhteys = true;
                }

                let tulos = await yhteys.query(sql, params);

                delete tulos.meta;

                resolve(tulos);
            } catch (error) {
                reject(error);
            } finally {
                if (uusiYhteys && yhteys) {
                    yhteys.release();
                }
            }
        });
    }

    suoritaMuutos(sql, params, yhteys) {
        return new Promise(async (resolve, reject) => {
            let uusiYhteys = false;

            try {
                if (!yhteys) {
                    yhteys = await this.pool.getConnection();
                    uusiYhteys = true;
                }

                let tulos = await yhteys.query(sql, params);

                if (tulos.affectedRows > 0) {
                    resolve({ muutettu: true });
                } else {
                    resolve({ muutettu: false });
                }
            } catch (error) {
                reject(error);
            } finally {
                if (uusiYhteys && yhteys) {
                    yhteys.release();
                }
            }
        });
    }

    getPool() {
        return this.pool;
    }
}

module.exports = Tietokanta;