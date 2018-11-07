export default [
	{path: '/train/App',name: 'App',component(resolve) {require(['../App.js'], resolve)}},
	{path: '/train/Discover',name: 'Discover',component(resolve) {require(['../Discover.js'], resolve)}},
	{path: '/train/Home',name: 'Home',component(resolve) {require(['../Home/Home.js'], resolve)}},
	{path: '/train/My',name: 'My',component(resolve) {require(['../My/My.js'], resolve)}}
]