import Cache from "../utils/cache.js"
import query from "../utils/query.js"

class Index {
	async exist(url) {

		const cache = new Cache(url)

		// 判断是否存在缓存
		if (!cache.exist) {
			// 获取标题和图标
			const data = await query(url.href)

			// 添加缓存
			cache.data = data

			return cache.data
		} else {
			// 存在缓存
			return cache.data
		}
	}

	async get(ctx) {
		// 获取网站地址
		let url = null
		if (ctx.request.method == 'GET') {
			url = new URL(ctx.request.query.url)
		} else {
			url = new URL(ctx.request.body.url)
		}

		// 判断是否有缓存
		let data = await this.exist(url)

		let icons = []

		// 遍历处理
		for (const item of data.icons) {
			icons.push(this.icons(item, url))
		}

		// 判断是否只有图标链接
		if (icons.length == 1) {
			// 直接赋值
			icons = icons[icons.length - 1]
		}

		// return
		ctx.body = {
			code: 200,
			title: data.title,
			icons
		}
	}

	// 处理图标
	icons(icons, url) {
		// 判断是否为用户设置的图标
		if (typeof icons === "object") {
			return icons
		}

		// 判断是否是默认路径
		if (icons == undefined || icons.indexOf('/favicon.ico') == 0) {
			icons = url.origin + '/favicon.ico'

			// 判断是否省略了http
		} else if (icons.slice(0, 2) == '//') {
			// 在字符串前面添加
			icons = url.protocol + icons

			// 判断是否是绝对路径
		} else if (icons.slice(0, 1) == '/') {
			icons = url.origin + icons

			// 判断是否是相对路径
		} else if (icons.slice(0, 4) != 'http') {
			icons = `${url.origin}/${icons}`
		}

		// 测试地址是否正确
		try {
			new URL(icons)
		} catch {
			// 地址错误返回默认值
			icons = url.origin + '/favicon.ico'
		}

		// 返回
		return icons
	}
}

export default Index
