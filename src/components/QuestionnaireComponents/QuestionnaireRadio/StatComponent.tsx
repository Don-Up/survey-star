import React, {useMemo} from "react";
import {QuestionnaireRadioStatPropsType} from "./interface";
import {Cell, Pie, PieChart, ResponsiveContainer} from "recharts";
import {Tooltip} from "antd";

const STAT_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

/**
 * Format the percentage. For example: 0.123456789 => 12.34%
 * @param n
 */
function format(n: number) {
    return (n * 100).toFixed(2)
}

/**
 * Stat component for QuestionnaireRadio
 * @param stat
 * @constructor
 */
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