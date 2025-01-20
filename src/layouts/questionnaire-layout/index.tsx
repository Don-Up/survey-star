import React from "react";
import {Outlet} from "react-router-dom";
import useLoadUserInfo from "../../hook/useLoadUserInfo";
import {Spin} from "antd";

const QuestionnaireLayout: React.FC = () => {

    const {waitingUserData} = useLoadUserInfo()
    return (<div>
        {waitingUserData ? <div className={"text-center mt-3"}><Spin/></div>:<Outlet/>}
    </div>)
}

export default QuestionnaireLayout