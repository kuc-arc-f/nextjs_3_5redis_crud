var csrf = require('csrf');
var tokens = new csrf();
const redis = require("redis");
const {promisify} = require('util');

//
export default async function (req, res){
  try{
    const client = redis.createClient();
    const keysAsync = promisify(client.keys).bind(client);
    const getAsync = promisify(client.mget).bind(client);    
    var data = req.body
//console.log( "search_key=", data.search_key )
//    var keys = `${data.search_key}*`
    var keys = data.search_key
    var data = await keysAsync(keys);
    var reply_items = []
    if(data.length > 0){
      for(var i=0; i < data.length; i++){
        var key = data[i]
        var value = await getAsync(key) 
//console.log( value )
        var item = {key: key, vakue: value}
        reply_items.push(item)
      }
    }
//console.log( reply_items )    
    var ret ={
      items: reply_items
    }    
    res.json(ret)
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
};