var Constants = require("./constants");
var validUrl = require("valid-url");

module.exports = {
    analyze: function (messageText) {
        var messageText = String(messageText).toLowerCase();
        var action = "";
        switch (messageText) {
            case "options":
                action = Constants.Messages.Help;
                break;

            case "launch mirror":
                action = Constants.Messages.LaunchMirror;
                break;

            case "kill mirror":
                action = Constants.Messages.KillMirror;
                break;

            case "screen off":
                action = Constants.Messages.ScreenOff;
                break;

            case "screen on":
                action = Constants.Messages.ScreenOn;
                break;

            case "game over":
                action = Constants.Messages.Shutdown;
                break;

            case "kill bill":
                action = Constants.Messages.BrowserKill;
                break;

            default:
                action = Constants.Messages.Default;
        }

        var url = null;
        if (action == Constants.Messages.Default) {
            if (validUrl.isUri(messageText)) {
                action = Constants.Messages.Browse;
                url = messageText;
            }
        }

        return {
            action: action,
            url: url
        };
    }
}

function isYoutubeUrl(url) {

}