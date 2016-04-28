var express = require('express');
var router = express.Router();

var qs = require("qs");

var sha1 = require('sha1');
var sha256 = require('sha256');

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
    //console.log(signature);
    //console.log(paymentSygnature);

    res.status(200).end()
});

router.get('/payparams', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/iframe', function (req, res, next) {
    res.render('iframe', {title: 'Express'});
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


/**
 *
 */
router.post('/validatePhone', function (req, res, next) {
    var data = req.body;
    data.payment_processor_id = "1j1da142-d95c-7c27-5aff-a61dcc80c2b2";

    var str = "9295d3b808bcd8d720" + "|" + data.payment_processor_id + "|" + data.phone_number;

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
            console.log("success!");
            res.send("success");
            //res.status(200).end();
        //} else if (resp.can_topup_account == false) {
        //    console.log("error!");
        } else {
            res.send("error");
            console.log("error");
            //res.status(500).end();
            //console.log("other");
        }
    });
});

router.post('/getPaymentForm', function (req, res, next) {
    var data = req.body;
    data = JSON.stringify(data);
    data = JSON.parse(data);

    paymentObj = sortObject(data);
    paymentSygnature = getSignaturizableStr(paymentObj);
    signature = sha1(paymentSygnature);

    data.signature = signature;
    var stq = qs.stringify(data);
    console.log(stq);

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



router.post('/proceedPayment', function (req, res, next) {
    form.signature = signature;
    var stq = qs.stringify(form);

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


module.exports = router;
