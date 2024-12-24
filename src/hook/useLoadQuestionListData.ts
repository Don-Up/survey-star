import {useSearchParams} from "react-router-dom";
import {useRequest} from "ahooks";
import {LIST_SEARCH_PARAM_KEY} from "../constant";
import {getQuestionnaireListService} from "../services/questionnaire";

/*
 * Load questionnaire list data
 */
function useLoadQuestionnaireListData(){
    const [searchParams] = useSearchParams()
    console.log("keyword", searchParams.get("keyword"))

    const {data, loading, error} = useRequest(async () => {
        const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ""
        const data = await getQuestionnaireListService({keyword})
        return data
    }, {
        refreshDeps: [searchParams]
    })

    return {data, loading, error}
}

export default useLoadQuestionnaireListData