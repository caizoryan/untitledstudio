import fs from 'fs'
import {websites, } from './import.js'
let html = ""
function id() {
	return "id-" + Math.floor(Math.random() * Math.random() * 1000000)
}

let blocks = 8 

html += `
<html>
<head>
	<title>19A Studio</title>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="stylesheet" href="./style.css">
</head>

<style>
	:root {
		--blocks: `

html += blocks

html += `;
	}
	
`
for (const i of Array(blocks).keys()) {
html += `
	.project[size="`

html += i+1

html += `"]{
		grid-template-columns: calc(var(--size) * `

html += i+1

html += `) auto;
		`
if (false){
html += ` height: `

html += 4+i*4

html += `rem; `
}
html += `
	}

	.project[size="`

html += i

html += `"] .metadata h1{
    font-size: `

html +=  i >= 1 ? "2.4" : "1.4"

html += `em;
	}

	`
for (const f of Array(blocks).keys()) {
html += `
		.project[size="`

html += i

html += `"] .metadata *[level="`

html += f

html += `"]{
			opacity: `

html +=  i > f+1 ? 1:0

html += `;
		}
	`
}}
html += `
</style>

<body>
	<div class="title-container">
		<h1> 19A Studio </h1>
	</div>

	<div class="websites-container">
		`
 for (let website of websites) { 
html += `
		<div class="project" size="2" id="`

html += id()

html += `">
			<div class="options">
				`
for (const i of Array(blocks).keys()) {
html += `
					<!-- <div class="button" size="`

html += blocks-i

html += `"></div>   -->
					<div class="button" size="`

html += blocks-i

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
if (website.description) {  website.description.forEach((d, i) => { 
html += `
						<p level=`

html += i+1

html += `>`

html += d

html += `</p>
					`
 })  } if (website.link) { 
html += `
					<a level=5 href="`

html += website.link

html += `" target="_blank">
						<p >`

html += website.link

html += `</p></a>
					</a>
				`
 } 
html += `
			</div>

			`
 if (website.type == "video") {
html += `
				<video class="hidden" src="`

html += website.cover

html += `"> </video>
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
		`
 } 
html += `
	</div>

	<div class="title-container end">
		<h1> 19A Studio </h1>
	</div>
</body>

<script src="./script.js"> </script>
</html>
`

fs.writeFileSync('./index.html', html);