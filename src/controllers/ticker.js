const request = require('request');
const redis = require('redis');
const tickerUtil = require('../utils/tickerUtil');
const tickerPromiseUtil = require('../utils/tickerPromiseUtil');
const CACHE_POLICY_TIMEOUT = 15;

const redisClient = redis.createClient();

redisClient.on('error', (err) => {
    console.log("Error " + err);
});

exports.getBitbns = (req, response) => {
    returnTicker(req, response, "bitbns");
};
exports.getWazirx = (req, response) => {
    returnTicker(req, response, "wazirx");
};
exports.getCoindcx = (req, response) => {
    returnTicker(req, response, "coindcx");
};
exports.getBitpolo = (req, response) => {
    returnTicker(req, response, "bitpolo");
};
exports.getGiottus = (req, response) => {
    returnTicker(req, response, "giottus");
};
exports.registerExchanges = () => {
    redisClient.sadd("exchangeList", "bitbns");
    redisClient.sadd("exchangeList", "wazirx");
    redisClient.sadd("exchangeList", "coindcx");
    redisClient.sadd("exchangeList", "bitpolo");
    redisClient.sadd("exchangeList", "giottus");
}

function returnTicker(req, response, ticker) {
    redisClient.get(ticker, (error, result) => {
        if (result) {
            const resultJSON = JSON.parse(result);
            response.status(200).json(resultJSON);
        } else {
            tickerPromiseUtil.cacheExchange(ticker).then(
                result => {
                    const resultJSON = JSON.parse(result);
                    response.status(200).json(resultJSON);
                },
                error => { console.log(error); }
            );
        }
    });
};