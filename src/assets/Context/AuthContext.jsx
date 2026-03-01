import { createContext, useState } from "react"


 export const AuthContext = createContext();

 export default function AuthContextProvider({children}) {
     
     const [token, settoken] = useState()
     function loginUser(myToken){
        localStorage.setItem("token",myToken)
        settoken(localStorage.getItem("token"))
    }
    function logOutUser(){
        settoken(null)
        localStorage.removeItem("token")
    }
    
    return (
    <AuthContext.Provider value={{token,loginUser,logOutUser,settoken}}>
        {children}
    </AuthContext.Provider>
  )
}
