import { useContext, useRef, useState } from "react";
import Posts from "../Posts/Posts";
import { userDataContext } from "../../Context/AuthUserData";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Avatar, Button, Form, Image, Input, Card, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { DocumentUpload } from "iconsax-reactjs";
import { axiosInterseptor } from "../../Components/Shared/Shared";
import { X, SendHorizontal, Newspaper, Sparkles, Earth, Bookmark, ChevronDown } from "lucide-react";
import useFeedOptions from "../../../Hooks/useFeedOptions";

export default function Home() {
  const [active, setactive] = useState("following");
  const { data: allPosts, isLoading } = useFeedOptions(active);
  const { userData } = useContext(userDataContext);
  const postImageData = useRef();
  const [PostImage, setPostImage] = useState(null);
  const { handleSubmit, register, reset } = useForm({
    defaultValues: { body: "", image: "" }
  });

  const handleImagePreview = () => {
    const image = postImageData.current?.files?.[0];
    if (image) setPostImage(URL.createObjectURL(image));
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data) => {
      const myImage = postImageData.current?.files?.[0];
      const dataForm = new FormData();
      if (myImage) dataForm.append("image", myImage);
      dataForm.append("body", data.body);
      return axiosInterseptor.post(`/posts`, dataForm);
    },
    onSuccess: ({ message }) => {
      toast.success(message);
      reset();
      setPostImage(null);
      queryClient.invalidateQueries({ queryKey: ["posts", active] });
    }
  });

  const feedLabel = {
    following: "Following Feed",
    me: "My Activity",
    all: "Community",
    saved: "Bookmarks"
  }[active];

  const feedIcon = {
    following: <Newspaper size={18} />,
    me: <Sparkles size={18} />,
    all: <Earth size={18} />,
    saved: <Bookmark size={18} />
  }[active];

  return (
    <div className="section-spacing max-w-5xl mx-auto px-4 mt-16 pb-20">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" transition={Bounce} />
      
      {/* Fixed Feed Selector */}
      <div className="fixed left-6 top-28 z-40 hidden xl:block">
        <Dropdown placement="bottom-start" className="glass-card border-none">
          <DropdownTrigger>
            <Button 
              variant="shadow" 
              color="primary" 
              size="lg" 
              radius="full"
              startContent={feedIcon}
              endContent={<ChevronDown size={16} />}
              className="font-black uppercase tracking-widest text-xs h-14 px-6 shadow-xl"
            >
              {feedLabel}
            </Button>
          </DropdownTrigger>
          <DropdownMenu 
            aria-label="Feed selection"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={new Set([active])}
            onSelectionChange={(keys) => setactive(Array.from(keys)[0])}
            className="p-2"
          >
            <DropdownItem key="following" startContent={<Newspaper size={18} />} className="font-bold py-3 px-4 rounded-xl">Following Feed</DropdownItem>
            <DropdownItem key="me" startContent={<Sparkles size={18} />} className="font-bold py-3 px-4 rounded-xl">My Activity</DropdownItem>
            <DropdownItem key="all" startContent={<Earth size={18} />} className="font-bold py-3 px-4 rounded-xl">Community</DropdownItem>
            <DropdownItem key="saved" startContent={<Bookmark size={18} />} className="font-bold py-3 px-4 rounded-xl text-primary font-black">Bookmarks</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <div className="flex flex-col items-center w-full">
        {/* Mobile/Small Screen Feed Selector */}
        <div className="xl:hidden w-full mb-6">
           <Dropdown className="glass-card border-none w-full">
            <DropdownTrigger>
              <Button 
                variant="flat" 
                fullWidth
                size="lg"
                radius="2xl"
                startContent={feedIcon}
                className="font-bold h-14 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200/50"
              >
                {feedLabel}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Feed selection"
              variant="flat"
              onAction={(key) => setactive(key)}
              className="p-2"
            >
              <DropdownItem key="following" startContent={<Newspaper size={18} />}>Following Feed</DropdownItem>
              <DropdownItem key="me" startContent={<Sparkles size={18} />}>My Activity</DropdownItem>
              <DropdownItem key="all" startContent={<Earth size={18} />}>Community</DropdownItem>
              <DropdownItem key="saved" startContent={<Bookmark size={18} />}>Bookmarks</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <main className="w-full flex flex-col gap-8">
          <Card className="glass-card border-none rounded-4xl overflow-hidden shadow-xl">
            <Form onSubmit={handleSubmit(mutate)} className="p-6">
              <div className="flex w-full gap-4">
                <Avatar isBordered color="primary" size="md" src={userData?.photo} showFallback />
                <div className="flex-1 flex flex-col gap-4">
                  <Input
                    {...register('body')}
                    variant="flat"
                    placeholder={`What's on your mind, ${userData?.name?.split(' ')[0]}?`}
                    classNames={{
                      input: "text-lg font-medium",
                      inputWrapper: "bg-transparent hover:bg-slate-100/30 dark:hover:bg-slate-800/30 transition-colors h-14"
                    }}
                  />
                  
                  {PostImage && (
                    <div className="relative w-fit group">
                      <Image src={PostImage} alt="Preview" className="max-h-80 rounded-2xl object-cover border-2 border-primary-500/20 shadow-lg" removeWrapper />
                      <Button
                        isIconOnly variant="shadow" color="danger" size="sm"
                        className="absolute -top-3 -right-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onPress={() => setPostImage(null)}
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/20">
                    <div className="flex gap-2">
                       <Button 
                        onPress={() => postImageData.current.click()} 
                        variant="flat" color="primary" size="sm" radius="full" 
                        startContent={<DocumentUpload size={18} variant="Bulk" />}
                        className="font-bold"
                      >
                        Add Photo
                      </Button>
                      <input name="image" onChange={handleImagePreview} type="file" ref={postImageData} className="hidden" />
                    </div>
                    <Button 
                      type="submit" color="primary" variant="shadow" size="md" radius="full" 
                      className="px-8 font-black uppercase tracking-widest text-xs"
                      endContent={<SendHorizontal size={16} />}
                    >
                      Post it
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          </Card>

          <div className="space-y-6">
            <Posts active={active} allPosts={allPosts} isLoading={isLoading} />
          </div>
        </main>
      </div>
    </div>
  );
}
