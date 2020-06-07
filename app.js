const express = require('express');

const tickerController = require('./src/controllers/ticker');

var app = express();

/**
 * Primary app routes.
 */
app.get('/ticker-bitbns', tickerController.getBitbns);
app.get('/ticker-wazirx', tickerController.getWazirx);
app.get('/ticker-coindcx', tickerController.getCoindcx);
app.get('/ticker-bitpolo', tickerController.getBitpolo);
app.get('/ticker-giottus', tickerController.getGiottus);

/**
 * Start Express server.
 */
app.listen(3000, function () {
    console.log("App listening on port %s", 3000)
})