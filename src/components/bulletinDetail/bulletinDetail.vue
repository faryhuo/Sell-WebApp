<template>
       <!--sticky footer 布局-->
       <div class="bulletin-detail" v-show="detailShow">
           <div class="bulletin-detail-wrapper clearfix">
               <div class="bulletin-detail-main">
                    <h1 class="name">{{seller.name}}</h1>
                    <v-star :size="48" :score="seller.score"></v-star>
               </div>
           </div>
           <div class="bulletin-detail-close">
               <i class="icon-close"></i>
           </div>
       </div>
</template>

<script type="text/ecmascript-6">
    import star from '@/components/star/star.vue'
   
    export default{
       props:{
           detailShow:{
               type:Boolean
           },
           seller:{
                type: Object
           }
       },
       components:{
           "v-star":star
       }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
     .bulletin-detail
       position :fixed
       top:0
       left:0
       z-index:100
       width :100%
       height:100%
       overflow :auto
       background :rgba(7,17,27,0.8)
       .bulletin-detail-wrapper
         width:100%
         min-height :100%
         .bulletin-detail-main
           margin-top :64px
           padding-bottom :64px
           .name
             line-height :16px
             text-align :center
             font-size :16px
             font-weight :700
       .bulletin-detail-close
           position :relative
           width :32px
           height :32px
           margin: -64px auto 0 auto 
           clear : both
           font-size:32px
</style>
