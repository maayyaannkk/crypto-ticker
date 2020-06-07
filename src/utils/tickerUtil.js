
exports.formatBitbns = (json) => {
    var jsonData = {};
    Object.keys(json).forEach(function (key) {
        var innerData = {};
        innerData.last_traded_price = json[key].last_traded_price;
        jsonData[key] = innerData;
    })
    return jsonData;
}

exports.formatWazirx = (json) => {
    var jsonData = {};
    Object.keys(json).forEach(function (key) {
        var innerData = {};
        innerData.last_traded_price = json[key].last;
        jsonData[key] = innerData;
    })
    return jsonData;
}

exports.formatCoinDcx = (json) => {
    var jsonData = {};
    json.forEach((item) => {
        var innerData = {};
        innerData.last_traded_price = parseFloat(item.last_price);
        jsonData[item.market] = innerData;
    });
    return jsonData;
}

exports.formatBitpolo = (json) => {
    var jsonData = {};
    Object.keys(json).forEach(function (key) {
        if (json[key] === null) return;
        var innerData = {};
        innerData.last_traded_price = json[key].last;
        jsonData[key] = innerData;
    })
    return jsonData;
}

exports.formatGiottus = (json) => {
    var jsonData = {};
    Object.keys(json).forEach(function (key) {
        var innerData = {};
        innerData.last_traded_price = json[key].top_bid;
        jsonData[key] = innerData;
    })
    return jsonData;
}