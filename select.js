import puppeteer from "puppeteer"

class Select {

    // 存储URL
    url = ''

    // 获取页面内容
    async exec(url) {
        const browser = await puppeteer.launch({
            headless: false // 关闭无头模式
        })

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

    // to
    async to({ url }) {
        // 解析URL
        this.url = new URL(url)

        // 获取信息
        this.data = await this.exec(this.url.href)

        // 绑定this指向
        this.all = this.all.bind(this)
        this.title = this.title.bind(this)
        this.icons = this.icons.bind(this)

        // 返回当前对象
        return this
    }

    // 获取页面所有信息
    all() {
        // title
        const { title } = this.title()

        // icons
        const { icons } = this.icons()

        // return
        return {
            title,
            icons
        }
    }

    // 获取页面标题
    title() {
        // 直接返回无需处理
        return {
            title: this.data.title
        }
    }

    // 获取页面icons
    icons() {
        // 赋值
        let icons = this.data.icons

        // 判断是否是默认路径
        if (icons == '/favicon.ico') {
            icons = this.url.origin + icons
        }

        // 判断是否带有http文本
        if (icons.indexOf('http') == -1) {
            // 在字符串前面添加
            icons = this.url.protocol + icons
        }

        // 返回
        return {
            icons
        }
    }
}

export default Select