import mongoose from 'mongoose'

const Schema = mongoose.Schema
const statisticsSchema = new Schema(
  {
    // 所属域名
    domain: {
      type: String,
      required: [true, '不能为空']
    },
    // 数据所属日期
    date: {
      type: Object,
      default() {
        let date = new Date()
        return {
          // 月份
          Month: date.getMonth() + 1,
          // 天
          Day: date.getDay()
        }
      }
    },
    // 访问量
    visits: {
      type: Array,
      default: []
    },
    // 创建时间
    createTime: {
      type: Date,
      default() {
        return new Date()
      }
    }
  },
  { collection: 'statistics', versionKey: false }
)

const statisticsModel = mongoose.model('statistics', statisticsSchema)

// 获取用户自定义的数据
const dataExist = async domain => {
  // 查询是否存在
  const data = await statisticsModel.findOne({
    domain
  })

  // 判断是否为空
  if (data === null || data.length === 0) {
    return false
  }

  // 返回数据
  return data
}

// 添加数据
const dataAdd = async (domain, icon) => {
  // 查询域名的数据是否存在于数据库
  let data = await dataExist(domain)

  // 返回值变量
  let result

  // 判断数据库是否有该数据
  if (!data) {
    // 没有该数据则需要创建这条数据, 否则就是更新数据
    result = await statisticsModel.create({
      domain: domain,
      icons: icon
    })
  } else {
    // 判断图标是否存在
    if (data.icons.indexOf(icon) != -1)
      throw {
        code: 400,
        message: '图标已存在'
      }

    // 添加到图标数组
    data.icons.push(icon)

    // 更新数据库
    result = await statisticsModel.updateOne(
      {
        domain: domain
      },
      {
        $set: {
          icons: data.icons
        }
      }
    )
  }

  // 失败返回
  if (result.errors)
    throw {
      code: 422,
      message: '添加失败'
    }

  return result
}

export default {
  model: statisticsModel,
  dataExist,
  dataAdd
}
