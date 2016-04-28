/* From in side the script.... */

// Reliably grab my script tag
'use strict';

var script = document.getElementsByTagName("script");
script = script[script.length - 1];

var scriptAtributes = script.attributes;
var ifrm = document.createElement("IFRAME");
ifrm.frameBorder = 0;
ifrm.id = "thisframe";

//ifrm.src = "/javascripts/iframeTestSrc2.html";
prepareFrame(ifrm, script.parentElement);
//ifrm.getElementsByTagName("html")[0].setAttribute("id", "doc");

var iframeDoc = ifrm.contentWindow.document;

var html =
        '<div id="checkout_wrapper">' +
        '<div id="doc">' +
        '<form>' +
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
        '<button onclick="sendData()">Proceed Payment</button>' +
        //'<button onclick="hideIndex()">Hide Index</button>' +
        //'<button onclick="iframeProceed()">Send data</button>' +
        '</div>' +
        '</div>';


var initialCss =
    "input[type=text] {" +
    "width: 100%;" +
    "padding: 12px 20px;" +
    "margin: 8px 0;" +
    "box-sizing: border-box;}";

var css = "h1 { color: white }";/* +
    "'html , body' : {" +
"'overflow' : 'hidden'}";*/

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
    'var url = "/getPaymentForm";' +
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

var iframeHideIndex = 'function hideIndex() {' +
        'document.getElementById("doc").style.display = "none";' +
        'document.getElementsByTagName("body")[0].style.margin = "0";' +
        'iframeProceed();' +
        '' +
        '' +
        '}';

var iframeProceed = 'function iframeProceed(url) {' +
        '' +
        '$ipsp("checkout").scope(function() {' +
        'this.setCheckoutWrapper("#checkout_wrapper");' +
        'this.addCallback(__DEFAULTCALLBACK__);' +
        'this.loadUrl(url);' +
        '});' +
        //'$ipsp("checkout").loadUrl("https://api.fondy.eu/api/checkout?token=c298b5074bac6707cbb2d58ab1716b5615e44de3")' +
        '};';

var iframeDefaultCallback = 'function __DEFAULTCALLBACK__(data,type){' +
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


//prepareScriptTag("https://api.fondy.eu/static_common/v1/checkout/ipsp.js");
prepareScriptTag("/javascripts/ipsp.js");
prepareScriptTag("/javascripts/testFile.js");
prepareHTML(html);

//addToHead();
prepareStyle(css);
prepareStyle(initialCss);
prepareScript(iframeDefaultCallback);
prepareScript(iframeScript);
prepareScript(iframeProceed);
prepareScript(iframeHideIndex);


if (script.hasAttribute('data-color')) {
}
//<script src="/javascripts/ipsp.js"></script>

        function addToHead() {
            var ifrmHead = iframeDoc.getElementsByTagName('head')[0];
            ifrmHead.innerHTML += '<script src="/javascripts/testFile.js"></script>';
            ifrmHead.innerHTML += '<script src="/javascripts/ipsp.js"></script>';
        }

function prepareStyle(css) {
    var ifrmHead = iframeDoc.getElementsByTagName('head')[0];
    var style = iframeDoc.createElement("style");
    style.innerHTML = css;
    ifrmHead.appendChild(style);
}

function prepareScriptTag(src) {
    //var myIframe = document.getElementById("myIframeId");

    var ifrmdoc = ifrm.contentWindow.document;
    //var script = ifrm.contentWindow.document.createElement("script");
    var script2 = ifrmdoc.getElementsByTagName('head')[0];//.createElement("script");

    var script = iframeDoc.createElement("script");

    script.type = "text/javascript";
    script.src = src;
    script2.appendChild(script);
    //ifrm.contentWindow.document.body.appendChild(script);
}

function prepareFrame(ifrm, container) {
    //var ifrm = document.createElement("IFRAME");
    //ifrm.setAttribute("src", "http://google.com/");
    ifrm.style.width = 600 + "px";
    ifrm.style.height = 480 + "px";
    ifrm.style.backgroundColor = script.getAttribute("data-background-color");
    container.appendChild(ifrm);
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





/*
 // Create a random seed value, making it almost impossible to
 // determine what is being tested for.
 var prevent_bust = Math.random() * 3000;

 // enclose everything in a function, so that it cannot be addressed
 function iniFunc ( init ) {
 // The function is no longer in scope of the main window.
 function onbeforeunload() { prevent_bust++ }
 window.onbeforeunload = onbeforeunload;
 setInterval( function() {
 // make sure the function was not deleted.
 if( window.onbeforeunload != onbeforeunload )
 {
 prevent_bust = init + 1;
 window.onbeforeunload = onbeforeunload;
 }
 if (prevent_bust > init ) {  // All comparison is to the random seed.
 prevent_bust -= 2;
 //window.top.location = '/iframe';
 // Unfortunately, you have absolutely no idea which website caused
 // the incrementation, so you cannot replace it with a link!
 //
 // You might try to simply ignore it and just use the iframe as is --
 // theoretically, they are no longer able to bust this frame.
 // (this theory will be disproved below).
 }
 }, 1 );
 };
 iniFunc( prevent_bust );
 */
