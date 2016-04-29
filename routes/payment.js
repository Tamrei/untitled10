var express = require('express');
var router = express.Router();

var qs = require("qs");

var sha1 = require('sha1');
var sha256 = require('sha256');

var request = require('request');

var uuid = require('uuid');


function sortObject(o) {
    var sorted = {},
        key, a = [];

    for (key in o) {
        if (o.hasOwnProperty(key)) {
            a.push(key);
        }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;
}


function getSignaturizableStr(obj) {
    var result = "";

    var pass = "test";

    result += pass;

    for (var o in obj) {
        result += "|" + obj[o];
    }
    return result;
}


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


router.post('/getPaymentForm', function (req, res, next) {
    var data = req.body;
    var generatedOrderId = uuid.v1();
    data.order_id = generatedOrderId;

    data = JSON.stringify(data);
    data = JSON.parse(data);
    data = sortObject(data);

    data.signature = sha1(getSignaturizableStr(data));

    var stq = qs.stringify(data);

    request({
        url: 'https://api.fondy.eu/api/checkout/url/', method: "POST",
        headers: {"content-type": "application/x-www-form-urlencoded"}, body: stq
    }, function (error, response, body) {
        var resObj = (qs.parse(body));
        if (resObj.response_status == "success") {
            console.log(resObj);
            res.send(resObj);
        } else {
            console.log(resObj);
            res.status(500).end();
        }
    });
});


router.post('/validatePhone', function (req, res, next) {
    var data = req.body;
    data.payment_processor_id = "1j1da142-d95c-7c27-5aff-a61dcc80c2b2";
    var pass = "9295d3b808bcd8d720";

    var str = pass + "|" + data.payment_processor_id + "|" + data.phone_number;

    var obj = {
        "phone_number": data.phone_number,
        "payment_processor_id": data.payment_processor_id,
        "signature": sha256(str)
    };

    request({
        url: 'http://192.168.150.162:9004/can-topup', method: "POST",
        headers: {"content-type": "application/json"}, body: JSON.stringify(obj)
    }, function (error, response, body) {

        if (error) {
            res.status(500).end();
        }

        var resp = JSON.parse(body);
        console.log(resp);

        if (resp.can_topup_account == true) {
            res.send("success");
        } else {
            res.send("error");
        }
    });
});


module.exports = router;