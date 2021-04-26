const handler = async (ctx, next) => {
    try {
        await next()

        // 判断 404
        if (!ctx.body) {
            ctx.response.body = {
                code: 404,
                message: '404 not found'
            }
            // 状态码
            ctx.response.status = 404
        }
    } catch (err) {
        // 输出错误
        console.log('\x1B[31m%s\x1B[0m', `[ERROR]:`, err.message || err)

        // 判断用户验证错误
        if (err.message == `undefined is not a valid uri or options object.`) {
            ctx.response.body = {
                code: 400,
                message: '参数错误'
            }
            // 状态码
            ctx.response.status = 400

            return false
        }

        // 判断网站无法访问错误
        if (err.message.indexOf(`getAttribute' of null`) != -1) {
            ctx.response.body = {
                code: 500,
                message: '目标网站无法访问'
            }
            // 状态码
            ctx.response.status = 500

            return false
        }

        // 捕获常规错误
        if (typeof err.code == "number") {
            // 错误消息
            ctx.response.body = {
                code: err.code,
                message: err.message
            }
            // 状态码
            ctx.response.status = err.status || 200

            return false
        }

        // 未知错误
        ctx.response.body = {
            code: 500,
            message: err.message || '未知错误'
        }
        // 状态码
        ctx.response.status = 500
    }
}


export default handler