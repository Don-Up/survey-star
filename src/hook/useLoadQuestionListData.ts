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
function useLoadQuestionnaireListData(opt: Partial<OptionType> = {}){

    const {isStar = false, isDeleted = false} = opt

    const [searchParams] = useSearchParams()
    console.log("keyword", searchParams.get("keyword"))

    const {data, loading, error} = useRequest(async () => {
        const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ""
        const data = await getQuestionnaireListService({keyword, isStar, isDeleted})
        return data
    }, {
        refreshDeps: [searchParams]
    })

    return {data, loading, error}
}

export default useLoadQuestionnaireListData