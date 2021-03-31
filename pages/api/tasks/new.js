var csrf = require('csrf');
var tokens = new csrf();
const redis = require("redis");
const {promisify} = require('util');
//
export default async function (req, res){
  try{
    var ret_arr = {ret:0, msg:""}
    const client = redis.createClient();
    //      const getAsync = promisify(client.get).bind(client);
    const setAsync = promisify(client.set).bind(client);
    const incrAsync = promisify(client.incr).bind(client);
    if (req.method === "POST") {
      client.on("error", function(error) {
        console.error(error);
        ret_arr.msg = error
        res.json(ret_arr);
      });           
      var data = req.body
//      var user_id = data.user_id
// console.log(data);
      var token =data._token
//console.log(token)
      if(tokens.verify(process.env.CSRF_SECRET, token) === false){
        throw new Error('Invalid Token, csrf_check');
      }  
      
      var replyIdx = await incrAsync("idx-task");
      var item = {
        id: replyIdx,
        title: data.title ,  
        content: data.content ,
        created_at: new Date(),
      };
// console.log(item)  
      var json = JSON.stringify( item );    
      await setAsync("task:" + replyIdx , json)         
      client.quit()
    }
    res.json([]);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};