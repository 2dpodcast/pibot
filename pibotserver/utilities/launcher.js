var spawn = require("child_process").spawn;
var Config = require("../server.config.json");
var Killer = require("./killer");
var Constants = require("./constants");

var ProcessObjects = {};

module.exports = {
    MagicMirror: function (launch) {
        var result = {
            message: "",
            success: false
        };

        if (launch) {
            if (ProcessObjects[Constants.MagicMirror] == null) {
                try {
                    var child = spawn("npm", ["start"], {
                        cwd: Config.ProjectPaths.MagicMirror,
                        detached: true
                    });

                    ProcessObjects[Constants.MagicMirror] = child;
                    console.log("MagicMirror launched!");

                    result.message = "Launching MagicMirror!";
                    result.success = true;
                } catch (exception) {
                    console.log(exception);
                    result.message = "Error occurred: " + exception.message;
                    result.success = false;
                }
            } else {
                console.log("MagicMirror is already running!");

                result.message = "Go look at mirror, it's running!";
                result.success = false;
            }
        } else {
            // Kill MagicMirror process
            if (ProcessObjects[Constants.MagicMirror] == null) {
                console.log("MagicMirror is not running!");

                result.message = "Nothing to kill here.. move on!";
                result.success = false;
            } else {
                try {
                    var childProc = ProcessObjects[Constants.MagicMirror];
                    Killer.kill(childProc.pid);

                    ProcessObjects[Constants.MagicMirror] = null;
                    console.log("Killed mirror!");

                    result.message = "MagicMirror is dead! RIP Mirror!";
                    result.success = true;
                } catch (exception) {
                    console.log(exception);

                    result.message = "Error occurred: " + exception.message;
                    result.success = false;
                }
            }
        }

        return result;
    },

    Screen: function (turnon) {
        var onOrOff = turnon ? "on" : "off"
        spawn("xset", ["dpms", "force", onOrOff]);
        return {
            message: turnon ? "Let there be light!" : "Lights out!",
            success: true
        };
    },

    Shutdown: function () {
        spawn("sudo", ["shutdown", "now"]);
        return {
            message: "Goodbye world!",
            success: true
        }
    },

    Help: function () {
        return {
            message: Constants.Messages.Help,
            success: true
        }
    },

    Browse: function (launch, url) {
        if (launch) {
            var child = spawn("epiphany", [url], {
                detached: true
            });

            if (ProcessObjects[Constants.Epiphany] == null) {
                ProcessObjects[Constants.Epiphany] = [child];
            } else {
                ProcessObjects[Constants.Epiphany].push(child);
            }

            return {
                message: "Launching Epiphany!",
                success: true
            }
        } else {
            ProcessObjects[Constants.Epiphany].forEach(function (child) {
                Killer.kill(child.pid);
            }, this);

            return {
                message: "Killing all browsers",
                success: true
            }
        }
    },

    Youtube: function (url) {
        spawn("epihphany ")
    },

    Default: function (messageText) {
        return {
            message: messageText,
            success: true
        }
    }
}