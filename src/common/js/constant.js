const ResponseCode={
    OK:0
  };
const RatingType={
     POSITIVE:0,
     NEGATIVE:1,
     ALL:2
  };


const host="localhost";
const port="8080"
const isSimlatorMode=true;


let Api={
   getSeller(sellerId){
     if(isSimlatorMode){
       return "/api/seller";
     }
     return `http://${host}:${port}/api/Seller/${sellerId}`;
   },
   getGoods(sellerId){
    if(isSimlatorMode){
      return "/api/goods";
    }    
    return `http://${host}:${port}/api/Seller/Goods/${sellerId}`;
  },
  getRatings(sellerId){
    if(isSimlatorMode){
      return "/api/ratings";
    }    
    return `http://${host}:${port}/api/Seller/Rating/${sellerId}`;
  }
 } 

export  {ResponseCode,RatingType,Api};