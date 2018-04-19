"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** The LivePerson Messaging SDK service name (targeted by Cordova). */
var lpSdkService = 'LPMessagingSDK';
//#endregion Types
//#region Helpers
/**
* Directly invoke a method on the LivePerson Messaging SDK.
* @private
* @param {string} action - SDK method name.
* @param {any[]} args - Arguments to pass to the SDK method.
* @param {SdkResultHandler} success - Success callback.
* @param {SdkErrorHandler} error - Error callback.
*/
var callSdk = function (action, args, success, error) {
    if (!window.cordova) {
        return error('Cordova not available');
    }
    window.cordova.exec(success, error, lpSdkService, action, args);
};
/**
* Invoke a LivePerson SDK method and treat the result as a promise.
* @private
* @param {string} action - SDK method name.
* @param {any[]} args - Arguments to pass to the SDK method.
* @returns A promise that resolves to a response from the SDK.
*/
var sdkPromise = function (action, args) {
    return new Promise(function (resolve, reject) {
        callSdk(action, args, resolve, reject);
    });
};
//#endregion Helpers
/**
 * Provides an interface to the LivePerson Messaging SDK.
 */
var LPMessagingSdk = /** @class */ (function () {
    function LPMessagingSdk() {
    }
    /** Internally tracks whether the SDK has been initialised.
    /**
    * Get the number of unread messages.
    * @returns {Promise<number>}
    */
    LPMessagingSdk.prototype.getPushNotificationToken = function () {
        return sdkPromise('get_push_notification_token', []);
    };
    return LPMessagingSdk;
}());
exports.LPMessagingSdk = LPMessagingSdk;
exports.lpSdkInstance = new LPMessagingSdk();
//# sourceMappingURL=PushNotificationToken.js.map