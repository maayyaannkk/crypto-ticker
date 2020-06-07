const request = require('request');
const tickerUtil = require('../utils/tickerUtil')

exports.getBitbns = (req, response) => {
    request('https://bitbns.com/order/getTickerWithVolume/', (err, res, body) => {
        if (err) { return console.log(err); }
        response.send(tickerUtil.formatBitbns(JSON.parse(body)));
    });
};
exports.getWazirx = (req, response) => {
    request('https://api.wazirx.com/api/v2/tickers', (err, res, body) => {
        if (err) { return console.log(err); }
        response.send(tickerUtil.formatWazirx(JSON.parse(body)));
    });
};
exports.getCoindcx = (req, response) => {
    request('https://api.coindcx.com/exchange/ticker', (err, res, body) => {
        if (err) { return console.log(err); }
        response.send(tickerUtil.formatCoinDcx(JSON.parse(body)));
    });
};
exports.getBitpolo = (req, response) => {
    request('https://api.bitpolo.com/api/v1/market/ticker', (err, res, body) => {
        if (err) { return console.log(err); }
        response.send(tickerUtil.formatBitpolo(JSON.parse(body).result));
    });
};
exports.getGiottus = (req, response) => {
    request('https://www.giottus.com/api/ticker', (err, res, body) => {
        if (err) { return console.log(err); }
        response.send(tickerUtil.formatGiottus(JSON.parse(body).market));
    });
};