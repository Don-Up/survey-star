import React, {useState} from "react";
import useLoadQuestionnaireData from "../../../hook/useLoadQuestionData";
import {Button, Result, Spin} from "antd";
import useGetPageInfo from "../../../hook/useGetPageInfo";
import {useNavigate} from "react-router-dom";
import {useTitle} from "ahooks";
import StatHeader from "./StatHeader";
import ComponentList from "./ComponentList";
import PageStat from "./PageStat";
import ChartStat from "./ChartStat";

/*
 * @description: Questionnaire Statistics Page
 * Click on ‘Questionnaire Statistics’ in Questionnaire List's items to jump to this page.
 */
const Stat: React.FC = () => {
    const {loading} = useLoadQuestionnaireData()

    const {title, isPublished} = useGetPageInfo()

    const [selectedComponentId, setSelectedComponentId] = useState("")
    const [selectedComponentType, setSelectedComponentType] = useState("")

    const nav = useNavigate()

    const loadingElement = <div className={"text-center mt-[60px]"}>
        <Spin></Spin>
    </div>

    function getContentElement() {
        if (typeof isPublished === "boolean" && !isPublished) {
            return <div className={"flex items-center justify-center w-full"}>
                <Result
                    status="warning"
                    title="The page has not yet been published"
                    extra={<Button
                        type={"primary"}
                        onClick={() => nav(-1)}>
                        Back
                    </Button>
                    }
                />
            </div>
        } else {
            return <>
                <div className={"w-[350px] mr-6"}>
                    <ComponentList
                        selectedComponentId={selectedComponentId}
                        setSelectedComponentId={setSelectedComponentId}
                        setSelectedComponentType={setSelectedComponentType}/>
                </div>
                <div className={"flex-auto bg-white py-3 px-5"}>
                    <PageStat
                        selectedComponentId={selectedComponentId}
                        setSelectedComponentId={setSelectedComponentId}
                        setSelectedComponentType={setSelectedComponentType}/>
                </div>
                <div className={"w-[400px] ml-6 bg-white py-3 px-5 overflow-hidden"}>
                    <ChartStat selectedComponentId={selectedComponentId} selectedComponentType={selectedComponentType}/>
                </div>
            </>
        }
    }


    return (<div className={"flex flex-col bg-[#f0f2f5] min-h-screen"}>
        <StatHeader/>
        <div className={"flex-auto py-3"}>
            {loading && loadingElement}
            {!loading && (<div className={"mx-6 flex h-[90vh]"}>
                {getContentElement()}
            </div>)}
        </div>
    </div>)
}

export default Stat