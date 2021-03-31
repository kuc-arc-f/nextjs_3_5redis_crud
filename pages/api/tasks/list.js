const redis = require("redis");
const {promisify} = require('util');

import LibRedis from '../../../libs/LibRedis'
import LibCommon from '../../../libs/LibCommon'
import LibApiFind from '../../../libs/LibApiFind'
//
export default async function (req, res){
  try{
    const client = redis.createClient();
    const keysAsync = promisify(client.keys).bind(client);
    const mgetAsync = promisify(client.mget).bind(client);
    //console.log("uid=", req.query.uid)
    var items = []
    var reply = await keysAsync("task:*");
//console.log(reply)
    if(reply.length > 0){
      items = await mgetAsync(reply);
      items = LibCommon.string_to_obj(items)
      items = LibApiFind.get_order_items(items, "id", "DESC")
    }
//console.log(items)
    var ret ={
      items: items
    }   
    client.quit() 
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};