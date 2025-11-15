import {dom} from './dom.js'
import { fade_in_any_stagger, fade_in_stagger, fade_out, fade_out_random_stagger, fade_out_stagger, sweep_out } from "./transition.js"

function setup_mouse() {
	let el_container = document.createElement("div")
	let el_x = document.createElement("p")
	let el_y = document.createElement("p")

	el_container.style.position = "fixed"

	let last_time
	document.addEventListener("mousemove", (e) => {
		last_time = new Date()
		el_x.innerText = e.clientX + "px"
		el_y.innerText = e.clientY + "px"
		el_container.style.left = e.clientX + 10 + "px"
		el_container.style.top = e.clientY + 10 + "px"

		let s = document.querySelector(".project:hover > .hidden")
		let v = 20
		if (s) {
			let x_p = e.clientX / window.innerWidth
			let y_p = e.clientY / window.innerHeight
			s.style.transform = `
			rotateY(${(x_p - .5) * v}deg)
			rotateX(${(y_p - .5) * v}deg)
		`
			s.style.boxShadow = `
${(x_p - .5) * v * 4}px ${(y_p - .5) * v * 4}px 30px 10px #000,
inset ${(x_p - .5) * v * 4}px ${(y_p - .5) * v * 4}px 30px 10px #fff7
`
		}

		el_container.style.opacity = 1
	})

	setInterval(() => {
		if (last_time) {
			if (new Date().getTime() - last_time.getTime() > 1) el_container.style.opacity = 0
		}
	}, 1000)


	el_container.classList.add('mousebox')

	el_container.appendChild(el_x)
	el_container.appendChild(el_y)

	document.body.appendChild(el_container)
}

function header_magic() {
	let el = document.querySelector("h1")
	let splits = el.innerText.split(" ")
		.map(word =>
			word.split("")
				.map(e => {
					let d = document.createElement('div')
					d.classList.add('alt-span')
					d.innerText = e
					let span = document.createElement('span')
					span.innerText = ','
					if (e == " ") {
						d.appendChild(span)
					}
					return d

				})
		).map(letters => {
			let d = document.createElement('div')
			d.classList.add('word')
			letters.forEach(l => d.appendChild(l))
			return d
		})




	el.innerText = ''
	splits.forEach(e => el.appendChild(e))
}
function random_string(length) {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@!#/{}[]';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function loader_animation(after) {
	let speed = 90
	let logo = 'IF-MACHINE-WORKS '
	let noise = random_string(logo.length)
	let loader = document.querySelector('.loader')
	let logoletters = logo.split('').map(e => dom('span'))
	let logoel = dom('span.logo')
	logoletters.forEach(e => logoel.appendChild(e))
	let noiseel = dom('span.start', '')
	let atindex = 0
	loader.appendChild(logoel)
	loader.appendChild(noiseel)

	// after end wipe it
	for (let i = 0; i < logo.length; i++) {
		setTimeout(() => {
			atindex = i
			logo.slice(0, i).split('').forEach((e, i) => {
				logoletters[i].innerText = e
				if (e == '-') logoletters[i].classList.add('hide')
			})
			// logoel.innerText = "(" + logo.slice(0, i)
		}, i * (speed))
	}

	for (let i = 0; i < logo.length*5; i++) {
		setTimeout(() => {
			noise = random_string(logo.length)
			noise = noise.slice(0, -1)
			noise += ''
			noiseel.innerText = noise.slice(atindex)
		}, i * (speed))
	}

	let logoend = 2000
	let duration = 700
	let total = 2950

	fade_out_stagger(".loader span span", 400, 20, logoend)
	fade_out_random_stagger(".loader span span", 400, 20, logoend)
	fade_out(".loader span", 400, logoend+400, 'translateZ')
	sweep_out(".loader", duration, total)

	setTimeout(() => { after() }, total)
	setTimeout(() => {document.querySelector(".loader").remove() }, total+duration)
}

function init_animations() {
	fade_in_stagger(".project", 650, 150, 1150)
	// fade_in_any_stagger(".alt-span", 300, 80, 50)

	document.querySelectorAll(".alt-span").forEach((e, i) => {
		e.style.color = "black";
		setTimeout(() => {
			e.style = ''
		}, 300 + (i * 50))
	})
}

function init() {
	setup_mouse()
	setTimeout(() => {
		loader_animation(() => { header_magic(); init_animations() })
	}, 850)
}

init()
