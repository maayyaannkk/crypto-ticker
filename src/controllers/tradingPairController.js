const request = require('request');
const redis = require('redis');
const tickerPromiseUtil = require('../utils/tickerPromiseUtil');
const CACHE_POLICY_TIMEOUT = 15;

const redisClient = redis.createClient();

redisClient.on('error', (err) => {
    console.log("Error " + err);
});

exports.getTradingPairValues = (req, response) => {
    checkExchangeInJson(req.body.tradingPairs).then(
        _ => {
            getValues(JSON.parse(req.body.tradingPairs)).then(
                result => {
                    response.status(200).json({ "success": true, "pairs": result });
                }
            );
        },
        _ => { response.status(200).json({ "error": "invalid json" }); }
    );
};

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
                resolve();
            });
        } catch (e) {
            reject();
        }
    });
}

async function getValues(requestedPairs) {
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