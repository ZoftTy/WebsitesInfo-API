import request from "request"
import cheerio from "cheerio"

class Select {

    $ = ''

    exec(url) {
        return new Promise((resolve) => {
            request(url, function (error, response, body) {
                const $ = cheerio.load(body) // 这里可以获取当前url的页面的html
                resolve($)
            })
        })
    }

    async to({ url }) {
        this.$ = await this.exec(url)
        this.all = this.all.bind(this)
        this.title = this.title.bind(this)
        this.icons = this.icons.bind(this)
        return this
    }

    // 获取所有
    all() {
        const title = this.title()
        const icons = this.icons()
        return {
            title,
            icons
        }
    }

    // 获取标题
    title() {
        console.log(this)
        const title = this.$('title').text()
        return {
            title
        }
    }

    // 获取icons
    icons() {
        const icons = this.$('[rel="icon"]').attr('href')
        return {
            icons
        }
    }
}

export default Select