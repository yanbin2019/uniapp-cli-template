const TransformPages = require('uni-read-pages')
const {
	webpack
} = new TransformPages()
// 跨域配置
module.exports = {
	configureWebpack: {
		plugins: [
			new webpack.DefinePlugin({
				ROUTES: webpack.DefinePlugin.runtimeValue(() => {
					const tfPages = new TransformPages({
						includes: ['path', 'name', 'aliasPath', 'remark']
					});
					return JSON.stringify(tfPages.routes)
				}, true)
			})
		]
	},
	transpileDependencies: ['uview-ui'],

}
