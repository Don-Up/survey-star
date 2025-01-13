import React from "react";
import useLoadQuestionnaireData from "../../../hook/useLoadQuestionData";

/*
 * @description: Edit Questionnaire Page
 * Click on ‘Edit Questionnaire’ in Questionnaire List's items to jump to this page.
 */
export const Edit: React.FC = () => {
    const {loading, data} = useLoadQuestionnaireData()
    return (<div>
        <p>Edit Page</p>
        <div>
            {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}
        </div>
    </div>)
}