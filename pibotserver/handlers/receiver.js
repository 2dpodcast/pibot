var Transmitter = require("./transmitter");

var self = {
    receivedMessage: function (event) {
        var senderID = event.sender.id;
        var recipientID = event.recipient.id;
        var timeOfMessage = new Date(event.timestamp);
        var message = event.message;

        var messageId = message.mid;
        var messageText = String(message.text).toLowerCase();
        var messageAttachments = message.attachments;

        if (messageText) {
            // If we receive a text message, check to see if it matches a keyword
            // and send back the example. Otherwise, just echo the text we received.
            switch (messageText) {
                case "options":
                    Transmitter.sendOptions(senderID);
                    break;

                default:
                    Transmitter.sendTextMessage(senderID, messageText);
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