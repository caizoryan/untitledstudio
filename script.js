import { fade_in_stagger, fade_out } from "./transition.js"

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
	})

	el_container.classList.add('mousebox')

	el_container.appendChild(el_x)
	el_container.appendChild(el_y)

	document.body.appendChild(el_container)
}

function shuffle(){
	let projects = Array.from(document.querySelectorAll(".project"))

}

function remove_loader(){
	fade_out(".loader", 700, 250)
	setTimeout(() => {
		document.querySelector(".loader").remove()
	}, 750)
}

function init_animations(){
	fade_in_stagger(".project", 550, 150, 850)
}

function init(){
	shuffle()
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
