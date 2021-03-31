import Link from 'next/link';
import Router from 'next/router'
import flash from 'next-flash';
import Layout from '../../components/layout'
import IndexRow from './IndexRow';
import cookies from 'next-cookies'

//
export default class Page extends React.Component {
  static async getInitialProps(ctx) {
//console.log(cookies(ctx).user_id)
    return { 
      items: [] ,user_id :cookies(ctx).user_id,
    }
  }
  constructor(props){
    super(props)
    this.state = { key_items: [] }    
console.log(this.props.items )
  }  
  componentDidMount(){
//console.log(this.props.items)
    if(typeof this.props.user_id === 'undefined'){
    }    
  }
  async key_search(){
    var elemKey = document.getElementById('search_key');
//    var txt = elemKey.value
//console.log(txt )
    var item = {
      search_key: elemKey.value,
    }
    const res = await fetch(process.env.BASE_URL + '/api/tool/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(item),
    });
    if (res.status === 200) {
      const json = await res.json()
//console.log(json )
      this.setState({ key_items: json.items });
    } else {
      throw new Error(await res.text());
    } 
  }
  render() {
    const items = this.state.key_items
    return (
    <Layout>
      <div className="container">
        <h1>Redis Keys</h1>
        <hr />
        <div>
          <label>Keys : </label>
          <input type="text" id="search_key" name="search_key" autoComplete="off" 
              className="form-control mt-2"  />                          
          </div>
          <button className="mt-2 btn btn-primary" onClick={this.key_search.bind(this)}>
          Search</button>
        <ul>
        <hr />
        {items.map((item, index) => {
//console.log(item.key)
          return (<IndexRow key={index} item={item.key} />       
          )
        })}      
        </ul>
      </div>
    </Layout>
    )
  }
}
