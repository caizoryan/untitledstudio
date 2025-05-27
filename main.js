// Here's the plan
/*
	<h1> Hello world </h1>

	{%for (let item in items) {%}
	<p> List: {% item %} </p>
	{%}%}

	{%if (block.class == "Image"){%}
	<h4> Title: {%block.title%} </h4>
	<img src="{%block.image.display.url%}"> </img>
	{%}%}
 */

import fs from "fs"


//** struct
/**
 * @typedef {{type: "string" | "expression", value: string}} Token
 * @typedef {{tokens: Token[], length: number}} TokenStream
 * @param {string} str
 * @returns {Token[]}
 */

export function tokenize(str){
		/**@type Token[]*/
		let tokens = []
		let stream = str.split("")
		let i = 0
		let char = stream[i]
		let buffer = ""
		let inside = false
		let inside_type = "expression"
		let opened_at = {}
		let line = 1
		let col = 0

		while (i < stream.length) {
				// check if char and nextchar match token 
				col++
				if (char == "\n") {
						line++
						col = 0
				}

				if ( char == "%" && stream[i+1] == "%") {
						if (!inside) {
								opened_at = {line, col}
								tokens.push(create_token("string", buffer))
								if(stream[i+2] == "+") inside_type = "append"
								else inside_type = "expression"
								if (inside_type == "append") i++
						}
						else tokens.push(create_token(inside_type, buffer))
						i++; inside = !inside; buffer = "";
				}

				else { buffer += char }


				char = stream[++i]
		}

		if (inside) ErrorEndedInside(opened_at)
		tokens.push(create_token("string", buffer))

		return tokens
}

/**
 * @param {"expression" | "string" | "append"} type
 * @param {string} value
 * @returns {Token}
 */
function create_token(type, value) {
	return {type, value}
}

/**
 * @param {Token[]} tokens
 * @returns {string}
 */

function generate_string(tokens, import_location, import_list) {
		let list_str = ""
		import_list.forEach((item) => list_str += item+", ")
		let file = "import {"+list_str+"} from '" + import_location + "'\n"

		file += 'let html = ""' 
		tokens.forEach((token) => {
				if (token.type == "expression") file+=token.value
				else if (token.type == "append") file +=  "\n" + "html += "+token.value +"\n"
				else file +=  "\n" + "html += `" + token.value + "`\n" 
		})

		file += "console.log(html)"

		return file
}

function compile_file(input, output, htmlout, import_location ,imports){
	let str = fs.readFileSync(input, {encoding: "utf-8"})
	let tokens = tokenize(str)
	let html = generate_string(tokens,import_location, imports)
	let outfn = "\n"+"fs.writeFileSync('"+htmlout+"', html);"
	html="import fs from 'fs'" + "\n" + html + outfn
	fs.writeFileSync(output, html)
}

compile_file("./input.html", "./output.js", "./index.html", "./import.js", ["websites"])

function ErrorKeyNotFound(value, pos) {
		console.error("Key " + value + " not found in state at line: ", pos.line, "col: ", pos.col,)
	throw Error()
}

function ErrorEndedInside(pos) {
		console.error("Stream ended inside an expression block at line: ", pos.line, "col: ", pos.col, `./input.html:${pos.line}:${pos.col}`)
	throw Error()
}
