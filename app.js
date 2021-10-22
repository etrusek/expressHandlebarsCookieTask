const express = require('express');
const hbs = require('express-handlebars');
const {homeRouter} = require("./routes/home");
const {orderRouter} = require("./routes/order");
const {configuratorRouter} = require("./routes/configurator");
const cookieParser = require('cookie-parser');
const path = require('path')

const app = express();

app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());

app.engine('.hbs', hbs({extname:'.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

app.use('/',homeRouter);
app.use('/order',orderRouter);
app.use('/configurator',configuratorRouter);



app.listen(3000, 'localhost', ()=>{
    console.log('Listening on port 3000...')
})