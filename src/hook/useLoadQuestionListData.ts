import {useSearchParams} from "react-router-dom";
import {useRequest} from "ahooks";
import {LIST_SEARCH_PARAM_KEY} from "../constant";
import {getQuestionnaireListService} from "../services/questionnaire";

type OptionType = {
    isStar: boolean
    isDeleted: boolean
    page: number
    pageSize: number
}

/*
 * Load questionnaire list data
 */
function useLoadQuestionnaireListData(callback: (list: [], total: number) => void, opt: Partial<OptionType> = {}){
    const [searchParams] = useSearchParams()
    const {isStar, isDeleted} = opt

    const {loading} = useRequest(async () => {
        const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ""
        const page = parseInt(searchParams.get("page") || "1")
        const pageSize = parseInt(searchParams.get("pageSize") || "10")
        return await getQuestionnaireListService({keyword, isStar, isDeleted, page, pageSize})
    }, {
        refreshDeps: [searchParams],
        onSuccess: (data) => {
            console.log("total ", data.data.data.pagination.total)
            callback(data.data.data.list, data.data.data.pagination)
        }
    })

    return {loading}
}

export default useLoadQuestionnaireListData