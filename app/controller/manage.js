import fs from "fs"

import config from "../config/config.js"

class Manage {

  // 处理器
  handler = {
    set(target, prop, value) {
      // 数据
      const data = target
      data[prop] = value

      // 写入文件
      fs.writeFileSync(config.cache.userPath, JSON.stringify(data, null, '\t'))
      // 反射
      return Reflect.set(...arguments)
    }
  }

  // 缓存保存变量
  userCache = new Proxy(JSON.parse(fs.readFileSync(config.cache.userPath)), this.handler)

  add(ctx) {
    // 获取网站地址
    let url = new URL(ctx.request.body.url)

    // 图标
    let icons = ctx.request.body.icons

    // 判断参数是否正确
    try {
      new URL(icons)
    } catch {
      throw { code: 400, message: '参数无效' }
    }

    // 默认值
    let data = this.userCache[url.hostname] || []

    // 判断图标链接是否存在
    if (data.indexOf(icons) != -1) throw {
      code: 400,
      message: '图标已存在'
    }

    // 添加到缓存
    data.push(icons)

    this.userCache[url.hostname] = data

    // 返回成功值
    ctx.body = {
      code: 200,
      message: '添加成功'
    }
  }
}

export default Manage
