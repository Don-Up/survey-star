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

/**
 * TitleElement Component
 *
 * A functional component that displays and allows editing of the questionnaire title.
 *
 * Behavior:
 * - Displays the current title from pageInfo in read-only mode by default
 * - When in edit mode:
 *   - Shows an input field with the current title
 *   - Updates the title via Redux on input change
 *   - Exits edit mode on Enter press or when the input loses focus
 *
 * Features:
 * - Inline title editing
 * - Prevents empty title submission
 * - Optimistic UI update with Redux state management
 */
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
            <Title level={4} className={"pt-2"}>
                {title}
            </Title>
            <Button icon={<EditOutlined/>} type={"text"} onClick={() => setEditState(true)}>
            </Button>
        </Space>
    )
}

/**
 * SaveButton Component
 *
 * This component provides a button to save the current state of a questionnaire.
 * It automatically saves when there are changes to the components or page information,
 * and also supports manual saving via the button click or keyboard shortcut (Ctrl+S / Cmd+S).
 *
 * Features:
 * - Manual save via button click
 * - Keyboard shortcut support: Ctrl+S (Windows/Linux) or Cmd+S (Mac)
 * - Auto-save triggered every 1 second when there are changes
 * - Displays a loading indicator while saving is in progress
 */
const SaveButton: React.FC = () => {
    const {components = []} = useGetComponentInfo()
    const pageInfo = useGetPageInfo()
    const {id} = useParams()

    const {loading, run} = useRequest(async () => {
        if (!id) return
        // map components to remove property "questionnaireId"
        const newComponents = components.map(({questionnaireId, ...rest}) => rest)
        const data = {components: newComponents, ...pageInfo}

        await updateQuestionnaireService(id, data)
    }, {manual: true})

    // shortcut key: ctrl + s or meta.s, useKeyPress
    useKeyPress(['ctrl.s', 'meta.s'], async (event) => {
        event.preventDefault()
        if(!loading) {
            run()
        }
    })

    // Auto save
    useDebounceEffect(() => {
    	run()
    },
        [components, pageInfo], // dependencies
        {wait: 1000} // debounce time prevents triggering the effect frequently
    );

    return (
        <Button onClick={run} disabled={loading} icon={loading ? <LoadingOutlined/> : null}>Save</Button>
    )
}

/**
 * PublishButton Component
 *
 * A functional component that provides a button to publish the questionnaire.
 * When clicked, it:
 * - Removes internal properties (e.g., questionnaireId) from components
 * - Updates the questionnaire data with `isPublished: true`
 * - Navigates to the statistics page on successful publication
 *
 * Features:
 * - Disables the button while the request is in progress
 * - Shows a success message after publishing
 * - Automatically navigates to the statistics page upon success
 */
const PublishButton: React.FC = () => {
    const {components = []} = useGetComponentInfo()
    const pageInfo = useGetPageInfo()
    const {id} = useParams()
    const nav = useNavigate()

    const {loading, run: publish} = useRequest(async () => {
        if (!id) return
        // map components to remove property "questionnaireId"
        const newComponents = components.map(({questionnaireId, ...rest}) => rest)
        // update the questionnaire data with `isPublished: true`
        const data = {components: newComponents, ...pageInfo, isPublished: true}
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

/**
 * EditHeader Component
 *
 * The top navigation and control bar for the questionnaire editing page.
 * Provides:
 * - Navigation back to the previous page
 * - Display and inline editing of the questionnaire title
 * - Access to save and publish actions
 * - Toolbar with additional editing controls
 *
 * Layout Structure:
 * - Left section: Back button and title editor
 * - Center section: Edit toolbar
 * - Right section: Action buttons (Save and Publish)
 */
const EditHeader: React.FC = () => {
    const nav = useNavigate()

    return (
        <div className="bg-white border-b border-solid border-amber-50 fixed w-full z-10">
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