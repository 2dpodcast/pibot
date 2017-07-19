var spawn = require("child_process").spawn;
var Config = require("../server.config.json");
var Killer = require("./killer");

var ProcessObjects = {};
const MagicMirror = "MagicMirror";

module.exports = {
    MagicMirror: function (launch) {
        var result = {
            message: "",
            success: false
        };

        if (launch) {
            if (ProcessObjects[MagicMirror] == null) {
                try {
                    var child = spawn("npm", ["start"], {
                        cwd: Config.ProjectPaths.MagicMirror,
                        detached: true
                    });

                    ProcessObjects[MagicMirror] = child;
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
            if (ProcessObjects[MagicMirror] == null) {
                console.log("MagicMirror is not running!");

                result.message = "Nothing to kill here.. move on!";
                result.success = false;
            } else {
                try {
                    var childProc = ProcessObjects[MagicMirror];
                    Killer.kill(childProc.pid);

                    ProcessObjects[MagicMirror] = null;
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

    Screen: function(turnon) {
        var onOrOff = turnon ? "on" : "off"
        spawn("xset", ["dpms", "force", onOrOff]);
        return {
            message: turnon ? "Let there be light!" : "Lights out!",
            success: true
        };
    },

    GameOver: function() {
        spawn("sudo", ["shutdown", "now"]);
        return {
            message: "Goodbye world!",
            success: true
        }
    }
}