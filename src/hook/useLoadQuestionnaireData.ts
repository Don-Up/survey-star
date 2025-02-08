import {useParams} from "react-router-dom";
import {useRequest} from "ahooks";
import {getQuestionnaireService} from "../services/questionnaire";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {resetComponents} from "../store/componentsReducer";
import {resetPageInfo} from "../store/pageInfoReducer";


function useLoadQuestionnaireData1() {
    const {id = ""} = useParams()
    const dispatch = useDispatch()

    const {data, loading, error, run} = useRequest(async (id: string) => {
        if (!id) throw new Error("id is required")
        const data = await getQuestionnaireService(id)
        console.log("data0", data)
        return data
    }, {
        manual: true,
    })

    useEffect(() => {
        if (!data) return
        const {title = "", description = "", js = "", css = "", isPublished = false,  components = []} = data
        // Store the component data in the store
        console.log("data", data)
        dispatch(resetComponents(components))
        // reset pageInfo
        dispatch(resetPageInfo({title, description, js, css, isPublished}))
    }, [data])

    useEffect(() => {
        run(id)
    }, [id])

    return {loading, error}
}

export default useLoadQuestionnaireData1