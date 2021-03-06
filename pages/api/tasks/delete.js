var csrf = require('csrf');
var tokens = new csrf();
const redis = require("redis");
const {promisify} = require('util');

import LibRedis from '../../../libs/LibRedis'
//
export default async function (req, res){
  try{
    var data = req.body
//console.log( data );
    var id = data.id
    //var user_id = data.user_id
    if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
      throw new Error('Invalid Token, csrf_check');
    }    
    const client = redis.createClient();
    const delAsync = promisify(client.del).bind(client);
    await delAsync("task:" + id)
    var ret ={
      id: id
    }
    client.quit()
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};