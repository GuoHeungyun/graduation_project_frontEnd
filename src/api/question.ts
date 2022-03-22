import axios from "@/utils/request";

import {questionDataType } from '@/ts/apiParamType.ts'

export const createQuestion = (questionData:questionDataType) =>{
    return axios({
        url:'/api/create_question',
        method: 'POST',
        data: questionData
    })
}

export const getQuestion = (id?:string) => {
    return axios({
        url:'/api/get_question',
        method: 'POST',
        data: {
            id: id
        }
    })
}
