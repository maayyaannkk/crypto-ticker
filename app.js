const express = require('express');

const tickerController = require('./src/controllers/ticker');
const tradingPairController = require('./src/controllers/tradingPairController');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/**
 * Primary app routes.
 */
app.get('/ticker-bitbns', tickerController.getBitbns);
app.get('/ticker-wazirx', tickerController.getWazirx);
app.get('/ticker-coindcx', tickerController.getCoindcx);
app.get('/ticker-bitpolo', tickerController.getBitpolo);
app.get('/ticker-giottus', tickerController.getGiottus);

/**
 * Trading Pair routes
 */
app.post('/get-pairs', tradingPairController.getTradingPairValues);

/**
 * Start Express server.
 */
app.listen(3000, function () {
    tickerController.registerExchanges();
    console.log("App listening on port %s", 3000)
})