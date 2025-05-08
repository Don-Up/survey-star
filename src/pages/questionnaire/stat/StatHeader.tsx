import React, {useRef} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Input, InputRef, message, Popover, QRCode, Space, Tooltip, Typography} from "antd";
import {CopyOutlined, LeftOutlined, QrcodeOutlined} from "@ant-design/icons";
import useGetPageInfo from "../../../hook/useGetPageInfo";

/**
 * Questionnaire Statistics Page Header
 * @constructor
 */
const StatHeader: React.FC = () => {

    const nav = useNavigate()
    const {title, isPublished} = useGetPageInfo()
    const {id} = useParams()

    const urlInputRef = useRef<InputRef>(null)

    /**
     * Handles the copying of the questionnaire link to the clipboard.
     */
    function handleCopyLink() {
        const element = urlInputRef.current
        if (element) {
            element.select()
            document.execCommand("copy")
            message.success("Copied")
        }
    }

    /**
     * Generates a UI element containing a shareable link and QR code for the questionnaire.
     *
     * This function constructs a URL pointing to the live version of the questionnaire,
     * displays it in an Input field, provides a button to copy the link to the clipboard,
     * and includes a QR code that points to the same URL. If the questionnaire is not published,
     * this function returns null to hide the component.
     *
     * @returns {React.ReactNode} A React node containing the link and QR code UI elements, or null if the questionnaire is not published.
     */
    function getLinkAndQRCodeElement() {
        // todo
        if(!isPublished) return null

        const url = `http://localhost:3000/questionnaire/${id}`

        const QRCodeElement = <div className={"text-center"}>
            <QRCode value={url} size={150}/>
        </div>

        return <Space>
            <Input value={url} className="w-[300px]" ref={urlInputRef}/>
            <Tooltip title={"Copy Link"}>
                <Button icon={<CopyOutlined/>} onClick={handleCopyLink}></Button>
            </Tooltip>
            {/*
            Popover: displays a popover with a QR code when clicked.
            */}
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
            {/*
            A Button that navigates to the edit page of the questionnaire.
            */}
            <Button type={"primary"} onClick={() => nav("/questionnaire/edit/" + id)} className={"mr-3"}>Edit
                Questionnaire</Button>
        </div>
    </div>)
}

export default StatHeader