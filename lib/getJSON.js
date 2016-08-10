var http = require("http");
var https = require("https");
const url = require('url');

/**
 * getJSON:  REST get request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */
 function requestJSON(method, urlStr, onResult, onError){
    // console.log("rest::getJSON");
    var parsedRet = url.parse(urlStr);

    var options = {
        host: parsedRet.host,
        port: parsedRet.protocol === 'https' ? 443 : 80,
        path: parsedRet.path,
        method: method || 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    var prot = options.port == 443 ? https : http;
    var req = prot.request(options, function(res)
    {
        var output = '';
        // console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
        onError && onError(err);
    });

    req.end();
}

exports.requestJSON = requestJSON;

exports.getJSON = function(urlStr, onResult, onError){
    requestJSON('GET', urlStr, onResult, onError);
};

exports.postJSON = function(urlStr, onResult, onError){
    requestJSON('POST', urlStr, onResult, onError);
};


exports.getJSONMap = function(map, callback) {
    var ind=0;
    var ret = {};
    map.forEach(function(item){        
        requestJSON(item.method, item.url, function(status, data){                        
            ret[item.name] = status === 200 ? data : null;
            ind++;
            if(ind === map.length) callback.call(exports, ret);
        }, function(err){
            ret[item.name] = null;
            ind++;
            if(ind === map.length) callback.call(exports, ret);
        });
    });
};