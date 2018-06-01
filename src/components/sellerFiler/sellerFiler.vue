<template>
   <div class="sellerFiler" >
      <ul class="menu">
      <li class="menu-item" :class="{active:filterOption==0}" @click="filterOption=0">
        <div class="text">综合排序<i class="icon material-icons">expand_more</i></div>               
      </li>
      <li class="menu-item" :class="{active:filterOption==1}" @click="filterOption=1">
        <div class="text">销量最高</div>
      </li>
      <li class="menu-item" :class="{active:filterOption==2}"  @click="filterOption=2">
        <div class="text">距离最近</div>
      </li>
      <li class="menu-item" :class="{active:filterOption==3}"  @click="filterOption=3">
        <div class="text">筛选<i class="icon material-icons">filter_list</i></div>
      </li>
    </ul>      
   </div>
</template>

<script type="text/ecmascript-6">
    export default{
       methods:{
         filter:function(){
            this.$emit('filter',this.filterOption);
         }
       },
       data(){
         return {
           filterOption:0
         }
       }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
        .sellerFiler
          display:table
          width:100%
          height:38px
          border-bottom : 1px solid #e4e4e4
          border-top 1px solid #e4e4e4
          >.menu
            display :table-row
            text-align :center
            >.menu-item
              display :table-cell
              width:25%
              color:#666666
              &.active
                color:#000
              >.text
                font-size :15px
                line-height :36px
                >.icon
                  margin-left :4px
                  vertical-align :middle
                  font-size :15px
</style>
