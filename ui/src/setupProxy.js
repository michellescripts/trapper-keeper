// this isn't a type script file. ignore the linting issue as it only applies to type script
// eslint-disable-next-line import/no-extraneous-dependencies
const {createProxyMiddleware} = require('http-proxy-middleware');

// eslint-disable-next-line func-names
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            pathRewrite: {'^/api': '/api'},
        })
    )
}
