<template>
   <div class="SellerListOptions border-1px" @click="viewDetail">
       <div class="options-wrapper">
            <div class="left-content">
                <div class="image">
                    <img src="./IMG_0304.png" width="100%" height="100%"></img>
                </div>
            </div>
            <div class="right-content">
                <div class="header">
                   <h1>{{Seller.name}}</h1>
                </div>
                <div class="info">
                    <div class="left">
                        <div class="star"><v-star :size="24" :score="Seller.score"></v-star></div>
                        <div class="count">月售{{Seller.sellCount}}份</div>
                    </div>
                    <div class="right">
                        <div class="time">{{Seller.deliveryTime}}分鐘</div>
                        <div class="position">{{Seller.position}}Km</div>
                    </div>
                </div>
                <div class="price">
                        <div class="minPrice">起送 ￥{{Seller.minPrice}}</div>
                        <div class="deliveryPrice">配送 ￥{{Seller.deliveryPrice}}</div>
                        <div class="averagePrice">人均 ￥{{Seller.averagePrice}}</div>
                        <div class="icon">iCON</div>
                </div>
                <div class="desc-wrapper">
                    <ul class="desc-list">
                        <li class="desc-item" v-for="item in Seller.desc">
                            <div class="icon" :class="descType[item.type]"></div>
                            <div class="text">{{item.text}}</div>
                        </li>
                    </ul>
                </div>
            </div>
       </div>
   </div>
</template>

<script type="text/ecmascript-6">
   import star from  "@/components/star/star.vue";
    export default {
        props:{
            Seller:{
                type:Object
            }
        },
        data(){
            return {
                descType:{
                    0:"decrease",
                    1:"discount",
                    2:"guarantee",
                    3:"invoice",
                    4:"special"
                }
            }
        },
        methods:{
            viewDetail(){
                let id=this.Seller.id;
                this.$router.push({path:`/detail/${id}/goods`});
            }
        }
        ,
        components:{
            "v-star":star
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

    @import "../../common/stylus/mixin.styl"

   .SellerListOptions
     box-sizing :border-box
     margin-top :12px
     width:100%
     border-1px(rgba(7,17,27,0.1))
     .options-wrapper
       display :flex
       .left-content
         flex :0 0 104px
         .image
           width:85px
           height :62px
           margin 0 9px          
       .right-content
         flex :1
         .header
           font-size:20px
           line-height :24px
           font-weight :800
         .info
           position:relative
           color :#9f9f9f
           width :100%
           .left,.right 
             font-size :12px
             display :inline-block
             top:0
           .left
             .star,.count
               display :inline-block
               padding :0 3px
             .count  
               border-left :1px solid rgba(7,17,27,0.1)  
           .right
             position :absolute
             right:9px
             .time,.position
               display :inline-block
               padding :0 3px
             .time
               border-right :1px solid rgba(7,17,27,0.1)  
         .price
           position:relative
           margin-top :7px
           color :#9f9f9f
           width :100%
           font-size:0px
           .minPrice,.deliveryPrice,.averagePrice          
             display :inline-block
             font-size:12px
             padding :0 3px
           .minPrice,.deliveryPrice 
             border-right :1px solid rgba(7,17,27,0.1)  
           .icon
             position :absolute
             right:9px
             top:0
             font-size :12px
         .desc-wrapper
           margin-top :9px
           margin-bottom :12px
           width :100%
           .desc-list
             .desc-item
                font-size :11px
                .icon
                  display :inline-block
                  margin:0 2px
                  width:12px
                  height:12px
                  background-size :12px 12px
                  background-repeat :no-repeat
                  vertical-align :middle
                  &.decrease
                    bg-image('./img/decrease_3')
                  &.discount
                    bg-image('./img/discount_3')
                  &.guarantee
                    bg-image('./img/guarantee_3')
                  &.invoice
                    bg-image('./img/invoice_3')  
                  &.special
                    bg-image('./img/special_3') 
                .text
                  display :inline-block
                  vertical-align :middle
                  color:#c4c4c4               
               
               
</style>
