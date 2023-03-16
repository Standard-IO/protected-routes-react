import { Home, Dasboard, Admin, Analytics, Landing, Root } from "../pages/pages"
import ProtectedRoute from "../components/ProtectecRoute";

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
            path: 'home/',
            element: <Home />
          },
          {
            path: 'dashboard/',
            element: <Dasboard />
          },
          {
            path: 'admin/',
            element: <Admin />
          }
        ]
      },
      {
        path: 'analytics/',
        element: <Analytics />,
      },

    ]
  }
];

export default routes;