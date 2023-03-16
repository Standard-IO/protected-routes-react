# How to configure Protected Routes in React Router dom v6
In this page I'll will show how to configure react router dom to implement protected views. The syntax base used is the same that the configured in the react-router-dom tutorial. 

## Must to know

This configuration needs to pass the credential to the validation components as any other but the problem arises from the moment we pass  an object to the method `createBrowserRouter` because we cannot pass it directly to the components. For this reason is necessary to use `contex` or `redux` approach. In this code I used `contex`approach and the configuration is showed in the code.

## Creating the components and basic routing
First is necessary to crate the components and make the router without further configuration. In this routes page we have four components (pages): `Root`, `Landing`, `Admin` and `Analytics`.

```jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const routes = [
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: 'admin/',
        element: <Admin />
      },    
      {
        path: 'analytics/',
        element: <Analytics />,
      },

    ]
  }
];

const router = createBrowserRouter(routes)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

```

## Creatin the ProtectedRoute component

This component will be the indicated to protect our routes. Note that I use `useContext` to access the credentials to allow to visit protected routes this logic to access values can be change to use other one. 
As well the logic to check the validation to the protected routes individually.

```jsx
// components/ProtectedRoute.jsx

import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import credentialsContext from "../context";

export default function ProtectedRoute({
    redirectTo = '/',
    children,
}){
    const { user } = useContext(credentialsContext)
    const isAllowed = user

    if(!isAllowed){
        return <Navigate to={redirectTo} replace />;
    }
    return children ? children : <Outlet />;
};
```
## Protect the routes using ProtectedRoute

Now we neet to change the routes to add the `ProtectedRoute` component. We can choose only one route or multiple routes at the same time. This can be achieved using the property children of the route.

Now let to protect two routes `admin/` and `analytics/` with `ProtectedRoute` component. This can done making this routes children of `ProtectedRoute` pathless component. With this every time we go to these protected routes the father component will check the credentials.

```jsx

const routes = [
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Landing /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'admin/',
            element: <Admin />
          },
          {
            path: 'analytics/',
            element: <Analytics />,
          },
        ]
      },
    ]
  }
];
```
## Integrating `context` to manage the state

It is complicated to manage the state or at least no so directly as the other syntax using `Route`, `Routes` and `BrowserRouter` components. For this reason we need to configure a context or other method to do this. I'll show how to do this using react `contex`.

Firt lets to crate context object to use it in our project.
```jsx
import { createContext } from "react";

const credentialsContext = createContext({
    user: null,
    setUser: () => { }
});

export default credentialsContext;
```

Now lets to import it and used it to provide the validation credential to the `ProtectedRoutes`. The we discuss earlier.


```jsx
//  ... other imports
import { useState, useMemo } from "react";
import credentialsContext from "./context";

const [user, setUser] = useState(null)
const value = useMemo(()=>({user, setUser}), [user])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <credentialsContext.Provider value={value}>
        <RouterProvider router={router} />
    </credentialsContext.Provider>
  </React.StrictMode>,
)
```
Note the use of `useMemo` to return the object that will we used to store the credentials and update credential function to be used in the child components inside the application.