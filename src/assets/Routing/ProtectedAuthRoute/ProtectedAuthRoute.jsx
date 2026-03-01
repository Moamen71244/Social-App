import { Navigate } from "react-router"

export default function ProtectedAuthRoute({children}) {
    if (localStorage.getItem("userdata")) {
        return <Navigate to={"/"}/>
    }else
  return (
    <>
    {children}
    </>
  )
}
