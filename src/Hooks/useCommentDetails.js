import { useContext, useState } from "react"
import { userDataContext } from "../assets/Context/AuthUserData"
import { useMutation } from "@tanstack/react-query"
import { axiosInterseptor } from "../assets/Components/Shared/Shared"

export default function useCommentDetails(_id, likes, post) {
    const { userData } = useContext(userDataContext);
    const [Liked, setLiked] = useState(() => likes?.includes(userData?._id));

    const { mutate: likeCommentFunc } = useMutation({
        mutationFn: () => axiosInterseptor.put(`/posts/${post}/comments/${_id}/like`, {}),
        onSuccess: (data) => {
            setLiked(data?.data?.liked ?? !Liked);
        },
        onError: (error) => {
            console.log(`Error toggling like for comment ${_id}:`, error);
        }
    });

    return { Liked, likeCommentFunc, setLiked };
}
