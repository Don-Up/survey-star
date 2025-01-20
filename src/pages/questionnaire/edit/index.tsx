import React from "react";
import EditCanvas from "./EditCanvas";
// import useLoadQuestionnaireData from "../../../hook/useLoadQuestionData";

/*
 * @description: Edit Questionnaire Page
 * Click on ‘Edit Questionnaire’ in Questionnaire List's items to jump to this page.
 */
export const Edit: React.FC = () => {
    // const {loading, data} = useLoadQuestionnaireData()
    return (<div className={"flex flex-col h-screen bg-edit"}>
        <div className={"bg-white h-10"}>Header</div>
        <div className={"flex-auto py-3"}>
            <div className={"mx-6 flex h-full"}>
                <div className={"w-[285px] bg-white px-4"}>Left</div>
                <div className={"flex-1 relative overflow-hidden"}>
                    <div className={"absolute w-[400px] h-[712px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white overflow-auto shadow-custom"}>
                        <EditCanvas/>
                    </div>
                </div>
                <div className={"w-[300px] bg-white px-4"}>Right</div>
            </div>
        </div>
    </div>)
}