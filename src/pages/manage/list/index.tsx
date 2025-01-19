import React, {useState} from "react";
import {Empty, Spin} from "antd";
import {useImmer} from "use-immer";
import "antd/dist/reset.css";
import ConfirmDialog from "../../components/ConfirmDialog";
import ListSearch from "../../../components/ListSearch";
import ListItem from "../../components/ListItem";
import useLoadQuestionnaireListData from "../../../hook/useLoadQuestionListData";
import ListPagination from "../../../components/ListPagination";
import {deleteQuestionnaireService, updateQuestionnaireService} from "../../../services/questionnaire";

/*
 * Questionnaire List
 */
const List: React.FC = () => {
    const [surveys, updateSurveys] = useImmer<any[]>([]);
    const [total, setTotal] = useState(0)

    const [isDialogVisible, setDialogVisible] = useState(false); // 控制对话框显示状态
    const [currentSurveyId, setCurrentSurveyId] = useState<string | null>(null); // 当前要删除的问卷 ID

    const { loading } = useLoadQuestionnaireListData((list: [], pagination: any) => {
        updateSurveys((draft) => {
            draft.length = 0
            draft.push(...list)
        })
        setTotal(pagination.total)
    })

    // 打开确认对话框
    const showConfirmDialog = (id: string) => {
        setCurrentSurveyId(id); // 记录要删除的问卷 ID
        setDialogVisible(true); // 显示对话框
    };

    // 删除问卷
    const handleDelete = () => {
        if (currentSurveyId !== null) {
            updateQuestionnaireService(currentSurveyId, {isDeleted: true}).then(
                (res) => {
                    updateSurveys((draft) => {
                        const index = draft.findIndex((s) => s.id === currentSurveyId);
                        if (index !== -1) {
                            draft.splice(index, 1);
                        }
                    });
                }
            )
        }
        closeConfirmDialog(); // 关闭对话框
    };

    // 关闭确认对话框
    const closeConfirmDialog = () => {
        setDialogVisible(false);
        setCurrentSurveyId(null);
    };

    return (
        <div className="mx-auto p-6 bg-white shadow-md rounded-lg h-full overflow-y-auto">
            <div className={"flex justify-between"}>
                <h1 className="text-xl font-bold mb-6">Questionnaire List</h1>
                <ListSearch/>
            </div>
            {/* 问卷列表 */}
            <div className="space-y-6">
                {loading && <div className={"text-center"}><Spin/></div>}
                {!loading && surveys.length === 0 && <Empty description={"No data available"}/>}
                {surveys.length > 0 && surveys.map((survey: any) => (
                    <ListItem survey={survey} showConfirmDialog={showConfirmDialog} updateSurveys={updateSurveys} key={survey.id}/>
                ))}
                <ListPagination total={total}/>
            </div>

            {/* 确认对话框 */}
            <ConfirmDialog
                visible={isDialogVisible}
                message="确定要删除该问卷吗？"
                onConfirm={handleDelete}
                onCancel={closeConfirmDialog}
            />
        </div>
    );
};

export default List;