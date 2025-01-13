import React, {useEffect} from "react";
import {Button, Divider, Tag} from "antd";
import {
    BarChartOutlined,
    CopyOutlined,
    DeleteOutlined,
    EditOutlined,
    StarFilled,
    StarOutlined
} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const ListItem: React.FC<{
    survey: any,
    showConfirmDialog: (id: string) => void,
    updateSurveys: (update: (draft: any) => void) => void
}> = ({survey, showConfirmDialog, updateSurveys}) => {

    const nav = useNavigate()

    function handleEdit(id: number) {
        nav(`/questionnaire/edit/${id}`)
    }

    function handleStat(id: number) {
        nav(`/questionnaire/stat/${id}`)
    }

    useEffect(() => {
        console.log("useEffect", survey)
    }, [])

    // 复制问卷
    const handleCopy = (id: string) => {
        updateSurveys((draft) => {
            const survey = draft.find((s: any) => s.id === id);
            if (survey) {
                const newSurvey = {...survey, id: draft.length + 1, title: `${survey.title} (副本)`};
                draft.push(newSurvey);
            }
        });
    };

    // 标星问卷
    const handleMark = (id: string) => {
        updateSurveys((draft) => {
            const survey = draft.find((s: any) => s.id === id);
            if (survey) {
                survey.marked = !survey.marked;
            }
        });
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
                        {survey.isPublished? "已发布" : "未发布"}
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
                        编辑问卷
                    </Button>
                    <Button
                        type="link"
                        icon={<BarChartOutlined/>}
                        size="small"
                        className="text-gray-500"
                        onClick={() => handleStat(survey.id)}
                    >
                        问卷统计
                    </Button>
                </div>

                {/* 右下角：标星、复制、删除 */}
                <div className="flex items-center space-x-4">
                    <Button
                        type="link"
                        icon={survey.marked ? <StarFilled className="text-yellow-400"/> : <StarOutlined/>}
                        size="small"
                        className="text-gray-500"
                        onClick={() => handleMark(survey.id)}
                    >
                        标星
                    </Button>
                    <Button
                        type="link"
                        icon={<CopyOutlined/>}
                        size="small"
                        className="text-gray-500"
                        onClick={() => handleCopy(survey.id)}
                    >
                        复制
                    </Button>
                    <Button
                        type="link"
                        icon={<DeleteOutlined/>}
                        size="small"
                        className="text-gray-500"
                        onClick={() => showConfirmDialog(survey.id)}
                    >
                        删除
                    </Button>
                </div>
            </div>
        </div>
    </div>)
}

export default ListItem