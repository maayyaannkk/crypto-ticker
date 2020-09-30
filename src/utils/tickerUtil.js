
exports.formatBitbns = (json) => {
    var jsonData = {};
    Object.keys(json).forEach(function (key) {
        var innerData = {};
        innerData.last_traded_price = parseFloat(json[key].last_traded_price);
        innerData.day_high = parseFloat(json[key].volume.max);
        innerData.day_low = parseFloat(json[key].volume.min);
        if (key.toLowerCase().includes("usdt"))
            jsonData[key.toLowerCase()] = innerData;
        else
            jsonData[key.toLowerCase() + "inr"] = innerData;
    })
    return jsonData;
}

exports.formatWazirx = (json) => {
    var jsonData = {};
    Object.keys(json).forEach(function (key) {
        var innerData = {};
        innerData.last_traded_price = parseFloat(json[key].last);
        innerData.day_high = parseFloat(json[key].high);
        innerData.day_low = parseFloat(json[key].low);
        jsonData[key.toLowerCase()] = innerData;
    })
    return jsonData;
}

exports.formatCoinDcx = (json) => {
    var jsonData = {};
    json.forEach((item) => {
        var innerData = {};
        innerData.last_traded_price = parseFloat(item.last_price);
        innerData.day_high = parseFloat(item.high);
        innerData.day_low = parseFloat(item.low);
        jsonData[item.market.toLowerCase()] = innerData;
    });
    return jsonData;
}

exports.formatBitpolo = (json) => {
    var jsonData = {};
    Object.keys(json).forEach(function (key) {
        if (json[key] === null) return;
        var innerData = {};
        innerData.last_traded_price = parseFloat(json[key].last);
        innerData.day_high = parseFloat(json[key].high);
        innerData.day_low = parseFloat(json[key].low);
        jsonData[key.toLowerCase()] = innerData;
    })
    return jsonData;
}

exports.formatGiottus = (json) => {
    var jsonData = {};
    Object.keys(json).forEach(function (key) {
        var innerData = {};
        innerData.last_traded_price = parseFloat(json[key]);
        jsonData[key.replace('/', '').toLowerCase()] = innerData;
    })
    return jsonData;
}