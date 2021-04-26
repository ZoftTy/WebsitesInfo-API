import puppeteer from "puppeteer"

// 获取页面内容
export default async (url) => {
	const browser = await puppeteer.launch()

	// 新建一个标签页
	const page = await browser.newPage()

	// 设置拦截
	await page.setRequestInterception(true)

	// 拦截请求
	page.on('request', interceptedRequest => {
		// 请求url
		let requestUrl = interceptedRequest.url()

		// 判断是否是index文件或.html文件或php文件
		if (requestUrl.endsWith('/') || requestUrl.endsWith('.html') || requestUrl.endsWith('.php')) {
			//弹出
			interceptedRequest.continue()

		} else {
			//终止请求
			interceptedRequest.abort()

		}
	})

	// 打开链接
	await page.goto(url)

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