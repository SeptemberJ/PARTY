export function get(key) {
    "use strict";
    const originValue = localStorage[key];
    if (!originValue) {
        return;
    }
    if (typeof originValue === 'number') {
        return originValue;
    }
    try {
        return JSON.parse(originValue);
    } catch (e) {
        return originValue;
    }
}

export function set(key, originValue) {
    "use strict";
    localStorage[key] = typeof originValue === 'number' ? originValue : JSON.stringify(originValue);
}