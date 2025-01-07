import React from "react";
import { Button } from "antd";
import {Link, useNavigate} from "react-router-dom";
import {calc} from "antd/es/theme/internal";
import {MANAGE_INDEX_PATHNAME} from "../../router";

const Home: React.FC = () => {
    const nav = useNavigate()

    function clickHandler() {
        nav(MANAGE_INDEX_PATHNAME)
    }

    const text = "A total of 1,090 questionnaires have been created,\n1,000 questionnaires have been published and 10,000 responses have been collected.";

    return (
        <div
            className={"h-content flex flex-col justify-center text-center text-white items-center"}
            style={{background: "linear-gradient(to right, #5BCEFA, #48A9FE)"}}
        >
            {/* 标题 */}
            <h1 className={"text-5xl"}>
                Questionnaire | Online Poll
            </h1>

            {/* 描述文字 */}
            <p className={"text-base mb-4"}>
                {text.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        {index < text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                ))}
            </p>

            {/* 按钮 */}
            <Button
                type="primary"
                size="large"
                onClick={clickHandler}
            >
                start using
            </Button>
        </div>
    );
};

export default Home;