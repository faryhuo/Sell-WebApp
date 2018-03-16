// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import goods from './components/goods/goods.vue'
import ratings from './components/ratings/ratings.vue'
import seller from './components/seller/seller.vue'

//stylus
import "./common/stylus/index.styl";


Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(VueResource);

/* eslint-disable no-new */


const routes=[
  {
    path:'',
    redirect:'/view/goods'
  },
  {
    path:'/view/goods',
    component:goods
  },
  {
    path:'/view/ratings',
    component:ratings
  },
  {
    path:'/view/seller',
    component:seller
  }
]
const router = new VueRouter({
  routes,
  linkExactActiveClass:"v-active"
})

let app = new Vue({
  router,
  components:{
    App
  },
  template:'<App/>'
}).$mount('#app');




