// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
module.exports = {
    devServer:{
        proxy:{
            '/api': {
                target: 'http://127.0.0.1:7001/',
                changeOrigin: true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    },
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "less",
            patterns: [
                // 全局变量路径，不能使用路径别名
                path.resolve(__dirname, "./src/assets/css/common.less"),
            ],
        },
    },
}
