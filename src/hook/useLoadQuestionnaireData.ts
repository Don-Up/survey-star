import {useParams} from "react-router-dom";
import {useRequest} from "ahooks";
import {getQuestionnaireService} from "../services/questionnaire";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {resetComponents} from "../store/componentsReducer";


function useLoadQuestionnaireData1(){
    const {id=""} = useParams()
    const dispatch = useDispatch()

    const {data, loading, error, run} = useRequest(async (id: string) => {
        if(!id) throw new Error("id is required")
        const data = await getQuestionnaireService(id)
        console.log("data0", data)
        return data
    }, {
        manual: true,
    })

    useEffect(() => {
        if(!data) return
        const {title="", components=[]} = data
        // Store the component data in the store
        console.log("data", data)
        dispatch(resetComponents(components))
    }, [data])

    useEffect(() => {
        run(id)
    }, [id])

    return {loading, error}
}

export default useLoadQuestionnaireData1