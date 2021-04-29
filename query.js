import puppeteer from "puppeteer"
import config from "./config.js"

// 获取页面内容
export default async (url) => {
	const browser = await puppeteer.launch(config.puppeteer)

	// 新建一个标签页
	const page = await browser.newPage()

	// 打开链接
	await page.goto(url, { timeout: config.timeout })

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

	// 关闭浏览器进程
	browser.close()

	// 返回值
	return data
}