import { useContext, useState } from "react"
import { userDataContext } from "../assets/Context/AuthUserData"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { axiosInterseptor } from "../assets/Components/Shared/Shared"

export default function usePostDetails(_id,likes) {
    

    function getPostLikes(){
     return axiosInterseptor.get(`/posts/${_id}/likes?page=1&limit=20`)
    }
    const query = useQueryClient()
   const {data:postLikes,isLoading} =  useQuery({
        queryKey:["getPostLikes",_id],
        queryFn: getPostLikes,
        select:(data)=>{
            return data.data.likes
        }

    })
    
    const {userData}=useContext(userDataContext)
    const [Liked, setLiked] = useState(function(){
        return likes?.includes(userData._id)
    })
    function likePost(){
        return axiosInterseptor.put(`/posts/${_id}/like`,{},)
       }
        const {mutate:likePostFunc} = useMutation({
         mutationFn:likePost,
         onSuccess:function(data){
           query.invalidateQueries({queryKey:["getPostLikes",_id]})
           setLiked(data.data.liked)
         }
       })
     
       return {Liked,likePostFunc,postLikes,isLoading,setLiked}
}
