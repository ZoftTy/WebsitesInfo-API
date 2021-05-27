import fs from "fs"

const dataHander = (path) => {

  let fileData = null
  try {
    fileData = JSON.parse(fs.readFileSync(path))
  } catch (err) {
    fileData = {}
  }

  const proxy = (target) => {
    if (target && typeof target === "object") {
      if (Array.isArray(target)) {
        // 数组的数据要进行遍历操作
        target.forEach((item, index) => {
          target[index] = proxy(item)
        })
      } else {
        // 对象的数据也要进行遍历的操作
        Object.keys(target).forEach(key => {
          target[key] = proxy(target[key])
        })
      }

      return new Proxy(target, {
        set(target, prop, value) {

          // 写入文件
          fs.writeFileSync(path, JSON.stringify(target, null, '\t'))

          return Reflect.set(target, prop, value)
        }
      })
    }
    return target
  }

  return proxy(fileData)
}

export default dataHander