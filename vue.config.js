const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin'); //Gzip
const webpack = require('webpack');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: '/',
    //输出文件目录
    outputDir: 'dist',
    //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: 'static',
    //是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: false,
    //是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
    parallel: require('os').cpus().length > 1,
    // webpack配置
    //对内部的 webpack 配置进行更细粒度的修改 https://github.com/neutrinojs/webpack-chain see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: config => {
        config.resolve.symlinks(true);
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, {limit: 102400}));

        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...process.env.NODE_ENV !== 'development'

        } else {
            // 为开发环境修改配置...

        }
        return config;
    },
    //调整 webpack 配置 https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
    configureWebpack: config => {
        //生产and测试环境
        let pluginsPro = [
            new CompressionPlugin({ //文件开启Gzip，也可以通过服务端(如：nginx)(https://github.com/webpack-contrib/compression-webpack-plugin)
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$',),
                threshold: 8192,
                minRatio: 0.8,
            }),
        ];
        //开发环境
        let pluginsDev = [];
        // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
        if (process.env.NODE_ENV === 'production') {
            config.plugins = [...config.plugins, ...pluginsPro];
        } else {
            // 为开发环境修改配置...
            config.plugins = [...config.plugins, ...pluginsDev];
        }
    },
    css: {
        //css.module已弃用
        requireModuleExtension: true,
        extract: process.env.NODE_ENV === "production",
        sourceMap: false,
    },
    // webpack-dev-server 相关配置 https://webpack.js.org/configuration/dev-server/
    devServer: {
        // host: 'localhost',
        host: "0.0.0.0",
        port: 8080, // 端口号
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        hotOnly: true, // 热更新
    },
};