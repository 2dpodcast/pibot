var spawn = require("child_process").spawn;
var config = require("../server.config.json");
var kill = require("tree-kill");

var ProcessObjects = {};
const MagicMirror = "MagicMirror";

module.exports = {
    MagicMirror: function (launch) {
        if (launch) {
            if (ProcessObjects[MagicMirror] == null) {
                try {
                    var child = spawn("npm", ["start"], {
                        cwd: config.ProjectPaths.MagicMirror
                    });

                    ProcessObjects[MagicMirror] = child;
                    console.log("MagicMirror launched!");
                    return true;
                } catch (exception) {
                    console.log(exception);
                    return false;
                }
            } else {
                console.log("MagicMirror is already running!");
                return false;
            }
        } else {
            // Kill MagicMirror process
            if (ProcessObjects[MagicMirror] == null) {
                console.log("MagicMirror is not running!");
                return false;
            } else {
                try {
                    var childProc = ProcessObjects[MagicMirror];
                    kill(childProc.pid);
                    ProcessObjects[MagicMirror] = null;
                    console.log("MagicMirror killed!");
                    return true;
                } catch (exception) {
                    console.log(exception);
                    return false;
                }
            }
        }
    }
}