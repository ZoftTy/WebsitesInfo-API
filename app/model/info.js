import mongoose from 'mongoose'

const Schema = mongoose.Schema
const infoSchema = new Schema({
  // 所属域名
  domain: {
    type: String,
    required: [true, '不能为空']
  },
  // 所属路径
  path: {
    type: String,
    required: [true, '不能为空']
  },
  // 获取到的标题
  title: {
    type: String
  },
  // 获取到的图标
  icon: {
    type: String,
    default: '/favicon.ico'
  },
  // 创建时间
  createTime: {
    type: Date,
    default() {
      return new Date()
    }
  }
}, { collection: 'info', versionKey: false })

const infoModel = mongoose.model('info', infoSchema)

// 获取系统默认获取的数据
const dataExist = async (url) => {

  // 查询是否存在
  const data = await infoModel.findOne({
    domain: url.hostname,
    path: url.pathname
  })

  // 判断是否存在缓存
  if (data === null || data.length === 0) {
    return false

  } else {
    // 存在缓存
    return data
  }
}

// 添加数据
const dataAdd = async (domain, pathname, data) => {
  // 添加
  let result = await infoModel.create({
    domain: domain,
    path: pathname,
    title: data.title,
    icon: data.icons
  })

  // 失败返回
  if (result.errors) throw {
    code: 422,
    message: '添加失败'
  }

  return result
}

export default {
  model: infoModel,
  dataExist,
  dataAdd
}