import React from "react";
import {QuestionnaireRadioStatPropsType} from "../QuestionnaireRadio";
import {Bar, BarChart, CartesianGrid, PieChart, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {Tooltip} from "antd";
import {QuestionnaireCheckBoxStatPropsType} from "./interface";

const StatComponent: React.FC<QuestionnaireCheckBoxStatPropsType> = ({stat}) => {

    return (<div className={"w-[300px] h-[400px]"}>
        <ResponsiveContainer width={"100%"} height={"100%"}>
            <PieChart>
                <BarChart
                    width={400}
                    height={300}
                    data={stat}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 0,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray={"3 3"} />
                    <XAxis dataKey={"name"}/>
                    <YAxis/>
                    <Tooltip/>
                    <Bar dataKey={"count"} fill={"#8884d8"}/>
                </BarChart>
            </PieChart>
        </ResponsiveContainer>
    </div>)
}

export default StatComponent