import {ResDataType} from "./ajax";
import axios from "axios";

type SearchOptions = {
    // page: number,
    // pageSize: number,
    keyword?: string,
    isStar?: boolean,
    isDeleted?: boolean
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

/*
 * Get the list of questionnaire
 */
export async function getQuestionnaireListService(opt: Partial<SearchOptions>)  {
    const url = "/api/questionnaire"
    const data = (await axios.get(url, { params: opt }) as ResDataType)
    return data
}