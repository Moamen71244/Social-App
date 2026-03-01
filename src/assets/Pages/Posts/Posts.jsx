import { Avatar ,Button, Input, Spinner, Form, Skeleton} from "@heroui/react";
import { useContext, useRef, useState } from "react";
import PostCard from "../../Components/PostCard/PostCard";
import { userDataContext } from "../../Context/AuthUserData";
import { DocumentUpload } from "iconsax-reactjs";
import {  useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { axiosInterseptor } from "../../Components/Shared/Shared";
import Spinners from "../../Components/Shared/Spinners";
import FeedOptions from "../../Components/FeedOptions/FeedOptions";
import useFeedOptions from "../../../Hooks/useFeedOptions";
export default function Posts({active,allPosts,isLoading}) {
const {userData} = useContext(userDataContext)

  if (isLoading) {
    return (
      <div className="w-full mt-10 px-4 flex flex-col gap-8">
        
          <div  className="w-full glass-card rounded-3xl p-6 flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <Skeleton className="flex rounded-full w-12 h-12" />
              <div className="flex-1 flex flex-col gap-2">
                <Skeleton className="h-3 w-1/3 rounded-lg" />
                <Skeleton className="h-2 w-1/4 rounded-lg" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Skeleton className="h-3 w-full rounded-lg" />
              <Skeleton className="h-3 w-5/6 rounded-lg" />
              <Skeleton className="h-3 w-4/6 rounded-lg" />
            </div>
            <Skeleton className="h-64 w-full rounded-2xl" />
          </div>
     
          <div  className="w-full glass-card rounded-3xl p-6 flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <Skeleton className="flex rounded-full w-12 h-12" />
              <div className="flex-1 flex flex-col gap-2">
                <Skeleton className="h-3 w-1/3 rounded-lg" />
                <Skeleton className="h-2 w-1/4 rounded-lg" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Skeleton className="h-3 w-full rounded-lg" />
              <Skeleton className="h-3 w-5/6 rounded-lg" />
              <Skeleton className="h-3 w-4/6 rounded-lg" />
            </div>
            <Skeleton className="h-64 w-full rounded-2xl" />
          </div>
     
      </div>
    );
  }
  return (
    <div className="posts mx-auto  pb-10">
      {allPosts ? (
        allPosts.map((post) => {
          return <PostCard key={post._id} active={active} postData={post} />;
        })
      ) : (
        <div className="w-full glass-card rounded-3xl p-10 text-center">
          <p className="text-slate-500 font-medium display-font">No posts discovered yet.</p>
        </div>
      )}
    </div>
  );
}
