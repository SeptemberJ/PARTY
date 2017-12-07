import * as $ from "jquery";
import * as CryptoJS from "crypto-js";
import _ from "underscore";

const URL_PREFIX = '';
// const URL_PREFIX = '/#/';
// const URL_PREFIX = 'http://192.168.10.63:3000/';
// const URL_PREFIX = 'http://api.map.baidu.com/location/ip?';


let clientId = localStorage['clientId'],
    clientSecret = localStorage['clientSecret'];

/**
 * 获取clientId
 * @returns {*}
 */
export function getClientId() {
    "use strict";
    return clientId;
}

/**
 * 登陆后,注入clientId
 * @param id
 */
export function setClientId(id) {
    "use strict";
    clientId = id;
    localStorage['clientId'] = id;
}

/**
 * 登陆后,注入clientSecret
 * @param secret
 */
export function setClientSecret(secret) {
    "use strict";
    clientSecret = secret;
    localStorage['clientSecret'] = secret;
}

/**
 * 退出登录
 * 删除clientId和clientSecret
 */
export function logout() {
    "use strict";
    clientId = undefined;
    delete localStorage['clientId'];
    clientSecret = undefined;
    delete localStorage['clientSecret'];
}

const calcChecksum = function () {
    "use strict";
    var args = Array.prototype.slice.call(arguments);
    const message = args.join('');
    return CryptoJS.HmacSHA256(message, clientSecret);
};

/**
 * 发送AJAX请求
 * @param options {Object}
 * @param options.url {String=} 接口URL.没有作用,以options.name为准.
 * @param options.name {String=} 接口名称.如AllCategory.
 * @param options.type {String=} HTTP Method.默认是GET.
 * @param options.processData {String=}
 * @param options.contentType {String=}
 * @returns {Promise} 成功则返回data,失败则返回错误码
 */
export function send(options) {
    "use strict";
    if (!options.name) {
        throw '没有指定接口名称';
    }

    if (options.type === 'FILE') {
        options.type = 'POST';
        options.processData = false;
        options.contentType = false;
    } else if (options.type === 'FORM') {
        options.type = 'POST';
        options.contentType = 'application/x-www-form-urlencoded';
    } else if (options.type === 'POST' || options.type === 'PUT') {
        options.data = JSON.stringify(options.data || {});
        options.contentType = 'application/json';
    } else if (options.type === 'GET' || options.type === 'DELETE') {
        options.contentType = 'application/x-www-form-urlencoded';
    }

    if (clientId && clientSecret) {
        let body;
        if (options.contentType === 'application/x-www-form-urlencoded') {
            let pairs = [];
            _.each(options.data, (value, key)=> {
                pairs.push(key + '=' + value);
            });
            body = pairs.join('&');
        } else {
            body = options.data;
        }
        const timestamp = Date.now();
        const reqChecksum = calcChecksum(options.name, timestamp, body);
        options.headers = {
            'X-Client-ID': clientId,
            'X-Timestamp': timestamp,
            'X-Checksum': reqChecksum
        };
    }

    options.url = URL_PREFIX + options.name;
    delete options.name;

    _(options).defaults({
        dataType: 'JSON'
    });

    return new Promise(function (resolve, reject) {
        $.ajax(options).then((data)=>resolve(data), (xhr)=>reject(xhr && xhr.status));
    });
}
