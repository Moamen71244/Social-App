import { useQuery } from "@tanstack/react-query"
import { axiosInterseptor } from "../assets/Components/Shared/Shared"

export default function useGetProfilePage(_id) {
   
   
    // async function getMyProfile(){
    //    return axiosInterseptor.get('/users/profile-data')
    // }
    async function getUserProfileData(){
        return axiosInterseptor.get(`/users/${_id}/profile`)
    }
//   const {isLoading,data:profileData} =   useQuery({
//         queryKey:["MyProfile"],
//         queryFn:getMyProfile,
//         select:(data) =>{ return data.data},
//         enabled:!_id
//     })
  const {data:UserProfileData,isLoading:loadingForUser} =   useQuery({
        queryKey:["userProfile",_id],
        queryFn:getUserProfileData,
        select:(data) =>{ return data.data.user},
        enabled:!!_id
    })
   return  {UserProfileData,loadingForUser}
  
}
