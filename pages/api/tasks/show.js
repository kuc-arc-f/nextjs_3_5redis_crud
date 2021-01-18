const redis = require("redis");
const {promisify} = require('util');
const client = redis.createClient();

const getAsync = promisify(client.get).bind(client);
import LibRedis from '../../../libs/LibRedis'
//
export default async function (req, res){
  try{
//console.log("id=", req.query.id);
console.log(req.query );
    var id = req.query.id
    var user_id = req.query.user_id
    var reply = await getAsync("task:" + user_id);    
//console.log(reply);
    var items = await JSON.parse(reply || '[]')
    var item = LibRedis.get_item(items, id)
    var ret ={
      item: item
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};