import React, {useEffect} from "react";
import useLoadQuestionnaireData from "../../../hook/useLoadQuestionData";
import {useParams} from "react-router-dom";
import {getQuestionnaireService} from "../../../services/questionnaire";

export const Edit: React.FC = () => {
    // const {loading, data} = useLoadQuestionnaireData()
    const {id=""} = useParams();
    
    useEffect(() => {
        async function fn(){
            const data = await getQuestionnaireService(id)
            console.log("data", data)
        }
        fn()
    }, [])
    
    return (<div>
        <p>Edit Page</p>
        <div>
            {/*{loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}*/}
            <p>{id}</p>
        </div>
    </div>)
}