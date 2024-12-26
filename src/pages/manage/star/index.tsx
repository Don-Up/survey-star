import React, { useState } from "react";
import {Button, Divider, Empty, Tag} from "antd";
import {
    EditOutlined,
    BarChartOutlined,
    StarOutlined,
    StarFilled,
    CopyOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { useImmer } from "use-immer";
import "antd/dist/reset.css";
import ConfirmDialog from "../../components/ConfirmDialog";

interface Survey {
    id: number;
    title: string;
    status: "已发布" | "未发布";
    marked: boolean;
    answers: number;
    date: string;
}

const Star: React.FC = () => {
    const [surveys, updateSurveys] = useImmer<Survey[]>([
        {
            id: 1,
            title: "问卷1",
            status: "未发布",
            marked: false,
            answers: 5,
            date: "3月10日 13:23",
        },
        {
            id: 2,
            title: "问卷2",
            status: "已发布",
            marked: true,
            answers: 3,
            date: "3月11日 13:23",
        },
    ]);

    const [isDialogVisible, setDialogVisible] = useState(false); // 控制对话框显示状态
    const [currentSurveyId, setCurrentSurveyId] = useState<number | null>(null); // 当前要删除的问卷 ID

    // 打开确认对话框
    const showConfirmDialog = (id: number) => {
        setCurrentSurveyId(id); // 记录要删除的问卷 ID
        setDialogVisible(true); // 显示对话框
    };

    // 关闭确认对话框
    const closeConfirmDialog = () => {
        setDialogVisible(false);
        setCurrentSurveyId(null);
    };

    // 删除问卷
    const handleDelete = () => {
        if (currentSurveyId !== null) {
            updateSurveys((draft) => {
                const index = draft.findIndex((s) => s.id === currentSurveyId);
                if (index !== -1) {
                    draft.splice(index, 1);
                }
            });
        }
        closeConfirmDialog(); // 关闭对话框
    };

    // 标星问卷
    const handleMark = (id: number) => {
        updateSurveys((draft) => {
            const survey = draft.find((s) => s.id === id);
            if (survey) {
                survey.marked = !survey.marked;
            }
        });
    };

    // 复制问卷
    const handleCopy = (id: number) => {
        updateSurveys((draft) => {
            const survey = draft.find((s) => s.id === id);
            if (survey) {
                const newSurvey = { ...survey, id: draft.length + 1, title: `${survey.title} (副本)` };
                draft.push(newSurvey);
            }
        });
    };

    return (
        <div className="mx-auto py-6 px-6 bg-white shadow-md rounded-lg h-full">
            <h1 className="text-xl font-bold mb-6">问卷列表</h1>

            {/* 问卷列表 */}
            <div className="space-y-6 w-[50vw] min-w-[500px]">
                {surveys.length === 0 && <Empty description={"暂无数据"}/> }
                {surveys.length > 0 && surveys.map((survey) => (
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
                                    color={survey.status === "已发布" ? "blue" : "default"}
                                    className="px-2 py-1 text-sm"
                                >
                                    {survey.status}
                                </Tag>
                                <span className="text-sm text-gray-600">答卷: {survey.answers}</span>
                                <span className="text-sm text-gray-500">{survey.date}</span>
                            </div>
                        </div>

                        <Divider />

                        {/* 下部分 */}
                        <div className="flex justify-between items-center">
                            {/* 左下角：编辑和统计 */}
                            <div className="flex items-center space-x-4">
                                <Button
                                    type="link"
                                    icon={<EditOutlined />}
                                    size="small"
                                    className="text-gray-500"
                                >
                                    编辑问卷
                                </Button>
                                <Button
                                    type="link"
                                    icon={<BarChartOutlined />}
                                    size="small"
                                    className="text-gray-500"
                                >
                                    问卷统计
                                </Button>
                            </div>

                            {/* 右下角：标星、复制、删除 */}
                            <div className="flex items-center space-x-4">
                                <Button
                                    type="link"
                                    icon={survey.marked ? <StarFilled className="text-yellow-400" /> : <StarOutlined />}
                                    size="small"
                                    className="text-gray-500"
                                    onClick={() => handleMark(survey.id)}
                                >
                                    标星
                                </Button>
                                <Button
                                    type="link"
                                    icon={<CopyOutlined />}
                                    size="small"
                                    className="text-gray-500"
                                    onClick={() => handleCopy(survey.id)}
                                >
                                    复制
                                </Button>
                                <Button
                                    type="link"
                                    icon={<DeleteOutlined />}
                                    size="small"
                                    className="text-gray-500"
                                    onClick={() => showConfirmDialog(survey.id)}
                                >
                                    删除
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
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

export default Star;