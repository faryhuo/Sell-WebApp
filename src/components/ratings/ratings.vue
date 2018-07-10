<template>
   <div class="ratings" ref="ratings">
       <div class="ratings-content">
           <div class="overview">
               <div class="overview-left">
                   <div class="score">{{seller.score}}</div>
                   <div class="title">综合评分</div>
                   <div class="rank">高于周边商家{{seller.rankRate}}</div>
               </div>
               <div class="overview-right">
                   <div class="score-wrapper">
                       <span class="title">服务态度</span>
                       <v-star :score="seller.serviceScore" :size="36"></v-star>
                       <span class="score">{{seller.serviceScore}}</span>
                   </div>
                   <div class="score-wrapper">
                       <span class="title">商品评分</span>
                       <v-star :score="seller.foodScore" :size="36"></v-star>
                       <span class="score">{{seller.foodScore}}</span>
                  </div>   
                   <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}} 分钟</span>
                   </div>          
               </div>
           </div>
           <v-split></v-split>
           <v-rating-select @toggleContent="toggleContent" @changeRatingType="changeRatingType" :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></v-rating-select> 
           <div class="rating-wrapper">
               <ul>
                   <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings" class="rating-item border-1px">
                       <div class="avatar">
                           <img :src="rating.avatar"  width="28" height="28" alt="">
                       </div>
                       <div class="content">
                           <h1 class="name">{{rating.username}}</h1>
                           <div class="star-wrapper">
                               <v-star :size="24" :score="rating.score" ></v-star>
                               <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
                           </div>
                           <div class="text">{{rating.text}}</div>
                           <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                               <i class="icon-thumb_up"></i>
                               <span v-for="recommend in rating.recommend" class="item">{{recommend}}</span>
                           </div>
                           <div class="time">{{rating.rateTime | formatDate}}</div>
                       </div>
                   </li>
               </ul>
           </div>
       </div>
   </div>
</template>

<script type="text/ecmascript-6">

   import star from '@/components/star/star.vue'
   import split from  "@/components/split/split.vue";
   import ratingselect from  "@/components/ratingselect/ratingselect.vue";
   import BScroll from 'better-scroll';
   import * as DateOperator from '@/common/js/date.js';

   import {RatingType,ResponseCode,Api} from '@/common/js/constant.js';


    export default{
        components:{
            "v-star":star,
            "v-split":split,
            "v-rating-select":ratingselect
        },
        props:{
            seller:{
                type:Object
            }
        },
        created(){
            this.$http.get(Api.getRatings(this.seller.id)).then((response)=>{
               response=response.body;
               if(response.status===ResponseCode.OK){
                   this.ratings=response.data;
                   this.$nextTick(()=>{
                        this._initScroll();
                    });
               }
            });
        }
        ,
        filters:{
            formatDate(time){
                let date=new Date(time);
                return DateOperator.formatDate(date,'yyyy/MM/dd hh:mm');
            }
        }
        ,
        methods:{
            _initScroll(){
               this.scroll=new BScroll(this.$refs.ratings,{useTransition:this.GLOBAL.UseTransition,click:true});
            },
            needShow(rateType,text){
                if(this.onlyContent && !text){
                    return false;
                }
                if(this.selectType===RatingType.ALL){
                    return true;
                }
                if(rateType===this.selectType){
                    return true;
                }else{
                    return false;
                }
            },
            changeRatingType(type){
                this.selectType=type;
                this.$nextTick(()=>{
                   if(this.scroll){
                    this.scroll.refresh();
                   }
                });
            },
            toggleContent(onlyContent){
                this.onlyContent=onlyContent;
                this.$nextTick(()=>{
                   if(this.scroll){
                    this.scroll.refresh();
                   }
                });              
            },
        }
        ,
        data(){
            return {
               showFlag:false,
               selectType:RatingType.ALL,
               onlyContent:true,
               ratings:[]        
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

     @import "../../common/stylus/mixin.styl"

   
    .ratings
      position :absolute
      top:174px
      bottom:0px
      left :0px
      width :100%
      overflow :hidden
      .overview
        display :flex
        padding:18px 0
        .overview-left
           flex : 0 0 137px
           width :137px
           border-right 1px solid rgba(7,17,27,0.1)
           text-align :center
           @media only screen and (max-width:320px)
             flex:0 0 120px
             width:120px
           .score
             margin-bottom :6px
             line-height :28px
             font-size:24px
             color:rgb(255,153,0)
           .title
             margin-bottom :8px
             line-height :12px
             font-size:12px
             color:rgb(7,17,27)
           .rank
             padding-bottom :6px
             line-height :10px
             font-size :10px
             color:rgb(147,153,159)
        .overview-right
           flex :1
           padding :6px 0 6px 24px
           @media only screen and (max-width:320px)
             padding-left:6px;
           .score-wrapper
             margin-bottom :8px
             font-size :0
             .title
               display:inline-block             
               line-height :18px
               font-size:12px
               color :rgb(7,17,27)
             .star
               display :inline-block
               vertical-align :top
               margin:0 12px
             .score
               display :inline-block
               line-height :18px
               font-size:12px
               color:rgb(255,153,0)
           .delivery-wrapper
             font-size :0
             .title
               display:inline-block             
               line-height :18px
               font-size:12px
               color :rgb(7,17,27)
             .delivery
               margin-left :12px
               font-size :12px
               color:rgb(147,153,159)
      .rating-wrapper          
        padding: 0 18px
        .rating-item
          display :flex
          padding:18px 0
          border-1px(rgba(7,17,27,0.1))
          .avatar
            flex:0 0 28px
            width:28px
            margin-right :12px
            img 
              border-radius :50%
          .content
            position:relative
            flex:1
            .name
              line-height :12px
              font-size :10px
              color:rgb(7,17,27)
              margin-bottom :4px
            .star-wrapper
              margin-bottom :6px
              font-size :0
              .star
                display :inline-block
                margin-right :6px
                vertical-align :top
              .delivery
                display :inline-block
                vertical-align :top                
                line-height :12px
                font-size :10px
                color:rgb(147,153,159)
            .text 
              margin-bottom :8px
              line-height :18px
              color:rgb(7,17,27)
              font-size:12px
            .recommend
              font-size:0
              line-height :16px
              .icon-thumb_up,.item
                display :inline-block
                margin: 0 8px 4px 0
                font-size :9px
              .icon-thumb_up
                color:rgb(0,160,220)
              .item
                padding:0 6px
                border:1px solid rgba(7,17,27,0.1)
                border-radius :1px
                color:rgb(147,153,159)
                background :#fff  
            .time
              position :absolute
              top:0
              right:0
              line-height :12px
              font-size:10px
              color:rgb(147,153,159)



                            
               
        
</style>
