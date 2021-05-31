import config from "../config/config.js"
import customModel from "../model/custom.js"

class Manage {
  async add(ctx) {
    // 获取网站地址
    let url = new URL(ctx.request.body.url)

    // 图标
    let icon = ctx.request.body.icons

    // 判断参数是否正确
    try {
      new URL(icon)
    } catch {
      throw { code: 400, message: '参数无效' }
    }

    // 添加到数据库
    await customModel.dataAdd(url.hostname, icon)

    // 返回成功值
    ctx.body = {
      code: 200,
      message: '添加成功'
    }
  }
}

export default Manage
