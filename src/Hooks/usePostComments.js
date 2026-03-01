import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { axiosInterseptor } from "../assets/Components/Shared/Shared"


export function usePostComments(_id, commentImageRef, onSuccessCallback) {


  const [showComments, setShowcoments] = useState(false)
  const [isLoadig, setIsLoading] = useState(
    false
  )

  const { register, reset, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      content: "",
    }, mode: "all",
  })

  const query = useQueryClient()
  function getAllComments() {
    return axiosInterseptor.get(`/posts/${_id}/comments?page=1&limit=10`)
  }


  const { data: comments, isLoading: loadingForComments, isError,refetch:refetchComments } = useQuery({
    queryKey: ["comments", _id],
    queryFn: getAllComments,
    select: function ({ data }) {
      return data.comments
    },
    enabled:false
  })
  function createComment({ content }) {
    const myImage = commentImageRef?.current?.files?.[0]
    const dataForm = new FormData()
    if (myImage) {
      dataForm.append("image", myImage)
    }
    dataForm.append("content", content)
    return axiosInterseptor.post(`/posts/${_id}/comments`, dataForm)
  }
  const { mutate } = useMutation({
    mutationFn: createComment,
    onSuccess: function (data) {
      toast.success(data?.message)
      refetchComments()
      query.invalidateQueries({ queryKey: ["comments", _id] })
      reset()
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: function (error) {
      console.log(error)
    }
  })

  return { mutate, handleSubmit, register, isLoadig, setIsLoading, showComments, setShowcoments, comments, loadingForComments, isError, errors, watch,refetchComments }
}
