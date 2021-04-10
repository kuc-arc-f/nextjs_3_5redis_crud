import Link from 'next/link';
import Router from 'next/router'
import flash from 'next-flash';
import Layout from '../../components/layout'
import IndexRow from './IndexRow';
import cookies from 'next-cookies'

//
function Index(props) {
  const items = props.items
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

export const getServerSideProps = async (ctx) => {
  //  console.log("uid=", cookies(ctx).user_id)
  var user_id = cookies(ctx).user_id || ''
  var url = process.env.BASE_URL+ '/api/tasks/list?uid=' + cookies(ctx).user_id
  const res = await fetch(url)
  const json = await res.json()
  var items = json.items
  return {
    props: { items, user_id } 
  }
}

export default Index
