//
export default (req, res) => {
  if (req.method === "POST") {
    var data = req.body
console.log("mail=", data.mail , data.password )    
    var ret ={
      message: "Hello, API!",
    }
    res.json(ret);
  }
};