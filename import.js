import fs from "fs"

let dir = "./websites"
export let websites = fs.readdirSync(dir).map((website) => ({ title: website }))

websites.map((website) => {
		let files = fs.readdirSync(dir + "/" + website.title)
		let cover = files.find((file) => file.includes("cover"))
		if (!cover) return website
		let cover_extension = cover.split(".").pop()
		let type = cover_extension == "mp4" ? "video" : "image"
		website.type = type
		website.cover = dir + "/" + website.title + "/" + cover

		return website
})
