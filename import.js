import fs from "fs"

let dir = "./websites"
export let websites = fs.readdirSync(dir).map((website) => ({ title: website }))

websites.map((website) => {
		let files = fs.readdirSync(dir + "/" + website.title)
		let cover = files.find((file) => file.includes("cover"))

		let description = files.find((file) => file.includes("description"))
		if (description) {
			let description_content = fs.readFileSync(dir + "/" + website.title + "/" + description, {encoding: "utf-8"})
			website.description = description_content
		}

		if (cover){
			let cover_extension = cover.split(".").pop()
			let type = cover_extension == "mp4" ? "video" : "image"

			website.type = type
			website.cover = dir + "/" + website.title + "/" + cover
		}

		return website
})
