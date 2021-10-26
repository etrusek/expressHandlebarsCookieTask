const express = require('express');
const {COOKIE_BASE, COOKIE_ADDONS} = require('../data/cookies-data')
const {handlebarsHelpers} = require("../handlebars-helpers");
const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
    const {cookieBase} = req.cookies;
    const sum = (cookieBase ? handlebarsHelpers.findPrice(Object.entries(COOKIE_BASE), cookieBase) : 0)
        + ['coconut', 'honey'].reduce((prev, addon) => prev + handlebarsHelpers.findPrice(Object.entries(COOKIE_ADDONS), addon), 0);

    res.render('home', {
        cookie: {
            base: cookieBase,
            addons: ['coconut', 'honey'],
        },
        bases: Object.entries(COOKIE_BASE),
        addons: Object.entries(COOKIE_ADDONS),
        sum,
    })
})

module.exports = {
    homeRouter
};