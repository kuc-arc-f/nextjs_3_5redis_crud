export default {
  add_test3 :async function(num , token){
    try{
      var item = {
//        category_id: "0",
        title:"title-" + num,
        content: "content-" + num,
        _token: token
      }
      const res = await fetch(process.env.BASE_URL + '/api/tasks/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(item),
      });
      if (res.status === 200) {
        const json = await res.json()
      } else {
        throw new Error(await res.text());
      }
    } catch (err) {
      console.log(err);
      throw new Error("Error, add_test ");
    }
  },

}
