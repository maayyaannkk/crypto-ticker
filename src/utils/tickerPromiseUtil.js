const request = require('request');
const redisClient = require('redis').createClient();
const tickerUtil = require('../utils/tickerUtil');
const CACHE_POLICY_TIMEOUT = 15;

exports.cacheExchange = (exchangeName) => {
    switch (exchangeName) {
        case "bitbns":
            return cacheBitbns();
        case "wazirx":
            return cacheWazirx();
        case "coindcx":
            return cacheCoindcx();
        case "bitpolo":
            return cacheBitpolo();
        case "giottus":
            return cacheGiottus();
    }
}

function cacheBitbns() {
    return new Promise(function (resolve, reject) {
        request('https://bitbns.com/order/getTickerWithVolume', (err, res, body) => {
            if (err) {
                reject(Error(err));
            } else {
                redisClient.setex('bitbns', CACHE_POLICY_TIMEOUT, JSON.stringify(tickerUtil.formatBitbns(JSON.parse(body))), (error, result) => {
                    if (result) resolve(JSON.stringify(tickerUtil.formatBitbns(JSON.parse(body))));
                    else reject(error);
                });
            }
        });
    });
}

function cacheWazirx() {
    return new Promise(function (resolve, reject) {
        request('https://api.wazirx.com/api/v2/tickers', (err, res, body) => {
            if (err) {
                reject(Error(err));
            } else {
                redisClient.setex('wazirx', CACHE_POLICY_TIMEOUT, JSON.stringify(tickerUtil.formatWazirx(JSON.parse(body))), (error, result) => {
                    if (result) resolve(JSON.stringify(tickerUtil.formatWazirx(JSON.parse(body))));
                    else reject(error);
                });
            }
        });
    });
};

function cacheCoindcx() {
    return new Promise(function (resolve, reject) {
        request('https://api.coindcx.com/exchange/ticker', (err, res, body) => {
            if (err) {
                reject(Error(err));
            } else {
                redisClient.setex('coindcx', CACHE_POLICY_TIMEOUT, JSON.stringify(tickerUtil.formatCoinDcx(JSON.parse(body))), (error, result) => {
                    if (result) resolve(JSON.stringify(tickerUtil.formatCoinDcx(JSON.parse(body))));
                    else reject(error);
                });
            }
        });
    });
};

function cacheBitpolo() {
    return new Promise(function (resolve, reject) {
        request('https://api.bitpolo.com/api/v1/market/ticker', (err, res, body) => {
            if (err) {
                reject(Error(err));
            } else {
                redisClient.setex('bitpolo', CACHE_POLICY_TIMEOUT, JSON.stringify(tickerUtil.formatBitpolo(JSON.parse(body).result)), (error, result) => {
                    if (result) resolve(JSON.stringify(tickerUtil.formatBitpolo(JSON.parse(body).result)));
                    else reject(error);
                });
            }
        });
    });
};

function cacheGiottus() {
    return new Promise(function (resolve, reject) {
        request('https://www.giottus.com/api/ticker', (err, res, body) => {
            if (err) {
                reject(Error(err));
            } else {
                redisClient.setex('giottus', CACHE_POLICY_TIMEOUT, JSON.stringify(tickerUtil.formatGiottus(JSON.parse(body).prices)), (error, result) => {
                    if (result) resolve(JSON.stringify(tickerUtil.formatGiottus(JSON.parse(body).prices)));
                    else reject(error);
                });
            }
        });
    });
};