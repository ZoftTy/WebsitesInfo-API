import Router from "koa-router"
import Controller from "./controller.js"

// 初始化 Router
const router = new Router()

// 获取网站所有信息
router.post('/all', async ctx => {
	// 获取目标URL
	const url = new URL(ctx.request.body.url)
	// 发送到控制器, 执行对应的方法, 返回数据
	ctx.body = (await new Controller(url)).all()
})

// 获取网站标题
router.post('/title', async ctx => {
	// 获取目标URL
	const url = new URL(ctx.request.body.url)
	// 发送到控制器, 执行对应的方法, 返回数据
	ctx.body = (await new Controller(url)).title()
})

// 获取网站图标链接
router.post('/icons', async ctx => {
	// 获取目标URL
	const url = new URL(ctx.request.body.url)
	// 发送到控制器, 执行对应的方法, 返回数据
	ctx.body = (await new Controller(url)).icons()
})

// 导出路由
export default router