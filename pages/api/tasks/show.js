const redis = require("redis");
const {promisify} = require('util');

import LibRedis from '../../../libs/LibRedis'
//
export default async function (req, res){
  try{
    const client = redis.createClient();
    const getAsync = promisify(client.get).bind(client);
//console.log("id=", req.query.id);
// console.log(req.query );
    var id = req.query.id
    var user_id = req.query.user_id
    var reply = await getAsync("task:" + id);    
console.log(reply);
    var item = await JSON.parse(reply || '[]')
    var ret ={
      item: item
    }
    client.quit()
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};