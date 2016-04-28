'use strict';

var script = document.getElementsByTagName("script");
script = script[script.length - 1];

var scriptAtributes = script.attributes;
var ifrm = document.createElement("iframe");
ifrm.frameBorder = 0;
ifrm.id = "thisframe";

prepareFrame(ifrm, script.parentElement);

var iframeDoc = ifrm.contentWindow.document;

var html =
        '<div id="checkout_wrapper">' +
        '<div id="doc">' +
        '<form id="phone_form">' +
        //'<label for="order_id">Order_id</label>' +
        //'<input type="text" id="order_id" name="order_id" value="test4207135583456">' +
        '<label for="phone_number">Phone number</label>' +
        '<input type="text" onchange="validate()" id="phone_number" name="phone_number" placeholder="phone_number">' +
        '<label for="order_desc">Order desc</label>' +
        '<input type="text" id="order_desc" name="order_desc" value="Test payment">' +
        '<label for="amount">Amount</label>' +
        '<input type="text" id="amount" name="amount" value="100">' +
        '<label for="currency">Currency</label>' +
        '<input type="text" id="currency" name="currency" value="RUB">' +
        '<label for="merchant_id">merchant_id (use 1396424 for testing)</label>' +
        '<input type="text" id="merchant_id" name="merchant_id" value="1396424">' +
        '</form>' +
        '<button onclick="sendData()">Proceed Payment</button>' +
        '</div>' +
        '</div>';

var initialCss =
    "input[type=text] {" +
    "width: 100%;" +
    "padding: 12px 20px;" +
    "margin: 8px 0;" +
    "box-sizing: border-box;}" +
    "button {" +
    "background-color: #4CAF50;" +
    "border: none;" +
    "color: white;" +
    "padding: 15px 22px;" +
    "text-align: center;" +
    "text-decoration: none;" +
    "display: inline-block;" +
    "font-size: 15px;" +
    "margin: 2px 0 2px 0;" +
    "cursor: pointer;}";

var css = "h1 { color: white }";


var phoneValidateScript =
        'function validate() {' +
        'var phone_number = document.getElementById("phone_number");' +
        'var phone_form = document.getElementById("phone_form");' +
        'var data = { phone_number: phone_number.value };' +
        'var xmlhttp = new XMLHttpRequest();' +
        'var url = "/payment/validatePhone";' +
        'xmlhttp.open("post", url, true);' +
        'xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");' +
        'xmlhttp.onreadystatechange = function () {' +
        'if (xmlhttp.readyState == XMLHttpRequest.DONE) {' +
        'if (xmlhttp.status == 200) {' +
        'if (xmlhttp.response == "error") {' +
        'console.log("error");' +
        '} else if (xmlhttp.response == "success") {' +
        'console.log("success");' +
        '} else {' +
        'console.log(xmlhttp.status);' +
        '}' +
        '}' +
        '};' +
        'xmlhttp.send(JSON.stringify(data));' +
        '};';


var iframeScript =
    'function sendData() {' +
    //'var orderId = document.getElementById("order_id");' +
    'var orderDesc = document.getElementById("order_desc");' +
    'var currency = document.getElementById("currency");' +
    ' var amount = document.getElementById("amount");' +
    'var merchantID = document.getElementById("merchant_id");' +
    'var data = {' +
    //'"order_id": orderId.value,' +
    '"order_desc": orderDesc.value,' +
    '"currency": currency.value,' +
    '"amount": amount.value,' +
    '"merchant_id": merchantID.value' +
    '};' +
    'var xmlhttp = new XMLHttpRequest();' +
    'var url = "/payment/getPaymentForm";' +
    'xmlhttp.open("post", url, true);' +
    'xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");' +
    'xmlhttp.onreadystatechange = function () {' +
    'if (xmlhttp.readyState == XMLHttpRequest.DONE) {' +
    'if (xmlhttp.status == 200) {' +
    'var resobj = JSON.parse(xmlhttp.response);' +
    'console.log(resobj);' +
    'document.getElementById("doc").style.display = "none";' +
    'document.getElementsByTagName("body")[0].style.margin = "0";' +
    'iframeProceed(resobj.checkout_url);' +
    'console.log();' +
    '} else {' +
    '}' +
    '}' +
    '};' +
    'xmlhttp.send(JSON.stringify(data));' +
    '};';

var iframeHideIndex =
        'function hideIndex() {' +
        'document.getElementById("doc").style.display = "none";' +
        'document.getElementsByTagName("body")[0].style.margin = "0";' +
        'iframeProceed();' +
        '}';

var iframeProceed =
        'function iframeProceed(url) {' +
        '' +
        '$ipsp("checkout").scope(function() {' +
        'this.setCheckoutWrapper("#checkout_wrapper");' +
        'this.addCallback(__DEFAULTCALLBACK__);' +
        'this.loadUrl(url);' +
        '});' +
        '};';

var iframeDefaultCallback =
        'function __DEFAULTCALLBACK__(data,type){' +
        'var form;' +
        'if ( data.error){' +
        'return;' +
        '}' +
        'if (data.action == "redirect") {' +
        'this.loadUrl(data.url);' +
        'return;' +
        '}' +
        'if (data.send_data.order_status == "delayed") {' +
        'this.unbind("ready");' +
        'this.hide();' +
        'return;' +
        '} else {' +
        'this.unbind("ready").action("ready", function() {' +
        'this.show();' +
        '});' +
        '}' +
        'if( data.send_data && data.url ){' +
        'form = prepareFormData(data.url,data.send_data);' +
        'this.find("body").appendChild(form);' +
        'form.submit();' +
        'form.parentNode.removeChild(form);';


prepareScriptTag("/javascripts/ipsp.js");
prepareHTML(html);
prepareStyle(css);
prepareStyle(initialCss);
prepareScript(phoneValidateScript);
prepareScript(iframeDefaultCallback);
prepareScript(iframeScript);
prepareScript(iframeProceed);
prepareScript(iframeHideIndex);


//if (script.hasAttribute('data-color')) {
//}

function prepareStyle(css) {
    var ifrmHead = iframeDoc.getElementsByTagName('head')[0];
    var style = iframeDoc.createElement("style");
    style.innerHTML = css;
    ifrmHead.appendChild(style);
}

function prepareScriptTag(src) {
    var ifrmdoc = ifrm.contentWindow.document;
    var script2 = ifrmdoc.getElementsByTagName('head')[0];
    var script = iframeDoc.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    script2.appendChild(script);
}

function prepareFrame(ifrm, container) {
    setStyles();
    container.appendChild(ifrm);
}

function setStyles() {
    ifrm.style.width = script.getAttribute("data-width") + "px";
    ifrm.style.height = script.getAttribute("data-height") + "px";
    ifrm.style.backgroundColor = script.getAttribute("data-background-color");
    ifrm.style.color = script.getAttribute("data-color");
    ifrm.style.border = script.getAttribute("data-body-border");
    ifrm.style.borderRadius = script.getAttribute("data-body-border-radius") + "px";
}

function prepareHTML(html) {
    ifrm.contentWindow.document.open();
    ifrm.contentWindow.document.write(html);
    ifrm.contentWindow.document.close();
}

function prepareScript (s) {
    var ifrmHead = iframeDoc.getElementsByTagName('head')[0];
    var script = iframeDoc.createElement("script");
    script.innerHTML = s;
    ifrmHead.appendChild(script);
}
