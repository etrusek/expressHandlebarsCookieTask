const express = require('express');
const {getAddonsFromReq} = require("../utils/get-addons-from-req");
const {handlebarsHelpers} = require("../utils/handlebars-helpers");
const {COOKIE_BASE, COOKIE_ADDONS} = require("../data/cookies-data");

const orderRouter = express.Router();
orderRouter
    .get('/summary', (req,res)=>{
        const {cookieBase} = req.cookies;
        const addons = getAddonsFromReq(req)

        const sum = (cookieBase ? handlebarsHelpers.findPrice(Object.entries(COOKIE_BASE), cookieBase) : 0)
            + addons.reduce((prev, addon) => prev + handlebarsHelpers.findPrice(Object.entries(COOKIE_ADDONS), addon), 0);

        res.render('order/summary', {
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
    orderRouter
};