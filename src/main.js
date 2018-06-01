// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import goods from './components/goods/goods.vue'
import ratings from './components/ratings/ratings.vue'
import seller from './components/seller/seller.vue'
import homePage from './components/homePage/homePage.vue'
import sellerList from './components/sellerList/sellerList.vue'
import userInfo from './components/userInfo/userInfo.vue'
import orderList from './components/orderList/orderList.vue'

//stylus
import "../node_modules/ionicons/dist/css/ionicons.css";
import "./common/stylus/index.styl";


Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(VueResource);

/* eslint-disable no-new */


const routes=[
  {
    path:'/detail/:id',
    component:App,
    children:[
      {
        path:'goods',
        component:goods
      },
      {
        path:'ratings',
        component:ratings
      },
      {
        path:'seller',
        component:seller
      }
    ]
  },
  {
    path:'',
    component:homePage,
    children:[{
      path:'',
      component:sellerList
    },{
      path:'/order',
      component:orderList
    },{
      path:'/user',
      component:userInfo
    }]
  }
]
const router = new VueRouter({
  routes,
  linkExactActiveClass:"v-active"
})

let app = new Vue({
  router,
  components:{
  },
  template:'<div  id="app"><router-view></router-view></div>'
}).$mount('#app');




