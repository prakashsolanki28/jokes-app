const express = require('express');
const axios = require('axios');
const db = require('./db');
const router = express.Router();

// Home 
router.get('/', (req, res) => {
    db.query('SELECT * FROM favourites', (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching favourites');
        }
        res.render('index', { favourites: results });
    });
});

// search jokes
router.post('/search', async (req, res) => {
    const searchTerm = req.body.searchTerm;
    try {
        const response = await axios.get(`https://icanhazdadjoke.com/search?term=${searchTerm}`, {
            headers: { Accept: 'application/json' }
        });
        const jokes = response.data.results;
        res.render('search', { jokes });
    } catch (error) {
        res.send('Error fetching jokes');
    }
});

// save fav
router.post('/favourite', (req, res) => {
    const { joke_id, joke_text } = req.body;
    db.query('INSERT INTO favourites (joke_id, joke_text) VALUES (?, ?)', [joke_id, joke_text], (err) => {
        if (err) {
            return res.status(500).send('Error saving favourite', err);
        }
        res.sendStatus(200);
    });
});

module.exports = router;
