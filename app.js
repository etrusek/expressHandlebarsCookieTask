const express = require('express');
const hbs = require('express-handlebars');
const {HomeRouter} = require("./routes/home");
const {OrderRouter} = require("./routes/order");
const {ConfiguratorRouter} = require("./routes/configurator");
const cookieParser = require('cookie-parser');
const path = require('path')
const {handlebarsHelpers} = require("./utils/handlebars-helpers");
const {COOKIE_BASE, COOKIE_ADDONS} = require("./data/cookies-data");


class CookieMakerApp {
    constructor() {
        this._loadData();
        this._configureApp();
        this._setRoutes();
        this._run();
    }

    _configureApp() {
        this.app = express();

        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(cookieParser());
        this.app.engine('.hbs', hbs({
            extname: '.hbs',
            helpers: handlebarsHelpers,
        }));
        this.app.set('view engine', '.hbs');
    }

    _setRoutes() {
        this.app.use('/', new HomeRouter(this).router);
        this.app.use('/order',new OrderRouter(this).router);
        this.app.use('/configurator', new ConfiguratorRouter(this).router);
    }

    _run() {
        this.app.listen(3000, 'localhost', () => {
            console.log('Listening on port 3000...')
        });
    }

    showErrorPage(res, description) {
        res.render('error', {
            description
        })
    }

    getAddonsFromReq(req) {
        const {cookieAddons} = req.cookies;
        return cookieAddons ? JSON.parse(cookieAddons) : [];
    }

    getCookieSettings(req) {

        const {cookieBase: base} = req.cookies;
        const addons = this.getAddonsFromReq(req);
        const allBases = Object.entries(this.data.COOKIE_BASE);
        const allAddons = Object.entries(this.data.COOKIE_ADDONS)

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

    _loadData() {
        this.data = {COOKIE_BASE, COOKIE_ADDONS}
    }
}

new CookieMakerApp();