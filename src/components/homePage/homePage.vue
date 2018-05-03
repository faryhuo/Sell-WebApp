<template>
   <div class="homePage">
      <keep-alive>
          <router-view ></router-view>
      </keep-alive>
       <div class="footer">
         <div class="menu-wrapper">
           <ul class="menu">
             <router-link :to="{path:'/'}" class="menu-item">
               <i class="active icon material-icons">home</i>
               <div class="text">首页</div>
             </router-link>
              <router-link :to="{path:'/order'}" class="menu-item">
               <i class="icon material-icons">child_friendly</i>
               <div class="text">订单</div>
              </router-link>
              <router-link :to="{path:'/user'}"  class="menu-item">
               <i class="icon material-icons">person</i>
               <div class="text">我的</div>
              </router-link>                          
           </ul>
         </div>
       </div>
   </div>
</template>

<script type="text/ecmascript-6">
      
</script>

<style lang="stylus" rel="stylesheet/stylus">

.homePage
  width:100%
  >.contentWrapper 
    width :100%
  >.footer
    height:48px
    width :100%
    position:fixed
    bottom:0
    left:0
    .menu-wrapper
      padding-top:5px
      .menu
        display :flex
        .menu-item
          text-align :center
          flex:1
          &.v-active
             .icon
               color:#f8d373
          .icon
           font-size :28px
          .text
           font-size :12px    
</style>
