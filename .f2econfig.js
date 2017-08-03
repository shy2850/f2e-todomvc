module.exports = {
    // host: 'f2e.local.cn',
    /**
     * 是否开启自动刷新
     * @type {Boolean}
     */
    livereload: true,
    /**
     * 使用 less 编译为css, 使用 less 配置
     * @type {Object}
     */
    useLess: true,
    /**
     * 支持babel编译 js/es/jsx, 支持 `.babelrc` 配置,
     * @type {Object}
     */
    useBabel: {
        only: '**.jsx',
        presets: ['es2015', 'react'],
        plugins: ['babel-plugin-transform-es2015-modules-amd'],
        moduleIds: true,
        getModuleId: pathname => pathname.replace(/^[\\/]?src\//, '')
    },
    include: /\$require\(["'\s]*([^"'\s]+)["'\s]*\)/g,
    /**
     * 是否支持 gzip
     * @type {Boolean}
     */
    // gzip: true,

    /**
     * 支持中间件列表, 默认添加的系统中间件后面, build之前
     *
     * ☆ 重要的
     * 1. 自定义中间件中所有事件 onXxx 也支持在外面定义， 在组件内更显条理, 而且也方便自己封装插件多处引入
     * 2. 系统中间件顺序 include(0) -> less(1) -> babel(2) ---> build(last)
     * 3. 顶层定义的事件顺序在系统中间件之前
     * @type {Array<Function>}
     */
    middlewares: [
        {
            test: /\.(html|js)$/,
            middleware: 'template'
        }
    ],
    /**
     * 只构建指定条件的资源
     * @param  {string} pathname 资源路径名
     * @param  {Buffer/string} data     资源内容
     * @return {Boolean}
     */
    buildFilter: (pathname, data) => {
        let nameFilter = !pathname || /^(src|index)/.test(pathname)
        return nameFilter
    },
    /**
     * 简单资源打包方案
     */
    bundles: [
        {
            test: /^src\/(?!require\.js).*?$/,
            dist: 'src/index.js'
        }
    ],
    output: require('path').join(__dirname, './dist')
}
