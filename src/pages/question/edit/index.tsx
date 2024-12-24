import React from "react";
import useLoadQuestionnaireData from "../../../hook/useLoadQuestionnaireData";

export const Edit: React.FC = () => {
    const {loading, data} = useLoadQuestionnaireData()

    return (<div>
        <p>Edit Page</p>
        <div>
            {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}
        </div>
    </div>)
}