const request = require('request');
const redis = require('redis');
const CACHE_POLICY_TIMEOUT = 15;

const redisClient = redis.createClient();

redisClient.on('error', (err) => {
    console.log("Error " + err);
});

exports.getTradingPairValues = (req, response) => {
    checkExchangeInJson(req.body.tradingPairs).then(
        _ => {
            response.status(200).json({ "success": "valid json" });
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