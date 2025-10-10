import { fade_in_any_stagger, fade_in_stagger, fade_out } from "./transition.js"

let projects

function setup_mouse (){
	let el_container =	document.createElement("div")
	let el_x = document.createElement("p")
	let el_y = document.createElement("p")

	el_container.style.position = "fixed"

	document.addEventListener("mousemove", (e) => {
		el_x.innerText = e.clientX + "px"
		el_y.innerText = e.clientY + "px"
		el_container.style.left = e.clientX+10 + "px"
		el_container.style.top = e.clientY +10+ "px"

		let s = document.querySelector(".project:hover > .hidden")
		let v = 50
		if (s) s.style.transform=`
rotateY(${ ((e.clientX / window.innerWidth ) - .5) * v }deg)
rotateX(${ ((e.clientY / window.innerHeight) - .5) * v }deg)
`
	})

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
	fade_in_any_stagger(".alt-span", 300, 80, 50)
}

function init(){
	header_magic()
	setup_mouse()
	remove_loader()
	init_animations()
}

let mobile = 800
window.onresize = check_mobile_and_update

function check_mobile_and_update(){
	if (window.innerWidth < mobile) update_size("mobile")
	else update_size("2")
}

function update_size(size){
	projects.forEach((e) => e.setAttribute("size", size))
}

init()
