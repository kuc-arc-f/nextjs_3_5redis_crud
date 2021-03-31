var csrf = require('csrf');
var tokens = new csrf();
const redis = require("redis");
const {promisify} = require('util');
//
export default async function (req, res){
  try{
    var data = req.body
//console.log(data.item_key)
    var key = data.item_key
    if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
      throw new Error('Invalid Token, csrf_check');
    } 
//console.log(key)
    const client = redis.createClient();
    const delAsync = promisify(client.del).bind(client);
    await delAsync(key)
    client.quit()
    var ret ={
      id: key
    } 
    res.json(ret);
//console.log(data);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};