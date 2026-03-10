require('dotenv').config();
const { hello } = require('./lib/locale');
const express = require('express');
const path = require('path');

const { capitalize, currentYear } = require('./lib/helpers');

const cfg = {
    port: process.env.PORT || 3000,
    dir: {
        root: __dirname,
        static: path.join(__dirname, 'static'),
        views: path.join(__dirname, 'views')
    }
};
console.dir(cfg, { depth: null, color: true });

const app = express();

app.use(express.static(cfg.dir.static));

app.set('view engine', 'ejs');
app.set('views', cfg.dir.views);

app.use((req, res, next) => {
    console.log(`Middleware à chaque requete ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Accueil',
        message: 'Bienvenue sur mon site',
        year: currentYear()
    });
});

app.get('/bonjour/:name', (req, res) => {
    res.render('bonjour', {
        title: 'Bonjour',
        message: `${hello.en} ${capitalize(req.params.name)} !`
    });
});
app.get('/bonjour/:lang/:name', (req, res) => {
    res.render('bonjour', {
        title: 'Bonjour',
        message: `${hello[req.params.lang] || hello.en} ${capitalize(req.params.name)} !`
    });
});

app.get('/form', (req, res) => {
    console.dir(req.query, { depth: null, color: true });
    res.render('form', {
        title: 'Formulaire',
        data: req.query
    });
});

app.use((req, res) => {
    res.status(404).render('404', { title: 'Page introuvable' });
});

app.listen(cfg.port, () => {
    console.log(`Serveur démarré sur http://localhost:${cfg.port}`);
});

module.exports = { cfg, app };