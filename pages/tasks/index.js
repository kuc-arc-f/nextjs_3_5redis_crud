import Link from 'next/link';
import Router from 'next/router'
import flash from 'next-flash';
import Layout from '../../components/layout'
import IndexRow from './IndexRow';
import cookies from 'next-cookies'
//
export default class Page extends React.Component {
  static async getInitialProps(ctx) {
    var url = process.env.BASE_URL+ '/api/tasks/list?uid=' + cookies(ctx).user_id
    const res = await fetch(url)
    const json = await res.json()
//console.log(cookies(ctx).user_id)
    return { 
      items: json.items ,user_id :cookies(ctx).user_id,
    }
  }
  constructor(props){
    super(props)
//console.log(this.props)
  }  
  componentDidMount(){
//console.log(this.props.items)
    if(typeof this.props.user_id === 'undefined'){
      flash.set({ messages_error: 'Error, Login require' })
      Router.push('/login');
    }    
  }
  render() {
//    console.log( "user_id=" ,this.props.user_id )
    const items = this.props.items
    return (
    <Layout>
      <div className="container">
        <Link href="/tasks/create">
          <a className="btn btn-primary mt-2">New</a>
        </Link>          
        <h1>Tasks</h1>
        <ul>
        {items.map((item, index) => {
          return (<IndexRow key={index}
                  id={item.id} title={item.title} />       
          )
        })}      
        </ul>
      </div>
    </Layout>
    )
  }
}
