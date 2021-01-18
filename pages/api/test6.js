const redis = require("redis");
const {promisify} = require('util');
const client = redis.createClient();

const getAsync = promisify(client.get).bind(client);
//const onAsync = promisify(client.on).bind(client);
//
export default async (req, res) => {
  try{
    var ret_arr = {ret:0, msg:""}
    client.on("error", function(error) {
      console.error(error);
      ret_arr.msg = error
      res.json(ret_arr);
    });    
    var data = req.body
    var user_id = "5"
//console.log(reply)    
    var reply = await getAsync("users");
//console.log(JSON.parse(reply || '[]'))    
    var ret ={
      message: "Hello, API!",
      items: reply,
    }
    res.json(ret);
  } catch (e) {
    console.log(e);
    res.status(500).send();    
  }  
};

