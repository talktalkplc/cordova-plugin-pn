class PNCordovaCallback {

    let delegate: CDVCommandDelegate
    let command: CDVInvokedUrlCommand?

    init(delegate: CDVCommandDelegate, command: CDVInvokedUrlCommand) {
        self.delegate = delegate
        self.command = command
    }

    internal func jsonForDictionary(_ from: [String:String]) -> String? {
        if let data = try? JSONSerialization.data(withJSONObject: from, options: []) {
            return String(data: data, encoding: .ascii)!
        }

        return nil
    }

    internal func getPluginResult(_ status: CDVCommandStatus, message: Any?) -> CDVPluginResult? {
        switch message {
        case let msg as String?:
            return CDVPluginResult(status: status, messageAs: msg!)

        case let msg as Int:
            return CDVPluginResult(status: status, messageAs: msg)

        case let msg as Bool:
            return CDVPluginResult(status: status, messageAs: msg)

        case let msg as [String:String]:
            return CDVPluginResult(status: status, messageAs: jsonForDictionary(msg))

        default:
            return CDVPluginResult(status: status, messageAs: String(describing: message))
        }
    }

    func send(_ status: CDVCommandStatus, message: Any?, keepCallback: Bool = false, forCommand: CDVInvokedUrlCommand? = nil) {

        let pluginResult = getPluginResult(status, message: message)

        if (keepCallback) { pluginResult?.setKeepCallbackAs(true) }

        delegate.send(pluginResult, callbackId: (forCommand ?? command)?.callbackId)
    }

    func ok(_ message: Any?, keepCallback: Bool = false, forCommand: CDVInvokedUrlCommand? = nil) {
        self.send(
            CDVCommandStatus_OK,
            message: message,
            keepCallback: keepCallback,
            forCommand: forCommand
        )
    }

    func error(_ message: Any?, keepCallback: Bool = false, forCommand: CDVInvokedUrlCommand? = nil) {
        self.send(
            CDVCommandStatus_ERROR,
            message: message,
            keepCallback: keepCallback,
            forCommand: forCommand
        )
    }

    func noResult(_ message: Any?, keepCallback: Bool = false, forCommand: CDVInvokedUrlCommand? = nil) {
        self.send(
            CDVCommandStatus_NO_RESULT,
            message: message,
            keepCallback: keepCallback,
            forCommand: forCommand
        )
    }
}
