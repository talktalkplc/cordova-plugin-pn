/** An unspecified LP Messaging SDK result. */
export interface SdkResult<T extends string> {
    eventName: T;
}
/** Handler for generic events from the LP Messaging SDK. */
export declare type SdkResultHandler = (data: SdkResult<string>) => any;
/** Handler for generic errors from the LP Messaging SDK. */
export declare type SdkErrorHandler = (err: any) => any;
/**
 * Provides an interface to the LivePerson Messaging SDK.
 */
export declare class LPMessagingSdk {
    /** Internally tracks whether the SDK has been initialised.
    /**
    * Get the number of unread messages.
    * @returns {Promise<number>}
    */
    getPushNotificationToken(): Promise<string>;
}
export declare const lpSdkInstance: LPMessagingSdk;
