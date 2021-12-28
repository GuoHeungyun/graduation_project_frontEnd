import axios from "axios";
import {useRouter} from 'vue-router'
const service = axios.create({
    baseURL: '',
    timeout: 30000
})
// request拦截器
service.interceptors.request.use(
    config => {
        // 这个是 取消重点
        //config.cancelToken = new CancelToken((cancel) => {
        //  CancelStore._axiosPromiseCancel.push(cancel);
        //});
        return config
    },
)
service.interceptors.response.use(
    response => {
        if(!sessionStorage.getItem('username')){
            window.location.href = '/';
        }
        return response
    }
)

export default service
