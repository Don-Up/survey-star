import React, {useState} from "react";
import {Button, Input, message, Space, Typography} from "antd";
import {EditOutlined, LeftOutlined, LoadingOutlined} from "@ant-design/icons";
import {useNavigate, useParams} from "react-router-dom";
import EditToolbar from "./EditToolbar";
import useGetPageInfo from "../../../hook/useGetPageInfo";
import {useDispatch} from "react-redux";
import {changePageTitle} from "../../../store/pageInfoReducer";
import useGetComponentInfo from "../../../hook/useGetComponentInfo";
import {useDebounceEffect, useKeyPress, useRequest} from "ahooks";
import {updateQuestionnaireService} from "../../../services/questionnaire";

const {Title} = Typography

// TitleElement FC
const TitleElement: React.FC = () => {
    const {title} = useGetPageInfo()
    const dispatch = useDispatch()
    const [editState, setEditState] = useState(false)

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newTitle = event.target.value.trim()
        if (!newTitle) return
        dispatch(changePageTitle(newTitle))
    }

    if (editState) {
        return (
            <Input type="text" value={title}
                   onPressEnter={() => setEditState(false)}
                   onBlur={() => setEditState(false)}
                   onChange={handleChange}
            />
        )
    }

    return (
        <Space>
            <Title level={4}>
                {title}
            </Title>
            <Button icon={<EditOutlined/>} type={"text"} onClick={() => setEditState(true)}>
            </Button>
        </Space>
    )
}

// Save Button
const SaveButton: React.FC = () => {
    const {components = []} = useGetComponentInfo()
    const pageInfo = useGetPageInfo()
    const {id} = useParams()

    const {loading, run} = useRequest(async () => {
        if (!id) return
        // map components to remove property "questionnaireId"
        const newComponents = components.map(({questionnaireId, ...rest}) => rest)
        const data = {components: newComponents, ...pageInfo}

        console.log(id, JSON.stringify(data))
        await updateQuestionnaireService(id, data)
    }, {manual: true})

    // shortcut key: ctrl + s or meta.s, useKeyPress
    useKeyPress(['ctrl.s', 'meta.s'], async (event) => {
        event.preventDefault()
        if(!loading) run()
    })

    // Auto save
    useDebounceEffect(() => {
    	run()
    }, [components, pageInfo],{wait: 1000});

    return (
        <Button onClick={run} disabled={loading} icon={loading ? <LoadingOutlined/> : null}>Save</Button>
    )
}

// Publish Button
const PublishButton: React.FC = () => {
    const {components = []} = useGetComponentInfo()
    const pageInfo = useGetPageInfo()
    const {id} = useParams()
    const nav = useNavigate()

    const {loading, run: publish} = useRequest(async () => {
        if (!id) return
        // map components to remove property "questionnaireId"
        const newComponents = components.map(({questionnaireId, ...rest}) => rest)
        const data = {components: newComponents, ...pageInfo, isPublished: true}
        console.log(id, JSON.stringify(data))
        await updateQuestionnaireService(id, data)
    }, {
        manual: true,
        onSuccess() {
            message.success("Questionnaire published successfully")
            nav(`/questionnaire/stat/${id}`)
        }
    })

    return (
        <Button type="primary" onClick={publish} disabled={loading}>Publish</Button>
    )
}

const EditHeader: React.FC = () => {
    const nav = useNavigate()

    return (
        <div className="bg-white border-b border-solid border-amber-50">
            <div className="flex mx-6 h-[50px] items-center">
                <div className="flex-1">
                    <Space>
                        <Button type="link" icon={<LeftOutlined/>} onClick={() => nav(-1)}>
                            Back
                        </Button>
                        <TitleElement/>
                    </Space>
                </div>
                <div className="flex-1 text-center"><EditToolbar/></div>
                <div className="flex-1 text-right">
                    <Space>
                        <SaveButton/>
                        <PublishButton/>
                    </Space>
                </div>
            </div>
        </div>
    );

}

export default EditHeader