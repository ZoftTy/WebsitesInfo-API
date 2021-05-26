import Cache from "./cache.js"
import query from "./query.js"

class Controller extends Cache {

	constructor(url) {
		super(url)

		// 绑定this指向
		this.all = this.all.bind(this)
		this.title = this.title.bind(this)
		this.icons = this.icons.bind(this)

		// 判断是否存在缓存, 不存在返回一个异步函数获取数据
		if (!super.exist) return (async () => {
			// 获取标题和图标
			this.data = await query(url.href)
			// 返回this
			return this
		})()

	}


	all() {
		// title
		const { title } = this.title()

		// icons
		const { icons } = this.icons()

		// return
		return {
			code: 200,
			title,
			icons
		}
	}

	title() {
		// 直接返回无需处理
		return {
			code: 200,
			title: this.data.title
		}

	}

	icons() {
		// 赋值
		let icons = this.data.icons

		// 判断是否是默认路径
		if (icons == undefined || icons.indexOf('/favicon.ico') == 0) {
			icons = this.url.origin + '/favicon.ico'

			// 判断是否省略了http
		} else if (icons.slice(0, 2) == '//') {
			// 在字符串前面添加
			icons = this.url.protocol + icons

			// 判断是否是绝对路径
		} else if (icons.slice(0, 1) == '/') {
			icons = this.url.origin + icons

			// 判断是否是相对路径
		} else if (icons.slice(0, 4) != 'http') {
			icons = `${this.url.origin}/${icons}`
		}

		// 测试地址是否正确
		try {
			new URL(icons)
		} catch {
			// 地址错误返回默认值
			icons = this.url.origin + '/favicon.ico'
		}

		// 返回
		return {
			code: 200,
			icons
		}
	}
}

export default Controller
