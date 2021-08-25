export default async ({ request }, next) => {
  if (request.url != '/') {
    // 处理 URL
    request.body.url = new URL(request.body.url)
  }

  // 下一个中间件
  await next()
}
