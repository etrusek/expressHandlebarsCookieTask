const {getAddonsFromReq} = require("../utils/get-addons-from-req");
const  {handlebarsHelpers} = require("../utils/handlebars-helpers");
const {COOKIE_ADDONS, COOKIE_BASE} = require("../data/cookies-data");

function getCookieSettings(req) {

    const {cookieBase: base} = req.cookies;
    const addons = getAddonsFromReq(req);
    const allBases = Object.entries(COOKIE_BASE);
    const allAddons = Object.entries(COOKIE_ADDONS)

    const sum = (base ? handlebarsHelpers.findPrice(allBases, base) : 0)
        + addons.reduce((prev, addon) => prev + handlebarsHelpers.findPrice(allAddons, addon), 0);
    return {
        addons,
        allBases,
        allAddons,
        base,
        sum,
    }
}

module.exports = {
    getCookieSettings,
}