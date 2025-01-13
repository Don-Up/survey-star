import {useSearchParams} from "react-router-dom";
import {useRequest} from "ahooks";
import {LIST_SEARCH_PARAM_KEY} from "../constant";
import {getQuestionnaireListService} from "../services/questionnaire";

type OptionType = {
    isStar: boolean
    isDeleted: boolean
}

/*
 * Load questionnaire list data
 */
function useLoadQuestionnaireListData(callback: (list: [], total: number) => void, opt: Partial<OptionType> = {}){
    const [searchParams] = useSearchParams()
    const {isStar, isDeleted} = opt

    const {loading} = useRequest(async () => {
        const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ""
        console.log("keyword", keyword)
        return await getQuestionnaireListService({keyword, isStar, isDeleted})
    }, {
        refreshDeps: [searchParams],
        onSuccess: (data) => {
            callback(data.data.data.list, data.data.data.total)
        }
    })

    return {loading}
}

export default useLoadQuestionnaireListData