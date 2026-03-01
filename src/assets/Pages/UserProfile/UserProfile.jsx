import { Card, CardBody, Button, Avatar } from "@heroui/react";
import { UserPlus } from "lucide-react";
import { useParams } from "react-router";
import useGetProfilePage from "../../../Hooks/useGetProfilePage";
import PostCard from "../../Components/PostCard/PostCard";
import { useQuery } from "@tanstack/react-query";
import Spinners from "../../Components/Shared/Spinners";
import { axiosInterseptor } from "../../Components/Shared/Shared";

export default function UserProfile() {

    const {id} = useParams()
    const {loadingForUser,UserProfileData} = useGetProfilePage(id)
    function getUserProfilePosts() {
        return axiosInterseptor.get(`/users/${id}/posts`)       
      }
      const {data:userPosts} = useQuery({
        queryKey:["user",`${id}`],
        queryFn:getUserProfilePosts,
        select:({data}) => data.posts
      }) 
      
    if (loadingForUser) {
        return  <Spinners lable={"Loading your Profile"}/>
    }
  
    return (
<>
<Card className="overflow-hidden max-w-4xl  mt-28 mx-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
    
    <div
      className="h-48 bg-cover bg-center"
      style={{
        backgroundImage: `
          linear-gradient(rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.35)),
          url(${UserProfileData?.cover})
        `,
      }}
    />

    <CardBody className="relative -mt-14 px-3 pb-5 sm:px-5">
      <div className="flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-white/70 bg-white/95 p-4">
                <div className="flex items-end gap-3">
          <Avatar
            src={UserProfileData?.photo}
            alt={UserProfileData?.photo}
            className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-white shadow-sm"
          />
          <div>
            <p className="text-xl font-black text-slate-900 sm:text-2xl">
              {UserProfileData?.name}
            </p>
            <p className="text-sm font-semibold text-slate-500 sm:text-base">
              @{UserProfileData?.username}
            </p>
          </div>
        </div>

        <Button
          startContent={<UserPlus size={16} />}
          className="w-full sm:w-auto bg-[#1877f2] text-white font-extrabold hover:bg-[#166fe5]"
        >
          Follow
        </Button>
      </div>
    </CardBody>
  </Card>


  {
          userPosts?.map((post)=><PostCard key={post._id} postData={post} inPosts={false} />)
}


</>
    
  );
}
