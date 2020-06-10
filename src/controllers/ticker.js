const request = require('request');
const redis = require('redis');
const tickerUtil = require('../utils/tickerUtil');
const CACHE_POLICY_TIMEOUT = 15;

// create and connect redis client to local instance.
const redisClient = redis.createClient();

// Print redis errors to the console
redisClient.on('error', (err) => {
    console.log("Error " + err);
});

exports.getBitbns = (req, response) => {
    redisClient.get('bitbns', (error, result) => {
        if (result) {
            const resultJSON = JSON.parse(result);
            response.status(200).json(resultJSON);
        } else {
            request('https://bitbns.com/order/getTickerWithVolume/', (err, res, body) => {
                if (err) { return console.log(err); }
                redisClient.setex('bitbns', CACHE_POLICY_TIMEOUT, JSON.stringify(tickerUtil.formatBitbns(JSON.parse(body))));
                response.status(200).send(tickerUtil.formatBitbns(JSON.parse(body)));
            });
        }
    })
};
exports.getWazirx = (req, response) => {
    redisClient.get('wazirx', (error, result) => {
        if (result) {
            const resultJSON = JSON.parse(result);
            response.status(200).json(resultJSON);
        } else {
            request('https://api.wazirx.com/api/v2/tickers', (err, res, body) => {
                if (err) { return console.log(err); }
                redisClient.setex('wazirx', CACHE_POLICY_TIMEOUT, JSON.stringify(tickerUtil.formatWazirx(JSON.parse(body))));
                response.status(200).send(tickerUtil.formatWazirx(JSON.parse(body)));
            });
        }
    })
};
exports.getCoindcx = (req, response) => {
    redisClient.get('coindcx', (error, result) => {
        if (result) {
            const resultJSON = JSON.parse(result);
            response.status(200).json(resultJSON);
        } else {
            request('https://api.coindcx.com/exchange/ticker', (err, res, body) => {
                if (err) { return console.log(err); }
                redisClient.setex('coindcx', CACHE_POLICY_TIMEOUT, JSON.stringify(tickerUtil.formatCoinDcx(JSON.parse(body))));
                response.status(200).send(tickerUtil.formatCoinDcx(JSON.parse(body)));
            });
        }
    })
};
exports.getBitpolo = (req, response) => {
    redisClient.get('bitpolo', (error, result) => {
        if (result) {
            const resultJSON = JSON.parse(result);
            response.status(200).json(resultJSON);
        } else {
            request('https://api.bitpolo.com/api/v1/market/ticker', (err, res, body) => {
                if (err) { return console.log(err); }
                redisClient.setex('bitpolo', CACHE_POLICY_TIMEOUT, JSON.stringify(tickerUtil.formatBitpolo(JSON.parse(body).result)));
                response.status(200).send(tickerUtil.formatBitpolo(JSON.parse(body).result));
            });
        }
    })
};
exports.getGiottus = (req, response) => {
    redisClient.get('giottus', (error, result) => {
        if (result) {
            const resultJSON = JSON.parse(result);
            response.status(200).json(resultJSON);
        } else {
            request('https://www.giottus.com/api/ticker', (err, res, body) => {
                if (err) { return console.log(err); }
                redisClient.setex('giottus', CACHE_POLICY_TIMEOUT, JSON.stringify(tickerUtil.formatGiottus(JSON.parse(body).market)));
                response.status(200).send(tickerUtil.formatGiottus(JSON.parse(body).market));
            });
        }
    })
};