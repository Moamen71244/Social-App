import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, Divider, Form, Textarea, Image, Modal, ModalContent, ModalBody, useDisclosure, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { ThumbsUp, MessageCircle, Share2, Globe, SendHorizontal, ImageIcon, ExternalLink, Bookmark, X, MoreVertical, Edit2, Trash2, Check, RotateCcw } from "lucide-react";
import { useRef, useState, useContext } from "react";
import { Link } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ModalForCommentsAndAther from "./CommentsCard/ModalForCommentsAndAther";
import { usePostComments } from "../../../Hooks/usePostComments";
import usePostDetails from "../../../Hooks/usePostDetails";
import useSavePost from "../../../Hooks/useSavePost";
import { userDataContext } from "../../Context/AuthUserData";
import { axiosInterseptor } from "../Shared/Shared";
import { formatTime } from "../Shared/utils";
import SharePost from "./sharePost/SharePost";

export default function PostCard({ postData, inPosts = true, active }) {
  const { userData } = useContext(userDataContext);
  const commentImageData = useRef();
  const queryClient = useQueryClient();
  const { body, image, user: { name, photo, _id: postCreatorID }, privacy, createdAt, commentsCount, sharesCount, _id, topComment, likes, isShare, sharedPost, bookmarked } = postData;

  const removeSelectedImage = () => {
    setSelectedImagePreview(null);
    if (commentImageData.current) commentImageData.current.value = "";
  };

  const { mutate, handleSubmit, register, isLoadig, showComments, setShowcoments, errors, watch, comments, refetchComments } = usePostComments(_id, commentImageData, removeSelectedImage);
  const { likePostFunc, Liked, postLikes } = usePostDetails(_id, likes);
  const [ShowShare, setShowShare] = useState(false);
  const { saveNow, saved } = useSavePost(postData._id);
  const [Saved, setSaved] = useState(saved || bookmarked);
  const [likedByMe, setLikedByMe] = useState(Liked || likes?.includes(userData?._id));
  const { isOpen: isLightboxOpen, onOpen: onOpenLightbox, onOpenChange: onLightboxChange } = useDisclosure();
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(body);

  const handleEdit = () => { setIsEditing(true); setEditedBody(body); };
  const handleSaveEdit = () => {
    const myform = new FormData();
    myform.append("body", editedBody);
    axiosInterseptor.put(`/posts/${_id}`, myform).then(() => {
      queryClient.invalidateQueries({ queryKey: ["posts", active,localStorage.getItem("userdata")] });
    });
    setIsEditing(false);
  };
  const handleCancelEdit = () => { setIsEditing(false); setEditedBody(body); };
  const handleDelete = () => {
    axiosInterseptor.delete(`/posts/${postData.id || _id}`).then((data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["posts", active,localStorage.getItem("userdata")] });
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setSelectedImagePreview(URL.createObjectURL(file));
  };

  const openLightbox = (imgUrl) => {
    setLightboxImage(imgUrl);
    onOpenLightbox();
  };

  const PostHeader = ({ creatorID, creatorName, creatorPhoto }) => (
    <CardHeader className="flex items-start justify-between gap-3 pt-5 px-6">
      <div className="flex items-center gap-3 w-full">
        <Avatar src={creatorPhoto} className="h-10 w-10 border-2 border-primary-100 ring-2 ring-offset-2 ring-primary-50/50" />
        <div className="flex flex-col flex-1 min-w-0">
          <Link to={`/profile/${creatorID}`} className="text-sm font-bold truncate hover:text-primary-600 transition-colors display-font">
            {creatorName}
          </Link>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
            <span className="truncate">@{creatorName.split(" ", 2).join("").toLowerCase()}</span>
            <span className="opacity-50">•</span>
            <span>{formatTime(createdAt)}</span>
            <span className="opacity-50">•</span>
            <Globe size={10} className="opacity-70" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {creatorID === userData?._id && (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light" className="rounded-full text-slate-400">
                <MoreVertical size={16} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Post actions" variant="flat">
              <DropdownItem key="edit" startContent={<Edit2 size={14} />} onPress={handleEdit}>Edit Post</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger" startContent={<Trash2 size={14} />} onPress={handleDelete}>Delete Post</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
        <Button
          isIconOnly size="sm" variant={Saved ? "flat" : "light"} color={Saved ? "primary" : "default"}
          className="rounded-full" onPress={() => { setSaved(p => !p); saveNow(); }}
        >
          <Bookmark size={16} fill={Saved ? "currentColor" : "none"} />
        </Button>
      </div>
    </CardHeader>
  );

  return (
    <Card className={`glass-card border-none transition-all  duration-500 hover:shadow-2xl mb-6 ${inPosts ? "w-full rounded-4xl" : "w-full rounded-3xl  max-w-4xl mx-auto mt-4"}`}>
      <PostHeader creatorID={postCreatorID} creatorName={name} creatorPhoto={photo} />
      
      <CardBody className="px-6 py-3">
        {isEditing ? (
          <div className="flex flex-col gap-3 p-1">
            <Textarea value={editedBody} onValueChange={setEditedBody} variant="flat" classNames={{ input: "text-base" }} />
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="light" startContent={<RotateCcw size={14} />} onPress={handleCancelEdit}>Cancel</Button>
              <Button size="sm" color="primary" variant="shadow" startContent={<Check size={14} />} onPress={handleSaveEdit}>Save Changes</Button>
            </div>
          </div>
        ) : (
          <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-300 font-medium">{body}</p>
        )}
      </CardBody>

      {isShare && sharedPost && (
        <div className="px-6 pb-4">
          <Card className="overflow-hidden rounded-2xl border border-slate-200/50 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/20 shadow-none">
            <CardBody className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Avatar src={sharedPost.user.photo} size="sm" />
                  <div>
                    <p className="text-xs font-bold">{sharedPost.user.name}</p>
                    <p className="text-[10px] text-slate-500">@{sharedPost.user.name.replace(/\s+/g, "").toLowerCase()}</p>
                  </div>
                </div>
                {inPosts && <Button as={Link} hideBeforeLoading to={`/home/${sharedPost._id}`} size="sm" variant="flat" color="primary" className="h-7 text-[10px] font-bold">View Original</Button>}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">{sharedPost.body}</p>
            </CardBody>
            {sharedPost.image && (
              <div className="cursor-pointer overflow-hidden max-h-80" onClick={() => openLightbox(sharedPost.image)}>
                <Image src={sharedPost.image} alt="Shared" className="w-full object-cover" removeWrapper />
              </div>
            )}
          </Card>
        </div>
      )}

      {image && !isShare && (
        <div className="px-4 pb-4 cursor-pointer" onClick={() => openLightbox(image)}>
          <div className="overflow-hidden rounded-2xl border border-slate-100/10 shadow-sm transition-transform duration-700 group">
            <Image src={image} alt="Post" className="w-full object-cover max-h-[500px] group-hover:scale-[1.03] transition-transform duration-700" removeWrapper />
          </div>
        </div>
      )}

      <CardFooter className="flex flex-col px-6 py-4 gap-4">
        <div className="flex justify-between w-full items-center text-[11px] font-bold text-slate-400 uppercase tracking-tight">
          <div className="flex items-center gap-1.5 group cursor-pointer">
            <div className="h-5 w-5 rounded-full bg-primary-500 flex items-center justify-center text-white shadow-lg">
              <ThumbsUp size={10} fill="currentColor" />
            </div>
            <span className="group-hover:text-primary-500 transition-colors">{postLikes?.length || likes?.length || 0} Likes</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-primary-500 transition-colors cursor-pointer">{comments?.length || commentsCount || 0} Comments</span>
            <span className="hover:text-primary-500 transition-colors cursor-pointer">{sharesCount || 0} Shares</span>
          </div>
        </div>

        <Divider className="opacity-30" />

        <div className="grid grid-cols-3 gap-2 w-full">
          <Button
            variant={likedByMe ? "shadow" : "light"} color={likedByMe ? "primary" : "default"}
            className={`font-bold h-10 ${likedByMe ? "" : "text-slate-500"}`}
            startContent={<ThumbsUp size={18} className={likedByMe ? "fill-current" : ""} />}
            onPress={() => { setLikedByMe(p => !p); likePostFunc(); }}
          >Like</Button>
          <Button
            variant="light" className="font-bold h-10 text-slate-500" isDisabled={!!isLoadig}
            startContent={<MessageCircle size={18} />}
            onPress={() => { if (!showComments) refetchComments(); setShowcoments(p => !p); }}
          >Comment</Button>
          <Button
            variant="light" className="font-bold h-10 text-slate-500"
            startContent={<Share2 size={18} />}
            onPress={() => setShowShare(p => !p)}
          >Share</Button>
        </div>
      </CardFooter>

      {topComment && !showComments && (
        <div className="mx-6 mb-4 rounded-2xl bg-primary-50/30 dark:bg-slate-800/30 p-4 border border-primary-100/20">
          <p className="mb-2 text-[9px] font-black uppercase tracking-widest text-primary-500">Highlight</p>
          <div className="flex items-start gap-3">
            <Avatar size="sm" src={topComment.commentCreator.photo} />
            <div className="flex-1">
              <p className="text-xs font-bold">{topComment.commentCreator.name}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{topComment.content}</p>
            </div>
          </div>
        </div>
      )}

      {showComments && <div className="px-2 mb-2"><ModalForCommentsAndAther postId={_id} /></div>}

      <div className="mx-6 mb-6 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 p-2 shadow-inner">
        <Form onSubmit={(e) => { handleSubmit(mutate)(e); removeSelectedImage(); }} className="flex flex-col">
          <Textarea 
            {...register("content")} placeholder="Share your thoughts..." minRows={1}
            classNames={{ input: "bg-transparent text-sm p-2", innerWrapper: "bg-transparent" }}
          />
          <div className="flex items-center justify-between px-2 mt-1">
            <div className="flex items-center gap-1">
              <Button isIconOnly variant="light" size="sm" className="text-slate-400" onPress={() => commentImageData.current.click()}><ImageIcon size={18} /></Button>
              {selectedImagePreview && (
                <div className="relative">
                  <Image src={selectedImagePreview} className="w-8 h-8 rounded-lg object-cover border border-primary-200" removeWrapper />
                  <Button isIconOnly size="sm" variant="solid" color="danger" className="absolute -top-1 -right-1 w-4 h-4 min-w-0 rounded-full" onPress={removeSelectedImage}><X size={10} /></Button>
                </div>
              )}
            </div>
            <input type="file" ref={commentImageData} className="hidden" onChange={handleImageChange} />
            <Button isDisabled={watch("content")?.length < 2 || isLoadig} isIconOnly size="sm" color="primary" variant="shadow" type="submit" className="rounded-xl"><SendHorizontal size={16} /></Button>
          </div>
        </Form>
      </div>

      {ShowShare && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4"><SharePost postData={postData} setShowShare={setShowShare} /></div>}

      <Modal isOpen={isLightboxOpen} onOpenChange={onLightboxChange} size="5xl" backdrop="blur" classNames={{ base: "bg-transparent shadow-none", backdrop: "bg-black/90" }}>
        <ModalContent>{(onClose) => (
          <ModalBody className="p-0 flex items-center justify-center relative min-h-[50vh]">
            <Button isIconOnly variant="light" onPress={onClose} className="absolute top-4 right-4 text-white z-[110] bg-white/10 hover:bg-white/20 rounded-full"><X size={20} /></Button>
            <Image src={lightboxImage} alt="Preview" className="max-h-[85vh] object-contain" removeWrapper />
          </ModalBody>
        )}</ModalContent>
      </Modal>
    </Card>
  );
}
