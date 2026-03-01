import { createBrowserRouter } from "react-router";
import Layout from "../Components/Layout/Layout";
import Posts from "../Pages/Posts/Posts";
import Register from "../Pages/Register/Register";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import Login from "../Pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import ProtectedAuthRoute from "./ProtectedAuthRoute/ProtectedAuthRoute";
import ChangePassword from "../Pages/ChangePassword/ChangePassword";
import AppNavbar from "../Components/Navbar/AppNavbar";
import Profile from "../Pages/Profile/Profile";
import PostDetails from "../Pages/postDetails/PostDetails";
import Home from "../Pages/Home/Home";
import UserProfile from "../Pages/UserProfile/UserProfile";
export const myRouter = createBrowserRouter([
    {path:"",element:<Layout />,children :[
        {index:true ,element:   <ProtectedRoute><AppNavbar/><Home/></ProtectedRoute>},
        {path:"home" ,element: <ProtectedRoute><AppNavbar/><Home/></ProtectedRoute>},
        {path:"home/:id" ,element: <ProtectedRoute><AppNavbar/><PostDetails/></ProtectedRoute>},
        {path:"changepassword",element:<ProtectedRoute><AppNavbar/><ChangePassword/></ProtectedRoute>},
        {path:"profile/:id",element:<ProtectedRoute><AppNavbar/><UserProfile/></ProtectedRoute>},
        {path:"profile",element:<ProtectedRoute><AppNavbar/><Profile/></ProtectedRoute>},
        {path:"*",element:<NotFoundPage/>}
    ]},
    {path:"login",element:<ProtectedAuthRoute><Login/></ProtectedAuthRoute>},
    {path:"register",element:<ProtectedAuthRoute><Register/></ProtectedAuthRoute>},
])