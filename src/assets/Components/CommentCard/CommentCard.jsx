import { Card, CardBody, Image, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Textarea, Avatar, Button } from "@heroui/react";
import { MoreVertical, Edit2, Trash2, Check, RotateCcw, ThumbsUp } from "lucide-react";
import { useContext, useState } from "react";
import { userDataContext } from "../../Context/AuthUserData";
import useCommentDetails from "../../../Hooks/useCommentDetails";
import { axiosInterseptor } from "../Shared/Shared";
import { usePostComments } from "../../../Hooks/usePostComments";
import { formatTime } from "../Shared/utils";

export default function CommentCard({ comment }) {
  const { content, commentCreator: { name, photo, username, _id: commentCreatorID }, post, likes, createdAt, image, _id } = comment;
  const { refetchComments } = usePostComments(post);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const { userData } = useContext(userDataContext);
  const { Liked, likeCommentFunc } = useCommentDetails(_id, likes, post);
  const [isLikedByMe, setIsLikedByMe] = useState(Liked);

  const handleEdit = () => { setIsEditing(true); setEditedContent(content); };
  const handleSaveEdit = () => {
    const myCommentFormData = new FormData();
    myCommentFormData.append('content', editedContent);
    axiosInterseptor.put(`/posts/${post}/comments/${_id}`, myCommentFormData).then(() => {
      refetchComments();
    });
    setIsEditing(false);
  };
  const handleCancelEdit = () => { setIsEditing(false); setEditedContent(content); };
  const handleDelete = () => {
    axiosInterseptor.delete(`/posts/${post}/comments/${_id}`).then(() => {
      refetchComments();
    });
  };

  return (
    <div className="flex gap-2 px-2 py-1 group/comment">
      <Avatar src={photo} alt={name} size="sm" radius="full" className="mt-1 shadow-sm border border-slate-100/50 w-7 h-7" />
      <div className="flex-1 min-w-0">
        <div className="bg-slate-100/60 dark:bg-slate-800/40 rounded-xl px-2.5 py-1.5 border border-slate-200/50 shadow-sm relative">
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 hover:underline cursor-pointer">{name}</span>
            </div>
            {commentCreatorID === userData?._id && (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light" className="h-5 w-5 min-w-0 rounded-full text-slate-400 opacity-0 group-hover/comment:opacity-100 transition-opacity">
                    <MoreVertical size={12} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Comment actions" variant="flat">
                  <DropdownItem key="edit" startContent={<Edit2 size={12} />} onPress={handleEdit}>Edit</DropdownItem>
                  <DropdownItem key="delete" className="text-danger" color="danger" startContent={<Trash2 size={12} />} onPress={handleDelete}>Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </div>
          {isEditing ? (
            <div className="mt-1 flex flex-col gap-1.5">
              <Textarea value={editedContent} onValueChange={setEditedContent} variant="bordered" size="sm" classNames={{ input: "text-xs" }} />
              <div className="flex justify-end gap-1.5">
                <Button size="sm" variant="light" className="h-6 text-[10px]" startContent={<RotateCcw size={10} />} onPress={handleCancelEdit}>Cancel</Button>
                <Button size="sm" color="primary" variant="shadow" className="h-6 text-[10px]" startContent={<Check size={10} />} onPress={handleSaveEdit}>Save</Button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug font-medium">{content}</p>
          )}
          {isLikedByMe && (
            <div className="absolute -bottom-1.5 -right-1.5 bg-white dark:bg-slate-700 shadow-sm rounded-full p-0.5 flex items-center gap-0.5 border border-slate-100/10 scale-90">
              <div className="bg-primary-500 rounded-full p-0.5 text-white"><ThumbsUp size={6} fill="currentColor" /></div>
              <span className="text-[8px] font-bold text-primary-500 pr-0.5">{likes?.length || 1}</span>
            </div>
          )}
        </div>
        {image && (
          <div className="mt-1.5 overflow-hidden rounded-lg border border-slate-200/20 w-fit max-w-[150px]">
            <Image alt="Comment Media" src={image} className="object-cover cursor-zoom-in" removeWrapper />
          </div>
        )}
        <div className="mt-1 flex items-center gap-3 px-1">
          <span className="text-[9px] font-bold text-slate-400">{formatTime(createdAt)}</span>
          <button 
            onClick={() => { setIsLikedByMe(p => !p); likeCommentFunc(); }}
            className={`text-[9px] font-black uppercase tracking-wider hover:underline transition-colors ${isLikedByMe ? "text-primary-600" : "text-slate-500"}`}
          >Like</button>
          <button className="text-[9px] font-black uppercase tracking-wider text-slate-500 hover:text-primary-600 hover:underline transition-colors">Reply</button>
        </div>
      </div>
    </div>
  );
}
