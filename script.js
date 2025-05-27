function init(){
	let projects = document.querySelectorAll(".project")
		projects.forEach((project) => {
			project.onmouseenter = hover_fn(project)
		})

	// let images = document.querySelectorAll(".hidden")
	// console.log("hello world by")
	// images.forEach(img => img.style.opacity = .5)
}

function hover_fn(element){
	let id = element.id
	let image = document.querySelector("#" + id + " .hidden")
	return () => {
		element.style.border = "1px solid red"
		image.style.opacity = 1 
	}
}

init()
