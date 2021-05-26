DROP DATABASE IF EXISTS koiratietokanta;
CREATE DATABASE IF NOT EXISTS koiratietokanta
    CHARACTER SET utf8 COLLATE 'utf8_general_ci';

DROP USER IF EXISTS raimo;
CREATE USER IF NOT EXISTS 'raimo'@'localhost'
    IDENTIFIED BY 'eBshciiK';

GRANT ALL PRIVILEGES ON koiratietokanta.* TO 'raimo'@'localhost';
FLUSH PRIVILEGES;

USE koiratietokanta;

CREATE TABLE koira (
    numero INTEGER PRIMARY KEY,
    rotu VARCHAR(26),
    painoKg INTEGER,
    syntymavuosi INTEGER,
    pituus INTEGER
);