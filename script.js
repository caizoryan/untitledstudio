let projects
let metadata
let buttons

let x = 0, y=0
let played = false

function init(){
	metadata = document.querySelector(".metadata-side")
	// projects.forEach(add_listeners) 

	document.onmousemove = (e) => {
		x = e.clientX
		y = e.clientY
		update()
	}
}

function update(){
	metadata.style.width = 100 - x/window.innerWidth * 100 + "vw"
	if (!played) play()
}

function play(){
	projects = document.querySelectorAll(".project")
	projects.forEach((element) => {
		let id = element.id
		let image = document.querySelector("#" + id + " .hidden")
		if (image.play) image.play()
	})

	played = true
}


init()
