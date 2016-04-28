//     Ipsp.js version 1.3.1
//     Ipsp JS Modules - юзать могут все <:)
//     а работать будет только у нас ;)

// * [Usage Example](#usage-examples)
// * [Module](#module-class)
// * [Connector](#connector-class)
// * [Button](#checkout-button-module)
// * [Checkout](#checkout-module)
// * [AcsFrame](#acs-frame-module)

// Usage Examples
// =====
// 
// *** Button Checkout Url ***
//
//		var button = $ipsp.get('button');
//			button.setMerchantId(1000);
//			button.setHost('api.oplata.com');
//			button.setAmount(100,'UAH');
//			button.setResponseUrl('http://site.com/result/');
//			button.addField({
//				label:'ФИО',
//				name:'fio',
//				value:'Желе',
//				required:true,
//				valid:{}
//			});
//		var url = button.getUrl();
//
// *** In-Page Checkout ***
//
//      $ipsp.get('checkout').config({
//          'wrapper': '#frameholder' ,
//          'styles' : {
//              'body':{'overflow':'hidden'},
//              '.page-section-shopinfo':{display:'none'},
//              '.page-section-footer':{display:'none'}
//          }
//      }).scope(function(){
//          this.width(480);
//          this.height(480);
//          this.action('decline',function(data,type){
//              console.log(data);
//          });
//          this.action('message',function(data,type){
//              console.log(data);
//          });
//          this.loadUrl(url);
//      });
//
// *** Handle Checkout Data ***
//
//      $ipsp.get('checkout').config({
//          'wrapper':'#frameholder',
//          'styles' : {},
//      }).scope(function(){
//			this.width(480);
//			this.height(480);
//			this.addCallback(__DEFAULTCALLBACK__);
//			this.loadUrl(url);
//      });
//
// *** All-in-one coniguration ***
//		
//      $ipsp.get('checkout').config({
//          'wrapper': '#frameholder' ,
//          'ismodal': false ,
//          'styles' : {
//              'body':{'overflow':'hidden'},
//              '.page-section-shopinfo':{display:'none'},
//              '.page-section-footer':{display:'none'}
//          }
//      }).scope(function(){
//          // set checkout element target
//          this.setCheckoutWrapper('#frameholder');
//          // set checkout modal state
//          this.setModal(false);
//          // set checkout size? use only with setModal(false)
//          this.setCheckoutWidth(480);
//          this.setCheckoutHeight(450);
//          // apply custom styles to checkout page
//          this.setCssStyle({
//              'body':{'overflow':'hidden'},
//              '.page-section-shopinfo':{display:'none'},
//              '.page-section-footer':{display:'none'}
//          });
//          // add action handlers
//          this.action('decline',function(data,type){
//              console.log(data);
//          });
//          this.action('message',function(data,type){
//              console.log(data);
//          });
//          this.action('show',function(){
//              console.log('show checkout');
//          });
//          this.action('hide',function(){
//              console.log('hide checkout');
//          });
//          // add resize handler that triggers
//          // when checkout page change size
//          this.action('resize',function(data,type){
//              this.setCheckoutHeight(data.height);
//          });
//          // load checkout url received from server-server api  
//          // or from Button Module `$ipsp('button').getUrl()`
//          this.loadUrl(checkout_url);
//          // bind multiple html elements to open checkout
//          this.setElementAttr('data-url');
//          this.setClickElement('.product-list .pay-button');
//			// handle success response from checkout
//			this.unbind('callback').action('callback',function(){
//				...code
//			});
//			// handle decline response from checkout
//			this.action('decline',function(){
//				...code
//			});
//			// handle all response from checkout api
//			this.addCallback(__DEFAULTCALLBACK__);
//      });
//
// *** Fullscreen Checkout ***
//
//      $ipsp.get('checkout').config({
//          'wrapper':'body',
//          'ismodal':true,
//          'styles' : {
//              'body':{'overflow':'hidden'},
//              '.page-section-shopinfo':{display:'none'},
//              '.page-section-footer':{display:'none'}
//          }
//      }).scope(function(){
//          this.action('decline',function(data,type){
//              console.log(data);
//          });
//          this.action('message',function(data,type){
//              console.log(data);
//          });
//          this.loadUrl(url);
//      });
//


// Ipsp Modules Wrapper
// **example:**
//
//     $ipsp('checkout'); // return singleton object
//     $ipsp.get('checkout'); // create new instance
//
(function () {
    // ipsp module version
    var version = '1.3.1';
    // defined list of existing ipsp modules
    var modules = {};
    // defined list of singleton module instances
    var instance = {};
    // create instance of ipsp module class
    // always return singleton object by module **name**
    this.$ipsp = function (name) {
        if (instance[name])
            return instance[name];
        return (instance[name] = arguments.callee.get(name) );
    };
    // create new instance of ipsp module class
    // always return new object;
    this.$ipsp.get = function (name) {
        if (!modules[name])
            throw Error('module is undefined');
        return new modules[name];
    };
    // Add class to ipsp module wrapper
    this.$ipsp.add = function (name, module) {
        if (modules[name]) {
            throw Error('module already added');
        }
        modules[name] = module;
    };
    // Setup ipsp version
    this.$ipsp.version = function (v) {
        version = v;
        return this;
    };

}).call(window || {});
// Oplata Namespace support
(function () {
    this.$oplata = this.$ipsp;
}).call(window || {});

// String Helpers
(function () {
    this.camelCase = function (s) {
        return (s || '').toLowerCase().replace(/(\b|-)\w/g, function (m) {
            return m.toUpperCase().replace(/-/, '');
        });
    };
}).call(window || {});
// Type Helpers
(function () {
    var type = function (o) {
        return ({}).toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    };
    this.isObject = function (o) {
        return type(o) === 'object';
    };
    this.isRegexp = function (o) {
        return type(o) === 'regexp';
    };
    this.isArguments = function (o) {
        return type(o) === 'arguments';
    };
    this.isError = function (o) {
        return type(o) === 'error';
    };
    this.isArray = function (o) {
        return type(o) === 'array';
    };
    this.isDate = function (o) {
        return type(o) === 'date';
    };
    this.isString = function (o) {
        return type(o) === 'string';
    };
    this.isNumber = function (o) {
        return type(o) === 'number';
    };
    this.isBoolean = function (o) {
        return type(o) === 'boolean';
    };
    this.isElement = function (o) {
        return o && o.nodeType === 1;
    };
    this.getType = type;
}).call(window || {});
// Popup Blocker Test
(function () {
    this.popupBlocker = function (poppedWindow) {
        var result = false;
        try {
            if (typeof poppedWindow == 'undefined') {
                result = true;
            } else if (poppedWindow && poppedWindow.closed) {
                result = false;
            } else if (poppedWindow && poppedWindow.test) {
                result = false;
            } else {
                result = true;
            }
        } catch (err) {

        }
        return result;
    };
}).call(window || {});
// Form Helpers
(function () {
    this.prepareFormData = function (url, data, target) {
        var elem;
        var form = document.createElement('form');
        form.action = url;
        form.target = target || '_self';
        form.method = 'POST';
        for (var prop in data) {
            if (data.hasOwnProperty(prop)) {
                elem = document.createElement('input');
                elem.type = 'hidden';
                elem.name = prop;
                elem.value = data[prop];
                form.appendChild(elem);
            }
        }
        form.style.display = 'none';
        return form;
    };
}).call(window || {});
// Simple Class inheritance
// ------------------------
// inspired by john resig class inheritance
(function () {
    // Define init flag
    var init = false;
    // Class constructor
    this.Class = function () {
        if (!(this instanceof arguments.callee))
            throw Error('use Class with "extend" method');
    };
    // Class prototype
    this.Class.prototype = {
        init: function () {

        }
    };
    // **Class.extend** function use to make inherit class
    this.Class.extend = function (instance) {
        var prop, proto, object = this.prototype;
        init = true;
        proto = new this();
        init = false;
        for (prop in instance)
            if (instance.hasOwnProperty(prop))
                proto[prop] = instance[prop];
        function Class(options) {
            // prevent call init method
            if (!init)
                this.init.apply(this, arguments);
        }

        // call super class method
        // pass method name and arguments list parameters
        proto.parent = function (m, a) {
            return object[m] ? object[m].apply(this, a) : null;
        };
        // apply new proto object as **Class.prototype**
        Class.prototype = proto;
        // apply this function as Class static method
        Class.extend = arguments.callee;
        // return new created class
        return Class;
    };
}).call(window || {});
// Publish/Subscribe Module
// ------------------------
//
(function () {
    // define topic list storage and subscriber uid token
    var topics = {}, subUid = -1;
    // publish event with arguments to subscribers
    this.publish = function (topic, data) {
        if (!topics[topic]) {
            return false;
        }
        var subscribers = topics[topic], len = subscribers ? subscribers.length : 0;
        var args = Array.prototype.slice.call(arguments, 2);
        var topic = topic.split('/').pop();
        for (i = 0; i < len; i++) {
            subscribers[i].func(data, topic);
        }
        return this;
    };
    // Add listener function on specified event `name`.
    // return subscriber token uid
    this.subscribe = function (topic, func) {
        if (!topics[topic]) {
            topics[topic] = [];
        }
        var token = (++subUid).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };
    // Remove listener function by passing subscriber `token` uid
    this.unsubscribe = function (token) {
        for (var m in topics) {
            if (topics.hasOwnProperty(m) && topics[m]) {
                for (var i = 0, j = topics[m].length; i < j; i++) {
                    if (topics[m][i].token === token) {
                        topics[m].splice(i, 1);
                        return token;
                    }
                }
            }
        }
        return this;
    };
}).call(window.pubsub = {});
// DOM Ready Helper
(function (window) {
    function contentLoaded(win, fn) {
        var done = false, top = true,
            doc = win.document,
            root = doc.documentElement,
            modern = doc.addEventListener,
            add = modern ? 'addEventListener' : 'attachEvent',
            rem = modern ? 'removeEventListener' : 'detachEvent',
            pre = modern ? '' : 'on',
            init = function (e) {
                if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
                (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
                if (!done && (done = true)) fn.call(win, e.type || e);
            },
            poll = function () {
                try {
                    root.doScroll('left');
                } catch (e) {
                    setTimeout(poll, 50);
                    return;
                }
                init('poll');
            };
        if (doc.readyState == 'complete') fn.call(win, 'lazy');
        else {
            if (!modern && root.doScroll) {
                try {
                    top = !win.frameElement;
                } catch (e) {
                }
                if (top) poll();
            }
            doc[add](pre + 'DOMContentLoaded', init, false);
            doc[add](pre + 'readystatechange', init, false);
            win[add](pre + 'load', init, false);
        }
    };
    window.domReady = function (fn) {
        contentLoaded(window, fn);
    };
})(window);
// Module class
// ---------------
// contains handy crossbrowser methods to manipulate DOM and Events javascript api
(function () {
    this.Module = Class.extend({
        // find element by css selector
        // example:
        //
        //      .find('#block .item');
        //      .find('body .oneblock');
        //
        // return `HTMLElement`
        find: function (selector) {
            return isElement(selector) ? selector : (document.querySelector(selector) || null);
        },
        // find list of html element by css selector
        // example:
        //
        //      .findAll('body input');
        //      .findAll('table td.item');
        //
        findAll: function (selector) {
            return document.querySelectorAll(selector);
        },
        // merge objects properties in first passed object
        // example:
        //
        //      .extend(targetObject,{prop1:true,prop2:'value'});
        //      .extend(targetObject,{prop1:true,prop2:'value'},{prop1:false,prop3:[1]});
        //
        // return modified `targetObject`
        extend: function _extend() {
            var i, prop, item, obj = arguments[0], ext = Array.prototype.slice.call(arguments, 1);
            for (i = 0; i < ext.length; i++) {
                if (( item = ext[i]) !== null) {
                    for (prop in item) {
                        if (item.hasOwnProperty(prop)) {
                            obj[prop] = item[prop];
                        }
                    }
                }
            }
            return obj;
        },
        // Javascript closure proxy function
        proxy: function (func, wrapper) {
            var wrapper = wrapper || this;
            return function () {
                return func.apply(wrapper, Array.prototype.slice.call(arguments));
            };
        },
        // Apply css styles to element
        addCss: function (elem, styles) {
            if (!elem)
                return false;
            for (var prop in styles) {
                if (styles.hasOwnProperty(prop)) {
                    elem.style[prop] = styles[prop];
                }
            }
        },
        // Fire custom javascript event
        fireEvent: function (elem, eventName) {
            var evt;
            if (elem) {
                if (document.createEventObject) {
                    evt = document.createEventObject();
                    return elem.fireEvent('on' + eventName, evt);
                } else {
                    evt = document.createEvent("HTMLEvents");
                    evt.initEvent(eventName, true, true);
                    return !elem.dispatchEvent(evt);
                }
            }
        },
        // Crossbrowser add event listener
        addEvent: function (elem, type, handler) {
            if (elem) {
                if (elem.addEventListener) {
                    elem.addEventListener(type, handler, false);
                } else {
                    elem.attachEvent('on' + type, handler);
                }
            }
            return this;
        },
        // Crossbrowser add event listener
        removeEvent: function (elem, type, handler) {
            if (elem) {
                if (elem.removeEventListener) {
                    elem.removeEventListener(type, handler, false);
                } else {
                    elem.detachEvent('on' + type, handler);
                }
            }
            return this;
        },
        // Document ready event
        onDomReady: function (fn) {
            domReady(this.proxy(fn));
            return this;
        },
        // Apply attributes to specified html element
        addAttr: function (elem, attributes) {
            var prop;
            if (!elem)
                return false;
            for (prop in attributes) {
                if (attributes.hasOwnProperty(prop)) {
                    elem.setAttribute(prop, attributes[prop]);
                }
            }
        },
        // use ipsp functionality in module scope
        scope: function (fn) {
            this.onDomReady(fn);
            return this;
        },
        // print object
        print: function () {
            var prop, stack = [];
            for (prop in this) {
                stack.push([[this.name, prop].join('.'), getType(this[prop])].join(' : '));
            }
            return stack.join('\n');
        }
    });
}).call(window || {});
// Connector class
// ---------------
// example:
//
//      $ipsp('connector').setTarget( window.top || iframe );
//      $ipsp('connector').action('origin',function(data,type){
//          // receive data
//      });
//      // send data to target window
//      $ipsp('connector').send('actionName',object);
//
(function () {
    var UID = -1;
    this.Connector = Module.extend({
        name: 'crossdomain',
        origin: '*',
        // `Connector` class constructor
        init: function () {
            this.addEvent(window, 'message', this.proxy(this.route));
            this.setName([this.name, ++UID, location.host].join('/'));
        },
        // set connector name
        setName: function (name) {
            if (name) {
                this.name = name;
            }
        },
        // get connector name
        getName: function () {
            return this.name;
        },
        // set connector target `window` object
        setTarget: function (target) {
            if (target) {
                this.target = target;
            }
        },
        // get connector target object eg `window` or `iframe.contentWindow`
        getTarget: function () {
            return this.target || {
                    postMessage: function () {
                    }
                };
        },
        // handle window onmessage `event` then parse `event.data`
        // and retrieve `action` and `data` properties
        // then publish this data to subscribers with specified `action`
        route: function (ev) {
            var response;
            try {
                response = JSON.parse(ev.data.toString());
            } catch (e) {
                return false;
            }
            if (this.getTarget() !== ev.source)
                return false;
            if (!response.action)
                return false;
            if (response.action == 'origin') {
                this.setOrigin(response.data.origin);
            }
            this.publish(response.action, response.data);
        },
        // get origin property
        getOrigin: function () {
            return '*';
            return this.origin || '*';
        },
        // set origin property
        setOrigin: function (url) {
            this.origin = url || '*';
        },
        // add subscriber to handle onmessage event actions
        action: function (action, fn) {
            return pubsub.subscribe([this.name, action].join('/'), fn);
        },
        // remove connector subscriber by token
        removeAction: function (token) {
            pubsub.unsubscribe(token);
            return this;
        },
        // direct action publish
        publish: function (action, data) {
            return pubsub.publish([this.name, action].join('/'), data);
        },
        // `window.postMessage` wrapper
        send: function (action, data) {
            this.getTarget().postMessage(JSON.stringify({
                action: action,
                data: data
            }), this.getOrigin());
        }
    });
    // add Connector class to ipsp modules
    this.$ipsp.add('connector', this.Connector);
}).call(window || {});

// Checkout Module
// ---------------

(function (URL) {
    // define location property
    var HOST = URL.host;
    var PROTOCOL = URL.protocol;
    var ORIGIN = URL.origin;
    // basic iframe attributes
    var attrs = {
        frameborder: '0',
        allowtransparency: 'true'
    };
    // basic iframe styles
    var styles = {
        'zIndex': '9999',
        'overflowX': 'hidden',
        'border': '0',
        'display': 'none',
        'position': 'static',
        'top': '0px',
        'left': '0px',
        'bottom': '0px',
        'right': '0px',
        'width': '100%',
        'height': '100%'
    };
    // Default Client-side callback handler
    // access from global scope "__DEFAULTCALLBACK__"
    // example:
    //
    //      .addCallback(__DEFAULTCALLBACK__);
    //
    // override default function:
    //
    //      .addCallback(function(data,type){
    //         // your code is here...
    //      })
    var Callback = function (data, type) {
        var form;
        if (data.action == 'redirect') {
            this.loadUrl(data.url);
            return;
        }
        if (data.send_data.order_status=='processing'){
            return;
        } else {
            this.unbind('ready').action('ready', function () {
                this.show();
            });
        }
        if (data.send_data && data.url) {
            form = prepareFormData(data.url, data.send_data);
            this.find('body').appendChild(form);
            form.submit();
            form.parentNode.removeChild(form);
        }
    };
    // Create `Checkout` class from `Module`
    var Checkout = Module.extend({
        // checkout module core methods and properties
        name: '$ipsp.checkout',
        // version of checkout module
        version: '1.0',
        // iframe object
        iframe: null,
        // connector object
        connector: null,
        //
        client_callback: false,
        // checkout class constructor
        init: function () {
            this.options = {
                checkout_attr: 'href',
                checkout_url: null,
                wrapper: 'body',
                styles: {},
                ismodal: false
            };
            this.actions = {};
            this.parent('init', arguments);
            this.initConnector();
            this.ready();
        },
        config: function (options) {
            this.extend(this.options, options);
            return this;
        },
        // set checkout open type:
        // `true`  - open checkout in fixed position in fullscreen mode
        // `false` - open checkout in static position inside merchant page  
        // **examples:**
        //
        //      $ipsp('checkout').setCheckoutWrapper('#checkoutwrapper');
        //
        setModal: function (bool) {
            this.options.ismodal = bool;
            this.onDomReady(function () {
                this.addCss(this.iframe, {
                    'position': this.options.ismodal === true ? 'fixed' : 'static'
                });
            });
        },
        // set checkout wrapper for iframe, default value `body` for modal usage  
        // **examples:**
        //
        //      $ipsp('checkout').setCheckoutWrapper('#checkoutwrapper');
        //
        setCheckoutWrapper: function (wrapper) {
            this.options.wrapper = wrapper;
        },
        // set remote style for checkout  
        // **examples:**
        //
        //      $ipsp('checkout').setCssStyle({
        //              'body':{ color:'#333' }
        //              '.selector':{ 'background-color':'#efefef' }
        //      });
        //
        setCssStyle: function (styles) {
            this.extend(this.options.styles, styles);
        },
        // set checkout background  
        // **examples:**
        //
        //      $ipsp('checkout').setCheckoutBg('rgba(0,0,0,0.2)');
        //      $ipsp('checkout').setCheckoutBg('#efefef');
        //      $ipsp('checkout').setCheckoutBg('#efefef url(/path/to/image.jpg)');
        //
        setCheckoutBg: function (value) {
            this.onDomReady(function () {
                this.addCss(this.iframe, {
                    'background': value
                });
            });
        },
        // set checkout frame width  
        // **examples:**
        //
        //      $ipsp('checkout').setCheckoutWidth(640);
        //      $ipsp('checkout').setCheckoutWidth('100%');
        //
        setCheckoutWidth: function (size) {
            if (size >= 0 || size == 'auto') {
                this.onDomReady(function () {
                    this.addCss(this.iframe, {
                        'width': ''
                    });
                    this.addAttr(this.iframe, {
                        'width': size
                    });
                });
            }
            return this;
        },
        // alias for setCheckoutWidth
        width: function (size) {
            this.setCheckoutWidth(size);
            return this;
        },
        // set checkout frame height  
        // **examples:**
        //
        //      $ipsp('checkout').setCheckoutHeight(480);
        //      $ipsp('checkout').setCheckoutHeight('100%');
        //
        setCheckoutHeight: function (size) {
            if (size >= 0 || size == 'auto') {
                this.onDomReady(function () {
                    this.addCss(this.iframe, {
                        'height': ''
                    });
                    this.addAttr(this.iframe, {
                        'height': size
                    });
                });
            }
        },
        // alias for setCheckoutHeight
        height: function (size) {
            this.setCheckoutHeight(size);
            return this;
        },
        // set checkout origin  
        // **examples:**
        //
        //      $ipsp('checkout').setCheckoutUrl('http://checkouturl.com/');
        //
        setCheckoutOrigin: function (url) {
            if (!url)
                throw Error('url param is required');
            var link = document.createElement('a');
            link.href = url;
            this.options.checkout_url = link.origin || [link.protocol, link.host].join('//');
            return this;
        },
        // get origin checkout url  
        // **examples:**
        //
        //      // return origin host from setCheckoutUrl() set value
        //      $ipsp('checkout').getCheckoutOrigin();
        //
        getCheckoutOrigin: function () {
            if (!this.options.checkout_url)
                throw Error('checkout url is not defined');
            return this.options.checkout_url;
        },
        // set element attribute that contains checkout url
        // use it with method `setClickElement`
        setElementAttr: function (attr) {
            this.options.checkout_attr = attr;
        },
        // bind click event to open checkout iframe with passing url  
        // **examples:**
        //
        //      $ipsp('checkout').setClickElement('.test-selector');
        //      $ipsp('checkout').setClickElement('.test-selector a');
        //
        setClickElement: function (selector) {
            this.onDomReady(function () {
                var i, nodes = this.findAll(selector);
                for (i = 0; i < nodes.length; i++) {
                    this.addEvent(nodes[i], 'click', this.proxy(function (ev) {
                        ev.preventDefault();
                        this.loadUrl(ev.target.getAttribute(this.options.checkout_attr));
                    }));
                }
            });
        },
        // load url to iframe  
        // **examples:**
        //
        //      $ipsp('checkout').loadUrl('http://checkouturl.com/checkout?token=asd6f976gda5sd76adsf');
        //
        loadUrl: function (url, frame) {
            //this.iframe = frame;
            if (!url) throw Error('checkout url is not defined');
            this.onDomReady(function () {
                if (!this.iframe)
                    throw Error('checkout iframe is null or undefined');
                this.iframe.src = url;
                this.find(this.options.wrapper).appendChild(this.iframe);
            });
        },
        // get origin url from merchant page  
        // **examples:**
        //
        //      // get host origin from current url
        //      $ipsp('checkout').getCurrentOrigin();
        //
        getCurrentOrigin: function () {
            return ORIGIN || [PROTOCOL, HOST].join('//');
        },
        // show checkout frame  
        // **examples:**
        //
        //      $ipsp('checkout').show();
        //      // disable triggering show event
        //      $ipsp('checkout').show(true);
        //
        show: function (silent) {
            if (this.options.ismodal === true) {
                this.addCss(this.find('body'), {
                    'overflow': 'hidden'
                });
                this.addCss(this.find('html'), {
                    'overflow': 'hidden'
                });
            }
            this.addCss(this.iframe, {
                'display': 'block'
            });
            this.iframe.focus();
            if (silent !== true) {
                this.connector.publish('show', {});
            }
            return this;
        },
        // hide checkout frame  
        // **examples:**
        //
        //      $ipsp('checkout').hide();
        //      // disable triggering hide event
        //      $ipsp('checkout').hide(true);
        //
        hide: function (silent) {
            if (this.options.ismodal === true) {
                this.addCss(this.find('body'), {
                    'overflow': ''
                });
                this.addCss(this.find('html'), {
                    'overflow': ''
                });
            }
            this.addCss(this.iframe, {
                'display': 'none'
            });
            if (silent !== true) {
                this.connector.publish('hide', {});
            }
            return this;
        },
        // send data to checkout frame  
        // **examples:**
        //
        //      $ipsp('checkout').send('actionname',{data:{}});
        //      $ipsp('checkout').send('actionname','');
        //
        send: function (action, params) {
            this.connector.send(action, params);
            return this;
        },
        // add handler to connector  
        // **examples:**
        //
        //      $ipsp('checkout').action('actionname',function(data,type){});
        //      $ipsp('checkout').action('actionname',callbackFunction);
        //
        action: function (action, callback) {
            var token = this.connector.action(action, this.proxy(callback, this));
            if (!isArray(this.actions[action]))
                this.actions[action] = [];
            this.actions[action].push(token);
            return token;
        },
        // remove action callback by token returned by method `action`  
        // **examples:**
        //
        //      var token = $ipsp('checkout').action('actionname',function(data,type){});
        //      $ipsp('checkout').removeAction(token);
        //      
        //
        removeAction: function (token) {
            this.connector.removeAction(token);
            return this;
        },
        // remove action callbacks by name  
        // **examples:**
        //
        //      $ipsp('checkout').action('actionname',function(data,type){});
        //      $ipsp('checkout').unbind('actionname',function(data,type){});
        //      $ipsp('checkout').unbind('actionname');
        //
        //
        unbind: function (name) {
            var tokens = this.actions[name];
            for (var i = 0; i < tokens.length; i++)
                this.removeAction(tokens[i]);
            return this;
        },
        // initialize iframe on DOM ready event
        ready: function () {
            this.onDomReady(this.initFrame);
            return this;
        },
        // initiate frame creation
        initFrame: function () {
            if (this.iframe) throw Error('iframe already initialized');
            this.iframe = document.createElement('iframe');
            this.addCss(this.iframe, styles);
            this.addAttr(this.iframe, attrs);
            this.addEvent(this.iframe, 'load', this.proxy(function (frame) {
                this.loadConnector(this.iframe);
            }));
        },
        // init connector
        initConnector: function () {
            this.connector = new Connector;
            this.action('load', function (data) {
                this.send('origin', {
                    origin: this.getCurrentOrigin(),
                    styles: this.options.styles
                });
            });
            this.action('cancel', function (data) {
                if (this.options.ismodal)
                    this.hide();
            });
            this.action('locale', function (data) {
                this.locale = data;
            });
            this.action('ready', function (data) {
                this.show();
            });
            this.action('3dsform', function (data) {
                this.acsCallback(data);
            });
            this.action('callback', this.callback);
        },
        // default callback action handler
        // for client-side usage unbind callback action and set your own  
        // ** examples: **
        //
        //      $ipsp('checkout').unbind('callback');
        //      $ipsp('checkout').action('callback',function(data,type){});
        //
        //
        callback: function (data, type) {
            this.send(type, data);
        },
        // set acs handler function
        setAcsCallback: function (fn) {
            this.acsCallback = fn;
        },
        //
        addCallback: function (fn) {
            if (!fn) fn = Callback;
            if (!this.client_callback) {
                this.unbind('callback');
                this.client_callback = true;
            }
            this.action('callback', fn);
            this.action('decline', fn);
            return this;
        },
        // acs handler
        // open popup dialog
        acsCallback: function (data) {
            var that = this;
            var acsframe = $ipsp('acsframe');
            var popup = $ipsp.get('popup');
            popup.config({
                width: '700px'
            });
            popup.close = this.proxy(function () {
                this.send('cancel');
            });
            this.action('close_submit3ds', function (data) {
                acsframe.send('close');
            });
            popup.title.innerHTML = this.locale.HELP_3DS;
            this.addEvent(popup.title.querySelector('a'), 'click', function () {
                acsframe.submitHelp();
            });
            acsframe.scope(function () {
                this.setData(data);
                this.setLocale(that.locale);
                this.setWrapper(popup.content);
                this.action('close', function () {
                    popup.hide();
                });
                this.action('load', function () {
                    popup.show();
                });
                this.submit();
            });
        },
        // submit 3ds form
        submit3ds: function (data, wrapper) {
            return $ipsp('acssubmit').scope(function () {
                this.setData(data);
                this.setWrapper(wrapper);
            });
        },
        // load connector
        loadConnector: function (frame) {
            this.setCheckoutOrigin(frame.src);
            this.connector.setTarget(frame.contentWindow);
            this.connector.setOrigin(this.getCheckoutOrigin());
        }
    });
    //
    this.__DEFAULTCALLBACK__ = Callback;
    this.Checkout = Checkout;
    // Add checkout class to ipsp modules
    this.$ipsp.add('checkout', Checkout);
}).call(window || {}, location || {});


// Checkout Button Module
// ---------------
(function () {
    var PROTOCOL = 'https';
    var HOST = 'api.local.devoplata.com';
    var PATH = '/api/checkout?button=';
    // *** Field Class ***
    var Field = Class.extend({
        init: function (f) {
            this.initialize(f);
        },
        // set field properties passed by 
        // method `addField` in [Button Class](#section-119)
        initialize: function (f) {
            this.setName(f.name);
            this.setValue(f.value);
            this.setLabel(f.label);
            this.setPlaceholder(f.placeholder);
            this.setRequired(f.required);
            this.setValid(f.valid);
            this.setReadonly(f.readonly);
        },
        // set user field name
        // used in validation function
        setName: function (name) {
            if (!isString(name))
                console.error('field property `name` is not a string', this);
            this.name = name;
            return this;
        },
        // set user field placeholder  
        setPlaceholder: function (placeholder) {
            if (placeholder && !isString(placeholder))
                console.error('field property `placeholder` is not a string', this);
            this.placeholder = placeholder;
            return;
        },
        // set user field value  
        // if field is not readonly user can edit this property
        setValue: function (value) {
            if (value && !isString(value))
                console.error('field property `value` is not a string', this);
            this.value = value;
            return this;
        },
        // set user label (field description)
        setLabel: function (label) {
            if (!isString(label))
                console.error('field property `label` is not a string', this);
            this.label = label;
            return this;
        },
        // set validation options for user field
        setValid: function (valid) {
            var prop, value = [];
            if (valid && !isObject(valid))
                console.error('field property `valid` is not an object', this);
            for (prop in valid)
                if (valid.hasOwnProperty(prop))
                    value.push([prop, valid[prop]].join(':'));
            this.valid = value.concat(this.valid).join(';');
            return this;
        },
        // set user field require to fill in form
        setRequired: function (required) {
            this.valid = '';
            if (required && isBoolean(required))
                this.valid = 'required'
        },
        // set readonly flag  
        // by default used false value
        setReadonly: function (readonly) {
            if (readonly && !isBoolean(readonly))
                console.error('field property `readonly` is not an boolean', this);
            this.readonly = readonly;
            return this;
        }
    });
    // *** Button Class ***
    var Button = Class.extend({
        init: function () {
            this.data = {
                merchant_id: null,
                currency: null,
                fields: [],
                params: {}
            };
        },
        // validate button object
        validate: function () {
            var prop;
            var errors = [];
            var data = this.data;
            for (prop in data)
                if (data.hasOwnProperty(prop) && data[prop] === null)
                    errors.push(['data param -', prop, 'is incorrect'].join(' '))
            return errors;
        },
        // set gateway protocol   
        // default is https
        setProtocol: function (protocol) {
            if (protocol && protocol.match(/https?/)) {
                PROTOCOL = protocol;
            }
        },
        // set gateway host   
        // default is api.oplata.com
        setHost: function (host) {
            if (host) {
                HOST = host;
            }
        },
        //
        getButton: function (text, style, target) {
            var link = document.createElement('a');
            link.href = this.getUrl();
            link.className = style || '';
            link.innerHTML = text;
            link.target = target;
            return link;
        },
        // build checkout url
        getUrl: function () {
            var valid;
            if ((valid = this.validate()).length > 0) return console.error(valid.join('\n'));
            return PROTOCOL.concat('://')
                .concat(HOST).concat(PATH)
                .concat(encodeURIComponent(JSON.stringify(this.data)));
        },
        // set merchant id value  
        // `@param (Number) merchant_id`    
        // ** examples: **
        //
        //      $ipsp('button').setMerchantId(1000);
        //
        setMerchantId: function (merchant_id) {
            if (!isNumber(merchant_id)) console.error('parameter `merchant_id` is required and must be integer');
            this.data.merchant_id = merchant_id;
        },
        // set order amount  
        // `@param (Number) amount`  
        // `@param (String) currency`  
        // `@param (Boolean) readonly`  
        // ** examples: **
        //
        //      $ipsp('button').setAmount(100,'USD',true);
        //
        setAmount: function (amount, currency, readonly) {
            if (isNumber(parseInt(amount))) this.data.amount = amount;
            if (isString(currency)) this.data.currency = currency;
            if (isBoolean(readonly) && readonly === true)
                this.data.amount_readonly = readonly;
        },
        // add response url for handling payment response
        // on merchant site    
        // ** examples: **
        //
        //      $ipsp('button').setResponseUrl('http://site.com/result/');
        //
        setResponseUrl: function (url) {
            if (!isString(url)) console.error('parameter `url` is required and must be string');
            this.addParam('response_url', url);
            return this;
        },
        // add user field    
        // ** examples: **
        //
        //		$ipsp('button').addField({
        //			'label':'Account Id',
        //			'name' :'account_id',
        //			'value':'127318273', //optional , default empty
        //			'readonly':true|false, // optional , default false
        //			'required':true|false, // optional , default false
        //			'valid':{
        //              'pattern':'[a-z]+'
        //          }
        //      });
        //
        addField: function (field) {
            if (!isObject(field)) console.error('parameter field is required')
            this.data.fields.push(new Field(field));
            return this;
        },
        // add protocol parameter  
        // `@param (String) name`  
        // `@param (String|Number) value`  
        // **examples:**
        //
        //      $ipsp('button').addParam('delayed','y')
        //
        addParam: function (name, value) {
            this.data.params[name] = value;
            return this;
        },
        setRecurringState: function (state) {
            this.data.recurring_state = Boolean(state);
        },
        addRecurringData: function (data) {
            this.data.params['subscription'] = 'y';
            this.data.recurring = {
                period: data.period || 'month',
                every: data.every || 1 ,
                start_time: data.start_time || this.calcStartDate(data) || this.getDefaultStartDate(),
                end_time: data.end_time || this.getDefaultEndDate(),
                amount: this.data.amount || '',
                custom_period: data.period && data.every
            };
        },
        calcStartDate: function (data) {
            if (data.period && data.every) {
                return this.getFuturePeriod(data.period,data.every);
            } else{
                return null;
            }
        },
        getFuturePeriod: function (period, every) {
            var d = new Date();
            switch (period) {
                case 'day':
                    d.setDate(d.getDate() + (1 * every));
                    break;
                case 'week':
                    d.setDate(d.getDate() + (7 * every));
                    break;
                case 'month':
                    d.setMonth(d.getMonth() + (1 * every));
                    break;
            }
            return this.getDateFormat(d);
        },
        getDefaultStartDate: function (period, every) {
            var d = new Date();
            d.setMonth(d.getMonth() + 1);
            return this.getDateFormat(d);
        }
        ,
        getDefaultEndDate: function () {
            var d = new Date();
            d.setFullYear(d.getFullYear() + 5);
            return this.getDateFormat(d);
        },
        getDateFormat:function(d){
            return d.getFullYear() + "-" + (("0" + (d.getMonth() + 1)).slice(-2)) + "-" + (("0" + d.getDate()).slice(-2))
        }
    });
    this.$ipsp.add('button', Button);
}).call(window || {});
// ACS Frame Module
// ========
(function () {
    // acs frame default attributes
    var attrs = {
        'frameborder': '0',
        'allowtransparency': 'true',
        'scrolling': 'no'
    };
    //  acs frame default styles
    var styles = {
        'zIndex': '9999',
        'overflowX': 'hidden',
        'border': '0',
        'display': 'none',
        'position': 'fixed',
        'top': '0px',
        'left': '0px',
        'bottom': '0px',
        'right': '0px',
        'width': '100%',
        'height': '100%'
    };
    // asc module init
    var AscFrame = Module.extend({
        name: '$ipsp.frame3ds',
        frame: null,
        form: null,
        wrapper: 'body',
        isloaded: false,
        options: {
            url: '',
            data: {},
            wrapper: {}
        },
        // acs frame constructor
        init: function () {
            this.name = [this.name, Math.round(Math.random() * 1000000000)].join('');
            this.initFrame();
            this.initEvents();
        },
        // add handler to acs frame actions  
        // `@param (String) name`  
        // `@param (Function) callback`  		
        // **examples:**
        //
        //      $ipsp('acsframe').action('load',function(data,type){});
        //      $ipsp('acsframe').action('close',callbackFunction);
        //
        action: function (name, callback) {
            return pubsub.subscribe([this.name, name].join(':'), callback);
        },
        // trigger handler on acs frame
        // `@param (String) name`  
        // `@param (Object) data`  
        // **examples:**
        //
        //      $ipsp('acsframe').send('load');
        //      $ipsp('acsframe').action('close');
        //
        send: function (name, data) {
            pubsub.publish([this.name, name].join(':'), data || {});
            return this;
        },
        // remove handler by return token with method action    
        // `@param (String) token`  
        // **examples:**
        //
        //		var token = $ipsp('acsframe').action('load',function(){}); 
        //		$ipsp('acsframe').removeAction(token);
        //
        removeAction: function (token) {
            pubsub.unsubscribe(token);
            return this;
        },
        // set localization messages
        // `@param (Object) locale`  
        setLocale: function (locale) {
            this.locale = locale;
        },
        // initialize acs frame events
        initEvents: function () {
            this.addEvent(this.iframe, 'load', this.proxy(function () {
                this.send('load', {});
                this.addCss(this.iframe, {
                    'height': '720px'
                });
            }));
        },
        // initialize acs frame element
        initFrame: function (selector) {
            this.iframe = this.find(selector) || document.createElement('iframe');
            this.iframe.name = this.name;
            this.iframe.id = this.name;
            this.addAttr(this.iframe, attrs);
            this.addCss(this.iframe, {
                'width': '100%',
                'height': '100%',
            });
        },
        // set data object passed by checkout callback:  
        // `$ipsp('checkout').action('3dsform')`
        setData: function (data) {
            this.extend(this.options, data);
            return this;
        },
        // set acs frame element wrapper
        // use `css selector` or existing `htmlelement` as first argument `wrapper`
        setWrapper: function (wrapper) {
            if (isString(wrapper)) {
                this.wrapper = this.find(wrapper);
            } else {
                this.wrapper = wrapper;
            }
            if (!wrapper) {
                throw Error('acsframe element wrapper is undefined');
            }
            return this;
        },
        // submit acs data in top window
        submitHelp: function () {
            this.form = prepareFormData(this.options.url, this.options.send_data, this.name);
            this.form.target = "_blank";
            this.wrapper.appendChild(this.form);
            this.form.submit();
        },
        // submit acs data to frame
        submit: function () {
            this.form = prepareFormData(this.options.url, this.options.send_data, this.name);
            this.wrapper.appendChild(this.iframe);
            this.wrapper.appendChild(this.form);
            this.form.submit();
        }
    });
    // Add popup class to ipsp modules
    this.$ipsp.add('acsframe', AscFrame);
}).call(window || {});
// ACS Submit Module
// ========
(function () {
    var AscSubmit = Module.extend({
        name: '$ipsp.frame3ds',
        target: '_blank',
        frame: null,
        form: null,
        wrapper: 'body',
        isloaded: false,
        options: {
            url: '',
            data: {},
            wrapper: {},
        },
        // acs frame constructor
        init: function () {
            this.name = [this.name, Math.round(Math.random() * 1000000000)].join('');
            this.initEvents();
        },
        // add handler to acs frame actions
        // *** examples: ***
        //
        //      $ipsp('acssubmit').action('close',callbackFunction);
        //
        action: function (name, callback) {
            return pubsub.subscribe([this.name, name].join(':'), callback);
        },
        // trigger handler on acs page
        // *** examples: ***
        //
        //      $ipsp('acssubmit').send('load');
        //      $ipsp('acssubmit').send('close');
        //
        send: function (name, data) {
            pubsub.publish([this.name, name].join(':'), data || {});
            return this;
        },
        // remove handler by return token with method action  
        // `@param (String) token`   
        // **examples:**
        //
        //		var token = $ipsp('acssubmit').action('close',function(){}); 
        //		$ipsp('acssubmit').removeAction(token);
        //
        removeAction: function (token) {
            pubsub.unsubscribe(token);
            return this;
        },
        // initialize acs page events
        initEvents: function () {
            this.action('close', this.proxy(function () {
                this.find(this.wrapper).removeChild(this.form);
            }));
        },
        // set data object passed by checkout callback:
        // *** examples: ***
        //
        //      $ipsp('checkout').action('3dsform')
        //
        setData: function (data) {
            this.extend(this.options, data);
            return this;
        },
        // set acs frame element wrapper
        // use `css selector` or existing `htmlelement` as first argument `wrapper`
        setWrapper: function (wrapper) {
            if (!wrapper) {
                throw Error('asc submit wrapper element is undefined');
            }
            if (isString(wrapper)) {
                this.wrapper = this.find(wrapper);
            } else if (isElement(wrapper)) {
                this.wrapper = wrapper;
            }
            return this;
        },
        // submit acs data to frame
        submit: function () {
            this.form = prepareFormData(this.options.url, this.options.send_data, this.name);
            this.wrapper.appendChild(this.form);
            this.popup = window.open('about:blank', this.name);
            if (this.popup && popupBlocker(this.popup)) {
                this.form.submit();
            } else {
                this.send('blocked3dsPopup', this.options);
            }
            return this;
        }
    });
    // Add popup class to ipsp modules
    this.$ipsp.add('acssubmit', AscSubmit);
}).call(window || {});

// Popup Module
// ========
(function () {
    // Define style object
    var styles = {};
    // modal window styles
    styles.modal = {
        'display': 'block',
        'overflow': 'hidden',
        'position': 'relative',
        'background': '#fff',
        'zIndex': '99999',
        'boxShadow': '0px 0px 5px rgba(0,0,0,0.2)'
    };
    // modal title styles
    styles.title = {
        'margin': '0px',
        'overflow': 'hidden',
        'padding': '17px 20px',
        'fontFamily': 'Arial, Helvetica',
        'lineHeight': '14px',
        'fontSize': '12px'
    };
    // close button styles
    styles.button = {
        'display': 'block',
        'float': 'right',
        'position': 'relative',
        'fontWeight': 'bold',
        'fontSize': '48px',
        'padding': '0 8px',
        'lineHeight': '100%',
        'cursor': 'pointer'
    };
    // modal splash styles
    styles.wrapper = {
        'position': 'fixed',
        'top': '0px',
        'left': '0px',
        'right': '0px',
        'bottom': '0px',
        'zIndex': '9999',
        'display': 'none',
        'overflowY': 'auto',
        'background': 'rgba(0,0,0,0.1)'
    };
    var Popup = Module.extend({
        // popup constructor
        init: function () {
            this.wrapper = this.elem('div', styles.wrapper);
            this.wrapper.className = 'oplata_popup_wrapper ipsp_popup_wrapper';
            this.modal = this.elem('div', styles.modal);
            this.modal.className = 'oplata_popup_modal ipsp_popup_modal';
            this.toolbar = this.elem('div');
            this.toolbar.className = 'oplata_popup_toolbar ipsp_popup_toolbar';
            this.title = this.elem('div');
            this.title.className = 'oplata_popup_title ipsp_popup_title';
            this.addCss(this.title, styles.title);
            this.closelink = this.elem('a');
            this.closelink.className = 'oplata_popup_close ipsp_popup_close';
            this.closelink.innerHTML = '&times';
            this.addEvent(this.closelink, 'click', this.proxy(function (ev) {
                ev.preventDefault();
                this.hide();
                this.close();
            }));
            this.addCss(this.closelink, styles.button);
            this.toolbar.appendChild(this.closelink);
            this.toolbar.appendChild(this.title);
            this.addCss(this.toolbar, {
                'position': 'relative',
                'zIndex': '5',
                'overflow': 'hidden'
            });
            this.content = this.elem('div');
            this.content.className = 'oplata_popup_content';
            this.addCss(this.content, {
                'position': 'relative',
                'zIndex': '2'
            });
            this.modal.appendChild(this.toolbar);
            this.modal.appendChild(this.content);
            this.wrapper.appendChild(this.modal);
            this.find('body').appendChild(this.wrapper);
        },
        // element create helper
        elem: function (tag, styles) {
            var elem = document.createElement(tag);
            if (styles)
                this.addCss(elem, styles);
            return elem;
        },
        // setup modal options eq: width and height
        // **examples:**
        //
        //      $ipsp('popup').config({ width : 500 , height: 800 });
        //
        config: function (config) {
            this.addCss(this.modal, {
                'top': '100px',
                'left': '50%',
                'marginLeft': -(parseInt(config.width, 10) / 2) + 'px',
                'width': config.width || 'auto',
                'height': config.height || 'auto'
            });
        },
        // show popup window
        // **examples:**
        //
        //      $ipsp('popup').show();
        //
        show: function () {
            this.addCss(this.wrapper, {
                'display': 'block'
            });
            this.addCss(this.find('body'), {
                'overflow': 'hidden'
            });
            this.addCss(this.find('html'), {
                'overflow': 'hidden'
            });
        },
        // hide popup window
        // **examples:**
        //
        //      $ipsp('popup').hide();
        //
        hide: function () {
            this.addCss(this.wrapper, {
                'display': 'none'
            });
            this.addCss(this.find('body'), {
                'overflow': ''
            });
            this.addCss(this.find('html'), {
                'overflow': ''
            });
            if (this.wrapper.parentNode) {
                this.wrapper.parentNode.removeChild(this.wrapper);
            }
        },
        // close callback
        // **examples:**
        //
        //      $ipsp('popup').close = function(){
        //          // your code is here...
        //      };
        //
        close: function () {
        }
    });
    // Add popup class to ipsp modules
    this.$ipsp.add('popup', Popup);
}).call(window || {});
