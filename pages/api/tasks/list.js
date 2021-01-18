const redis = require("redis");
const {promisify} = require('util');
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

import LibRedis from '../../../libs/LibRedis'
//
export default async function (req, res){
  try{
console.log("uid=", req.query.uid)
    var items = []
    var user_id = req.query.uid
    var reply = await getAsync("task:" + user_id);
//console.log(user_id, reply)
    if(reply != null){
      items = JSON.parse(reply || '[]')
    }
    items = LibRedis.get_reverse_items(items)
    var ret ={
      items: items
    }    
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};