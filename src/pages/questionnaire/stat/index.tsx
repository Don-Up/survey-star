import React from "react";
import useLoadQuestionnaireData from "../../../hook/useLoadQuestionData";
import {Button, Result, Spin} from "antd";
import useGetPageInfo from "../../../hook/useGetPageInfo";
import {useNavigate} from "react-router-dom";
import {useTitle} from "ahooks";

/*
 * @description: Questionnaire Statistics Page
 * Click on ‘Questionnaire Statistics’ in Questionnaire List's items to jump to this page.
 */
const Stat: React.FC = () => {
    const {loading} = useLoadQuestionnaireData()

    const {title, isPublished} = useGetPageInfo()

    useTitle(`Questionnaire Stat - ${title}`)

    const nav = useNavigate()

    if(loading){
        return <div className={"text-center mt-[60px]"}>
            <Spin></Spin>
        </div>
    }

    if(!isPublished){
       return <Result
                status="warning"
                title="The page has not yet been published"
                extra={<Button
                    type={"primary"}
                    onClick={() => nav(-1)}>
                    Back
                </Button>
                }
        />
    }

    return (<div>
        <p>Stat Page</p>
        <div>
            stat
        </div>
    </div>)
}

export default Stat