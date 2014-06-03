var AJAX;

AJAX = (function(){
    var req = null;

    var READY_STATE_UNINITIALIZED=0;
    var READY_STATE_LOADING=1;
    var READY_STATE_LOADED=2;
    var READY_STATE_INTERACTIVE=3;
    var READY_STATE_COMPLETE=4;

    var AJAX = function() {
        req = initHTTPRequest();

        this.url = null;
        this.data = null;
        this.onsuccess = function(){};
        this.onerror = function(){};
    }

    var initHTTPRequest = function() {
        return (window.ActiveXObject)? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
    }

    var loadContent = function(options) {
        this.url = (options && options.url) || "http://localhost/";
        this.data = (options && options.data) || null;
        this.onsuccess = ((options && options.success))? options.success : defaultSuccess;
        this.onerror = ((options && options.error))? options.error : defaultError;

        try {
            var that = this;
            req.onreadystatechange = function() {
                onReadyState.call(that)
            };

            if(options.method === 'GET') {
                req.open(options.method, options.url + '?' + createQueryString(options.data), true);
                req.send(null);
            } else if(options.method === 'POST') {
                req.open(options.method, options.url, true);
                if(options.headers && options.headers.length > 0) {
                    for(p in options.headers) {
                        if (options.headers.hasOwnProperty(p)) {
                            req.setRequestHeader(options.headers[p].key, options.headers[p].value);
                        }
                    }
                }
                req.send(createQueryString(options.data));
            }            
        } catch(ex) {
            this.onerror(req, ex);
        }
    }

    var onReadyState = function() {
        if(req.readyState === READY_STATE_COMPLETE) {
            if(req.status === 200) {
                this.onsuccess(req.responseText);
            } else {
                this.onerror(req);
            }
        }
    }

    var get = function(options) {
        options.method = 'GET';
        loadContent.call(this, options);
    }

    var post = function(options) {
        options.method = 'POST';
        options.headers = [{
            key : "Content-Type",
            value : "application/x-www-form-urlencoded"
        }];
        loadContent.call(this, options);
    }

    var createQueryString = function(data) {
        if(data === null)
            return data;

        var str = [];
        for(var p in data) {
            if (data.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
            }
        }

        return str.join("&");
    }

    var defaultError = function(response, ex) {
        console.log(response);
        console.log("[ERROR] AJAX request throws an error:"
                    + "\n\nreadyState:" + response.readyState
                    + "\nstatus: " + response.status 
                    + "\nheaders: " + response.getAllResponseHeaders()
                    + "\nException: " + ex);
    }

    var defaultSuccess = function(response) {
        console.log('[OK] AJAX request response: ' + response.responseText);
    }

    AJAX.prototype.get = get;
    AJAX.prototype.post = post;
    // AJAX.prototype.defaultError = defaultError;
    // AJAX.prototype.defaultSuccess = defaultSuccess;

    return AJAX;
})();