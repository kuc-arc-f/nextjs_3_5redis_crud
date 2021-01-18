var csrf = require('csrf');
var tokens = new csrf();
const redis = require("redis");
const {promisify} = require('util');
const client = redis.createClient();

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
import LibRedis from '../../../libs/LibRedis'
//
export default async function (req, res){
  try{
    var data = req.body
//console.log( data );
    var id = data.id
    var user_id = data.user_id
    if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
      throw new Error('Invalid Token, csrf_check');
    }    
    var reply = await getAsync("task:" + user_id);
    var items = await JSON.parse(reply || '[]')
// console.log(items);
    var newItems = LibRedis.delete_item(items, id )
//console.log(newItems);
    var json = JSON.stringify( newItems );
    await setAsync("task:" + user_id , json)
    var ret ={
      id: id
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};