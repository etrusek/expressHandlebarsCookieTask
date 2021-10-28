const express = require('express');
const {getCookieSettings} = require("../utils/get-cookie-settings");
const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
    const {sum,allBases,allAddons, base, addons} = getCookieSettings(req)

    res.render('home', {
        cookie: {
            base,
            addons,
        },
        allBases,
        allAddons,
        sum,
    })
})

module.exports = {
    homeRouter
};