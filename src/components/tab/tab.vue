<template>
   <div class="tab border-1px">
       <div class="tab-item">
           <router-link :to="{path:'/detail/'+id+'/goods'}" >商品</router-link>
       </div>
       <div class="tab-item">
           <router-link :to="{path:'/detail/'+id+'/ratings'}" >评论</router-link>
       </div>
       <div class="tab-item">
            <router-link :to="{path:'/detail/'+id+'/seller'}" >商家</router-link>
       </div>
   </div>
</template>

<script type="text/ecmascript-6">
    export default{
        props:{
            id:{
                type:String
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height :40px
      border-1px(rgba(7,17,27,0.1))
      .tab-item
         flex :1
         text-align :center
         & > a
           display :block
           font-size:14px
           color:rgb(77,85,93)
           &.v-active
             color:rgb(240,20,20)
</style>
