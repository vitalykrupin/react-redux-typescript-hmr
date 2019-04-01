'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');

const base = require('./webpack.config');
let config = require('./config');

let customConfig;

try {
    customConfig = require('./customConfig')
} catch (e) {
    e instanceof Error &&
        e.code === "MODULE_NOT_FOUND" &&
        console.log(`customConfig module was not found`);
}

customConfig && (config = merge(config, customConfig));

module.exports = (args) => {

    config.isUsedHotReloading = !args;

    const webpackConfig = merge(base(config), {
        watch: args && !args.hot,
		devtool: 'cheap-module-source-map',
        devServer: {
            host: 'localhost',
            port: config.port,
            stats: 'errors-only',
            hot: true,
            historyApiFallback: true,
            clientLogLevel: 'warning',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            proxy: {
                '/api': {
                    target: 'http://localhost:8000',
                    pathRewrite: { '^/api': '' }
                }
            }
        },
        plugins: []
    });

    if (!args) {
        webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
        webpackConfig.entry.app.unshift('react-hot-loader/patch');
    }
	
	return webpackConfig;
};