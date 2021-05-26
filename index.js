const path = require('path');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

const yleinenRoute = require('./routes/yleinenRoute');
const koiraRoute = require('./routes/koiraRoute');

app.use('/', yleinenRoute);
app.use('/koira', koiraRoute);

server.listen(PORT, HOST, () => {
    console.log(`Palvelin on käynnissä portissa ${PORT} ja palvelinta ylläpitää ${HOST}.`);
});