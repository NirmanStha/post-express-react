import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Layout,
  Home,
  Profile,
  Posts,
  Login,
  Register,
  PublicRoutes,
  ProtectedRoutes,
} from "./pages";

function App() {
  const router = createBrowserRouter([
    {
      element: <PublicRoutes />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/app",
          element: <Layout />,
          children: [
            { index: true, element: <Home /> },
            { path: "profile", element: <Profile /> },
            { path: "profile/:id", element: <Profile /> },
            { path: "post/:id", element: <Posts /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
