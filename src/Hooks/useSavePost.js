import { useMutation } from "@tanstack/react-query"
import { axiosInterseptor } from "../assets/Components/Shared/Shared"

export default function useSavePost(_id) {
 


    function savePost(){
       return axiosInterseptor.put(`/posts/${_id}/bookmark`)
    }
 
   const {mutate:saveNow,data} = useMutation({
        mutationFn:savePost,
        onSuccess:function(data){
           data.data.bookmarked
        },onError:function(){
            console.log("Error Ocuared");
        }
        
    })

 
 
 
    const saved  = data?.data.bookmarked
    return {saveNow,saved}
      

}
