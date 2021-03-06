<template>
<div>
   <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
        <ul>
            <li v-for="(item,index) in goods" class="menu-item" 
            :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">               
                <span class="text border-1px"><span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>{{item.name}}</span>
            </li>
        </ul>     
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
            <li v-for="item in goods" class="food-list food-list-hook">
                <h1 class="title">{{item.name}}</h1>
                <ul>
                    <li @click="selectFood(food,$event)" class="food-item border-1px" v-for="food in item.foods">
                        <div class="icon"><img :src="food.icon" width="100%" height="100%" alt=""></div>
                        <div class="content">
                            <h2 class="name">{{food.name}}</h2>
                            <p  class="desc">{{food.description}}</p>
                            <div class="extra">
                                <span class="count">月售{{food.sellCount}}份</span>
                                <span>好评率{{food.rating}}%</span>
                            </div>
                            <div class="price">
                                <span class="now">￥{{food.price}}</span>
                                <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                            </div>
                            <div class="cart-control-wrapper">
                              <v-cart-control @add="_drop" :cart="food"></v-cart-control>    
                            </div>                           
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <v-shopcart ref="shopcart" :selectedFoods="selectedFoods" :delivery-price="seller.deliveryPrice" 
    :min-price="seller.minPrice"></v-shopcart>
   </div>
    <v-food-detail :food="selectedFood" ref="foodDetail" @add="_drop"></v-food-detail>
</div>   
</template>

<script type="text/ecmascript-6">
   import BScroll from 'better-scroll';
   import shopcart from  "@/components/shopcart/shopcart.vue";
   import cartControl from  "@/components/cartControl/cartControl.vue";
   import foodDetail from  "@/components/foodDetail/foodDetail.vue";

   import {ResponseCode,Api} from '@/common/js/constant.js';


    export default{
        props:{
            seller:{
                type:Object
            }
        },
        components:{
            "v-shopcart":shopcart,
            "v-cart-control":cartControl,
            "v-food-detail":foodDetail
        }
        ,
        created(){
            this.$http.get(Api.getGoods(this.seller.id)).then((response)=>{
                response=response.body;
                if(response.status===ResponseCode.OK){
                    console.log(response);
                    this.goods=response.data;
                    this.$nextTick(()=>{
                        this._initScroll();
                        this._calculateHeight();
                    });
                }
            });
        },
        methods:{
            selectFood(food,$event){
               if(!$event._constructed){
                   return;
               }
               this.selectedFood=food;
               this.$refs.foodDetail.show();
            },
            _drop(target){
                this.$nextTick(()=>{
                    //体验优化 ， 异步执行下落动画
                    this.$refs.shopcart.drop(target);
                });
            },
           _initScroll(){
               this.menuScroll=new BScroll(this.$refs.menuWrapper,{useTransition:this.GLOBAL.UseTransition,click:true});
               this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{probeType:3,useTransition:this.GLOBAL.UseTransition,click:true});

               this.foodsScroll.on("scroll",(pos)=>{
                   this.scrollY=Math.abs(Math.round(pos.y));
               });
           },
           _calculateHeight(){
               let foodList=this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
               let height = 0;
               this.listHeight.push(height);
               for(let i=0;i<foodList.length;i++){
                   let item =foodList[i];
                   height+=item.clientHeight;
                   this.listHeight.push(height);
               }
           },
           selectMenu(index,$event){
               if(!$event._constructed){
                   return;
               }
               let foodList=this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
               let element=foodList[index];
               this.foodsScroll.scrollToElement(element,300);
               
           }
        },
        computed:{
            currentIndex(){
                for(let i=0;i<this.listHeight.length;i++){
                    let height1=this.listHeight[i];
                    let height2=this.listHeight[i+1];
                    if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
                        return i;
                    }
                }
                 return 0;
            },
            selectedFoods(){
                let foods=[];
                this.goods.forEach((good)=>{
                    good.foods.forEach((food)=>{
                        if(food.count){
                            foods.push(food);
                        }
                    });
                });
                return foods;
            }
        }
        ,
        data(){
            return {
                listHeight:[],
                scrollY:0,
                goods:[],
                classMap:{
                    0:"decrease",
                    1:"discount",
                    2:"guarantee",
                    3:"invoice",
                    4:"special"
                },
                selectedFood:null
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

    .goods
      display :flex
      position :absolute
      top: 174px
      bottom :46px
      width:100%
      overflow :hidden
      .menu-wrapper
        flex: 0 0 80px
        width: 80px
        background : #f3f5f7
        .menu-item
          display :table
          height :54px
          width :56px
          padding:0 12px
          line-height :14px
          &.current
            position :relative
            margin-top :-1px
            z-index :10
            background :#fff
            font-weight :700
            .text
              border-none()
          .icon 
            display:inline-block
            vertical-align :top
            width :12px
            height :12px
            margin-right :2px
            background-size :12px 12px
            background-repeat :no-repeat
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
            display :table-cell
            width:56px
            vertical-align :middle
            border-1px(rgba(7,17,27,0.1))
            font-size :12px
      .foods-wrapper
        flex:1
        .title
          padding-left:14px
          height :26px
          line-height :26px
          border-left:2px solid #d9dde1
          font-size :12px
          color:rgb(147,153,159)
          background :#f3f5f7
        .food-item
          display:flex
          margin :18px
          padding-bottom :18px
          border-1px(rgba(7,17,27,0.1))
          &:last-child
            border-none()
            margin-bottom :0
          .icon
            flex:0 0 57px
            margin-right :10px
          .content
            flex:1
            .name
             margin 2px 0 8px 0
             height 14px
             line-height :14px
             font-size :14px
             color:rgb(7,17,27)
            .desc , .extra
              line-height :10px
              font-size :10px
              color:rgb(147,153,159)
            .desc
              line-height :12px
              margin-bottom :8px
            .extra
              &.count  
                margin-right :12px
            .price
              font-weight:700
              line-height :24px
              .now
               margin-right:8px
               font-size:14px
               color:rgb(240,20,20)
             .old
               text-decoration :line-through
               font-size :10px
            .cart-control-wrapper
               position :absolute
               right :0
               bottom 12px       



</style>
