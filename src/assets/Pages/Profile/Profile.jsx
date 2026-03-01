import { Button, Card, CardBody, CardHeader, Image, useDisclosure } from "@heroui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { userDataContext } from "../../Context/AuthUserData";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../../Components/PostCard/PostCard";
import Spinners from "../../Components/Shared/Spinners";
import SubCard from "./SubCard/SubCard";
import { Users, Mail } from "lucide-react";

export default function Profile() {
  const { userData } = useContext(userDataContext);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/bookmarks`, {
          headers: { token: token }
        });
        setBookmarkedPosts(res.data.data.bookmarks);
      } catch (e) { console.log(e); }
    };
    fetchBookmarks();
  }, []);

  const { data: userPosts, isLoading, isError } = useQuery({
    queryKey: ["user", userData?.name],
    queryFn: () => axios.get(`${import.meta.env.VITE_BASE_URL}/users/${userData._id}/posts`, {
      headers: { token: localStorage.getItem("token") }
    }),
    select: ({ data }) => data.data.posts,
    enabled: !!userData?._id
  });

  if (isError) return <div className="p-20 text-center"><h1 className="text-2xl font-bold text-danger">Error loading profile</h1></div>;
  if (isLoading) return <Spinners lable="Fetching your profile details..." />;

  return (
    <div className="section-spacing max-w-6xl mx-auto px-4 mt-16">
      <Card className="glass-card border-none rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl">
        <div className="h-64 sm:h-80 relative overflow-hidden group">
          <img src={userData?.cover} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
          <div className="absolute top-6 right-6 z-20"><SubCard /></div>
        </div>

        <div className="px-6 sm:px-12 pb-10 -mt-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-end lg:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 w-full lg:w-auto">
              <div className="relative group">
                <Image src={userData?.photo} className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white dark:border-slate-900 shadow-2xl object-cover" removeWrapper />
                <div className="absolute inset-0 rounded-full border-4 border-primary-500/20 animate-pulse" />
              </div>
              <div className="text-center sm:text-left mb-2">
                <h1 className="text-3xl font-extrabold display-font tracking-tight">{userData?.name}</h1>
                <p className="text-slate-500 font-medium">@{userData?.username}</p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary-100/50 bg-primary-50/50 dark:bg-primary-900/20 px-4 py-1.5 text-xs font-bold text-primary-600 dark:text-primary-400">
                  <Users size={14} />
                  Route Posts Verified
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 sm:pb-0">
              {[ { label: "Followers", val: userData?.followersCount }, { label: "Following", val: userData?.followingCount }, { label: "Bookmarks", val: userData?.bookmarksCount } ].map((s, i) => (
                <div key={i} className="flex-1 min-w-[100px] rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 px-4 py-3 text-center shadow-sm">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.label}</p>
                  <p className="mt-1 text-2xl font-black display-font">{s.val || "0"}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 shadow-none bg-slate-50/50 dark:bg-slate-800/20 border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                About Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-700 shadow-sm"><Mail size={18} /></div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400 leading-none mb-1">Email Address</p>
                    <p className="text-sm font-medium">{userData?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-700 shadow-sm"><Users size={18} /></div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400 leading-none mb-1">Membership</p>
                    <p className="text-sm font-medium">Active Member since 2024</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex flex-col gap-4">
              <Card className="shadow-none bg-primary-500/5 dark:bg-primary-500/10 border border-primary-500/20 rounded-3xl p-6 relative overflow-hidden group">
                <div className="relative z-10 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary-600 mb-1">Published Posts</p>
                  <p className="text-4xl font-black display-font text-primary-700">{userPosts?.length || "0"}</p>
                </div>
                <div className="absolute -bottom-6 -right-6 text-primary-500/10 transition-transform group-hover:scale-125 duration-700 rotate-12"><Users size={100} /></div>
              </Card>
              <Card className="shadow-none bg-slate-900 dark:bg-slate-800 rounded-3xl p-6 relative overflow-hidden group">
                <div className="relative z-10 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Curated Library</p>
                  <p className="text-4xl font-black display-font text-white">{bookmarkedPosts?.length || "0"}</p>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -mr-10 -mt-10" />
              </Card>
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-6">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-2xl font-black display-font tracking-tight">Timeline Activity</h2>
          <Button variant="flat" size="sm" className="font-bold rounded-full">Filter Posts</Button>
        </div>
        {userPosts?.map((post) => <PostCard key={post._id} postData={post} inPosts={false} />)}
      </div>
    </div>
  );
}
