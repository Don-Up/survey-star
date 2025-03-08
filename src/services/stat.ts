import instance, {ResDataType} from "./ajax";


export async function getQuestionnaireStatListService(
    questionnaireId: string,
    option: { page: number, pageSize: number }
) {
    const {page, pageSize} = option
    const url = `/api/questionnaire/stat/${questionnaireId}`

    const data = await instance.get(url + `?page=${page}&pageSize=${pageSize}`)

    return data as ResDataType
}

// Get the summary of the questionnaire statistic
export async function getComponentStatService(questionnaireId: string, componentId: string) {
    const url = `/api/questionnaire/stat/${questionnaireId}/${componentId}`
    const data = await instance.get(url)
    return data as ResDataType
}