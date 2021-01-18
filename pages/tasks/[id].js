import Head from 'next/head'
import React from 'react'
import cookies from 'next-cookies'

import Layout from '../../components/layout'
//
function Page(data) {
//console.log(data.item.created_at )
  var item = data.item
  return (
  <Layout>
    <div className="container">
      <div><h1>{item.title}</h1>
      </div>
      <div>Content: {item.content}
      </div>
      Date: {item.created_at} 
      <hr />     
    </div>
  </Layout>
  )
}
//
Page.getInitialProps = async (ctx) => {
console.log(ctx.query.id)
// console.log("uid=", cookies(ctx).user_id)
  var id = ctx.query.id
  var user_id = cookies(ctx).user_id
  var url = process.env.BASE_URL +'/api/tasks/show?id=' + id
  url += "&user_id=" +user_id
  const res = await fetch(url)
  const json = await res.json()
// console.log(json)
  var item = json.item
  return { item:item }
}

export default Page

