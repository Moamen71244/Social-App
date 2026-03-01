import { Navigate } from "react-router"

export default function ProtectedRoute({children}) {
    
    if(!localStorage.getItem("userdata")){
        return <Navigate to={"/login"}/>
    }else
  return (
    <>
    {children}
    </>
  )
}
