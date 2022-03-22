//问题id
export interface questionIdType {
    id: any
}
//问题类型
export interface questionDataType{
    title: string,
    description: any,
    creatorId: string,
    excerpt: string,
}

//回答类型
export interface answerDataType {
    content: string,
    excerpt: string,
    creatorId: string,
    targetId: string
}

//问题id类型
export interface answerIdType{
    answerId: string
}
