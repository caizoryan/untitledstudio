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
	}

	.project[size="`

html += i

html += `"] .metadata h3{
		font-size: `

html +=  i > 2 ? "2.3" : i == 2 ? "1.6": "1.1"

html += `em;
	}

	`
for (const f of Array(blocks).keys()) {
html += `
		.project[size="`

html += i

html += `"] .metadata *[level="`

html += f

html += `"] {
			opacity: `

html +=  i > f+1 ? 1:0

html += `;
		}
	`
}}
html += `

</style>
<body>
	<div id="about" class="title-container">
		<h1> 19A Studio </h1>

		<a href="#contact"> <span>Contact</span> </a>
		<p>
			19A is a web design and development studio focused on bridging the gap between digital and physical media.
			While print design tools are highly refined, web design remains dominated by developer-centric tools and workflows.
			Our goal is to bring design-driven thinking into the digital space, creating unique web experiences and products.
			</p>

			<p>
			Positioned at the intersection of digital materiality, physical computing, and AI, our studio aims to push the boundaries of how the web can feel, function, and inspire.
		</p>
	</div>

	<div class="websites-container">
		<!-- <h2> Featured Work </h2> -->
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
				<h3 > `

html +=  website.title 

html += ` </h3>
				<div class="ugh">

				`
if (website.description) {  website.description.forEach((d, i) => { 
html += `
						<p class="hover" level=`

html += i+1

html += `>`

html += d

html += `</p>
					`
 })  } if (website.link) { 
html += `
					<a class="above link" level=3 href="`

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
			</div>

			`
 if (website.type == "video") {
html += `
				<video class="hidden" loop autoplay src="`

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

	<div id="contact" class="title-container end">
		<h1> 19A Studio </h1>

		<a href="#about"><span class="item">About</span></a>
		<a href="mailto:ass@monkey.com"><p class="item">[email]</p></a>
		<a href="mailto:ass@monkey.com"><p class="item">[instagram]</p></a>
		<a href="mailto:ass@monkey.com"><p class="item">[are.na]</p></a>
	</div>

</body>

<script src="./script.js"> </script>
</html>
`

fs.writeFileSync('./index.html', html);