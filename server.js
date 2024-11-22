const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const path = require('path');

const fs = require('fs');

const app = express();


const optionsCors = {
    origin: "http://localhost:3000"
};

//https://cours-info.iut-bm.univ-fcomte.fr/upload/supports/S3/web/cot%20serveur/tp10_end.pdf
const privateKey = fs.readFileSync('./certs/certificat.key', 'utf8');
const certificate = fs.readFileSync('./certs/certificat.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors(optionsCors));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.locals.title = "EJS Is Fun";
    next();
});

app.get("/", (req, res) => {
    // res.json({ message: "Bienvenue dans l'application TP 10: Jetons JWT" });
    // res.render('index', { title: 'Bienvenue sur une application TP 10'});
    res.locals.title = 'Bienvenue sur une application JWT Token';
    res.render('index');
});

const server = https.createServer(credentials, app);

const db = require("./models");
db.sequelize.sync().then(() => {
    console.log('Database synchronized successfully');
   }).catch(err => console.error(err));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Serveur écoute sur le port ${PORT}.`);
});
