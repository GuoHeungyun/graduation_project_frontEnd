import axios from "@/utils/request";

interface userDataType {
    username?: string,
    phone: string,
    password?: string
}
export const findUser = (userData: userDataType) => {
    return axios({
        url:'/api/login/finduser',
        method: 'POST',
        data: userData
    })
}

export const insertUser = (userData: userDataType) => {
    return axios({
        url:'/api/login/insertuser',
        method: 'POST',
        data: userData
    })
}

export const updateUsername = (userData: {username:string, phone:string}) => {
    return axios({
        url: 'api/login/updateusername',
        method: 'POST',
        data: userData
    })
}

export const updatePhone = (userData: {oldPhone:string, newPhone:string}) => {
    return axios({
        url: 'api/login/updatephone',
        method: 'POST',
        data: userData
    })
}

export const updatePassword = (userData: {phone:string, password:string}) => {
    return axios({
        url: 'api/login/updatepassword',
        method: 'POST',
        data: userData
    })
}

export const updateIntroduction = (userData: {phone:string, introduction:string}) => {
    return axios({
        url: 'api/login/updateintroduction',
        method: 'POST',
        data: userData
    })
}
