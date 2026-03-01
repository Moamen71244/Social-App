// import { Modal, Button, Card, CardBody, CardHeader, Image ,Form, ModalFooter, ModalHeader,useDisclosure, ModalBody, ModalContent, Select, SelectItem } from "@heroui/react";
// import axios from "axios";
// import { useContext, useEffect, useRef, useState } from "react";
// import { userDataContext } from "../../Context/AuthUserData";
// import { useQuery } from "@tanstack/react-query";
// import PostCard from "../../Components/PostCard/PostCard";
// import Spinners from "../../Components/Shared/Spinners";
// import SubCard from "./SubCard/SubCard";
// import useGetProfilePage from "../../../Hooks/useGetProfilePage";
// import { useParams } from "react-router";
// export default function Profile() {

// const {id} = useParams()


// //  const {profileData,isLoading} =useGetProfilePage()

// //  if (isLoading) {
// //   return  <Spinners lable={"Loading your Profile"}/>
// // }
// //  const  {
// //   user: {
// //       _id,
// //       username,
// //       email,
// //       dateOfBirth,
// //       gender,
// //       photo,
// //       cover,
// //       bookmarks,
// //       followers,
// //       following,
// //       createdAt,
// //       followersCount,
// //       followingCount,
// //       bookmarksCount ,
// //       id
// //   }
// // } = profileData 
 
 


// //   return (
// //     <>
// //       {/* <Card className="h-150 w-full sm:w-3xl lg:w-8/10 mx-auto mt-28 rounded-3xl">
// //         <div className= {`h-1/4 md:h-1/3 lg:h-1/2 relative bg-[url(${userData?.cover})] bg-blue-300 bg-cover bg-center bg-no-repeat`}>
        
// //         <img src={userData?.cover} className="w-full"/>
        
// //         </div>
        
// //         <div className="absolute  m-5  top-0 end-0">
// //     <SubCard/>
// //         </div>
        
        
// //         <div className="relative h-1/2 bg-white">
// //           <div className="absolute p-2 lg:p-5 bg-white w-full sm:w-4/5 h-2/3 top-0 left-1/2 -translate-x-1/2 -translate-y-3/4 lg:-translate-y-2/3 rounded-3xl">
// //             <CardHeader className="flex flex-col lg:flex-row  justify-between gap-3">
// //               <div className="flex items-center w-full lg:w-1/2  gap-3">
// //                 <Image
// //                   alt="HeroUI hero Image"
// //                   src={userData?.photo}

// //                   className="rounded-full w-15 h-15 md:w-15 md:h-15 lg:w-20 lg:h-20  border-1 p-0.5 border-blue-500"
// //                 />
// //                 <div className="flex flex-col ">
// //                   <p className="text-lg md:text-xl font-bold ">{userData?.name}</p>
// //                   <p className="text-default-500 text-md ">@{userData?.username}</p>
// //                   <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#d7e7ff] bg-[#eef6ff] px-3 py-1 text-xs font-bold text-[#0b57d0]">
// //                     <svg
// //                       xmlns="http://www.w3.org/2000/svg"
// //                       width="13"
// //                       height="13"
// //                       viewBox="0 0 24 24"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       strokeWidth="2"
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                       className="lucide lucide-users"
// //                       aria-hidden="true"
// //                     >
// //                       <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
// //                       <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
// //                       <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
// //                       <circle cx="9" cy="7" r="4"></circle>
// //                     </svg>
// //                     Route Posts member
// //                   </div>
// //                 </div>
// //               </div>
// //               <div className="flex items-center w-full lg:w-1/2 justify-between gap-3">
// //                 <div className="rounded-2xl w-1/3 border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
// //                   <p className=" text-[10px] font-bold uppercase tracking-wide text-slate-500">
// //                     Followers
// //                   </p>
// //                   <p className="mt-1 text-xl font-black text-slate-900 sm:text-3xl">
// //                     { userData? userData?.followersCount : "0"}
// //                   </p>
// //                 </div>
// //                 <div className="rounded-2xl w-1/3 border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
// //                   <p className=" text-[10px] font-bold uppercase tracking-wide text-slate-500">
// //                     following
// //                   </p>
// //                   <p className="mt-1 text-xl font-black text-slate-900 sm:text-3xl">
// //                     { userData? userData?.followingCount : "0"}
// //                   </p>
// //                 </div>
// //                 <div className="rounded-2xl w-1/3 border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
// //                   <p className=" text-[10px] font-bold uppercase tracking-wide text-slate-500">
// //                     Bookmarks
// //                   </p>
// //                   <p className="mt-1 text-xl font-black text-slate-900 sm:text-3xl">
// //                     { userData? userData?.bookmarksCount : "0"}
// //                   </p>
// //                 </div>
// //               </div>
// //             </CardHeader>

// //             <CardBody className="overflow-visible flex-col  lg:flex-row gap-3 w-full ">
// //               <div className="rounded-2xl w-full lg:w-2/3 border border-slate-200 bg-slate-50 p-4">
// //                 <h3 className="text-sm font-extrabold text-slate-800">About</h3>
// //                 <div className="mt-3 space-y-2 text-sm text-slate-600">
// //                   <p className="flex items-center gap-2">
// //                     <svg
// //                       xmlns="http://www.w3.org/2000/svg"
// //                       width="15"
// //                       height="15"
// //                       viewBox="0 0 24 24"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       strokeWidth="2"
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                       className="lucide lucide-mail text-slate-500"
// //                       aria-hidden="true"
// //                     >
// //                       <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
// //                       <rect x="2" y="4" width="20" height="16" rx="2"></rect>
// //                     </svg>
// //                     {userData?.email}
// //                   </p>
// //                   <p className="flex items-center gap-2">
// //                     <svg
// //                       xmlns="http://www.w3.org/2000/svg"
// //                       width="15"
// //                       height="15"
// //                       viewBox="0 0 24 24"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       strokeWidth="2"
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                       className="lucide lucide-users text-slate-500"
// //                       aria-hidden="true"
// //                     >
// //                       <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
// //                       <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
// //                       <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
// //                       <circle cx="9" cy="7" r="4"></circle>
// //                     </svg>
// //                     Active on Route Posts
// //                   </p>
// //                 </div>
// //               </div>

// //               <div className="grid w-full lg:w-1/3 gap-3 sm:grid-cols-2 lg:grid-cols-1">
// //                 <div className="rounded-2xl border border-[#dbeafe] bg-[#f6faff] px-4 py-3">
// //                   <p className="text-xs font-bold uppercase tracking-wide text-[#1f4f96]">
// //                     My posts
// //                   </p>
// //                   <p className="mt-1 text-2xl font-black text-slate-900">{userPosts? userPosts.length : "0" }</p>
// //                 </div>
// //                 <div className="rounded-2xl border border-[#dbeafe] bg-[#f6faff] px-4 py-3">
// //                   <p className="text-xs font-bold uppercase tracking-wide text-[#1f4f96]">
// //                     Saved posts
// //                   </p>
// //                   <p className="mt-1 text-2xl font-black text-slate-900">{
// //                       bookMarkedprofilePosts? bookMarkedprofilePosts.length : "0"
// //                 }</p>
// //                 </div>
// //               </div>
// //             </CardBody>
// //           </div>
// //         </div>
// //       </Card>

// //         {
// //           userPosts.map((post)=><PostCard key={post._id} postData={post} inPosts={false} />)
// //         } */}

        
      
// //     </>
// //   );
// // }


// const { profileData , isLoading , UserProfileData ,loadingForUser } = useGetProfilePage(id);
 

// if (id) {
  
// }

//  if (loadingForUser || !UserProfileData) {
//     return <Spinners lable="Loading your Profile" />;
//   }

//   const user = UserProfileData?.user ?? {};
//   const userPosts = UserProfileData?.userPosts ?? [];
//   const bookMarkedprofilePosts = UserProfileData?.bookMarkedprofilePosts ?? [];

//   const {
//     username = "",
//     email = "",
//     photo = "",
//     cover = "",
//     followersCount = 0,
//     followingCount = 0,
//     bookmarksCount = 0,
//   } = user;

//   return (
//     <>
//       <Card className="h-150 w-full sm:w-3xl lg:w-8/10 mx-auto mt-28 rounded-3xl">
//         <div
//           className="h-1/4 md:h-1/3 lg:h-1/2 relative bg-cover bg-center bg-no-repeat"
//           style={{ backgroundImage: `url(${cover})` }}
//         />

//         <div className="absolute m-5 top-0 end-0">
//           <SubCard />
//         </div>

//         <div className="relative h-1/2 bg-white">
//           <div className="absolute p-5 bg-white w-full sm:w-4/5 top-0 left-1/2 -translate-x-1/2 -translate-y-2/3 rounded-3xl">
//             <CardHeader className="flex flex-col lg:flex-row justify-between gap-3">
//               <div className="flex items-center w-full lg:w-1/2 gap-3">
//                 <Image
//                   alt="profile"
//                   src={photo}
//                   className="rounded-full w-20 h-20 border p-1 border-blue-500"
//                 />
//                 <div className="flex flex-col">
//                   <p className="text-xl font-bold">{username}</p>
//                   <p className="text-default-500 text-md">@{username}</p>
//                 </div>
//               </div>

//               <div className="flex items-center w-full lg:w-1/2 justify-between gap-3">
//                 <StatCard title="Followers" value={followersCount} />
//                 <StatCard title="Following" value={followingCount} />
//                 <StatCard title="Bookmarks" value={bookmarksCount} />
//               </div>
//             </CardHeader>

//             <CardBody className="flex-col lg:flex-row gap-3 w-full">
//               <div className="rounded-2xl w-full lg:w-2/3 border bg-slate-50 p-4">
//                 <h3 className="text-sm font-bold">About</h3>
//                 <p className="mt-2 text-sm text-slate-600">{email}</p>
//               </div>
//               <div className="grid w-full lg:w-1/3 gap-3">
//                 <InfoCard title="My Posts" value={userPosts.length} />
//                 <InfoCard
//                   title="Saved Posts"
//                   value={bookMarkedprofilePosts.length}
//                 />
//               </div>
//             </CardBody>
//           </div>
//         </div>
//       </Card>
//       {userPosts.map((post) => (
//         <PostCard key={post._id} postData={post} inPosts={false} />
//       ))}
//     </>
//   );


// function StatCard({ title, value }) {
//   return (
//     <div className="rounded-2xl w-1/3 border bg-white px-3 py-3 text-center">
//       <p className="text-xs font-bold uppercase text-slate-500">{title}</p>
//       <p className="mt-1 text-2xl font-black text-slate-900">{value}</p>
//     </div>
//   );
// }

// function InfoCard({ title, value }) {
//   return (
//     <div className="rounded-2xl border bg-[#f6faff] px-4 py-3">
//       <p className="text-xs font-bold uppercase text-[#1f4f96]">{title}</p>
//       <p className="mt-1 text-2xl font-black text-slate-900">{value}</p>
//     </div>
//   );
// }}