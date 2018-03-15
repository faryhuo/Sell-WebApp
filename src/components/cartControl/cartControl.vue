<template>
   <div class="cartControl">
    <transition name="move">
        <div class="cart-decrease" v-show="cart.count>0" @click="decreaseCart">
            <i class="inner icon-remove_circle_outline"></i>
        </div>
    </transition>
    <div class="cart-count" v-show="cart.count>0">
        {{cart.count}}
    </div>
    <div class="cart-add" @click="addCart">
        <i class="icon-add_circle"></i>
    </div>
   </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';

    export default{
        props:{
            cart:{
                type:Object
            }
        },
        created(){
            
        },
        methods:{
            addCart(event){
                if(!event._constructed){
                    return;
                }
                console.log("click");
                if(!this.cart.count){
                    Vue.set(this.cart,"count",1);
                }else{
                    this.cart.count++;
                }
                this.$emit('add',event.target);
            },
            decreaseCart(event){
                if(!event._constructed){
                    return;
                }
                if(!this.cart.count){
                    Vue.set(this.cart,"count",0);
                }else{
                    this.cart.count--;
                }                
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  

    .cartControl
      font-size:0
      .cart-decrease
        display :inline-block
        padding: 6px
        transition :all 0.4s linear
        .inner
            display :inline-block
            font-size :24px
            line-height :24px
            color:rgb(0,160,220)
            transition :all 0.4s linear
        &.move-enter.active,&.move-leave-active
          opacity :1
          transform :translate3d(0,0,0)
          .inner
             tramsform:rotate(0)
        &.move-enter,&.move-leave-active
          opacity :0
          transform :translate3d(24px,0,0)
          .inner
            transform: rotate(180deg)         
      .cart-count
        display :inline-block
        vertical-align :top
        width :12px
        padding-top:6px
        line-height :24px
        text-align :center
        font-size :10px
        color:rgb(147,153,159)
      .cart-add
        display :inline-block
        padding: 6px
        font-size :24px
        line-height :24px
        color:rgb(0,160,220)
</style>
