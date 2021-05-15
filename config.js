// 配置文件
export default {
    // 运行端口
    port: 1331,
    // 缓存配置
    cache: {
        // 缓存路径
        path: './cache.json',
        // 过期时间
        expires: 7200000
    },
    // puppeteer参数
    puppeteer: {
        // headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    },
    // 获取数据超时时间
    timeout: 3000,
    img: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='
}