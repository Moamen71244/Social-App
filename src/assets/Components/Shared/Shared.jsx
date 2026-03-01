import axios from "axios";

export const axiosInterseptor =  axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

axiosInterseptor.interceptors.request.use(
    function(request){
        if(localStorage.getItem("token")) {
            request.headers.token = localStorage.getItem("token")
            return request
        }},
    function(error){
        console.log(error,"error") 
        }
    
    )
axiosInterseptor.interceptors.response.use(
    function(response){
        return response.data
    },
    function(error){
        return error
        }
    
    )