import {useParams} from "react-router-dom";
import {getQuestionnaireService} from "../services/questionnaire";
import {useRequest} from "ahooks";

function useLoadQuestionnaireData() {
    const {id=""} = useParams()
    async function load() {
        return await getQuestionnaireService(id)
    }

    const {data, loading, error} = useRequest(load)

    return {loading, data, error}
}

export default useLoadQuestionnaireData