import {useParams} from "react-router-dom";
import {useRequest} from "ahooks";
import {getQuestionnaireService} from "../services/questionnaire";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {resetComponents} from "../store/componentsReducer";
import {resetPageInfo} from "../store/pageInfoReducer";

/**
 * A hook to load the questionnaire data
 */
function useLoadQuestionnaireData1() {
    // Get the id from the url
    const {id = ""} = useParams()
    const dispatch = useDispatch()

    // Load the questionnaire data
    const {data, loading, error, run} = useRequest(async (id: string) => {
        if (!id) throw new Error("id is required")
        return await getQuestionnaireService(id)
    }, {
        manual: true,
    })

    // Store the component data in the store
    useEffect(() => {
        if (!data) return
        const {title = "", description = "", js = "", css = "", isPublished = false,  components = []} = data
        // Store the component data in the store
        dispatch(resetComponents(components))
        // reset pageInfo
        dispatch(resetPageInfo({title, description, js, css, isPublished}))
    }, [data])

    // Reload the questionnaire data when the id changes
    useEffect(() => {
        run(id)
    }, [id])

    return {loading, error}
}

export default useLoadQuestionnaireData1