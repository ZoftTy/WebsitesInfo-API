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
		return this.data != undefined
	}

	get data() {
		const cache = JSON.parse(fs.readFileSync(config.cache.path))
		return cache[this.url.hostname]
	}

	set data(val) {
		const cache = JSON.parse(fs.readFileSync(config.cache.path))
		cache[this.url.hostname] = val
		writeFileSync(config.cache.path, JSON.stringify(cache, null, '\t'))
	}
}

export default Cache