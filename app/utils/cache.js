import fs from "fs"
import config from "../config/config.js"

// 判断缓存文件是否存在
if (!fs.existsSync(config.cache.path)) {
	fs.writeFileSync(config.cache.path, JSON.stringify({}))
}
// 用户设置的缓存位置
if (!fs.existsSync(config.cache.userPath)) {
	fs.writeFileSync(config.cache.userPath, JSON.stringify({}))
}

// 缓存存放变量
let cache = JSON.parse(fs.readFileSync(config.cache.path))

// 缓存更新次数
let quantity = 0

// 缓存文件监听函数
fs.watch(config.cache.path, () => {
	cache = JSON.parse(fs.readFileSync(config.cache.path))
})

// 缓存写入函数
const write = () => {
	// 自增
	quantity++
	// 判断是否小于10
	if (quantity <= 0) return true
	// 重置为0
	quantity = 0

	// 执行写入
	fs.writeFileSync(config.cache.path, JSON.stringify(cache, null, '\t'))
}

class Cache {
	constructor(url) {
		// 赋值
		this.url = url
	}

	get exist() {
		// 判断是否拥有缓存
		if (this.data == {}) return false

		// 判断标题是否为空
		if (this.data.title == undefined) return false

		// 判断缓存过期属性是否为number 属性, 否者返回true
		if (typeof this.data.expires === 'number') {

			// 判断是否过期
			return new Date().getTime() - this.data.expires < config.cache.expires
		} else {
			return true
		}
	}

	get data() {

		const userCache = JSON.parse(fs.readFileSync(config.cache.userPath))
		// 数据
		let data = {}
		try {
			data = cache[this.url.hostname][this.url.pathname]
		} catch {
			data = {}
		}
		// 判断是否有用户设置的缓存
		if (userCache.hasOwnProperty(this.url.hostname)) {
			// 循环查找重复
			for (const item of userCache[this.url.hostname]) {
				// 不存在则添加
				if (data.icons.indexOf(item) == -1) {
					data.icons.push(item)
				}
			}
		}

		// 返回
		return data
	}

	set data(val) {
		// 判断是否拥有该网站的缓存, 没有就添加一个空的缓存
		if (!cache.hasOwnProperty(this.url.hostname)) cache[this.url.hostname] = {}
		// 添加该网站当前路径的缓存
		cache[this.url.hostname][this.url.pathname] = {
			title: val.title,
			icons: [val.icons],
			expires: new Date().getTime()
		}

		// 执行写入方法
		write()

		// 返回最新值
		return cache[this.url.hostname]
	}
}

export default Cache