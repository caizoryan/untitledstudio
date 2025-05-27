let projects
let buttons

function init(){
	projects = document.querySelectorAll(".project")
	projects.forEach(add_listeners)

	buttons = document.querySelectorAll(".options .button")
	buttons.forEach(button_click)
}

function button_click(button) {
	if (
			button.getAttribute("size") === "0" ||
			button.getAttribute("size") === "5"
	) return

	button.onmouseenter = () =>
		projects.forEach((e) =>
				e.setAttribute("size", button.getAttribute("size")))
}

function add_listeners(element){
	let id = element.id
	let image = document.querySelector("#" + id + " .hidden")

	element.onmouseenter = () => {
		image.style.opacity = 1 
		if (image.play) image.play()
	}

	element.onmouseleave = () => {
		image.style.opacity = 0 
		if (image.pause) image.pause()
	}
}

init()
