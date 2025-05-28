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

		`
if (false){
html += `
			height: `

html += 4+i*4

html += `rem;
		`
}
html += `
	}

	.project[size="`

html += i+1

html += `"] .metadata h1{
    font-size: `

html +=  i >= 1 ? "2.4" : "1.4"

html += `em;
	}

	.project[size="`

html += i+1

html += `"] .metadata p{
    display: `

html +=  i >= 2 ? "block" : "none"

html += `;
	}
`
}
html += `
</style>

<body>

	<div class="websites-container">
		`
 for (let website of websites) { 
html += `
		<div class="project" size="2" id="`

html += id()

html += `">

			<div class="options">
				`
for (const i of Array(5).keys()) {
html += `
					<div class="button" index="`

html += 5-i

html += `" size="`

html += 5-i

html += `"></div>
				`
 } 
html += `
			</div>

			<div class="metadata">
				<h1> `

html +=  website.title 

html += ` </h1>

				`
if (website.description) { 
html += `
					`
for (const d of website.description.split("\n")) { 
html += `
						<p>`

html += d

html += `</p>
					`
 } 
html += `
				`
 } 
html += `
			</div>

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