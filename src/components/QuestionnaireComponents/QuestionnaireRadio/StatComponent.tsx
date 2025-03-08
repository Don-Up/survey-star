import React, {useMemo} from "react";
import {QuestionnaireRadioStatPropsType} from "./interface";
import {Cell, Pie, PieChart, ResponsiveContainer} from "recharts";
import {Tooltip} from "antd";
import {format, STAT_COLORS} from "../index";

const StatComponent: React.FC<QuestionnaireRadioStatPropsType> = ({stat = []}) => {

    // sum for count
    const sum = useMemo(() => {
        let s = 0
        stat.forEach((item) => {
            s += item.count
        })
        return s
    }, [stat])

    return (<div className={"w-[300px] h-[400px]"}>
        <ResponsiveContainer width={"100%"} height={"100%"}>
            <PieChart>
                <Pie
                    data={stat}
                    dataKey={"count"}
                    cx="50%"
                    cy="50%"
                    fill="#8884d8"
                    label={(props) => `${props.name}: ${format(props.value / sum)}%`}
                >
                    {stat.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            name={entry.name}
                            fill={STAT_COLORS[index]}
                        />
                    ))}
                </Pie>
                <Tooltip/>
            </PieChart>
        </ResponsiveContainer>
    </div>)
}

export default StatComponent