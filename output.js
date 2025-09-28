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
	<title>IF Machine Works Studio</title>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="stylesheet" href="./style.css">
</head>
<body>
	<div id="about" class="title-container">
		<h1> If Machine Works </h1>
		<p>
			IF Machine Works is a web design and development studio focused on bridging the gap between digital and physical media.
			While print design tools are highly refined, web design remains dominated by developer-centric tools and workflows.
			Our goal is to bring design-driven thinking into the digital space, creating unique web experiences and products.
			</p>

			<p>
			Positioned at the intersection of digital materiality, physical computing, and AI, our studio aims to push the boundaries of how the web can feel, function, and inspire.
		</p>

		<a href="mailto:ifmachineworks@gmail"><p class="item">[email]</p></a>
		<a href="https://instagram.com"><p class="item">[instagram]</p></a>
	</div>

	<div class="websites-container">
		<!-- <h2> Featured Work </h2> -->
		`
 for (let website of websites) { 
html += `
		<div class="project" size="2" id="`

html += id()

html += `">
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
				<video class="hidden" webkit-playsinline playsinline loop src="`

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

</body>

<script src="./script.js"> </script>
</html>
`

fs.writeFileSync('./index.html', html);