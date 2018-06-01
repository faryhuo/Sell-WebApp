<template>
   <div class="sellerList">
       <header class="header">
         <h1 class="title">
           外卖APP
         </h1>
        <div class="top-wrapper">
          <div class="position">
            <div class="icon">
              <i class="material-icons">place</i>
            </div>
            <div class="text">{{position}}</div>
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
       </header>
       <div class="contentWrapper" ref="contentWrapper">        
       <div class="content">
          <div  class="scroller-pullup" v-show="isPullDown">
              <img src="./img/rolling.svg" alt="" class="image"/>
              <span class="pull-up-msg">下拉刷新</span>
          </div> 
          <div class="category-list">
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

        <div class="seller-list">
          <div class="title">
                <div class="line"></div>
                <div class="text">商家列表</div>
                <div class="line"></div>
          </div>
          <div  ref="sellerFilter">
              <v-seller-filer v-show="!filterStatus"></v-seller-filer>
          </div>
          <div class="seller-list-wrapper" ref="sellerListWrapper">
            <ul>
                <li v-for="seller in SellerList">
                  <v-seller-options  :Seller="seller"></v-seller-options>
                </li>
            </ul>
             <div ref="PullUp" class="scroller-pullup" v-show="isPullUp">
                 <img src="./img/rolling.svg" alt="" class="image"/>
                 <span class="pull-up-msg">上拉刷新</span>
             </div>
          </div>
        </div>
        </div>
       
       </div>
       <div class="filterWarapper">
            <v-seller-filer v-show="filterStatus"></v-seller-filer>
       </div>
   </div>
</template>

<script type="text/ecmascript-6">
      import split from  "@/components/split/split.vue";
      import SellerListOptions from  "@/components/SellerListOptions/SellerListOptions.vue";
      import sellerFiler from  "@/components/sellerFiler/sellerFiler.vue";

      import {ResponseCode,Api} from '@/common/js/constant.js';
      import BScroll from 'better-scroll';
      
      export default{
      components:{
        "v-split":split,
        "v-seller-options":SellerListOptions,
        "v-seller-filer":sellerFiler
      },
      data(){
        return {
              SellerList:[],
              position:"滨海写字楼",
              filterStatus:false,
              isPullUp:false,
              isPullDown:false,      
              isReload:false,       
              isNeedLoadData:false,
              param:{
                pageNum:1,
                pageSize:10
              }
          }
      },
      mounted(){
            this._initScroll();
        }
        ,
        watch:{
           'SellerList'(){
               this._initScroll();
           } 
        },
      created(){
            this.param.pageNum=0;
            this.showPosition();
            this.getSellerList().then(this._initScroll);      
      },
      methods:{
            getSellerList(){
              return this.$http.get(Api.getSellerList(this.param)).then((response) => {
                  response=response.body;
                  if (response.status===ResponseCode.OK){
                      let list=response.data.list;
                      if(list && list.length){
                          if(this.isReload){
                             this.isReload=false;
                             this.SellerList=[];
                          }
                          this.SellerList=this.SellerList.concat(list);
                          this.param.pageNum++;
                      }
                      console.log(this.SellerList);
                  }
              });
            },

            showPosition(position){ 
              if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition((data)=>{
                   console.log(data);
                   let ak='kuIVexCgjaMn0TzmsnwkbFYf9Za6ERCR';
                   let latitude=data.coords.latitude;
                   let longitude=data.coords.longitude;
                   let url=`http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${latitude},${longitude}&output=json&pois=1&ak=${ak}`;
                   console.log(url);
                   this.$http.get(url).then((rep)=>{
                      console.log(rep);
                   });
                },
                (data)=>{
                  console.log(data);
                  //alert(data)
                },{
                  // 指示浏览器获取高精度的位置，默认为false  
                  enableHighAcuracy: true,  
                  // 指定获取地理位置的超时时间，默认不限时，单位为毫秒  
                  timeout: 5000,  
                  // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。  
                  maximumAge: 3000                    
                });
              }else{
                alert("Geolocation is not supported by this browser.");
              }
            },
            _initScroll(){
               this.$nextTick(()=>{
                if(!this.contentWapperScroll){
                  this.contentWapperScroll=new BScroll(this.$refs.contentWrapper
                  ,{useTransition:false,click:true,probeType:3});

                  let sellerFilter = this.$refs.sellerFilter;

                  this.contentWapperScroll.on("scroll",(pos)=>{
                      let y=pos.y//-275
                      if(y<=-275){
                         this.filterStatus=true;
                      }else{
                         this.filterStatus=false;
                      }
                      let maxScrollY=this.contentWapperScroll.maxScrollY;
                      if(y>=60){
                        this.isPullDown=true;
                      }else{
                        if(this.isPullDown){
                            this.isPullDown=false;
                            this.param.pageNum=1;
                            this.isReload=true;
                            this.isNeedLoadData=true;
                        }                        
                      }
                      if((maxScrollY-y)>=60){
                        this.isPullUp=true;
                      }else{
                        if(this.isPullUp){
                            this.isPullUp=false;
                            this.isNeedLoadData=true;
                        }
                      }
                  });
                  
                  
                  this.contentWapperScroll.on("scrollEnd",(pos)=>{
                      if(this.isNeedLoadData){
                        //load the data.
                       this.getSellerList();
                       this.isNeedLoadData=false;
                      }
                  });


                }else{
                  this.contentWapperScroll.refresh();
                }
               });
           }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

.sellerList
  width:100%
  >.header
    height :91px
    .title
      display :block
      height:30px
      font-size :20px
      line-height :30px
      text-align:center
    >.top-wrapper
      display :flex
      margin:10px 10px 22px 10px
      >.position
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
      >.search
        flex:0 0 200px
        background :#ededed
        height :27px
        font-size :0px
        line-height :27px       
        border :1px solid #ededed 
        border-radius :30px
        color :#979697
        >.icon
          flex:0 0 16px
          width :16px
          height:27px
          margin: 0 6px
          i 
            font-size :16px  
            vertical-align:middle  
  >.contentWrapper
      position :absolute
      overflow :hidden
      width :100%
      top:91px
      bottom:48px
    .content
      >.category-list  
        display :table
        padding : 0 19px
        margin-bottom :15px
        width:100%
        box-sizing:border-box
        >.row-split
          display :table-row    
          height:17px 
        ul
          display :table-row    
          padding-bottom:17px  
          >.menu-item
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
      >.seller-list 
        >.title
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
      .scroller-pullup
        width:100%
        height:30px
        padding:10px 0
        text-align:center
        .image
          width:20px
          height:20px
        .pull-up-msg
          vertical-align :middle  
  >.filterWarapper
    position :fixed
    top:88px
    background:#fff  
    width:100%
</style>
