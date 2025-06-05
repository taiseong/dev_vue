const path = require('path');
const webpack = require('webpack');
module.exports = {
	publicPath: '/',

	chainWebpack: config => {
        if (config.module.rules.has('eslint')) {
            config.module
                .rule('eslint')
                .use('eslint-loader')
                .tap(options => {
                    options.configFile = path.resolve(__dirname, '.eslintrc.js');
                    return options;
                })
                .exclude
                .add(path.resolve(__dirname, 'src/assets/css'))
                .add(path.resolve(__dirname, 'src/assets/js'))
                .add(path.resolve(__dirname, 'src/assets/js/plugin/webfont/webfont.min.js'))
                .end();
        }
		config.resolve.alias.set('~', path.resolve(__dirname, './'));
		config.resolve.alias.set('@', path.resolve(__dirname, 'src/'));
	},
};
