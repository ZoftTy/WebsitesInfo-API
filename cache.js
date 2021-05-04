import fs, { existsSync, writeFileSync } from "fs"
import config from "./config.js"

// 判断缓存文件是否存在
if (!existsSync(config.cache.path)) {
	fs.writeFileSync(config.cache.path, JSON.stringify({}))
}

class Cache {
	constructor(url) {
		// 赋值
		this.url = url
	}

	get exist() {
		// 判断是否拥有缓存
		if (this.data == undefined) return false
		// 判断缓存过期属性是否为number 属性, 否者返回true
		if (typeof this.data.expires === 'number') {
			// 判断是否过期
			return new Date().getTime() - this.data.expires < config.cache.expires
		} else {
			return true
		}
	}

	get data() {
		// 读取缓存文件
		const cache = JSON.parse(fs.readFileSync(config.cache.path))
		// 返回值
		try {
			let data = cache[this.url.hostname][this.url.pathname]
			// 判断当前数据是否有图标属性
			// 如果没有就获取默认的值赋值
			if (data.icons == undefined) data.icons = cache[this.url.hostname].icons
			// 返回值
			return data
		} catch (err) {
			return undefined
		}
	}

	set data(val) {
		// 读取缓存文件
		const cache = JSON.parse(fs.readFileSync(config.cache.path))

		// 判断是否拥有该网站的缓存
		// 没有就添加
		if (!cache.hasOwnProperty(this.url.hostname)) cache[this.url.hostname] = {}
		// 添加该网站当前路径的缓存
		cache[this.url.hostname][this.url.pathname] = {
			title: val.title,
			icons: val.icons,
			expires: new Date().getTime()
		}
		// 写入缓存文件
		writeFileSync(config.cache.path, JSON.stringify(cache, null, '\t'))
		// 返回最新值
		return cache[this.url.hostname]
	}
}

export default Cache