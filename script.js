function init(){
	let projects = document.querySelectorAll(".project")
	projects.forEach(add_listeners)
}

function add_listeners(element){
	let id = element.id
	let image = document.querySelector("#" + id + " .hidden")

	element.onmouseenter = () => {
		image.style.opacity = 1 
	}

	element.onmouseleave = () => {
		image.style.opacity = 0 
	}
}

init()
