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
		],
	},
	transpileDependencies: ['uview-ui'],
	//#ifdef H5
	 devServer: {
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
 // #endif
}
