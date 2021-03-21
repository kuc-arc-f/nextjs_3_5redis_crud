const redis = require("redis");
const {promisify} = require('util');
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
//const setAsync = promisify(client.set).bind(client);
const keysAsync = promisify(client.keys).bind(client);
const mgetAsync = promisify(client.mget).bind(client);

import LibRedis from '../../../libs/LibRedis'
import LibCommon from '../../../libs/LibCommon'
import LibApiFind from '../../../libs/LibApiFind'
//
export default async function (req, res){
  try{
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
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};