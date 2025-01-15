import {ResDataType} from "./ajax";
import axios from "axios";

type SearchOptions = {
    // page: number,
    // pageSize: number,
    keyword?: string,
    isStar?: boolean,
    isDeleted?: boolean
    page: number
    pageSize: number
}

/**
 * Access to individual questionnaire information
 * @param id
 */
export async function getQuestionnaireService(id: string): Promise<ResDataType> {
    const url = `/api/questionnaire/${id}`
    return (await axios.get(url)) as ResDataType
}

/**
 * Create a questionnaire
 */
export async function createQuestionnaireService()    {
    const url = '/api/questionnaire'
    const postData = {
        title: 'New title',
        description: 'New description.'
    };
    return await axios.post(url, postData)
    // const data = (await axios.post(url, postData)) as ResDataType
    // return data
}

export async function updateQuestionnaireService(id: string, data: any) {
    const url = `/api/questionnaire/${id}`;
    const response = await axios.patch(url, data);
    return response.data; // 返回真正的业务数据部分
}

export async function restoreDeletedQuestionnaireService(ids: number[]){
    const url = "/api/questionnaire/restore"
    const response = await axios.post(url, { ids });
    return response.data;
}

export async function copyQuestionnaireService(id: string) {
    const url = `/api/questionnaire/duplicate/${id}`;
    const response = await axios.post(url);
    return response.data; // 返回真正的业务数据部分
}

export async function deleteQuestionnaireService(id: string) {
    const url = `/api/questionnaire/${id}`;
    const response = await axios.delete(url);
    return response.data; // 返回真正的业务数据部分
}

/*
 * Get the list of questionnaire
 */
export async function getQuestionnaireListService(opt: Partial<SearchOptions>)  {
    const url = "/api/questionnaire"
    return (await axios.get(url, {params: opt}) as ResDataType)
}