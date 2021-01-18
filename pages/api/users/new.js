const bcrypt = require('bcrypt');
const redis = require("redis");
const {promisify} = require('util');
const client = redis.createClient();

//import LibAA from "../../../libs/aa"
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const incrAsync = promisify(client.incr).bind(client);
//
export default async function (req, res){
  try{
    var ret_arr = {ret:0, msg:""}
    if (req.method === "POST"){
      client.on("error", function(error) {
        console.error(error);
        ret_arr.msg = error
        res.json(ret_arr);
      });          
      var data = req.body
      let hashed_password = bcrypt.hashSync(data.password, 10);
  // console.log(hashed_password);
      var replyIdx = await incrAsync("idx-users");
console.log(replyIdx);
      var item = {
        id: replyIdx,
        mail: data.mail,
        password: hashed_password,
        name: data.name,
        created_at: new Date(),
      }    
//      console.log(item);
      var reply = await getAsync("users" );
console.log(JSON.parse(reply || '[]')) 
      if(reply == null){
        var items = []
        items.push(item)
        var json = JSON.stringify( items );    
        await setAsync("users" , json)         
      }else{
        var nowItems = JSON.parse(reply || '[]')
//console.log(nowItems.length) 
        nowItems.push(item)
        var json = JSON.stringify( nowItems );
        await setAsync("users" , json)
      }            
      res.json(ret_arr);
    }
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};