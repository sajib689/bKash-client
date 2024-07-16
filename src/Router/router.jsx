
import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../HomePage/Home";
import Login from "../Components/Login";
import Register from "../Components/Register";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
      children: [
        {
            path: "/",
            element: <Login/>
        },
        {
            path: "/register",
            element: <Register/>
        }
      ]
    },
  ]);

  export default router;