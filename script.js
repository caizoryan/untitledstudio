let projects
let buttons
let observer

function shuffle_projects(parent) {
	console.log("shuffling")
	// Convert the child nodes into an array

	const children_list = []
	const children = parent.childNodes;

	// Remove all children from the parent
	children.forEach(child => {
		// if(!child.classList.contains("project")) return 
		children_list.push(child)
		child.remove()
	});

	children_list.sort(() => Math.random() > .5 ? true : false)
	children_list.sort(() => Math.random() > .5 ? true : false)
	children_list.sort(() => Math.random() > .5 ? true : false)
	children_list.sort(() => Math.random() > .5 ? true : false)
	children_list.sort(() => Math.random() > .5 ? true : false)

	// Append the shuffled elements back to the parent
	children_list.forEach(child => parent.appendChild(child));
}

function dhamaka(not){
	let top = document.querySelector(".title-container")
	top.remove()

  let copy = document.querySelector(".websites-container")
	copy.remove()

	setTimeout(() => {
		document.body.appendChild(copy)
		shuffle_projects(copy)
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
	// projects = document.querySelectorAll(".project")
	// projects.forEach(add_listeners)

	// buttons = document.querySelectorAll(".options .button")
	// buttons.forEach(button_click)

	// const options = {threshold: 1};
	
	// observer = new IntersectionObserver(entries => {
	// 	entries.forEach(entry => {
	// 		if(entry.isIntersecting
	// 			 // && window.innerWidth > mobile
	// 			){
	// 			dhamaka(entry.target)
	// 		}
	// 	})
	// }, options)
	// initObserver()
	check_mobile_and_update()
}

let mobile = 800
window.onresize = check_mobile_and_update

function check_mobile_and_update(){
	if (window.innerWidth < mobile) update_size("mobile")
	else update_size("2")
}

function button_click(button) {
	//if (button.getAttribute("size") === "0") return
	button.onmouseenter = () => {
		if (window.innerWidth < mobile) return
		update_size(button.getAttribute("size"))
	}
}

function update_size(size){
	projects.forEach((e) => e.setAttribute("size", size))
}

function add_listeners(element){
	let id = element.id
	let image = document.querySelector("#" + id + " .hidden")

	element.onmouseenter = () => {
		// image.style.opacity = 1 
		if (image.play) image.play()
	}

	element.onmouseleave = () => {
		// image.style.opacity = 0 
		if (image.pause) image.pause()
	}
}

init()
