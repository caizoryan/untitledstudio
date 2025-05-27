import fs from 'fs'
import {websites, } from './import.js'
let html = ""
html += ``

function id() {
	return "id-" + Math.floor(Math.random() * Math.random() * 1000000)
}


html += `
<html>
<head>
	<link rel="stylesheet" href="./style.css">
	<title>Untitled Studio</title>
</head>

<style>
`
for (const i of Array(5).keys()) {
html += `
	.project[size="`

html += i+1

html += `"]{
		grid-template-columns: calc(var(--size) * `

html += i+1

html += `) auto;
	}
`
}
html += `
</style>

<body>
	`
if (true) {
html += `
	<div class="options">
		`
for (const i of Array(5).keys()) {
html += `

			<div class="button" index="`

html += i

html += `" size="`

html += i

html += `"></div>

		`
 } 
html += `
	`
}
html += `

	</div>
	<div class="websites-container">
		`
 for (let website of websites) { 
html += `
		<div class="project" size="2" id="`

html += id()

html += `">
			<h1> `

html +=  website.title 

html += ` </h1>
			`
 if (website.type == "video") {
html += `
			<video class="hidden" src="`

html += website.cover

html += `"> </img>
			`
 } 
html += `

			`
 if (website.type == "image") {
html += `
			<img class="hidden" src="`

html += website.cover

html += `"> </img>
			`
 } 
html += `
		</div>
		`
 } 
html += `
	<div>
</body>

<script src="./script.js"> </script>
</html>
`
console.log(html)
fs.writeFileSync('./index.html', html);