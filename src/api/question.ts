import axios from "@/utils/request";

import {questionDataType, questionIdType } from '@/ts/paramType.ts'

export const createQuestion = (questionData:questionDataType) =>{
    return axios({
        url:'/api/create_question',
        method: 'POST',
        data: questionData
    })
}

export const getQuestion = (data?:questionIdType) => {
    return axios({
        url:'api/get_question',
        method: 'POST',
        data
    })
}
