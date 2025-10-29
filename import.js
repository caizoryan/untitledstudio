import fs from "fs"

let dir = "./websites"

export let websites = fs.readdirSync(dir)
	.map((dirname) => {
		let dirpath = dir + '/' + dirname

		if (!(fs.existsSync(dirpath) && fs.lstatSync(dirpath).isDirectory())){
			console.log(dirpath, 'is not a dir')
			return undefined
		}

		let position = dirname.split('_')[0]
		let title = dirname.slice(2)
		let website = {position, title}
		let files = fs.readdirSync(dir + "/" + dirname)
		let cover = files.find((file) => file.includes("cover"))
		let description = files.find((file) => file.includes("description"))
		let link = files.find((file) => file.includes("link"))
		if (description) {
			let description_content = fs.readFileSync(dir + "/" + dirname + "/" + description, {encoding: "utf-8"})
			website.description = description_content.split("---")
		}


		if (link) {
			let link_content = fs.readFileSync(dir + "/" + dirname + "/" + link, {encoding: "utf-8"})
			website.link = link_content
		}

		if (cover){
			let cover_extension = cover.split(".").pop()
			let type = cover_extension == "mp4" ? "video" : "image"

			website.type = type
			website.cover = dir + "/" + dirname + "/" + cover
		}

		return website
	})
	.filter(e => e != undefined)
	.sort((a, b) => a.position - b.position)

