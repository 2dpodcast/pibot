var cp = require("child_process");

var child = cp.spawn("ls", ["-lrt"]);
var child = cp.spawn("npm", ["start"], {
    cwd: "/home/pi/Codebase/MagicMirror/"
});