import React, { useState } from "react";
import { Table, Tag, Input, Button, Modal } from "antd";
import ConfirmDialog from "../../components/ConfirmDialog";

interface Survey {
    id: number;
    title: string;
    status: "已发布" | "未发布";
    answers: number;
    date: string;
}

const Trash: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>(""); // 搜索关键词
    const [data, setData] = useState<Survey[]>([
        {
            id: 1,
            title: "问卷1",
            status: "未发布",
            answers: 5,
            date: "3月10日 13:23",
        },
        {
            id: 2,
            title: "问卷2",
            status: "已发布",
            answers: 3,
            date: "3月11日 13:23",
        },
        {
            id: 3,
            title: "问卷3",
            status: "未发布",
            answers: 6,
            date: "3月12日 13:23",
        },
    ]);

    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]); // 选中的行
    const [isDialogVisible, setDialogVisible] = useState(false); // 控制确认对话框显示

    // 搜索过滤
    const filteredData = data.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        setData((prevData) => prevData.filter((item) => !selectedRowKeys.includes(item.id))); // 删除选中行
        setSelectedRowKeys([]); // 清空选中项
        setDialogVisible(false); // 关闭对话框
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
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <Tag color={status === "已发布" ? "blue" : "default"}>{status}</Tag>
            ),
        },
        {
            title: "答卷",
            dataIndex: "answers",
            key: "answers",
        },
        {
            title: "创建时间",
            dataIndex: "date",
            key: "date",
        },
    ];

    return (
        <div className="p-6 bg-white shadow-md rounded-lg h-screen">
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
                dataSource={filteredData}
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