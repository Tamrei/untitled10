var express = require('express');
var router = express.Router();

var sha1 = require('sha1');

var request = require('request');

var paymentObj;
var paymentSygnature;
var signature;
var form;

router.post('/payparams', function (req, res, next) {
    var data = req.body;
    data = JSON.stringify(data);
    data = JSON.parse(data);

    form = data;

    paymentObj = sortObject(data);
    paymentSygnature = getSignaturizableStr(paymentObj);
    signature = sha1(paymentSygnature);
    console.log("" + signature);
    console.log(paymentSygnature);

    res.status(200).end()
});

router.post('/getForm', function (req, res, next) {
    form.signature = signature;
    res.send(form);
});

router.get('/payparams', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/', function (req, res, next) {
    res.render('paymentparams', {title: 'Express'});
});

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

router.get('/phonevalidation', function (req, res, next) {
    res.render('phonevalidation', {title: 'Express'});
});

router.post('/validatePhone', function (req, res, next) {
    var data = req.body;
    var phone_number = data.phone_number;
    var payment_processor_id = "1j1da142-d95c-7c27-5aff-a61dcc80c2b2";

    var str = payment_processor_id + "|" + phone_number;

    var obj = {
        "phone_number": phone_number,
        "payment_processor_id": payment_processor_id,
        "signature": sha1(str)

    };

    console.log(JSON.stringify(obj));

    var request = require('request');
    request({
        url: 'http://192.168.150.162:9004/can-topup', method: "POST",
        headers: {"content-type": "application/json"}, body: JSON.stringify(obj)
    }, function (error, response, body) {


        var resp = JSON.parse(body);

        if (resp.response_status === 'failure') {
            res.send(resp);
        }
    });
});
/*
router.post('/proceedPayment', function (req, res, next) {
    var data = req.body.request;
    var datareq = req.body;


    data.merchant_id = "1396424";
    datareq.request.merchant_id = "1396424";


    var sortdObj = sortObject(data);
    console.log(getSignaturizableStr(sortdObj));

    var signature = sha1("test|" + data.amount + "|" + data.currency + "|" + data.merchant_id
        + "|" + data.order_desc + "|" + data.order_id + "|https://site.com/responsepage/|https://site.com/callback/");

    data.signature = signature;

    datareq.request.signature = signature;
    console.log(data.signature);
});
*/
module.exports = router;
