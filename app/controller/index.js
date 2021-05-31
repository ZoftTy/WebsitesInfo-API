import query from "../utils/query.js"
import infoModel from "../model/info.js"
import customModel from "../model/custom.js"

class Index {
	async index(ctx) {
		// 获取网站地址
		let url = null
		if (ctx.request.method == 'GET') {
			url = new URL(ctx.request.query.url)
		} else {
			url = new URL(ctx.request.body.url)
		}

		// 判断当前域名的数据是否存在于数据库
		if (!await infoModel.dataExist(url)) {
			// 爬取数据
			const data = await query(url.href)
			// 添加数据
			await infoModel.dataAdd(url.hostname, url.pathname, data)
		}
		// 获取数据
		let { title, icon } = await infoModel.dataExist(url)

		// 获取用户自定义的数据
		let customData = await customModel.dataExist(url.hostname)

		let icons = customData ? customData.icons : []

		// 判断是否有自定义数据
		if (customData && icons.length !== 0) {
			// 添加默认图标到下标0
			icons.unshift(icon)
			// 遍历处理
			icons = icons.map((value) => this.icons(value, url))
		} else {
			icons = this.icons(icon, url)
		}

		// return
		ctx.body = {
			code: 200,
			title: title,
			icons: icons
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
