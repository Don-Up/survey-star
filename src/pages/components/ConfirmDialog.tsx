// components/ConfirmDialog.tsx
import React from "react";
import { Modal } from "antd";

interface ConfirmDialogProps {
    visible: boolean; // 是否显示对话框
    message: string; // 提示信息
    onConfirm: () => void; // 确定按钮回调
    onCancel: () => void; // 取消按钮回调
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
                                                         visible,
                                                         message,
                                                         onConfirm,
                                                         onCancel,
                                                     }) => {
    return (
        <Modal
            open={visible}
            title="确认操作"
            onOk={onConfirm}
            onCancel={onCancel}
            okText="确定"
            cancelText="取消"
        >
            <p>{message}</p>
        </Modal>
    );
};

export default ConfirmDialog;