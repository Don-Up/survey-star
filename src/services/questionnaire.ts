import instance, {ResDataType} from "./ajax";

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
 * Access to individual questionnaire information (Fixed)
 * @param id
 */
export async function getQuestionnaireService(id: string): Promise<ResDataType> {
    const url = `/api/questionnaire/${id}`
    return (await instance.get(url)) as ResDataType
}

/**
 * Create a questionnaire (Fixed)
 */
export async function createQuestionnaireService()    {
    const url = '/api/questionnaire/create'
    const postData = {
        title: 'New title',
        description: 'New description.'
    };
    return (await instance.post(url, postData)) as ResDataType
}

export async function updateQuestionnaireService(id: string, data: any) {
    const url = `/api/questionnaire/${id}`;
    const response = await instance.patch(url, data);
    return response.data; // 返回真正的业务数据部分
}

export async function restoreDeletedQuestionnaireService(ids: number[]){
    const url = "/api/questionnaire/restore"
    const response = await instance.post(url, { ids });
    return response.data;
}

export async function copyQuestionnaireService(id: string) {
    const url = `/api/questionnaire/duplicate/${id}`;
    const response = await instance.post(url);
    return response.data; // 返回真正的业务数据部分
}

export async function deleteQuestionnaireService(ids: number[]) {
    const url = `/api/questionnaire`;
    const response = await instance.delete(url, {
        data: { ids }, // 在 config.data 中传递 body 数据
    });
    return response.data; // 返回真正的业务数据部分
}


/*
 * Get the list of questionnaire(Fixed)
 */
export async function getQuestionnaireListService(opt: Partial<SearchOptions>)  {
    const url = "/api/questionnaire"
    return (await instance.get(url, {params: opt}) as ResDataType)
}