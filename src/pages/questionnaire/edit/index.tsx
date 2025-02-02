import React from "react";
import EditCanvas from "./EditCanvas";
import useLoadQuestionnaireData1 from "../../../hook/useLoadQuestionnaireData";
import {clearSelectedId} from "../../../store/selectIdReducer";
import {useDispatch} from "react-redux";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import EditHeader from "./EditHeader";

/*
 * @description: Edit Questionnaire Page
 * Click on ‘Edit Questionnaire’ in Questionnaire List's items to jump to this page.
 */
export const Edit: React.FC = () => {
    const {loading} = useLoadQuestionnaireData1()
    const dispatch = useDispatch()
    function handleClearSelectedId() {
        dispatch(clearSelectedId())
    }

    return (<div className={"flex flex-col h-screen bg-edit"}>
        <EditHeader/>
        <div className={"flex-auto py-3"}>
            <div className={"mx-6 flex h-full"}>
                <div className={"w-[295px] bg-white px-4"}>
                    <LeftPanel/>
                </div>
                <div className={"flex-1 relative overflow-hidden"} onClick={handleClearSelectedId}>
                    <div className={"absolute w-[400px] h-[712px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white overflow-auto shadow-custom"}>
                        <EditCanvas loading={loading}/>
                    </div>
                </div>
                <div className={"w-[300px] bg-white px-4"}>
                    <RightPanel/>
                </div>
            </div>
        </div>
    </div>)
}