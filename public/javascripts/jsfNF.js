'use strict';

var initScriptTag = document.getElementsByTagName("script");
initScriptTag = initScriptTag[initScriptTag.length - 1];
var initScriptContainer = initScriptTag.parentElement;
var scriptAtributes = initScriptTag.attributes;

var content = document.createElement("div");

var html =
    '<div id="step1">' +

    '<div id="checkout_wrapper">' +
    '<div id="doc">' +
    '<form id="phone_form" style="margin: 8px 8px 0 8px;">' +
        //'<label for="order_id">Order_id</label>' +
        //'<input type="text" id="order_id" name="order_id" value="test4207135583456">' +
    '<label for="phone_number">Phone number</label>' +
    '<input type="text" onchange="phoneValidate()" id="phone_number" name="phone_number" placeholder="phone_number">' +
    '<label for="order_desc">Order desc</label>' +
    '<input type="text" id="order_desc" name="order_desc" value="Test payment">' +
        //'<input type="text" id="amount" name="amount" value="100">' +
    '<div class="inline-frm">' +
    '<label for="amount">Amount</label>' +
    '<select id="amount" name="amount" style="margin-right: 6px;">' +
    '<option value="500">5</option>' +
    '<option value="1000">10</option>' +
    '<option value="2000">20</option>' +
    '<option value="5000">50</option>' +
    '<option value="10000">100</option>' +
    '<option value="20000">200</option>' +
    '</select>' +
    '<label for="currency">Currency</label>' +
    '<select id="currency" name="currency" style="margin-left: 6px;">' +
    '<option value="RUB">RUB</option>' +
    '<option value="EUR">EUR</option>' +
    '</select>' +
    '</div>' +
    '<label for="merchant_id">merchant_id (use 1396424 for testing)</label>' +
    '<input type="text" id="merchant_id" name="merchant_id" value="1396424">' +
    '</form>' +
    '<div class="bottom" style="top 0; width: 100%; padding-bottom: 100%; text-align: center;">' +
    '<button onclick="sendData()" style="margin-top: 10px; font-size: 18px;">Proceed Payment</button>' +
    '</div>' +
    '</div>' +
    '</div>' +

    '</div>' +
    '<div id="step2" style="display: none;">' +
    '' +
    '' +
    '' +
    '<button onclick="sendData()" style="margin-top: 10px; font-size: 18px;">Proceed Payment</button>' +
    '' +
    '' +
    '</div>';

content.innerHTML = html;

initScriptContainer.appendChild(content);

var initialCss =
    "input[type=text], select {" +
    "width: 100%;" +
    "padding: 9px 14px;" +
    "margin: 8px 0;" +
    "font-size: 18px !important;" +
    "box-sizing: border-box;}" +
    "body { margin: 0; position: relative; overflow: hidden;}" +
    ".inline-frm { display: inline-flex; width: 100%; }" +
    "label {display: none;}" +
    "" +
    "";

var buttonStl =
    "button {" +
    "border: none;" +
    "color: white;" +
    "padding: 8px 16px;" +
    "text-align: center;" +
    "text-decoration: none;" +
    "display: inline-block;" +
    "font-size: 14px;" +
    "margin: 4px 2px;" +
    "cursor: pointer;" +
    "}";

function prepareStyle(css) {
    var ifrmHead = document.getElementsByTagName('head')[0];
    var style = iframeDoc.createElement("style");
    style.innerHTML = css;
    ifrmHead.appendChild(style);
}

prepareStyle(initialCss);
prepareStyle(buttonStl);