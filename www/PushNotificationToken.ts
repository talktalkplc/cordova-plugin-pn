/*global cordova, module*/
import { exec } from 'cordova';

/** The LivePerson Messaging SDK service name (targeted by Cordova). */
const lpSdkService = 'PNMessagingSDK';

//#region Type

/** An unspecified LP Messaging SDK result. */
export interface SdkResult<T extends string> {
    eventName: T
}

/** Handler for generic events from the LP Messaging SDK. */
export type SdkResultHandler = (data: SdkResult<string>) => any;

/** Handler for generic errors from the LP Messaging SDK. */
export type SdkErrorHandler = (err: any) => any;

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
const callSdk = (
    action: string,
    args: any[],
    success: SdkResultHandler,
    error: SdkErrorHandler
): void => {
    if (!window.cordova) {
        return error('Cordova not available');
    }

    window.cordova.exec(success, error, lpSdkService, action, args);
}

/**
* Invoke a LivePerson SDK method and treat the result as a promise.
* @private
* @param {string} action - SDK method name.
* @param {any[]} args - Arguments to pass to the SDK method.
* @returns A promise that resolves to a response from the SDK.
*/
const sdkPromise = (action: string, args: any[]): Promise<any> =>
    new Promise(function (resolve, reject) {
        callSdk(action, args, resolve, reject);
    });

//#endregion Helpers


/**
 * Provides an interface to the LivePerson Messaging SDK.
 */
export class LPMessagingSdk {

    /** Internally tracks whether the SDK has been initialised. 
    /**
    * Get the number of unread messages.
    * @returns {Promise<number>}
    */
    getPushNotificationToken(): Promise<string> {

        return sdkPromise('get_push_notification_token', []);
    }
}

export const lpSdkInstance = new LPMessagingSdk();
