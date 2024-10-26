const express = require('express')
const router = express.Router()
const connection = require('/db');
const { generateToken } = require('/assets/security/token');

router.get('/', (req, res) => {
    res.status(200).res.redirect(`${frontUrl}/views/movies.html`)
})

module.exports = router;