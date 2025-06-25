import fs from 'fs'
import {websites, } from './import.js'
let html = ""
function id() {
	return "id-" + Math.floor(Math.random() * Math.random() * 1000000)
}

html += `
<html>
<head>
	<link rel="stylesheet" href="./style.css">
	<title>19A Studio</title>
</head>

<style>
</style>

<body>


	<div class="image-side full">
		`
 for (let website of websites) { 
html += `
		<a href="`

html += website.link

html += `" target="_blank">
		<div class="project" id="`

html += id()

html += `">
			`
 if (website.type == "video") {
html += `
				<video class="hidden" src="`

html += website.cover

html += `"> </img>
			`
 }  if (website.type == "image") {
html += `
				<img class="hidden" src="`

html += website.cover

html += `"> </img>
			`
 } 
html += `
		</div>
		</a>
		`
 } 
html += `
	</div>


	<div class="metadata-side full">
		`
 for (let website of websites) { 
html += `
		<a href="`

html += website.link

html += `" target="_blank">
		<div class="project" id="`

html += id()

html += `">
			<div class="metadata">
				<h1> `

html +=  website.title 

html += ` </h1>
				`
if (website.description) { for (const d of website.description.split("\n")) { 
html += `
						<p>`

html += d

html += `</p>
					`
 }  } 
html += `
			</div>
		</div>
		</a>
		`
 } 
html += `
	</div>
</body>

<script src="./script.js"> </script>
</html>
`

fs.writeFileSync('./index.html', html);