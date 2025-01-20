import React from "react";
import QuestionnaireTitle from "../../../components/QuestionnaireComponents/QuestionnaireTitle";
import QuestionnaireInput from "../../../components/QuestionnaireComponents/QuestionnaireInput";
import styles from "./index.module.css"

const EditCanvas: React.FC = () => {
    return (<div className={"min-h-full bg-white overflow-hidden"}>
        <div className={styles["component-wrapper"]}>
            <div className={styles["component"]}>
                <QuestionnaireTitle/>
            </div>
        </div>
        <div className={styles["component-wrapper"]}>
            <div className={styles["component"]}>
                <QuestionnaireInput/>
            </div>
        </div>
    </div>)
}

export default EditCanvas