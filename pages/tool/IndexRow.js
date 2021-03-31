import Link from 'next/link';
//import Header from '../Layout/AppHead';

const IndexRow = props => (
  <li>
    <Link href={`/tool/${props.item}`}>
      <a target="_blank">{props.item}</a>
    </Link>
  </li>
);
export default IndexRow;
