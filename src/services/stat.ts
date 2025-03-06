import instance, {ResDataType} from "./ajax";


export async function getQuestionnaireStatListService(
    questionnaireId: string,
    option: {page: number, pageSize: number}
){
    const { page, pageSize } = option
    const url = `/api/questionnaire/stat/${questionnaireId}`

    const data = await instance.get(url+`?page=${page}&pageSize=${pageSize}`)
    console.log(data)

    return data as ResDataType
}