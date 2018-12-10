export default [
	{path: '/train/App',name: 'app',component(resolve) {require(['../App.js'], resolve)}},
	{path: '/train/Discover',name: 'discover',component(resolve) {require(['../Discover/Discover.js'], resolve)}},
	{path: '/train/Home',name: 'home',component(resolve) {require(['../Home/Home.js'], resolve)}},
	{path: '/train/Menu',name: 'menu',component(resolve) {require(['../Menu.js'], resolve)}},
	{path: '/train/My',name: 'my',component(resolve) {require(['../My/My.js'], resolve)}}
]