import React, { useState } from "react";
import { Table, Tag, Input, Button, Modal } from "antd";
import ConfirmDialog from "../../components/ConfirmDialog";
import useLoadQuestionnaireListData from "../../../hook/useLoadQuestionListData";
import {deleteQuestionnaireService, restoreDeletedQuestionnaireService} from "../../../services/questionnaire";

interface Survey {
    id: number;
    title: string;
    status: "已发布" | "未发布";
    answers: number;
    date: string;
}

const Trash: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>(""); // 搜索关键词
    const [data, setData] = useState<any[]>();

    const [total, setTotal] = useState(0)

    const { loading } = useLoadQuestionnaireListData((list: [], pagination: any) => {
        setData(list)
        setTotal(pagination.total)
    }, { isDeleted: true })

    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]); // 选中的行
    const [isDialogVisible, setDialogVisible] = useState(false); // 控制确认对话框显示

    // 搜索过滤
    // const filteredData = data.filter((item) =>
    //     item.title.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    // 处理选中行变化
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys as number[]);
    };

    // 彻底删除按钮点击事件
    const handlePermanentDelete = () => {
        setDialogVisible(true); // 打开确认对话框
    };

    // 确认彻底删除
    const confirmDelete = () => {
        deleteQuestionnaireService(selectedRowKeys).then(res => {
            setData((prevData) => prevData?.filter((item) => !selectedRowKeys.includes(item.id)));
            setSelectedRowKeys([]); // 清空选中项
            setDialogVisible(false); // 关闭对话框
        })
    };

    // 关闭确认对话框
    const closeDialog = () => {
        setDialogVisible(false);
    };

    // 表格列配置
    const columns = [
        {
            title: "标题",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "是否发布",
            dataIndex: "isPublished",
            key: "isPublished",
            render: (status: boolean) => (
                <Tag color={status ? "blue" : "default"}>{status}</Tag>
            ),
        },
        {
            title: "答卷",
            dataIndex: "answers",
            key: "answers",
        },
        {
            title: "创建时间",
            dataIndex: "createdAt",
            key: "createdAt",
        },
    ];

    function handleRestore() {
        console.log("selectedRowKeys", selectedRowKeys)
        restoreDeletedQuestionnaireService(selectedRowKeys).then(res => {
            setData((prevData) => prevData?.filter((item) => !selectedRowKeys.includes(item.id)));
        })
    }

    return (
        <div className="p-6 bg-white shadow-md rounded-lg h-full">
            {/* 标题和操作按钮 */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">回收站</h1>

                {/* 搜索框 */}
                <Input.Search
                    placeholder="搜索问卷"
                    allowClear
                    onSearch={(value) => setSearchTerm(value)}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: 200 }}
                />
            </div>

            {/* 恢复和彻底删除按钮 */}
            <div className="flex space-x-4 mb-4">
                <Button
                    type="primary"
                    disabled={selectedRowKeys.length === 0} // 未选择时禁用
                    onClick={handleRestore}
                >
                    恢复
                </Button>
                <Button
                    type="primary"
                    danger
                    disabled={selectedRowKeys.length === 0} // 未选择时禁用
                    onClick={handlePermanentDelete}
                >
                    彻底删除
                </Button>
            </div>

            {/* 表格 */}
            <Table
                rowSelection={{
                    selectedRowKeys,
                    onChange: onSelectChange,
                }}
                columns={columns}
                dataSource={data}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                bordered
            />

            {/* 确认对话框 */}
            <ConfirmDialog
                visible={isDialogVisible}
                message="确定要彻底删除选中的问卷吗？"
                onConfirm={confirmDelete}
                onCancel={closeDialog}
            />
        </div>
    );
};

export default Trash;