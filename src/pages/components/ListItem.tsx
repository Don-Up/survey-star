import React, {useEffect} from "react";
import {Button, Divider, message, Popconfirm, Tag} from "antd";
import {
    BarChartOutlined,
    CopyOutlined,
    DeleteOutlined,
    EditOutlined,
    StarFilled,
    StarOutlined
} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {copyQuestionnaireService, updateQuestionnaireService} from "../../services/questionnaire";
import {useDispatch} from "react-redux";
import {setSelectedId} from "../../store/selectIdReducer";

const ListItem: React.FC<{
    survey: any,
    showConfirmDialog: (id: string) => void,
    updateSurveys: (update: (draft: any) => void) => void
}> = ({survey, showConfirmDialog, updateSurveys}) => {

    const nav = useNavigate()
    const dispatch = useDispatch()

    function handleEdit(id: number) {
        nav(`/questionnaire/edit/${id}`)
    }

    function handleStat(id: number) {
        dispatch(setSelectedId(id))
        nav(`/questionnaire/stat/${id}`)
    }

    // 复制问卷
    const handleCopy = (id: string) => {
        copyQuestionnaireService(id).then((res) => {
            message.success("copied")
            updateSurveys((draft) => {
                const survey = draft.find((s: any) => s.id === id);
                if (survey) {
                    const newSurvey = {...survey, id: draft.length + 1, title: `${survey.title} (副本)`};
                    draft.push(newSurvey);
                }
            });
        })
    };

    // 标星问卷
    const handleMark = (id: string) => {
        updateQuestionnaireService(id, {isStar: !survey.isStar}).then((res) => {
            updateSurveys((draft) => {
                const survey = draft.find((s: any) => s.id === id);
                if (survey) {
                    survey.isStar = !survey.isStar;
                }
            });
        }).catch((err) => {
            console.log(err)
        })
    };

    return (<div>
        <div key={survey.id} className="p-4 border rounded-lg hover:shadow">
            {/* 上部分 */}
            <div className="flex justify-between items-start">
                {/* 左上角：问卷名称 */}
                <div>
                    <span className="text-lg font-medium text-gray-800">{survey.title}</span>
                </div>

                {/* 右上角：状态、答卷数、发布时间 */}
                <div className="flex items-center space-x-4">
                    <Tag
                        color={survey.isPublished ? "blue" : "default"}
                        className="px-2 py-1 text-sm"
                    >
                        {survey.isPublished? "published" : "unpublished"}
                    </Tag>
                    <span className="text-sm text-gray-600">答卷: {survey.answers}</span>
                    <span className="text-sm text-gray-500">{survey.date}</span>
                </div>
            </div>

            <Divider/>

            {/* 下部分 */}
            <div className="flex justify-between items-center">
                {/* 左下角：编辑和统计 */}
                <div className="flex items-center space-x-4">
                    <Button
                        type="link"
                        icon={<EditOutlined/>}
                        size="small"
                        className="text-gray-500"
                        onClick={() => handleEdit(survey.id)}
                    >
                        Edit
                    </Button>
                    <Button
                        type="link"
                        icon={<BarChartOutlined/>}
                        size="small"
                        className="text-gray-500"
                        onClick={() => handleStat(survey.id)}
                    >
                        Statistics
                    </Button>
                </div>

                {/* 右下角：标星、复制、删除 */}
                <div className="flex items-center space-x-4">
                    <Button
                        type="link"
                        icon={survey.isStar ? <StarFilled className="text-yellow-400"/> : <StarOutlined/>}
                        size="small"
                        className="text-gray-500"
                        onClick={() => handleMark(survey.id)}
                    >
                        Star
                    </Button>
                    <Popconfirm
                        title="确定复制该问卷？"
                        onConfirm={() => handleCopy(survey.id)}
                        onCancel={() => {}}
                        okText="确定"
                        cancelText="取消"
                    >
                    <Button
                        type="link"
                        icon={<CopyOutlined/>}
                        size="small"
                        className="text-gray-500"
                    >
                        Copy
                    </Button>
                    </Popconfirm>
                    <Button
                        type="link"
                        icon={<DeleteOutlined/>}
                        size="small"
                        className="text-gray-500"
                        onClick={() => showConfirmDialog(survey.id)}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    </div>)
}

export default ListItem