import axios from "axios"
import {message} from "antd";
import {getToken} from "../utils/user-info";

const instance = axios.create({
    timeout: 10 * 1000
})

instance.interceptors.request.use(config => {
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, error => Promise.reject(error))

instance.interceptors.response.use(res => {
    const resData = (res.data || {}) as ResDataType
    const date = new Date()
    console.info(res.config.url, `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}\n`,
        resData.errno===0?resData.data:resData.msg)
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