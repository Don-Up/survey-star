import React, {useRef} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Input, InputRef, message, Popover, QRCode, Space, Tooltip, Typography} from "antd";
import {CopyOutlined, LeftOutlined, QrcodeOutlined} from "@ant-design/icons";
import useGetPageInfo from "../../../hook/useGetPageInfo";

const StatHeader: React.FC = () => {

    const nav = useNavigate()
    const {title, isPublished} = useGetPageInfo()
    const {id} = useParams()

    const urlInputRef = useRef<InputRef>(null)
    function handleCopyLink() {
        const element = urlInputRef.current
        if (element) {
            element.select()
            document.execCommand("copy")
            message.success("Copied")
        }
    }

    function getLinkAndQRCodeElement() {
        // todo
        // if(!isPublished) return null

        const url = `http://localhost:3000/questionnaire/${id}`

        const QRCodeElement = <div className={"text-center"}>
            <QRCode value={url} size={150}/>
        </div>

        return <Space>
            <Input value={url} className="w-[300px]" ref={urlInputRef}/>
            <Tooltip title={"Copy Link"}>
                <Button icon={<CopyOutlined/>} onClick={handleCopyLink}></Button>
            </Tooltip>
            <Popover content={QRCodeElement}>
                <Button icon={<QrcodeOutlined/>}></Button>
            </Popover>
        </Space>
    }

    return (<div className={"bg-white border-b border-solid border-[#e8e8e8] py-3 flex"}>
        <div className={"flex-1"}>
            <Space>
                <Button type={"link"} icon={<LeftOutlined/>} onClick={() => nav(-1)}>Back</Button>
                <Typography.Title level={4}>{title}</Typography.Title>
            </Space>
        </div>
        <div className={"flex-1 text-center"}>
            {getLinkAndQRCodeElement()}
        </div>
        <div className={"flex-1 text-right"}>
            <Button type={"primary"} onClick={() => nav("/questionnaire/edit/" + id)} className={"mr-3"}>Edit
                Questionnaire</Button>
        </div>
    </div>)
}

export default StatHeader