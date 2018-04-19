import Foundation

@objc(CordovaPushNotificationPlugin) class CordovaPushNotificationPlugin: CDVPlugin {



    // Prepare a callback to trigger a response to the JS consumer when native commands have finished
    func prepareCallback(_ from: CDVInvokedUrlCommand) -> PNCordovaCallback {
        return PNCordovaCallback(delegate: commandDelegate, command: from)
    }
    
    // Native fetching of push tokens
    // Requires AppDelegate to be hooked into the Cordova build
    func appDelegatePushNotificationToken() -> Data? {
        if let delegate = UIApplication.shared.delegate as? AppDelegate {
            return delegate.pnToken
        }
        
        return nil
    }

    // MARK: Public API methods

    @objc func get_push_notification_token(_ command: CDVInvokedUrlCommand) {

         if let pushToken = appDelegatePushNotificationToken() {
            
            let resultNSString = pushToken.map { String(format: "%02.2hhx", $0) }.joined()
                        
            prepareCallback(command)
            .ok(resultNSString, keepCallback: true)

        } else{
            prepareCallback(command)
            .ok(0, keepCallback: true)
    }
}

}
