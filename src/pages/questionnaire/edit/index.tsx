import React from "react";
import useLoadQuestionnaireData from "../../../hook/useLoadQuestionData";
import {useParams} from "react-router-dom";

export const Edit: React.FC = () => {
    // const {loading, data} = useLoadQuestionnaireData()
    const {id=""} = useParams();

    return (<div>
        <p>Edit Page</p>
        <div>
            {/*{loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}*/}
            <p>{id}</p>
        </div>
    </div>)
}