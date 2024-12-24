import {ResDataType} from "./ajax";
import axios from "axios";

type SearchOptions = {
    // page: number,
    // pageSize: number,
    keyword?: string
}

/**
 * Access to individual questionnaire information
 * @param id
 */
export async function getQuestionnaireService(id: string): Promise<ResDataType> {
    const url = `/api/questionnaire/${id}`
    const data = (await axios.get(url)) as ResDataType
    return data
}

/**
 * Create a questionnaire
 */
export async function createQuestionnaireService()    {
    const url = '/api/questionnaire'
    const data = (await axios.post(url)) as ResDataType
    return data
}

/*
 * Get the list of questionnaire
 */
export async function getQuestionnaireListService(opt: Partial<SearchOptions>) {
    const url = "/api/questionnaire"
    const data = (await axios.get(url) as ResDataType)
    return data
}