import puppeteer from 'puppeteer'
import config from '../config/config.js'

// 初始化 puppeteer
const browser = await puppeteer.launch(config.puppeteer)
const browserWSEndpoint = browser.wsEndpoint()
const image = config.img.replace(/^data:image\/\w+;base64,/, "")

// 获取页面内容
export default async (url) => {
	// 连接到浏览器
	const connect = await puppeteer.connect({ browserWSEndpoint })

	// 新建一个标签页
	const page = await connect.newPage()

	// 设置拦截
	await page.setRequestInterception(true)

	// 请求
	page.on('request', request => {
		let resourceType = request.resourceType()
		// 判断Image
		if (resourceType === 'image') {
			// 返回图片
			request.respond({
				status: 200,
				body: Buffer.from(image, 'base64')
			})
		} else if (resourceType === 'document') {
			request.continue()
		}
		else request.respond({ status: 200 })
	})

	// 打开链接
	await page.goto(url, { timeout: config.timeout })

	// 捕获错误
	try {
		// 渲染并执行 javascript 返回值
		const data = await page.evaluate(() => {
			// 返回数据
			let data = {
				// 页面标题
				title: document.title,
				// 页面图标
				icons: ''
			}

			// 捕获错误
			try {
				// 获取所有link标签
				let links = document.querySelectorAll('link')
				// 遍历link标签
				for (const key in links) {
					if (Object.hasOwnProperty.call(links, key)) {
						const element = links[key]
						// 获取当前元素rel属性的icon索引
						let index = element.getAttribute('rel').split(' ').indexOf('icon')
						// 判断是否有icon值
						if (index != -1) {
							// 赋值
							data.icons = element.getAttribute('href')
							// 跳出循环
							break
						} else {
							// 找不到值就为 undefined
							data.icons = undefined
						}
					}
				}
			} catch (err) {
				// 发生错误时icons = undefined
				data.icons == undefined
			}

			// 返回
			return data
		})
		// 关闭标签页
		await page.close()

		console.log('\x1B[36m%s\x1B[0m', '[INFO]:', '获取到的数据', data)

		// 返回值
		return data

	} catch (err) {
		// 关闭标签页
		await page.close()
		// 返回错误
		throw err
	}
}