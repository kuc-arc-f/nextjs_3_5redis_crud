var csrf = require('csrf');
var tokens = new csrf();
const redis = require("redis");
const {promisify} = require('util');
const client = redis.createClient();

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const incrAsync = promisify(client.incr).bind(client);
//
export default async function (req, res){
  try{
    var ret_arr = {ret:0, msg:""}
    if (req.method === "POST") {
      client.on("error", function(error) {
        console.error(error);
        ret_arr.msg = error
        res.json(ret_arr);
      });      
      var data = req.body
      var user_id = data.user_id
console.log(data);
      var token =data._token
      // console.log(token)
      var replyIdx = await incrAsync("idx-task");
      var item = {
        id: replyIdx,
        title: data.title ,  
        content: data.content ,
        created_at: new Date(),
      };
//console.log(item)       
      var reply = await getAsync("task:" + user_id);
// console.log(reply)       
      if(reply == null){
        var items = []
        items.push(item)
        var json = JSON.stringify( items );    
        await setAsync("task:" + user_id , json)         
      }else{
        var nowItems = JSON.parse(reply || '[]')
// console.log(nowItems.length) 
        nowItems.push(item)
        var json = JSON.stringify( nowItems );
        await setAsync("task:" + user_id , json)
      }
    }
    res.json([]);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};