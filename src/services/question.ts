import {ResDataType} from "./ajax";
import axios from "axios";


export async function getQuestionService(id: string): Promise<ResDataType> {
    const url = `/api/question/${id}`
    const data = (await axios.get(url)) as ResDataType
    return data
}

export async function createQuestionService()    {
    const url = '/api/question'
    const data = (await axios.post(url)) as ResDataType
    return data
}

export async function getQuestionListService() {
    const url = "/api/question"
    const data = (await axios.get(url) as ResDataType)
    return data
}