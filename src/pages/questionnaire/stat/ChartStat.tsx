import React, {useEffect, useState} from "react";
import {Typography} from "antd";
import {useRequest} from "ahooks";
import {getComponentStatService} from "../../../services/stat";
import {useParams} from "react-router-dom";
import {getComponentConfByType} from "../../../components/QuestionnaireComponents";

type PropsType = {
    selectedComponentId: string
    selectedComponentType: string
}

const ChartStat: React.FC<PropsType> = ({selectedComponentId, selectedComponentType}) => {

    const { id } = useParams()

    const [stat, setStat] = useState<{name: string, count: number}[]>([])

    const config = {
        manual: true,
        onSuccess(res: any) {
            setStat(res.stat)
        }
    }

    const {run} = useRequest(async (questionnaireId: string, componentId: string) => await getComponentStatService(
        questionnaireId,
        componentId
    ), config)

    useEffect(() => {
        if(selectedComponentId) run(id || "", selectedComponentId)
    }, [id, selectedComponentId]);

    function getStatElem(){
        if(!selectedComponentId) return <div>Please select a component</div>

        const { StatComponent } = getComponentConfByType(selectedComponentType) || {}

        // Ensure StatComponent is a valid React component
        if (StatComponent === null || (typeof StatComponent !== 'function' && typeof StatComponent !== 'object')) {
            return <div>No Stat Component</div>
        }

        return <StatComponent stat={stat}/>
    }


    return (<>
        <Typography.Title>Chart Statistics</Typography.Title>
        <div>{getStatElem()}</div>
    </>)
}

export default ChartStat