import Koa from 'koa'
import KoaBody from 'koa-body'
import KoaLogger from 'koa-logger'
import KoaCors from 'koa2-cors'

import router from './router.js'
import config from './config/config.js'
import handler from './utils/errorHandler.js'
import mongodb from './utils/mongodb.js'
import Statistics from './controller/statistics.js'
import dataHandler from './utils/dataHandler.js'

// 初始化 Koa
const app = new Koa()

// 添加日志模块
app.use(KoaLogger())

// 链接数据库
mongodb(config.db.address)

// 跨域
app.use(KoaCors())

// 添加 Body 内容处理模块
app.use(KoaBody())

// 路由错误捕获
app.use(handler)

app.use(dataHandler)

// 统计数据中间件
app.use(Statistics)

// 注册路由
app.use(router.routes()).use(router.allowedMethods())

// 监听端口
app.listen(config.port, () => {
  console.log('\x1B[36m%s\x1B[0m', `[INFO]:`, `端口: ${config.port}`)
})
