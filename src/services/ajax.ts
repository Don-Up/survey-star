import axios from "axios"
import {message} from "antd";
import {getToken} from "../utils/user-info";

const instance = axios.create({
    timeout: 10 * 1000
})

instance.interceptors.request.use(config => {
    console.log(config.url)
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, error => Promise.reject(error))

instance.interceptors.response.use(res => {
    const resData = (res.data || {}) as ResDataType
    console.log("resData", resData)
    const {errno, data = {}, msg = ""} = resData
    if (errno === 0) {
        return data
    } else {
        message.error(msg).then(r => null)
        return Promise.reject(msg)
    }
})

export default instance

export type ResType = {
    errno: number
    data?: ResDataType
    msg?: string
}

export type ResDataType = {
    [key: string]: any
}