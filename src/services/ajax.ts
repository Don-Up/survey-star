import axios from "axios"
import {message} from "antd";

const instance = axios.create({
    timeout: 10 * 1000
})

instance.interceptors.response.use(res => {
    const resData = (res.data || {}) as ResDataType
    const {errno, data, msg} = resData
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