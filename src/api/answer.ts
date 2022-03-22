import axios from "@/utils/request";

import {answerDataType, questionIdType} from "@/ts/apiParamType.ts"

export const createAnswer = (answerData:answerDataType) =>{
    return axios({
        url: '/api/create_answer',
        method: 'POST',
        data: answerData
    })
}

export const getAnswer = (questionId?: questionIdType) => {
    return axios({
        url: '/api/get_answer',
        method: 'POST',
        data: questionId
    })
}
