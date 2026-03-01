import { Link, useParams } from "react-router"
import PostCard from "../../Components/PostCard/PostCard";
import { useQuery } from "@tanstack/react-query";
import { axiosInterseptor } from "../../Components/Shared/Shared";
import Spinners from "../../Components/Shared/Spinners";
import { Button } from "@heroui/react";
import { ArrowLeft } from "lucide-react";

export default function PostDetails() {
  
   const {id} =  useParams()
 
   function getSinglePost(){
    return axiosInterseptor.get(`posts/${id}`)
   }
 
   const {data:post,isLoading} = useQuery({
    queryKey:['post',id],
    queryFn:getSinglePost,
    select:function(data){
        return data.data.post
    }
})
if (isLoading) {
    return  <Spinners lable={"Fetching post Details"}/>
}
  return (
    <div className="my-28 w-4xl mx-auto shadow-blue-200">
      <Button color="primary" className="font-bold ms-16" as={Link} to={'/'}>
      <ArrowLeft size={15}/>
      Back</Button>
      <PostCard postData={post} inPosts={false} />
    </div>
  )
}
