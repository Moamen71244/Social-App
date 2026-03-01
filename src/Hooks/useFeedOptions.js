import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { axiosInterseptor } from "../assets/Components/Shared/Shared"

  export default function useFeedOptions(active,setallPosts=null) {
    function getPosts(cat = "following"){ 
      console.log(active,"active")
      if (cat === "saved") {
        return axiosInterseptor.get(`https://route-posts.routemisr.com/users/bookmarks?limit=20&page=1`) 
      }
      return axiosInterseptor.get(`/posts/feed/?only=${cat}&limit=20&page=1`) 
    }
  
   const {data,isLoading,refetch} =  useQuery({
      queryKey:["posts",active],
      queryFn:()=>{
        return getPosts(active)
      },
      select:(data)=> {
        if (active === "saved") {
            setallPosts && setallPosts(data.data.bookmarks)
            return data.data.bookmarks
        }
        setallPosts && setallPosts(data.data.posts)
        return data.data.posts
      }
    })
    
  return {data,isLoading,refetch}
}
