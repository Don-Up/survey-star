import {useParams} from "react-router-dom";
import {getQuestionnaireService} from "../services/questionnaire";
import {useRequest} from "ahooks";

function useLoadQuestionnaireData() {
    const {id=""} = useParams()
    // const [loading, setLoading] = useState(true)
    // const [questionnaireData, setQuestionnaireData] = useState({})
    //
    // useEffect(() => {
    //     async function fn() {
    //         const data = await getQuestionnaireService(id)
    //         setQuestionnaireData(data)
    //         setLoading(false)
    //     }
    //     fn()
    // }, []);

    async function load() {
        const data = await getQuestionnaireService(id)
        return data
    }

    const {data, loading, error} = useRequest(load)

    return {loading, data, error}
}

export default useLoadQuestionnaireData