<template>
       <!--sticky footer 布局-->
       <div class="bulletin-detail">
           <div class="bulletin-detail-wrapper clearfix">
               <div class="bulletin-detail-main">
                    <h1 class="name">{{seller.name}}</h1>
                    <div class="star-wrapper">
                        <v-star :size="48" :score="seller.score"></v-star>
                    </div>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul v-if="seller.supports" class="supports">
                        <li class="support-item" v-for="item in seller.supports">
                            <span class="icon" :class="classMap[item.type]"></span>
                            <span class="text">{{item.description}}</span>
                        </li>
                    </ul>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="bulletin">
                        <p class="content">
                            {{seller.bulletin}}
                        </p>
                    </div>

               </div>
           </div>
           <div class="bulletin-detail-close" @click="hideDetail">
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
           },
           classMap:{
               type:Object
           },
           hideDetail:{
               type:Function
           }
       },
       components:{
           "v-star":star
       },
       methods:{
       }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
     @import "../../common/stylus/mixin.styl"

     .bulletin-detail
       position :fixed
       top:0
       left:0
       z-index:100
       width :100%
       height:100%
       overflow :auto
       background :rgba(7,17,27,0.8)  
       backdrop-filter:blur(10px)
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
           .star-wrapper
             margin-top:18px
             padding :2px; 0
             text-align :center
           .title
             display :flex
             width:80%
             margin:28px auto 24px auto
             .line
               flex: 1
               position :relative 
               top :-6px
               border-bottom :1px solid rgba(255,255,255,0.2)
             .text
               padding: 0 12px
               font-size :14px 
               font-weight :700
           .supports
             width:80%
             margin:0 auto 
             .support-item
               padding: 0 12px
               margin-bottom :12px
               font-size :0
               .icon 
                 display:inline-block
                 vertical-align :top
                 width :16px
                 height :16px
                 margin-right :6px
                 background-size :16px 16px
                 background-repeat :no-repeat
                 &.decrease
                   bg-image('./img/decrease_2')
                 &.discount
                   bg-image('./img/discount_2')
                 &.guarantee
                   bg-image('./img/guarantee_2')
                 &.invoice
                   bg-image('./img/invoice_2')  
                 &.special
                   bg-image('./img/special_2')
            .text
              line-height :12px
              font-size :12px 
           .bulletin
             width :80%
             margin :0 auto   
             .content
               padding:0 12px
               line-height :24px
               font-size :12px
       .bulletin-detail-close
           position :relative
           width :32px
           height :32px
           margin: -64px auto 0 auto 
           clear : both
           font-size:32px
           
</style>
