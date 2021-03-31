var csrf = require('csrf');
var tokens = new csrf();

const redis = require("redis");
const {promisify} = require('util');
import LibRedis from '../../../libs/LibRedis'
//
export default async function (req, res){
  try{
    var data = req.body
// console.log(data);
    var id = data.id
    if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
      throw new Error('Invalid Token, csrf_check');
    }    
    const client = redis.createClient();
    const getAsync = promisify(client.get).bind(client);
    const setAsync = promisify(client.set).bind(client);
    
    var reply = await getAsync("task:" + id);
    var item = await JSON.parse(reply || '[]')
    item.title = data.title
    item.content = data.content
console.log(item)
    var json = JSON.stringify( item );
    await setAsync("task:" + id , json)
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