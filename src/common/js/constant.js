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

 let Api={
   getSeller(sellerId){
     return `http://${host}:${port}/api/Seller/${sellerId}`;
   },
   getGoods(sellerId){
    return `http://${host}:${port}/api/goods/${sellerId}`;
  }
 } 

export  {ResponseCode,RatingType,Api};