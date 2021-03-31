const redis = require("redis");
const {promisify} = require('util');
//
export default async function (req, res){
  try{
//console.log(req.query.key);
    const client = redis.createClient();
    const getAsync = promisify(client.get).bind(client);
    var key = req.query.key
    var reply = await getAsync(key);
    var ret ={
      item: reply
    }
    client.quit()
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};