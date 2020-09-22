const request = require('request');
const redis = require('redis');
const CACHE_POLICY_TIMEOUT = 15;

const redisClient = redis.createClient();

redisClient.on('error', (err) => {
    console.log("Error " + err);
});

exports.getTradingPairValues = (req, response) => {
    if (!isValidRequestJson(req.body.tradingPairs)) {
        response.status(200).json({ "error": "invalid json" });
        return;
    }
    var arr = JSON.parse(req.body.tradingPairs);
    response.status(200).json(arr.btc);
};

function isValidRequestJson(str) {
    try {
        var arr = JSON.parse(str);
        checkExchangeInJson(arr);
    } catch (e) {
        return false;
    }
    return true;
}

function checkExchangeInJson(arr) {
    redisClient.smembers('exchangeList', function (err, reply) {
        Object.keys(arr).forEach(function (key) {
            if (!reply.includes(key)) console.log("not found");
        });
    });
}