import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <ul>
      <li>
        <Link className="element" to='/'>Landing</Link>
      </li>
      <li>
        <Link className="element" to='home/'>Home</Link>
      </li>
      <li>
        <Link className="element" to='dashboard/'>Dasboard</Link>
      </li>
      <li>
        <Link className="element" to='analytics/'>Analytics</Link>
      </li>
      <li>
        <Link className="element" to='admin/'>Admin</Link>
      </li>
    </ul>
  )
}