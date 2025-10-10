import { spawn, spawnSync } from "child_process"
import { compile_file } from "./main.js"

compile_file(
	"./input.html",
	"./output.js",
	"./index.html",
	"./import.js",
	["websites"])
let out = spawn("node" , ["./output.js"])

out.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

out.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

out.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
