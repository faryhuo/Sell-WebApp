<template>
   <div class="seller" ref="seller">
       <div class="seller-content">
           <div class="overview">
               <h1 class="title">{{seller.name}}</h1>
               <div class="desc border-1px">
                   <v-star :size="36" :score="seller.score"></v-star>
                   <span class="text">({{seller.ratingCount}})</span>
                   <span class="text">月售{{seller.sellCount}}单</span>
               </div>
               <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                        <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li> 
                        <li class="block">
                        <h2>评价配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>   
               </ul>
               <div class="favorite" @click="toggleFavorite">
                   <i class="icon-favorite" :class="{'active':favorite}"></i>
                   <span class="text">{{favoriteText}}</span>
               </div>
           </div>
           <v-split></v-split>
           <div class="bulletin">
               <h1 class="title">公告</h1>
               <div class="content-wrapper border-1px">
                   <p class="content">{{seller.bulletin}}</p>
               </div>
                <ul v-if="seller.supports" class="supports">
                    <li class="support-item border-1px" v-for="item in seller.supports">
                        <span class="icon" :class="classMap[item.type]"></span>
                        <span class="text">{{item.description}}</span>
                    </li>
                </ul>                
           </div>
 
          <v-split></v-split>
          <div class="pics">
              <h1 class="title">商家实景</h1>
              <div class="pic-wrapper" ref="picWrapper">
                  <ul class="pic-list" ref="picList">
                      <li class="pic-item" v-for="pic in seller.pics">
                          <img :src="pic" width="120" height="90" alt="">
                      </li>
                  </ul>
              </div>
          </div>  
          <v-split></v-split  v-show="seller.infos">
          <div class="info" v-show="seller.infos">
              <h1 class="title">商家信息</h1>
              <ul>
                  <li class="info-item" v-for="info in seller.infos">
                      {{info}}
                  </li>
              </ul>
          </div>
       </div>

   </div>
</template>

<script type="text/ecmascript-6">
  
   import star from '@/components/star/star.vue';
   import split from  "@/components/split/split.vue";
   import BScroll from 'better-scroll';
   import * as Store from '@/common/js/store.js';

    export default{
        props:{
            seller:{
                type:Object
            }
        },
        mounted(){
            console.log("mounted");
            this._initScroll();
            this._initPicScroll();
        }
        ,
        watch:{
           'seller'(){
               this._initScroll();
               this._initPicScroll();
           } 
        }
        ,
        methods:{
            _initPicScroll(){
                if(this.seller.pics){
                    let picWidth=120;
                    let margin=6;
                    let width=(picWidth+margin)*this.seller.pics.length-margin;
                    this.$refs.picList.style.width=width+"px";
                    this.$nextTick(()=>{
                        if(!this.picScroll){
                                this.picScroll=new BScroll(this.$refs.picWrapper,{
                                    useTransition:false,scrollX:true,
                                eventPassthrough:'vertical'});
                        }else{
                            this.picScroll.refresh();
                        }                    
                    });
                }
            },
            _initScroll(){
               if(!this.scroll){
                    this.scroll=new BScroll(this.$refs.seller,{useTransition:false,click:true});
               }else{
                   this.scroll.refresh();
               }
            },toggleFavorite(event){
                if(!event._constructed){
                    return false;
                }
                this.favorite=!this.favorite;
                Store.saveToLocal(this.seller.id,"favorite",this.favorite);
            }
        },
        computed:{
            favoriteText(){
                return this.favorite?"已收藏":"收藏";
            }
        }
        ,
        data(){
            return {
                favorite:(()=>{
                    let favorite=Store.loadFromLocal(this.seller.id,"favorite",false);
                    return favorite;
                })(),
                classMap:{
                    0:"decrease",
                    1:"discount",
                    2:"guarantee",
                    3:"invoice",
                    4:"special"
                }
            }
        }
        ,
        components:{
            "v-star":star,
            "v-split":split
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
     @import "../../common/stylus/mixin.styl"


    .seller
      position :absolute
      top:174px
      bottom:0px
      left :0px
      width :100%
      overflow :hidden
      .overview
        position :relative
        padding:18px
        .title
          margin-bottom:8px
          line-height :14px
          color:rgb(7,17,27)
          font size 14px
        .desc
          padding-bottom :18px
          font-size :0px
          border-1px(rgba(7,17,27,0.1))
          .star
            display :inline-block
            vertical-align :top
            margin-right :8px
          .text
            display :inline-block
            vertical-align :top
            line-height :18px
            margin-right :12px
            font-size :10px
            color:rgb(77,85,93)
        .remark
          display :flex
          padding-top:18px
          .block
            flex:1
            text-align :center
            border-right :1px solid  rgba(7,17,27,0.1)
            &:last-child
              border:none
            h2
              margin-bottom:4px
              line-height :10px
              font-size :10px
              color:rgb(147,153,159)
            .content
              line-height :24px
              font-size :10px
              color:rgb(7,17,27)
              .stress
                font-size:24px
        .favorite
          position :absolute
          right :11px
          top:18px
          width:50px
          text-align :center
          .icon-favorite
            display :block
            margin-bottom:4px
            line-height :24px
            font-size:24px
            color:#d4d6d9
            &.active
              color:rgb(240,20,20)
          .text
            line-height :10px
            font-size:10px
            color:rgb(77,85,93)    
      .bulletin
        padding:18px 18px 0 18px
        .title
          margin-bottom :8px
          line-height :14px
          color:rgb(7,17,27)
          font-size:14px
        .content-wrapper
          padding:0 12px 16px 12px
          border-1px(rgba(7,17,27,0.1))
          .content
            line-height :24px
            font-size :12px
            color:rgb(240,20,20)
       .supports
         .support-item
           padding:16px 12px
           font-size:0px
           border-1px(rgba(7,17,27,0.1))
           &:last-child
             border-none();
           .icon 
             display:inline-block
             vertical-align :top
             width :12px
             height :12px
             margin-right :4px
             background-size :12px 12px
             background-repeat :no-repeat
             &.decrease
               bg-image('./img/decrease_4')
             &.discount
               bg-image('./img/discount_4')
             &.guarantee
               bg-image('./img/guarantee_4')
             &.invoice
               bg-image('./img/invoice_4')  
             &.special
               bg-image('./img/special_4')  
           .text  
             line-height :16px
             font-size :12px
             color:rgb(7,17,27)
      .pics
        padding:18px
        .title
          margin-bottom :12px
          line-height :14px
          color:rgb(7,17,27)
          font-size:14px  
        .pic-wrapper
          width :100%
          overflow :hidden
          white-space:nowrap
          .pic-list
            font-size:0px
            .pic-item
              display: inline-block
              margin-right :6px
              width:120px
              height :90px
              &:last-child
                margin:0        
      .info
        padding:18px 18px 0 18px
        .title
          padding-bottom: 12px
          line-height :14px
          border-1px(rgba(7,17,27,0.1))
          color:rgb(7,17,27)
          font-size:14px
        .info-item
          padding:16px 12px
          line-height :16px
          border-1px(rgba(7,17,27,0.1))  
          color:rgb(7,17,27)
          font-size :12px
          &:last-child
            border-none()

        

</style>
