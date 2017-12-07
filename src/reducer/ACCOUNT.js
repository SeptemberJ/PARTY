const initialState = {
    account: undefined
};

const accountJSON = localStorage['account'];
if (accountJSON) {
    try {
        initialState.account = JSON.parse(accountJSON);
    } catch (e) {
        console.error('解析localStorage[\'account\']失败', accountJSON);
    }
}

const infor ='I am ';
//export default (state = initialState, action)=> {
//    "use strict";
//    switch (action.type) {
//        case 'SIGNIN':
//            localStorage['account'] = JSON.stringify(action.account);
//            return {
//                account: action.account
//            };
//        case 'LOGOUT':
//            delete localStorage['account'];
//            return {
//                account: undefined
//            };
//        case 'ACCOUNT_UPDATE':
//            localStorage['account'] = JSON.stringify(action.account);
//            return {
//                account: action.account
//            };
//        default:
//            return state;
//    }
//};
