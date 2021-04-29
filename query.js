import puppeteer from "puppeteer"
import config from "./config.js"

// 初始化 puppeteer
const browser = await puppeteer.launch(config.puppeteer)
const browserWSEndpoint = browser.wsEndpoint()

// 获取页面内容
export default async (url) => {
	// 连接到浏览器
	const connect = await puppeteer.connect({ browserWSEndpoint })

	// 新建一个标签页
	const page = await connect.newPage()

	// 打开链接
	await page.goto(url, { timeout: config.timeout })

	// 捕获错误
	try {
		// 渲染并执行 javascript 返回值
		const data = await page.evaluate(() => {
			// 返回
			return {
				// 页面标题
				title: document.title,
				// 页面图标
				icons: document.querySelector("head [rel*='icon']").getAttribute('href')
			}
		})
		// 关闭标签页
		await page.close()

		// 返回值
		return data

	} catch (err) {
		// 关闭标签页
		await page.close()
		// 返回错误
		throw err
	}
}