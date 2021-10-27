const express = require('express');
const {COOKIE_BASE, COOKIE_ADDONS} = require('../data/cookies-data')
const {handlebarsHelpers} = require("../utils/handlebars-helpers");
const {getAddonsFromReq} = require("../utils/get-addons-from-req");
const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
    const {cookieBase} = req.cookies;
    const addons = getAddonsFromReq(req)

    const sum = (cookieBase ? handlebarsHelpers.findPrice(Object.entries(COOKIE_BASE), cookieBase) : 0)
        + addons.reduce((prev, addon) => prev + handlebarsHelpers.findPrice(Object.entries(COOKIE_ADDONS), addon), 0);

    res.render('home', {
        cookie: {
            base: cookieBase,
            addons,
        },
        bases: Object.entries(COOKIE_BASE),
        addons: Object.entries(COOKIE_ADDONS),
        sum,
    })
})

module.exports = {
    homeRouter
};