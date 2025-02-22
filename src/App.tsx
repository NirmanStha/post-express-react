import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, Home, Profile, Posts, Auth } from "./pages";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth />,
    },
    {
      path: "/app",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "profile/:id",
          element: <Profile />,
        },
        {
          path: "post/:id",
          element: <Posts />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
