import {
	getToken
} from '@/utils/auth';
import {
	createRouter,
	RouterMount
} from 'uni-simple-router';
import {
	Login,
	whiteList
} from './whiteRouter';
const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	keepUniOriginNav: false,
	debugger: false,
	routerBeforeEach: (to, from, next) => {
		next()
	},
	routerAfterEach: (to, from) => {},
	routerErrorEach: (error, router) => {
		err(error, router, true)
	},
	detectBeforeLock: (router, to, navType) => { // 配置解锁[重要]。关闭跳转路由锁
		router.$lockStatus = false;
	},
	resolveQuery: (jsonQuery) => jsonQuery,
	parseQuery: (jsonQuery) => jsonQuery,
	APP: {
		loddingPageStyle: () => JSON.parse('{"backgroundColor":"#9846FF"}'),
		loddingPageHook: (view) => {
			view.show();
		},
		launchedHook: () => {
			plus.navigator.closeSplashscreen();
		},
		animation: {
			animationType: 'pop-in',
			animationDuration: 100
		}
	},
	applet: { //v2.0.6+
		animationDuration: 300
	},
	beforeProxyHooks: { //v2.0.8+
		onLoad: ([options], next, router) => {
			next([parseQuery({
				query: options
			}, router)])
		}
	},
	routes: [...ROUTES, {
		path: '*',
		redirect: (to) => {
			return {
				name: '404'
			}
		}
	}],
	routerErrorEach: (error, router) => {
		// 跳转时错误后执行的守卫
		console.log('error, router', error, router)
		// #ifdef APP-PLUS
		if (plus.os.name.toLowerCase() === 'android') {
			plus.runtime.quit();
		} else {
			const threadClass = plus.ios.importClass("NSThread");
			const mainThread = plus.ios.invoke(threadClass, "mainThread");
			plus.ios.invoke(mainThread, "exit");
		}
		// #endif
	}
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
	next();
	// if (getToken()) {
	//     if (whiteList.indexOf(to.name) > -1) {
	//         uni.reLaunch({
	//             url: '/pages/home/index'
	//         })
	//     } else {
	//         next();
	//     }
	// } else {
	//     console.log('to', to)
	//     if (whiteList.indexOf(to.name) > -1) {
	//         next()
	//     } else {
	//         router.push({
	//             name: Login
	//         })
	//     }
	// }
});

// // // 全局路由后置守卫
// router.afterEach((to, from) => {
//     // console.log('跳转结束')
// })

export {
	router,
	RouterMount
};
