import {
  CardBody,Card,
  SelectItem,
  Select,
} from "@heroui/react";
import { MessageCircle} from "lucide-react";
import CommentCard from "../../CommentCard/CommentCard";
import Spinners from "../../Shared/Spinners";
import { usePostComments } from "../../../../Hooks/usePostComments";
export default function ModalForCommentsAndAther({postId}) {

 const {comments,loadingForComments,isError} =  usePostComments(postId,"",true)

    if (isError) {
      return <h1 className="bg-red-300 p-4 m-4 rounded-3xl text-white">ERROR</h1>
    }
    if (loadingForComments) {
      return  <Spinners lable={"Fetching post Comments"}/>
    }

 

  return (
    <>
      <div className="border-t border-slate-50  px-4 py-4">

      
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
        
        <div className="flex items-center gap-2">
          <p className="text-sm font-extrabold tracking-wide text-slate-700">
            Comments 
          </p>
          <span className="rounded-full bg-[#e7f3ff] px-2 py-0.5 text-[11px] font-bold text-[#1877f2]">
          {comments?.length}
          </span>
        </div>

        <Select
          size="sm"
          defaultSelectedKeys={["relevant"]}
          className="max-w-35"
        >
          <SelectItem key="relevant">Most relevant</SelectItem>
          <SelectItem key="newest">Newest</SelectItem>
        </Select>
      </div>

     
      {
        comments.length === 0  ?  <Card className="rounded-2xl border border-slate-200 shadow-none">
        <CardBody className="px-4 py-8 text-center">

          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#eef3ff] text-[#1877f2]">
            <MessageCircle size={22} />
          </div>

          <p className="text-lg font-extrabold text-slate-800">
            No comments yet
          </p>

          <p className="mt-1 text-sm font-medium text-slate-500">
            Be the first to comment.
          </p>

        </CardBody>
      </Card> : comments.map((comment)=><CommentCard key={comment._id} comment={comment}/>)
          

      }
      <div className="mt-3 flex items-start gap-2">
        
        {/* <Avatar
          src={userData.photo}
          className="h-9 w-9"
        /> */}

        {/* <div className="w-full rounded-2xl border border-slate-200 bg-[#f0f2f5] px-2.5 py-1.5 focus-within:border-[#c7dafc] focus-within:bg-white transition">

          <Textarea
            placeholder="Comment as Memo..."
            minRows={1}
            classNames={{
              input:
                "bg-transparent text-sm resize-none outline-none placeholder:text-slate-500",
              innerWrapper: "bg-transparent"
            }}
          />

          <div className="mt-1 flex items-center justify-between">
            
            <div className="flex items-center gap-1">
              
              <Button
                isIconOnly
                variant="light"
                className="text-slate-500 hover:text-emerald-600"
              >
                <ImageIcon size={16} />
              </Button>

              <Button
                isIconOnly
                variant="light"
                className="text-slate-500 hover:text-amber-500"
              >
                <Smile size={16} />
              </Button>

            </div>

            <Button
              isIconOnly
              size="sm"
              className="bg-[#1877f2] text-white hover:bg-[#166fe5]"
              isDisabled
            >
              <SendHorizontal size={16} />
            </Button>

          </div>
        </div> */}
      </div>

    </div>
    </>
  );
}
