<template>
   <div class="star" :class="starType">
       <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item">
           
       </span>
   </div>
</template>

<script type="text/ecmascript-6">
    export default{
        props:{
            size:{
                type:Number
            },
            score:{
                type:Number
            }
        },
        computed:{
            starType(){
                return 'star-'+this.size;
            }
        }
        ,
        data() {
            return {
                itemClass:{},
                itemClasses:{}
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .star
      .star-item
        display :inline-block
        background-repeat:no-repeat
      &.star-48
      &.star-32
      &.star-24
      
</style>
