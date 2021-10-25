const express = require('express');
const {COOKIE_BASE, COOKIE_ADDONS} = require('../data/cookies-data')
const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
    res.render('home', {
        cookie: {
            base: 'light',
            addons: ['coconut', 'honey'],
        },
        bases: Object.entries(COOKIE_BASE),
        addons: Object.entries(COOKIE_ADDONS),
    })
})

module.exports = {
    homeRouter
};