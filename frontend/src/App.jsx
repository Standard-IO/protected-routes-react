import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import { Home, Dasboard, Admin, Analytics } from "./routes/pages"
export default function App() {
  return (
    <BrowserRouter>
      <h1>Welcome!</h1>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path='dashboard/' element={<Dasboard />} />
        <Route path='Admin/' element={<Admin />} />
        <Route path='Analytics/' element={<Analytics />} />
      </Routes>
    </BrowserRouter>

  )
}


function Navbar() {
  return (
    <ul>
      <li>
        <Link className="element" to='/'>Home</Link>
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