import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useMemo } from "react";
import routes from "./routes/routes";
import credentialsContext from "./context";

export default function App() {

  const router = createBrowserRouter(routes)
  const [user, setUser] = useState(null)
  const value = useMemo(()=>({user, setUser}), [user])


  return (
    <credentialsContext.Provider value={value}>
      <RouterProvider router={router} />
    </credentialsContext.Provider>
  )
} 
