<template>
  <div id="Sell_Detail" @touchstart="startBackLastPage" @touchend="endBackLastPage">
      <v-header :seller="seller"></v-header>
      <v-tab :id="seller.id"></v-tab>
      <div class="content">
        <keep-alive>
            <router-view :seller="seller"></router-view>
        </keep-alive>
      </div>
  </div>
</template>

<script>
  import header from './components/header/header.vue';
  import tab from './components/tab/tab.vue';
  import * as utils from '@/common/js/utils.js';
  import {ResponseCode,Api} from '@/common/js/constant.js';

  export default{
        data() {
            return {
                seller:{
                    id:(()=>{
                      let id=this.$route.params.id;
                      console.log(id);
                      return id;
                    })()
                    /*(()=>{
                      let queryParam=utils.urlParse();
                      return queryParam.id;
                    })()*/
                }
            }
        },
        methods:{
            startBackLastPage:function(e){/*
                console.log(e);
                let touches=e.changeTouches;
                if(touches.length===1){
                    this.clientX=touches[0].clientX;
                }*/
            },
            endBackLastPage:function(e){/*
                console.log(e);
                let touches=e.changeTouches;
                if(touches.length===1){

                }*/
            }
        }
        ,
        created() {
            this.$http.get(Api.getSeller(this.seller.id)).then((response) => {
                response=response.body;
                if (response.status===ResponseCode.OK){
                   this.seller=Object.assign({},this.seller,response.data);
                   console.log(this.seller);
                }
            });
        },
      components:{
        'v-header':header,
        'v-tab':tab
      }
  }
</script>

<style>
</style>
