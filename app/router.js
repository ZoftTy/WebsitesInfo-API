import Router from 'koa-router'
import IndexController from './controller/index.js'
import ManageController from './controller/manage.js'
import package from '../package.json'

// 实例化
const router = new Router()
const index = new IndexController()
const manage = new ManageController()

router.get('/', ctx => ctx.redirect(package.repository))

// 获取网站所有信息
router.post('/api/info', ctx => index.index(ctx))

// 添加网站图标缓存
router.post('/api/add', ctx => manage.add(ctx))

// 导出路由
export default router
