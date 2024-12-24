import React from "react";
import useLoadQuestionData from "../../../hook/useLoadQuestionData";

const Stat: React.FC = () => {
    const {loading, data} = useLoadQuestionData()

    return (<div>
        <p>Edit Page</p>
        <div>
            {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}
        </div>
    </div>)
}

export default Stat