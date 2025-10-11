import { fade_in_any_stagger, fade_in_stagger, fade_out } from "./transition.js"

function setup_mouse (){
	let el_container =	document.createElement("div")
	let el_x = document.createElement("p")
	let el_y = document.createElement("p")

	el_container.style.position = "fixed"

	let last_time
	document.addEventListener("mousemove", (e) => {
		last_time = new Date()
		el_x.innerText = e.clientX + "px"
		el_y.innerText = e.clientY + "px"
		el_container.style.left = e.clientX+10 + "px"
		el_container.style.top = e.clientY +10+ "px"

		let s = document.querySelector(".project:hover > .hidden")
		let v = 20
		if (s) {
			let x_p = e.clientX / window.innerWidth 
			let y_p = e.clientY / window.innerHeight
			s.style.transform=`
			rotateY(${ (x_p - .5) * v }deg)
			rotateX(${ (y_p - .5) * v }deg)
		`
			s.style.boxShadow = `${(y_p - .5) * v}px ${(x_p - .5) * v}px 40px 10px rgb(0,0,0)`
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

function header_magic(){
	let el=document.querySelector("h1")
	el.innerHTML = el.innerText.split("").map(e => `<div class="alt-span">${e == " " ? '<span>,</span>' : e}</div>`).join('')
}

function remove_loader(){
	fade_out(".loader", 700, 250)
	setTimeout(() => {
		document.querySelector(".loader").remove()
	}, 750)
}

function init_animations(){
	fade_in_stagger(".project", 650, 150, 1150)
	// fade_in_any_stagger(".alt-span", 300, 80, 50)

	document.querySelectorAll(".alt-span").forEach((e, i)  => {
	e.style.color= "black";
	setTimeout(() => {
		e.style = ''
	}, 300 + (i * 50))
	})
}

function init(){
	header_magic()
	setup_mouse()
	remove_loader()
	init_animations()
}

init()
