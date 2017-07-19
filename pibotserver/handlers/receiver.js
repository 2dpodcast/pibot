var Transmitter = require("./transmitter");
var Launcher = require("../utilities/launcher");

var self = {
    receivedMessage: function (event) {
        var senderID = event.sender.id;
        var recipientID = event.recipient.id;
        var timeOfMessage = new Date(event.timestamp);
        var message = event.message;

        var messageId = message.mid;
        var messageText = String(message.text).toLowerCase();
        var messageAttachments = message.attachments;
        var action = null;
        if (messageText) {
            // If we receive a text message, check to see if it matches a keyword
            // and send back the example. Otherwise, just echo the text we received.
            switch (messageText) {
                case "options":
                    Transmitter.sendOptions(senderID);
                    break;

                case "launch mirror":
                    action = Launcher.MagicMirror(/*launch*/ true);
                    break;

                case "kill mirror":
                    action = Launcher.MagicMirror(/*launch*/ false);
                    break;

                case "screen off":
                    action = Launcher.Screen(/*turnOn*/ false);
                    break;

                case "screen on":
                    action = Launcher.Screen(/*turnOn*/ true);
                    break;

                case "game over":
                    action = Launcher.GameOver();
                    break;

                default:
                    Transmitter.sendTextMessage(senderID, messageText);
            }

            if (action != null) {
                Transmitter.sendTextMessage(senderID, action.message);
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