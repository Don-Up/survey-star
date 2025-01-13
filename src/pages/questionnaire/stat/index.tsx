import React from "react";
import useLoadQuestionnaireData from "../../../hook/useLoadQuestionData";

/*
 * @description: Questionnaire Statistics Page
 * Click on ‘Questionnaire Statistics’ in Questionnaire List's items to jump to this page.
 */
const Stat: React.FC = () => {
    const {loading, data} = useLoadQuestionnaireData()

    return (<div>
        <p>Stat Page</p>
        <div>
            {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}
        </div>
    </div>)
}

export default Stat