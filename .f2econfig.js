const { argv } = process
const build = argv[argv.length - 1] === 'build'
module.exports = {
    livereload: !build,
    build,
    gzip: true,
    middlewares: [
        {
            middleware: 'template',
            test: /\.html?/
        },
        {
            middleware: 'rollup'
        }
    ],
    output: require('path').join(__dirname, './output')
}
