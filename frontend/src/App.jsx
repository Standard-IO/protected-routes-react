import { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Home, Dasboard, Admin, Analytics, Landing } from "./routes/pages";

import ProtectedRoute from "./components/ProtectecRoute";


export default function App() {
  const [user, setUser] = useState(null)


  const manageOnClick = () => {
    // Dummy way to get credentials this is usuall taken from the backend facility
    // then is used here to give permission for the view but the security is not here
    // is in the backend, this is only visual.

    if (!user) {
      setUser({
        id: 1,
        name: "israel",
        permissions: ["analize"],
        // roles: ["admin"],
        roles: []

      });
    }
    else {
      setUser(null);
    }
  };
  return (

    <BrowserRouter>
      <h1>Welcome!</h1>
      <Navbar />
      {
        user ? (
          <button type='button' onClick={manageOnClick}>Log out</button>
        )
          : (
            <button type='button' onClick={manageOnClick} >Log in</button>
          )
      }
      <Routes>
        {/* public route without protecction */}
        <Route index element={<Landing />} />

        {/* A route/s inside another one here the route element uses the Outlet component */}
        <Route element={<ProtectedRoute isAllowed={!!user} />} >
          <Route path='home/' element={<Home />} />
          <Route path='dashboard/' element={<Dasboard />} />
        </Route>
        {/* A component inside the protectec route component,
         here is used the property children of the compent route */}
        <Route path='analytics/' element={
          <ProtectedRoute isAllowed={!!user && user.permissions.includes("analize")} >
            <Analytics />
          </ProtectedRoute>}
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              redirectTo="/home"
              isAllowed={!!user && user.roles.includes("admin")}
            >
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>

  )
}


function Navbar() {
  return (
    <ul>
      <li>
        <Link className="element" to='/'>Landing</Link>
      </li>
      <li>
        <Link className="element" to='home'>Home</Link>
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