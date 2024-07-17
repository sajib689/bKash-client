
import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../HomePage/Home";
import Login from "../Components/Login";
import Register from "../Components/Register";
import UserHome from "../Dashboard/UserHome";
import PrivateRoute from './../Provider/PrivateRoute';
import SendMoney from "../Dashboard/SendMoney";

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
    {
        path: "/home",
        element: <PrivateRoute><UserHome/></PrivateRoute>,
       
    },
    {
      path: '/sendmoney',
      element: <SendMoney/>
    }
  ]);

  export default router;