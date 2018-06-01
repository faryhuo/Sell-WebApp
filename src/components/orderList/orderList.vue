<template>
   <div class="orderList">
        <header class="header">
         <h1 class="title">
           订单详情
         </h1>
        </header>
        <div class="contentWrapper" ref="orderContent">
        <div class="content">
            <div class="order-list-wrapper">
                <ul class="order-list">
                    <li class="order-item" v-for="orderItem in this.OrderList">
                        <div class="split"></div>            
                        <div class="order-item-header border-1px">
                            <div class="seller-icon"><img width="40px" height="40px" :src="orderItem.seller.icon"/></div>
                            <div class="seller-name">{{orderItem.seller.name}}</div>
                            <div class="order-icon">
                               <i class="material-icons">keyboard_arrow_right</i>
                            </div>
                            <div class="order-state">{{orderItem.status}}</div>
                        </div>
                        <div class="order-content">
                            <ul class="order-list-detail">
                                <li class="order-item-detail" v-for="good in orderItem.goods">
                                    <div class="order-text">{{good.name}}</div>
                                    <div class="order-count">x{{good.count}}</div>
                                </li>
                            </ul>
                            <div class="order-info border-1px">共{{orderItem.goods?orderItem.goods.length:0}}件商品,实付<span class="total">￥{{orderItem.total}}</span></div>
                        </div>
                        <div class="order-action-btn">
                            <button class="btn-again">再来一单</button>
                            <button class="btn-comment">去评论</button>                            
                        </div>
                    </li>
                </ul>
            </div>
        </div>
         </div>

   </div>
</template>

<script type="text/ecmascript-6">
      import BScroll from 'better-scroll';
      import {ResponseCode,Api} from '@/common/js/constant.js';

    export default{
        data(){
            return {
                param:{
                    pageNum:1,
                    pageSize:10
                },
                OrderList:[{
                    seller:{
                        name:"蓝冰样",
                        icon:"http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg"
                    },
                    status:"订单已完成"
                    ,
                    goods:[{
                        name:"品肠",
                        count:1
                    }],total:34.5
                },{
                    seller:{
                        name:"蓝冰样",
                        icon:""
                    },
                    status:"订单已完成"
                    ,
                    goods:[{
                        name:"品肠",
                        count:1
                    }],total:34.5
                },{
                    seller:{
                        name:"蓝冰样",
                        icon:""
                    },
                    status:"订单已完成"
                    ,
                    goods:[{
                        name:"品肠",
                        count:1
                    }],total:34.5
                },{
                    seller:{
                        name:"蓝冰样",
                        icon:""
                    },
                    status:"订单已完成"
                    ,
                    goods:[{
                        name:"品肠",
                        count:1
                    }],total:34.5
                }]
            }
        },
        created(){
            this.getOrderList().then(this._initScroll);
        },mounted(){
            this._initScroll();
        },
        watch:{
           'OrderList'(){
               this._initScroll();
           } 
        }
        ,
        methods:{
            _initScroll(){
               this.$nextTick(()=>{
                if(!this.orderContentScroll){
                  this.orderContentScroll=new BScroll(this.$refs.orderContent
                  ,{useTransition:true,click:true});
                }else{
                    this.orderContentScroll.refresh();
                }
             });
            },
            getOrderList(){
              return this.$http.get(Api.getOrderList(this.param)).then((response) => {
                  response=response.body;
                  if (response.status===ResponseCode.OK){
                      let list=response.data;
                      if(list && list.length){
                          this.OrderList=this.OrderList.concat(list);
                          this.param.pageNum++;
                      }
                      console.log(this.OrderList);
                  }
              });
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"


      .orderList
        width:100%
        >.header
            .title
                display :block
                height:40px
                font-size :20px
                line-height :30px
                font-weight :bold
                text-align:center
        .contentWrapper
          position :absolute
          bottom:48px
          overflow :hidden
          top:40px
          width:100%
          .split
            height:10px
            background:rgb(244,244,244)      
          .order-list-wrapper
            .order-list
              .order-item
                .order-item-header
                  position :relative
                  padding:11px 11px
                  width :100%
                  box-sizing :border-box
                  height:75px
                  border-1px(rgba(7,17,27,0.1))
                  .seller-icon
                    display :inline-block
                    vertical-align :top
                    height:40px
                    width:40px
                    margin: 0 5px;
                  .seller-name  
                    display :inline-block
                    font-size :20px
                    line-height :40px
                    font-weight :800
                    height:40px
                  .order-icon
                    display :inline-block
                    vertical-align :middle
                    line-height :40px  
                    i
                      font-size :20px
                      color:rgba(7,17,27,0.5)
                  .order-state
                     position :absolute
                     top:11px
                     right :11px
                     line-height :40px
                     color:rgba(7,17,27,0.5)
                .order-content
                  position :relative   
                  width:100%
                  box-sizing :border-box
                  padding-right :8px  
                  .order-list-detail   
                    .order-item-detail
                      position :relative
                      padding-top:15px
                      font-size :14px
                      color:rgba(7,17,27,0.5)
                      .order-text
                         padding-left :83px 
                      .order-count
                        position :absolute
                        top:15px
                        right :8px 
                .order-info
                  text-align :right
                  padding : 12px 8px
                  font-size :12px
                  color:rgba(7,17,27,0.5)
                  border-1px(rgba(7,17,27,0.1))
                  .total
                    font-weight :800
                    color:#000
                .order-action-btn
                  height :53px
                  text-align:right
                  button
                    text-align :center
                    width:85px
                    height :35px
                    margin:9px 9px 9px 0
                  .btn-again
                    background :#fff
                    border:1px solid rgba(7,17,27,0.3)  
                  .btn-comment
                    background :rgb(248,211,115)
                    border:1px solid rgb(248,211,115)                 
</style>
