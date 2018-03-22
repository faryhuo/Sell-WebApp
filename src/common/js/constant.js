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
    return `http://${host}:${port}/api/goods/${sellerId}`;
  }
 } 

export  {ResponseCode,RatingType,Api};