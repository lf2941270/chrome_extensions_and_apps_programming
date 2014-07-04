
// seajs 的简单配置
seajs.config({
    base: "../back/",
    alias: {
    "jquery": "../lib/jquery-1.11.1.js"
    }
})

// 加载入口模块
seajs.use("app")

