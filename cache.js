import fs, { existsSync, writeFileSync, writeSync } from "fs"
import config from "./config.js"

// 判断缓存文件是否存在
if (!existsSync(config.cache.path)) {
	fs.writeFileSync(config.cache.path, JSON.stringify({}))
}


class Cache {
	constructor(url) {
		this.url = url
	}

	get exist() {
		if (this.data != undefined) {
			// 判断是否过期
			return new Date().getTime() - this.data.time < config.cache.expires
		}
		return false
	}

	get data() {
		const cache = JSON.parse(fs.readFileSync(config.cache.path))
		return cache[this.url.hostname]
	}

	set data(val) {
		const cache = JSON.parse(fs.readFileSync(config.cache.path))
		cache[this.url.hostname] = {
			title: val.title,
			icons: val.icons,
			time: new Date().getTime()
		}
		writeFileSync(config.cache.path, JSON.stringify(cache, null, '\t'))

		return cache[this.url.hostname]
	}
}

export default Cache