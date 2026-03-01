import {
  Button,
  CardBody,Card,
  CardHeader,
  Textarea,
  CardFooter,
  Avatar,
  Form,
  Toast
} from "@heroui/react";
import { X } from "lucide-react";
import { axiosInterseptor } from "../../Shared/Shared";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
export default function SharePost({postData,setShowShare}) {
  const {body,image,user:{name,photo},privacy,createdAt,commentsCount,sharesCount,_id,topComment,likes} = postData

  const schema = z.object({
    body:z.string().nonempty("is not allowed to be empty")
  })

  const {register,handleSubmit,formState:{errors}} = useForm({
    defaultValues:{
      body:""
    },
    mode:"onSubmit",
    resolver:zodResolver(schema)
  })
  function sharePost(body){
   return axiosInterseptor.post(`/posts/${postData?._id}/share`,body)
  }

  const {
    mutate,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: sharePost,
  
    onSuccess: ({message,success}) => {
      if (success) {
        toast.success(message);
        setShowShare(false);
      }else{
        toast.error(message);
        setShowShare(false);
      }
    },
  
  });

 
 
 
 return ( <Card className="w-full max-w-140 rounded-2xl border border-slate-200 bg-white shadow-2xl">
    
          {/* Header */}
        <Form onSubmit={handleSubmit(mutate)}>
        <CardHeader className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <h4 className="text-base font-extrabold text-slate-900">
              Share post
            </h4>
    
            <Button
                 onPress={function(){
                  setShowShare(false)
                }}
              isIconOnly
              variant="light"
              radius="full"
              className="text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={16} />
            </Button>
          </CardHeader>
    
          {/* Body */}
          <CardBody className="space-y-3 p-4">
    
            <Textarea
            {...register("body")}
              isInvalid={!!errors.body}
              errorMessage={errors.body?.message}
              placeholder="Say something about this..."
              minRows={3}
              maxLength={500}
              color="primary"
              variant="bordered"
              classNames={{
                input:
                  "text-sm text-slate-800 focus:ring-[#1877f2]/20",
              }}
            />
    
            <Card className="rounded-xl border border-slate-200 bg-slate-50 shadow-none">
              <CardBody className="p-3">
    
                <div className="flex items-center gap-2">
                  <Avatar
                    src={photo}
                    showFallback
                    className="h-8 w-8"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {name}
                    </p>
                    <p className="truncate text-xs font-semibold text-slate-500">
                    <span>@{name.split(" ",3).join("").toLowerCase()}</span>
                    </p>
                  </div>
                </div>
    
                <p className="my-2 whitespace-pre-wrap text-sm text-slate-800">
                 {body}
                </p>
    
               
           {
            image &&     <img
            src={image}
            alt="post preview"
            className="max-h-55 w-full object-cover rounded-lg"
          />
           }
    
              
              </CardBody>
            </Card>
          </CardBody>
    
          {/* Footer */}
          <CardFooter className="flex items-center justify-end gap-2 border-t border-slate-200 px-4 py-3">
            <Button
          
            onPress={function(){
              setShowShare(false)
            }}
              variant="bordered"
              className="font-bold text-slate-700"
            >
              Cancel
            </Button>
    
            <Button 
              type="submit"
              isLoading={isPending}
              className="bg-[#1877f2] font-bold text-white hover:bg-[#166fe5]">
              Share now
            </Button>
          </CardFooter>
        </Form>
    
        </Card>
      );
    }
  
 
     
             
     
