// 
//
export default {
  get_item: function(items, id){
    try{
      var ret = null;
      items.forEach(function(item){
//console.log(item.id );
          if(parseInt(item.id) === parseInt(id) ){
              ret = item
          }
      });
      return ret      
    } catch (e) {
      console.log(e);
      throw new Error('error, get_item');
    }
  },
  replace_item: function(items, id, row){
    try{
      var retItems = [];
      items.forEach(function(item){
// console.log("item.id="+item.id+ ", id=" + id);
          if(parseInt(item.id) === parseInt(id) ){
            item.title = row.title
            item.content = row.content
            retItems.push(item)
          }else{
            retItems.push(item)
          }

      });
      return retItems      
    } catch (e) {
      console.log(e);
      throw new Error('error, get_item');
    }
  },
  delete_item: function(items, id){
    try{
      var retItems = [];
      items.forEach(function(item){
          if(parseInt(item.id) != parseInt(id) ){
//console.log("item.id="+item.id+ ", id=" + id);
            retItems.push(item)
          }
      });
      return retItems      
    } catch (e) {
      console.log(e);
      throw new Error('error, get_item');
    }
  },
  get_reverse_items: function(items){
    var data =[]
    items.forEach(function(item){
//console.log(date)
        data.unshift(item)                        
    });        
    return data
  },

}