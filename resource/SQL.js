let str=""; 
for(var i=0;i<foods.length;i++){
  let food=foods[i];
  str+=`insert into FOODS(name, price, oldPrice, description, sellCount, rating, info, icon, image,goodsId) 
         VALUE('${food.name}',${food.price?food.price:null},${food.oldPrice?food.oldPrice:null},'${food.description}'
         ,${food.sellCount?food.sellCount:null},${food.rating?food.rating:null},'${food.info}','${food.icon}','${food.image}'
         ,1); `;
}
console.log(str);


let str4=""; 
for(var i=0;i<ratings.length;i++){
  let rating=ratings[i];
  str4+=`insert into RATINGS(username, rateTime, rateType, text, avatar, categoryId,categoryType)
            VALUE ('${rating.username}','${rating.rateTime?formatDate(new Date(rating.rateTime),"yyyy-MM-dd hh:mm:ss"):""}',
            ${rating.rateType?rating.rateType:null},'${rating.text}','${rating.avatar}',1,0);`
}
console.log(str4);