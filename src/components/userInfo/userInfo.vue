<template>
   <div class="userInfo">
       <header class="header">
         <h1 class="title">我的</h1>
       </header>
       <div class="userInfo">
         <div class="icon"></div>
         <div class="info">
           <div class="username">{{User.userName}}</div>
           <div class="phoneNum">{{User.phoneNum}}</div>
         </div>
       </div>
       <div class="money border-1px"><i class="icon material-icons">attach_money</i>
       <div class="text">美团红包</div></div>
       <div class="collectGoodsPosition border-1px"><i class="icon material-icons">place</i>
        <div class="text">我的收货地址</div></div>
       <div class="servicePhone"><i class="icon material-icons">phone</i>
            <div class="text">客服电话：{{servicePhone}}</div>
           <span class="serviceTime">服务时间：{{startServiceTime}}-{{endServiceTime}}</span>
        </div>

        <div class="logout">
          <div class="text">
            退出账号
          </div>
        </div>
   </div>
</template>

<script type="text/ecmascript-6">
    export default{
      data(){
        return {
          User:{
            userName:"Fary",
            phoneNum:"137****8197"
          },
          servicePhone:"101-097-77",
          startServiceTime:"9:00",
          endServiceTime:"23:00"
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

 .userInfo
   .header
     width :100%
     .title
       display :block
       height:30px
       font-size :20px
       line-height :30px
       text-align:center
   .userInfo  
     display :flex
     height :73px
     width:100%  
     margin-bottom :22px
     margin-top :20px
     .icon
       flex :0 0 60px 
       height:60px
       width:60px
       margin:6.5px 14px
       border-radius :60px
       border:1px solid #f2f2f2
     .info
       flex:1
       height:60px
       margin:6.5px 0
       .username
         height :30px
         line-height :24px
         font-size :22px
         font-weight :400
       .phoneNum
          height :30px
          line-height :20px  
   .money,.collectGoodsPosition,.servicePhone
     width:100%
     height:35px
     margin-bottom :13px
     position :relative
     border-1px(rgba(7,17,27,0.1))
     .icon
       display :inline-block
       vertical-align :middle
       margin auto 10px
     .text
       display :inline-block
       vertical-align :middle
       font-size :16px
       line-height :24px  
   .servicePhone   
     .serviceTime
       font-size :12px
       color:#999999
   .logout 
     margin-top :24px
     width :100%
     text-align :center
     font-size :18px   
</style>
