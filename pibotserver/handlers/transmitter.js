var request = require('request');
var Config = require("../server.config.json");
var PiBotPageOptions = {
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: Config.Tokens.PiBotPage },
    method: 'POST',
    json: null
};

var self = {
    sendTextMessage: function (recipientId, messageText) {
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                text: messageText
            }
        };

        self.send(messageData);
    },

    sendOptions: function (recipientId, messageText) {
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                attachment: {
                    type: "template",
                    payload: {
                        template_type: "generic",
                        elements: [{
                            title: "rift",
                            subtitle: "Next-generation virtual reality",
                            item_url: "https://www.oculus.com/en-us/rift/",
                            image_url: "http://messengerdemo.parseapp.com/img/rift.png",
                            buttons: [{
                                type: "web_url",
                                url: "https://www.oculus.com/en-us/rift/",
                                title: "Open Web URL"
                            }, {
                                type: "postback",
                                title: "Call Postback",
                                payload: "Payload for first bubble",
                            }],
                        }, {
                            title: "touch",
                            subtitle: "Your Hands, Now in VR",
                            item_url: "https://www.oculus.com/en-us/touch/",
                            image_url: "http://messengerdemo.parseapp.com/img/touch.png",
                            buttons: [{
                                type: "web_url",
                                url: "https://www.oculus.com/en-us/touch/",
                                title: "Open Web URL"
                            }, {
                                type: "postback",
                                title: "Call Postback",
                                payload: "Payload for second bubble",
                            }]
                        }]
                    }
                }
            }
        };

        self.send(messageData);
    },

    send: function (jsonData) {
        PiBotPageOptions.json = jsonData;
        request(PiBotPageOptions, sendCallback);
    }
}

function sendCallback(error, response, body) {
    if (!error && response.statusCode == 200) {
        // Successfully sent message.
    } else {
        console.error("Unable to send message.");
        console.error(response);
        console.error(error);
    }
}

module.exports = self;