import {ComponentPropsType} from "../../components/QuestionnaireComponents";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {produce} from "immer";

export type ComponentInfoType = {
    uuid: string
    type: string
    title: string
    isHidden?: boolean
    isLocked?: boolean
    props: ComponentPropsType
    questionnaireId?: number
}

const INIT_STATE: ComponentInfoType[] = []

export const componentsSlice = createSlice({
    name: 'components',
    initialState: INIT_STATE,
    reducers: {
        // Reset components
        resetComponents: (state: ComponentInfoType[], action: PayloadAction<ComponentInfoType[]>) => {
            return action.payload
        },
        // Add component
        addComponent: produce((draft: ComponentInfoType[], action: PayloadAction<{
            component: ComponentInfoType,
            selectedId: string
        }>) => {
            const {component, selectedId} = action.payload
            const index = draft.findIndex(item => item.uuid === selectedId)

            if (index < 0) {
                // No component is selected
                draft.push(component)
            } else {
                // A component is selected, insert after selected component
                draft.splice(index + 1, 0, component)
            }
        }),
        // Change component props
        changeComponentProps: produce((draft: ComponentInfoType[], action: PayloadAction<{
            id: string,
            newProps: ComponentPropsType
        }>) => {
            const {id, newProps} = action.payload
            const index = draft.findIndex(item => item.uuid === id)
            if (index >= 0) {
                draft[index].props = {
                    ...draft[index].props,
                    ...newProps
                }
            }
        }),
        // Delete component
        removeSelectedComponent: produce((draft: ComponentInfoType[], action: PayloadAction<string>) => {
            const index = draft.findIndex(item => item.uuid === action.payload)
            if (index >= 0) {
                draft.splice(index, 1)
            }
        }),
        // Hide component
        changeComponentVisibility: produce((draft: ComponentInfoType[], action: PayloadAction<{
            id: string,
            isHidden: boolean
        }>) => {
            const {id, isHidden} = action.payload
            const index = draft.findIndex(item => item.uuid === id)
            if (index >= 0) {
                draft[index].isHidden = isHidden
            }
        }),
        // Lock component
        toggleComponentLock: produce((draft: ComponentInfoType[], action: PayloadAction<{
            id: string
        }>) => {
            const {id} = action.payload
            const index = draft.findIndex(item => item.uuid === id)
            if (index >= 0) {
                draft[index].isLocked = !draft[index].isLocked
            }
        }),
        // Change Title
        changeComponentTitle: produce((draft: ComponentInfoType[], action: PayloadAction<{
            id: string,
            title: string
        }>) => {
            const {id, title} = action.payload
            const index = draft.findIndex(item => item.uuid === id)
            if (index >= 0) {
                draft[index].title = title
            }
        })
    }
})

export const {
    resetComponents,
    addComponent,
    changeComponentProps,
    removeSelectedComponent,
    changeComponentVisibility,
    toggleComponentLock,
    changeComponentTitle
} = componentsSlice.actions

export default componentsSlice.reducer