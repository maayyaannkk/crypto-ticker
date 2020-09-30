const request = require('request');
const redis = require('redis');
const tickerPromiseUtil = require('../utils/tickerPromiseUtil');
const CACHE_POLICY_TIMEOUT = 15;

const redisClient = redis.createClient();

redisClient.on('error', (err) => {
    console.log("Error " + err);
});

exports.getTradingPairValues = (req, response) => {
    getValues(req.body.tradingPairs).then(
        result => {
            response.status(200).json({ "success": true, "pairs": result });
        },
        _ => { response.status(200).json({ "error": "invalid json" }); }
    );
};

async function getValues(requestedPairs) {
    requestedPairs = await checkExchangeInJson(requestedPairs).catch(err => { });

    var exchangePromises = [];
    var resultToReturn = {};
    Object.keys(requestedPairs).forEach(function (key) {
        exchangePromises.push(tickerPromiseUtil.cacheExchange(key));
    });
    let result = await Promise.allSettled(exchangePromises);

    var exchangeLoopCount = 0;
    Object.keys(requestedPairs).forEach(function (exchangeName) {
        let requestedPairsArray = requestedPairs[exchangeName];

        let exchangeJson = JSON.parse(result[exchangeLoopCount].value);
        exchangeLoopCount++;

        var exchangePairValues = {};
        requestedPairsArray.forEach(function (item, _) {
            exchangePairValues[item] = exchangeJson[item];
        });
        resultToReturn[exchangeName] = exchangePairValues;
    });

    return JSON.parse(JSON.stringify(resultToReturn));
}

function checkExchangeInJson(str) {
    return new Promise(function (resolve, reject) {
        try {
            var arr = JSON.parse(str);
            redisClient.smembers('exchangeList', function (err, reply) {
                Object.keys(arr).forEach(function (key) {
                    if (!reply.includes(key)) {
                        reject();
                    }
                });
                resolve(JSON.parse(str));
            });
        } catch (e) {
            reject();
        }
    });
}