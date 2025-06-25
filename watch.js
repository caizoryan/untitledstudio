import fs from "fs"
import cp from "child_process"

let run = () => {
	console.log("File changed, running ./run.js")
	cp.fork("./run.js")
}

fs.watchFile("./input.html", run)
fs.watchFile("./import.js", run)
