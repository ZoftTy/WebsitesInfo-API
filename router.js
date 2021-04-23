import Router from "koa-router"
import Select from "./select.js"

// 初始化 Router
const router = new Router()

// 实例化 Select
const select = new Select()

// 获取网站所有信息
router.post('/all', async ctx => {
    const { body } = ctx.request
    ctx.body = (await select.to(body)).all()
})

// 获取网站标题
router.post('/title', async ctx => {
    const { body } = ctx.request

    ctx.body = (await select.to(body)).title()
})

// 获取网站图标链接
router.post('/icons', async ctx => {
    const { body } = ctx.request
    ctx.body = (await select.to(body)).icons()
})

// 导出路由
export default router