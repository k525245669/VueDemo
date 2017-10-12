import Vue from 'vue';
import VueRouter from 'vue-router'
import App from './components/app.vue';

Vue.use(VueRouter)

const Foo = { template: '<div>foo</div>'}
const Bar = { template: '<div>bar</div>' }

const routes = [
  { path: '/', component: App},
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  mode: 'history',
  routes // （缩写）相当于 routes: routes
})

new Vue({
  router
}).$mount('#app')