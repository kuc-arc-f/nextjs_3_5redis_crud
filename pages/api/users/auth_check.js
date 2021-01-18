const bcrypt = require('bcrypt');
var csrf = require('csrf');
var tokens = new csrf();

const redis = require("redis");
const {promisify} = require('util');
const client = redis.createClient();

const getAsync = promisify(client.get).bind(client);
//const setAsync = promisify(client.set).bind(client);
//const incrAsync = promisify(client.incr).bind(client);
import LibRedis from '../../../libs/LibRedis'
import LibAuth from '../../../libs/LibAuth'
//
export default async (req, res) => {
  try{
    if (req.method === "POST") {
      var retArr= {ret:0, user_id:0}
      var data = req.body
      var reply = await getAsync("users" );
      var users = JSON.parse(reply || '[]')
      var user = LibAuth.get_user(users, data.mail)
console.log( user ) 
      if(user == null){ return res.json(retArr); }
      if (data.mail === user.mail
        && bcrypt.compareSync(data.password,  user.password )){
          retArr.ret = 1
          user.password = ""
          retArr.user = user
          return res.json(retArr);
      }else{
        return res.json(retArr);
      }      
/*
      const collection = await LibMongo.get_collection("users" )
      var where = { mail: data.mail }
      var item = await collection.findOne(where)  
      if (data.mail === item.mail
        && bcrypt.compareSync(data.password,  item.password )){
          retArr.ret = 1
          item.password = ""
          retArr.user = item
          return res.json(retArr);
      }else{
        return res.json(retArr);
      } 
*/
    }
    return res.status(404).send("");
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }  
}
