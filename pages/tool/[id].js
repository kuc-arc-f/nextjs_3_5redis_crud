import Head from 'next/head'
import Link from 'next/link';
import Router from 'next/router'
import React from 'react'
import cookies from 'next-cookies'

import Layout from '../../components/layout'
//
export default class extends React.Component {
  static async getInitialProps(ctx) {
    var id = ctx.query.id
    var url = process.env.BASE_URL +'/api/tool/show?key=' + id
    const res = await fetch(url)
    const json = await res.json()
  
    var url_token = process.env.BASE_URL + '/api/token_get'
    const resToken = await fetch(url_token)
    const jsonToken = await resToken.json()
    return {
      item: json.item, item_key: id,
      csrf: jsonToken.csrf
    }
  }
  constructor(props){
    super(props)
    this.state = {name: '', content: '' }
//console.log(props.csrf)
  }  
  async handleClickDelete(){
    console.log("#delete")
    try {
      var item = {
        item_key: this.props.item_key,
        _token: this.props.csrf.token
      }
//console.log(item)
      const res = await fetch(process.env.BASE_URL +'/api/tool/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(item),
      });
      if (res.status === 200) {
        alert("Complete, delete")
        Router.push("/tool");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
    }    
  }
  render(){
    var item = this.props.item
//console.log(item)
    return (
    <Layout>
      <div className="container">
        <Link href="/tool">
          <a className="btn btn-outline-primary mt-2">Back</a></Link>        
        <div><h1>Key : {this.props.item_key}</h1>
        </div>
        <hr />
        <div>Value: <br />{item}
        </div>
        <hr />
        <button className="btn btn-danger"
        onClick={this.handleClickDelete.bind(this)}>Delete
        </button>
      </div>
    </Layout>
    )
  }
}

