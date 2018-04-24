<template>
   <div class="SellerList">
       <header class="header">
         <h1 class="title">
           外卖APP
         </h1>
        <div class="top-wrapper">
          <div class="position">
            <div class="icon">
              <i class="material-icons">place</i>
            </div>
            <div class="text">滨海写字楼</div>
            <div class="icon">
              <i class="material-icons">keyboard_arrow_right</i>
            </div>
          </div>
          <div class="search">
            <div class="icon">
              <i class="material-icons">search</i>
            </div>
            <div class="text"></div>
          </div>
        </div>
        <div class="menu-list">
          <ul>
            <li class="menu-item">
              <div class="icon" style="background:#e97874">
                <i class="material-icons">room_service</i>
              </div>
              <div class="text">美食</div>
            </li>
            <li class="menu-item">
              <div class="icon" style="background:#a1c1f9">
                 <i class="material-icons">shopping_cart</i>
              </div>
              <div class="text" >美团超市</div>
            </li>
            <li class="menu-item">
              <div class="icon" style="background:#a9dc6a">
                <i class="material-icons">spa</i>
              </div>
              <div class="text">生鲜果蔬</div>
            </li>
            <li class="menu-item">
              <div class="icon"  style="background:#f3b25c">
                <i class="material-icons">free_breakfast</i>
              </div>
              <div class="text">下午茶</div>
            </li>
          </ul>
          <div class="row-split"></div>
          <ul>  
            <li class="menu-item">
              <div class="icon"  style="background:#f7d06b">
                <i class="material-icons">airport_shuttle</i>
              </div>
              <div class="text">外卖专送</div>
            </li>
            <li class="menu-item">
              <div class="icon"  style="background:#f3b25c">
                <i class="material-icons">account_balance</i>
              </div>
              <div class="text">正餐优选</div>
            </li>
            <li class="menu-item">
              <div class="icon"  style="background:#84aef9">
                  <i class="material-icons">restaurant</i>
              </div>
              <div class="text">快餐小吃</div>
            </li>
            <li class="menu-item last">
              <div class="icon"  style="background:#7fd1df">
                <i class="material-icons">more</i>
              </div>
              <div class="text">全部商家</div>
            </li>
          </ul>
        </div>
        <v-split></v-split>
       </header>
       <div class="seller-list">
         <div class="title">
              <div class="line"></div>
              <div class="text">商家列表</div>
              <div class="line"></div>
         </div>
         <div class="menu-wrapper">
           <ul class="menu">
             <li class="menu-item">
               <div class="text">综合排序<i class="icon material-icons">expand_more</i></div>               
             </li>
             <li class="menu-item">
               <div class="text">销量最高</div>
             </li>
             <li class="menu-item">
               <div class="text">距离最近</div>
             </li>
             <li class="menu-item">
               <div class="text">筛选<i class="icon material-icons">filter_list</i></div>
             </li>
           </ul>
         </div>
         <div class="seller-list-wrapper">
           <ul>
              <li v-for="seller in SellerList">
                <v-seller-options  :Seller="seller"></v-seller-options>
              </li>
           </ul>
         </div>
       </div>
       <div class="footer">
         <div class="menu-wrapper">
           <ul class="menu">
             <li class="menu-item">
               <i class="icon"></i>
               <div class="text"></div>
             </li>
           </ul>
         </div>
       </div>
   </div>
</template>

<script type="text/ecmascript-6">
      import split from  "@/components/split/split.vue";
      import SellerListOptions from  "@/components/SellerListOptions/SellerListOptions.vue";

    export default{
      components:{
        "v-split":split,
        "v-seller-options":SellerListOptions
      },
      data(){
        return {
              SellerList:[{
                id:1,
                name:"天于地茶餐廳",
                sellCount:4358,
                deliveryTime:30,
                minPrice:20,
                deliveryPrice:3,
                averagePrice:28,
                score:4.5,
                position:1.1,
                desc:[{
                  type:1,
                  text:"折扣商品5.31折起"
                }]
              }]
          }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

.SellerList
  width:100%
  .header
    .title
      display :block
      height:30px
      font-size :24px
      line-height :30px
      text-align:center
    .top-wrapper
      display :flex
      margin:18px 10px 22px 10px
      .position
        flex:1
        background :#a6a6a6
        margin-right :10px
        height :27px
        font-size :0px
        line-height :27px
        border :1px solid #a6a6a6 
        border-radius :30px
        color :#fff
        .icon
          display :inline-flex
          flex:0 0 16px
          width :16px
          height:27px
          margin: 0 6px
          i 
           font-size :16px  
           vertical-align:middle
        .text
          display :inline-flex
          flex:1
          font-size :16px
          height :27px
          text-overflow :ellipsis 
          overflow :hidden
          white-space :nowrap  
      .search
        flex:0 0 200px
        background :#ededed
        height :27px
        font-size :0px
        line-height :27px       
        border :1px solid #ededed 
        border-radius :30px
        color :#979697
        .icon
          flex:0 0 16px
          width :16px
          height:27px
          margin: 0 6px
          i 
           font-size :16px  
           vertical-align:middle  
    .menu-list  
      display :table
      padding : 0 19px
      margin-bottom :15px
      width:100%
      box-sizing:border-box
     .row-split
       display :table-row    
       height:17px 
     ul
      display :table-row    
      padding-bottom:17px  
      .menu-item
       display :table-cell
       width:25%
       height :70px
       margin-bottom :10px
       vertical-align :top  
       .icon
        height :48px
        width:48px
        margin:0 auto
        background :#000
        border-radius :48px   
        color:#fff 
        text-align :center
        line-height :48px
        font-size :20px
        i
          line-height:46px
       .text
         height:22px
         line-height :22px
         font-size :12px;  
         text-align :center
  .seller-list   
    .title
      display :flex
      width:50%
      margin:10px auto 10px auto
      height:24px
      margin-top:6px
      .line
        flex :1
        position :relative
        top:-12px
        border-bottom :1px solid #333333
      .text
        flex:0 0 100px
        font-size :20
        font-weight :800
        text-align :center
        line-height :24px
    .menu-wrapper
      display:table
      width:100%
      height:38px
      border-bottom : 1px solid #e4e4e4
      border-top 1px solid #e4e4e4
      .menu
        display :table-row
        text-align :center
        .menu-item
          display :table-cell
          width:25%
          color:#666666
          .text
            font-size :15px
            line-height :36px
            .icon
              margin-left :4px
              vertical-align :middle
              font-size :15px
</style>
