'use strict';

var initScriptTag = document.getElementsByTagName("script");
initScriptTag = initScriptTag[initScriptTag.length - 1];
var initScriptContainer = initScriptTag.parentElement;
var scriptAtributes = initScriptTag.attributes;

var ifrm = document.createElement("iframe");
ifrm.frameBorder = 0;
ifrm.id = "thisframe";

//ifrm.src = "http://localhost:3000/javascripts/ifrmSrc.html";
initFrame(ifrm, initScriptContainer);

var iframeDoc = ifrm.contentWindow.document;


//var iframeDoc;
//var iosrc;


function getHTML() {
    var xmlhttp = new XMLHttpRequest();
    var url = "http://localhost:3000/javascripts/ifrmSrc.html";
    xmlhttp.open("get", url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            //console.log(xmlhttp.response);

            ifrm = xmlhttp.response;

            console.log(ifrm);
        }
    };
    xmlhttp.send();
}

//getHTML();

function getSockt() {
    var xmlhttp = new XMLHttpRequest();
    var url = "http://localhost:3000/socket.io/socket.io.js";
    xmlhttp.open("get", url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            //iosrc = xmlhttp.response;

            console.log(xmlhttp.status);

            initFrame(ifrm, initScriptContainer);

            iframeDoc = ifrm.contentWindow.document;

            //prepareScriptTag("http://localhost:3000/socket.io/socket.io.js");

            prepareScriptTag("http://localhost:3000/socket.io.js");

            //prepareScript(iosrc);

            prepareScriptTag("/javascripts/ipsp.js");

            prepareHTML(html);
            prepareStyle(initialCss);

            prepareScript(scrpt);
            prepareScript(stepVar);
            prepareScript(stepScrpt);
            prepareScript(paymentStyle);

            /**  **/
            prepareScript(socktOnScrp);

            var bottmStl = ".bottom {background-color:" + initScriptTag.getAttribute("data-bottom-background") + "};";
            prepareStyle(bottmStl);

            var btnStl = "button {background-color:" + initScriptTag.getAttribute("data-button-background") + "};";
            prepareStyle(btnStl);

            var btnClr = "button {color:" + initScriptTag.getAttribute("data-button-color") + "};";
            prepareStyle(btnClr);

            var inpClr = "input, select {color:" + initScriptTag.getAttribute("data-input-color") + "};";
            prepareStyle(inpClr);

            var inpBorder = "input, select {border:" + initScriptTag.getAttribute("data-input-border") + "};";
            prepareStyle(inpBorder);
        }
    };
    xmlhttp.send();
}

//getSockt();

//prepareScript(iosrc);

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
    '<div class="bottom" style="position: absolute; top 0; width: 100%; padding-bottom: 100%; text-align: center;">' +
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


/*
 var step = 1;
 function nextStep() {
 document.getElementById("stage" + step).style["display"] = "none";
 step++;
 if (step == 3) {
 drawTable("table_body2");
 }
 document.getElementById("stage" + step).style["display"] = "block";
 }

 function prevStep() {
 document.getElementById("stage" + step).style["display"] = "none";
 if (step == 3) {
 document.getElementById("table_body2").innerHTML = "";
 }
 step--;
 document.getElementById("stage" + step).style["display"] = "block";
 }
 */

var step = 1;

var stepVar = "var step = 1;";

function nextStep() {
    document.getElementById("step" + step).style["display"] = "none";
    step++;
    if (step == 2) {
        document.getElementById("step" + step).style["display"] = "block";
    }
}

var stepScrpt = eval(nextStep);

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

initialCss += buttonStl;

var inputStyle =
    "input[type=text], select {" +
    "width: 100%;" +
    "padding: 10px 18px;" +
    "margin: 8px 0;" +
    "font-size: 20px" +
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
    "cursor: pointer;}" +
    "";

function phoneValidate() {
    var phone_number = document.getElementById("phone_number");
    var phone_form = document.getElementById("phone_form");
    var data = {phone_number: phone_number.value};
    var xmlhttp = new XMLHttpRequest();
    var url = "http://localhost:3000/validatePhone";
    xmlhttp.open("post", url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                if (xmlhttp.response == "error") {
                    console.log("error");
                    document.getElementById("phone_number").style.border = "1px solid red";
                } else if (xmlhttp.response == "success") {
                    console.log("success");
                } else {
                }
            }
        }
    };
    xmlhttp.send(JSON.stringify(data));
}


function __DEFAULTCALLBACK__(data, type) {
    var form;
    if (data.error) {
        return;
    }
    if (data.action == "redirect") {
        this.loadUrl(data.url);
        return;
    }
    if (data.send_data.order_status == "delayed") {
        this.unbind("ready");
        this.hide();
        return;
    } else {
        this.unbind("ready").action("ready", function () {
            this.show();
        });
    }
    if (data.send_data && data.url) {
        form = prepareFormData(data.url, data.send_data);
        this.find("body").appendChild(form);
        form.submit();
        form.parentNode.removeChild(form);
    }
}



function sendData() {
    //'var orderId = document.getElementById("order_id");' +
    var orderDesc = document.getElementById("order_desc");
    var currency = document.getElementById("currency");
    var amount = document.getElementById("amount");
    var merchantID = document.getElementById("merchant_id");

    console.log(socket);

    var data = {
        //'"order_id": orderId.value,' +
        "order_desc": orderDesc.value,
        "currency": currency.value,
        "amount": amount.value,
        "merchant_id": merchantID.value,
        "response_url": "http://localhost:3000/successPage/" + socket.id
        //"response_url": "http://localhost:3000/formId/" + someId
        //"response_url": "http://localhost:63342/ticetsua/23.html" //fow window close
    };

    /* put this in other place after */
    function popupwindow(url, title, w, h) {
        var left = (screen.width / 2) - (w / 2);
        var top = (screen.height / 2) - (h / 2);
        return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
    }

    var xmlhttp = new XMLHttpRequest();
    var url = "http://localhost:3000/getPaymentForm";
    xmlhttp.open("post", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                var resobj = JSON.parse(xmlhttp.response);
                /* iframe redirect */
                //document.getElementById("doc").style.display = "none";
                //document.getElementsByTagName("body")[0].style.margin = "0";
                //ifrmProceed(resobj.checkout_url);

                //window.open(resobj.checkout_url, "", "width=600, height=700");

                /*
                var url = resobj.checkout_url;
                var w = 600;
                var h = 700;

                // Fixes dual-screen position                         Most browsers      Firefox
                var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
                var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

                var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
                var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

                var left = ((width / 2) - (w / 2)) + dualScreenLeft;
                var top = ((height / 2) - (h / 2)) + dualScreenTop;
                var newWindow = window.open(url, "", 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

                // Puts focus on the newWindow
                if (window.focus) {
                    newWindow.focus();
                }
                */

                popupwindow(resobj.checkout_url, "" , 400, 600);
            } else {
            }
        }
    };
    xmlhttp.send(JSON.stringify(data));
}

function ifrmProceed(url) {
    $ipsp("checkout").scope(function () {
        this.setCheckoutWrapper("#checkout_wrapper");
        this.setCssStyle(checkoutStyles);
        this.addCallback(__DEFAULTCALLBACK__);
        this.loadUrl(url);
    });
}

var phoneValidateStr = eval(phoneValidate);
var proceedPaymStr = eval(sendData);
var hideFistFrmStr = eval(ifrmProceed);
var callbackStr = eval(__DEFAULTCALLBACK__);

var scrpt = phoneValidateStr + " " + proceedPaymStr + " " + hideFistFrmStr + " " + callbackStr;

var paymentStyle =
    'var checkoutStyles = {' +
    '".btn-lime" : {' +
    '"margin-top" : "0"' +
    '}' +
    '};';

//prepareScriptTag("http://localhost:3000/javascripts/tempTestJsf.js");
//prepareScriptTag("http://localhost:3002/socket.io/socket.io.js");


//prepareScriptTag("/javascripts/socket2.io.js");




//prepareScriptTag("https://cdn.socket.io/socket.io-1.4.5.js");



function onStorageEvent(e){
    console.log("storage changed!");
    if (e.key === "pay_success") {
        document.getElementById("step1").style["display"] = "none";
        document.getElementById("step2").style["display"] = "none";

        var data = localStorage.getItem("pay_success");
        var obj = JSON.parse(data);

        var div = document.createElement("div");

        var text = "<div style='text-align: center'>";


        text += "<h1>" + obj.response_status + "</h1>";
        text += "<h2>" + "thank you for using our service!" + "</h2>";
        text += "<h3> You paid " + obj.amount.slice(0, -2) + " " + obj.currency + "</h3>"


        text += "</div>";
        div.innerHTML = text;
        document.body.appendChild(div);

        console.log(obj);
        localStorage.removeItem("pay_success");
    }
}

var storageEvent = eval(onStorageEvent);
var eventListnr = "window.addEventListener('storage', onStorageEvent, false);";

var socketScrp =  'var socket = io.connect("http://localhost:3000/");';
/*
var socket = io.connect("http://localhost:3000/");

socket.on('connect', function() {
    var sessionid = socket.io.engine.id;
    console.log(sessionid);
});
*/



var socktOnScrp =  "var socket = io.connect('http://localhost:3000/'); socket.on('connect', function() {" +
    "var sessionid = socket.io.engine.id;" +
    "console.log(sessionid);" +
    "});" +
    "" +
    "socket.on('servRespond', function (data) {" +
    "console.log(data);" +
    "});";







/*
prepareScript(scrpt);
prepareScript(stepVar);
prepareScript(stepScrpt);
prepareScript(paymentStyle);

prepareScript(socktOnScrp);
*/

prepareScript(scrpt);
prepareScript(stepVar);
prepareScript(stepScrpt);
prepareScript(paymentStyle);
prepareStyle(initialCss);
setStyles(ifrm);

var bottmStl = ".bottom {background-color:" + initScriptTag.getAttribute("data-bottom-background") + "};";
prepareStyle(bottmStl);

var btnStl = "button {background-color:" + initScriptTag.getAttribute("data-button-background") + "};";
prepareStyle(btnStl);

var btnClr = "button {color:" + initScriptTag.getAttribute("data-button-color") + "};";
prepareStyle(btnClr);

var inpClr = "input, select {color:" + initScriptTag.getAttribute("data-input-color") + "};";
prepareStyle(inpClr);

var inpBorder = "input, select {border:" + initScriptTag.getAttribute("data-input-border") + "};";
prepareStyle(inpBorder);


//prepareScript(storageEvent);
//prepareScript(eventListnr);

//prepareScript(socketScrp);
/*prepareScript(socktOnScrp);




var bottmStl = ".bottom {background-color:" + initScriptTag.getAttribute("data-bottom-background") + "};";
prepareStyle(bottmStl);

var btnStl = "button {background-color:" + initScriptTag.getAttribute("data-button-background") + "};";
prepareStyle(btnStl);

var btnClr = "button {color:" + initScriptTag.getAttribute("data-button-color") + "};";
prepareStyle(btnClr);

var inpClr = "input, select {color:" + initScriptTag.getAttribute("data-input-color") + "};";
prepareStyle(inpClr);

var inpBorder = "input, select {border:" + initScriptTag.getAttribute("data-input-border") + "};";
prepareStyle(inpBorder);*/


/**
 *
 * @param ifrm iframe element
 * @param container element where iframe will be created
 */
function initFrame(ifrm, container) {
    setStyles(ifrm);
    container.appendChild(ifrm);
}

/**
 * set iframe styles according to attributes that passed to init script
 */
function setStyles(ifrm) {
    ifrm.style.height = initScriptContainer.offsetHeight + "px"; //initScriptContainer.offsetHeight;//initScriptTag.getAttribute("data-height") + "px";
    ifrm.style.width = initScriptContainer.offsetWidth + "px";//initScriptTag.getAttribute("data-width") + "px";
    ifrm.style.backgroundColor = initScriptTag.getAttribute("data-background-color");
    //ifrm.style.color = initScriptTag.getAttribute("data-color");
    ifrm.style.border = initScriptTag.getAttribute("data-body-border");
    ifrm.style.borderRadius = initScriptTag.getAttribute("data-body-border-radius") + "px";
}


function prepareStyle(css) {
    var iframeDoc = ifrm.contentDocument;
    var ifrmHead = iframeDoc.getElementsByTagName('head')[0];
    var style = iframeDoc.createElement("style");
    style.innerHTML = css;
    ifrmHead.appendChild(style);
}

function prepareScriptTag(src) {
    /*
    var ifrmdoc = ifrm.contentWindow.document;
    var script2 = ifrmdoc.getElementsByTagName('head')[0];
    var script = iframeDoc.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    script2.appendChild(script);
    */
    var ifrmHead = iframeDoc.getElementsByTagName('body')[0];
    var script = iframeDoc.createElement("script");
    script.type = 'text/javascript';
    script.srt = src;
    ifrmHead.appendChild(script);
}

function prepareHTML(html) {
    ifrm.contentWindow.document.open();
    ifrm.contentWindow.document.write(html);
    ifrm.contentWindow.document.close();
}

function prepareScript(s) {
    var ifrmHead = iframeDoc.getElementsByTagName('head')[0];
    var script = iframeDoc.createElement("script");
    script.innerHTML = s;
    ifrmHead.appendChild(script);
}

function prepareScriptBody(s) {
    var ifrmHead = iframeDoc.getElementsByTagName('body')[0];
    var script = iframeDoc.createElement("script");
    script.innerHTML = s;
    console.log(script);
    ifrmHead.appendChild(script);
}