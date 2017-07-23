var Transmitter = require("./transmitter");
var Launcher = require("../utilities/launcher");
var Analyzer = require("../utilities/analyzer");
var Constants = require("../utilities/constants");

var self = {
    receivedMessage: function (event) {
        var senderID = event.sender.id;
        var recipientID = event.recipient.id;
        var timeOfMessage = new Date(event.timestamp);
        var message = event.message;

        var messageText = message.text;
        var messageId = message.mid;
        var messageAttachments = message.attachments;
        var response = null;
        if (messageText) {
            // If we receive a text message, check to see if it matches a keyword
            // and send back the example. Otherwise, just echo the text we received.
            var analysis = Analyzer.analyze(messageText);
            switch (analysis.action) {
                case Constants.Messages.Help:
                    response = Launcher.Help();
                    break;

                case Constants.Messages.LaunchMirror:
                    response = Launcher.MagicMirror(/*launch*/ true);
                    break;

                case Constants.Messages.KillMirror:
                    response = Launcher.MagicMirror(/*launch*/ false);
                    break;

                case Constants.Messages.ScreenOff:
                    response = Launcher.Screen(/*turnOn*/ false);
                    break;

                case Constants.Messages.ScreenOn:
                    response = Launcher.Screen(/*turnOn*/ true);
                    break;

                case Constants.Messages.Shutdown:
                    response = Launcher.Shutdown();
                    break;

                case Constants.Messages.Browse:
                    response = Launcher.Browse(/*luanch*/ true, analysis.url);
                    break;

                case Constants.Messages.BrowserKill:
                    response = Launcher.Browse(/*launch*/ false, null);
                    break;

                default:
                    response = Launcher.Default(messageText);
            }

            if (response != null && response.message != Constants.Messages.Help) {
                Transmitter.sendTextMessage(senderID, response.message);
            } else {
                Transmitter.sendOptions(senderID);
            }
        } else if (messageAttachments) {
            Transmitter.sendTextMessage(senderID, "I don't know what to do with this attachment! :(");
        }
    },

    receivedPostback: function (event) {
        var senderID = event.sender.id;
        var recipientID = event.recipient.id;
        var timeOfPostback = event.timestamp;

        // The 'payload' param is a developer-defined field which is set in a postback 
        // button for Structured Messages. 
        var payload = event.postback.payload;

        // When a postback is called, we'll send a message back to the sender to 
        // let them know it was successful
        Transmitter.sendTextMessage(senderID, "Postback called");
    },

}

module.exports = self;