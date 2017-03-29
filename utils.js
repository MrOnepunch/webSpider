var log = function() {
    console.log.apply(console, arguments)
}

var saveJSON = function(path, json) {
    // 这个函数用来把一个保存了所有电影对象的数组保存到文件中
    var fs = require('fs')
    var s = JSON.stringify(json, null, 2)
    fs.writeFile(path, s, function(error) {
        if (error !== null) {
            console.log('*** 写入文件错误', error)
        } else {
            console.log('--- 保存成功')
        }
    })
}

var cached_url = function(url) {
    var fs = require('fs')
    // 1, 确定缓存文件名字
    // 2, 检查缓存文件是否存在
    var path = url.split('?')[1] + '.html'
    var exists = fs.existsSync(path)
    log('cached url', exists)
    if (exists) {
        var data = fs.readFileSync(path)
        return data
    } else {
        // 用 GET 方法获取 url 链接的内容
        // 相当于你在浏览器地址栏输入 url 按回车后得到的 HTML 内容
        var request = require('sync-request')
        // r 是 HTTP 响应的对象
        var r = request('GET', url)
        // utf-8 是网页文件的文本编码
        var body = r.getBody('utf-8')
        // 写入缓存文件
        fs.writeFileSync(path, body)
        return body
    }
}

/*
通过 exports 制作自己的模块
*/
exports.log = log
exports.save = saveJSON
exports.cached = cached_url
