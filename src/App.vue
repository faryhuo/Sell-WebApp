<template>
  <div id="app">
      <v-header :seller="seller"></v-header>
      <v-tab></v-tab>
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

  const ERR_OK= 0;

  export default{
        data() {
            return {
                seller:{
                    id:(()=>{
                      let queryParam=utils.urlParse();
                      return queryParam.id;
                    })()
                }
            }
        },
        created() {
            this.$http.get('/api/seller?id='+this.seller.id).then((response) => {
                response=response.body;
                if (response.errno===ERR_OK){
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
