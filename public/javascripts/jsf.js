/* From in side the script.... */

// Reliably grab my script tag
'use strict';

var script = document.getElementsByTagName("script");
script = script[script.length - 1];

var scriptAtributes = script.attributes;
var ifrm = document.createElement("IFRAME");
prepareFrame(ifrm, script.parentElement);
var iframeDoc = ifrm.contentWindow.document;


var html = '<form>' +
        '<label for="order_id">Order_id</label>' +
        '<input type="text" id="order_id" name="order_id" value="test4207135583456">' +
        '<label for="order_desc">Order_desc</label>' +
        '<input type="text" id="order_desc" name="order_desc" value="Test payment">' +
        '<label for="amount">Amount</label>' +
        '<input type="text" id="amount" name="amount" value="100">' +
        '<label for="currency">Currency</label>' +
        '<input type="text" id="currency" name="currency" value="RUB">' +
        '<label for="merchant_id">merchant_id (use 1396424 for test)</label>' +
        '<input type="text" id="merchant_id" name="merchant_id" value="1396424">' +
        '</form>' +
        '<button onclick="sendData()">Send data</button>';





var initialCss =
    "input[type=text] {" +
    "width: 100%;" +
    "padding: 12px 20px;" +
    "margin: 8px 0;" +
    "box-sizing: border-box;}";

var css = "h1 { color: white }";

var iframeScript = 'function sendData() {' +
    'var orderId = document.getElementById("order_id");' +
    'var orderDesc = document.getElementById("order_desc");' +
    'var currency = document.getElementById("currency");' +
    ' var amount = document.getElementById("amount");' +
    'var merchantID = document.getElementById("merchant_id");' +
    'var data = {' +
    '"order_id": orderId.value,' +
    '"order_desc": orderDesc.value,' +
    '"currency": currency.value,' +
    '"amount": amount.value,' +
    '"merchant_id": merchantID.value' +
    '};' +
    'var xmlhttp = new XMLHttpRequest();' +
    'var url = "/payparams";' +
    'xmlhttp.open("post", url, true);' +
    'xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");' +
    'xmlhttp.onreadystatechange = function () {' +
    'if (xmlhttp.readyState == XMLHttpRequest.DONE) {' +
    'if (xmlhttp.status == 200) {' +
    '} else {' +
    '}' +
    '}' +
    '};' +
    'xmlhttp.send(JSON.stringify(data));' +
    '};';

prepareHTML(html);
prepareStyle(css);
prepareStyle(initialCss);
prepareScript(iframeScript);


if (script.hasAttribute('data-color')) {
}


function prepareStyle(css) {
    var ifrmHead = iframeDoc.getElementsByTagName('head')[0];
    var style = iframeDoc.createElement("style");
    style.innerHTML = css;
    ifrmHead.appendChild(style);
}

function prepareFrame(ifrm, container) {
    //var ifrm = document.createElement("IFRAME");
    //ifrm.setAttribute("src", "http://google.com/");
    ifrm.style.width = 640 + "px";
    ifrm.style.height = 480 + "px";
    ifrm.style.backgroundColor = script.getAttribute("data-background-color");
    container.appendChild(ifrm);
}

function prepareHTML(html) {
    ifrm.contentWindow.document.open();
    ifrm.contentWindow.document.write(html);
    ifrm.contentWindow.document.close();
}

function prepateForm() {

}




function sendData() {
    var orderId = document.getElementById("order_id");
    var orderDesc = document.getElementById("order_desc");
    var currency = document.getElementById("currency");
    var amount = document.getElementById("amount");
    var merchantID = document.getElementById("merchant_id");

    var data = {
        "order_id": orderId.value,
        "order_desc": orderDesc.value,
        "currency": currency.value,
        "amount": amount.value,
        "merchant_id": merchantID.value
    };

    var xmlhttp = new XMLHttpRequest();
    var url = "/payparams";
    xmlhttp.open('post', url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
            } else {
            }
        }
    };
    xmlhttp.send(JSON.stringify(data));
};

function prepareScript (s) {
    var ifrmHead = iframeDoc.getElementsByTagName('head')[0];
    var script = iframeDoc.createElement("script");
    script.innerHTML = s;
    ifrmHead.appendChild(script);
}