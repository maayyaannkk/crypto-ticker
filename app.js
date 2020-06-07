const express = require('express');

var app = express();

app.listen(3000, function () {
    console.log("App listening on port %s", 3000)
})