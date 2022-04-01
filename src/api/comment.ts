import axios from "@/utils/request";

export const getComment = (commentData:any) => {
    return axios({
        url:'',
        method: 'POST',
        data: commentData
    })
}

export const createComment = (commentData?:any) => {
    return axios({
        url: '/api/create_comment',
        method: 'POST',
        data: commentData
    })
}
