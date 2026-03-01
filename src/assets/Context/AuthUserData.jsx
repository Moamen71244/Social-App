import axios from "axios"
import { createContext, useState } from "react"

export const userDataContext = createContext()
export default function AuthUserData({children}) {
    
    
    const [userData, setUserData] = useState(function(){
        return JSON.parse(localStorage.getItem("userdata"))
    })
    function setAuthUserData (){
        getUserData()
    }
    
   async function getUserData(){
      const res = await  axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile-data`,{
            method:"GET",
            headers:{
                token: localStorage.getItem("token")
            }
        })
        localStorage.removeItem("userdata")
        localStorage.setItem("userdata",JSON.stringify(res.data.data.user))
        setUserData(res.data.data.user)
       }
       

     
  return (
    <userDataContext.Provider value={{userData, setAuthUserData,getUserData}}>
        {children}
    </userDataContext.Provider>
  )
}



<input data-slot="input"  class="w-full font-normal bg-transparent placeholder:text-foreground-500 focus-visible:outline-solid outline-transparent data-[has-start-content=tr placeholder"  tabindex="0" id="react-aria9333732675-_r_0_" type="text" name="name" ></input>