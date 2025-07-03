let projects
let buttons
let observer

function dhamaka(not){
	let top = document.querySelector(".title-container")
	top.remove()

  let copy = document.querySelector(".websites-container")
	copy.remove()
	setTimeout(() => {
		document.body.appendChild(copy)
	}, 50)

	setTimeout(() => {
		document.body.appendChild(top)

		refreshObserver()

		setTimeout(() => {
			not.classList.remove("end")
			top.classList.add("end")
			initObserver()
		}, 30)
	}, 100)



	// TODO also add one at the end
}

function initObserver(){
	observer.observe(document.querySelector(".end"))
}
function refreshObserver(){
	observer.unobserve(document.querySelector(".end"))
}

function init(){
	projects = document.querySelectorAll(".project")
	projects.forEach(add_listeners)

	buttons = document.querySelectorAll(".options .button")
	buttons.forEach(button_click)

	const options = {threshold: 1};
	
	observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if(entry.isIntersecting){
				dhamaka(entry.target)
			}
		})
	}, options)
	initObserver()

}

function button_click(button) {
	if (
			button.getAttribute("size") === "0" 
			// button.getAttribute("size") === "5" // 
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
