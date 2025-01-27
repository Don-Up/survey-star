import {ComponentPropsType} from "../../components/QuestionnaireComponents";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {produce} from "immer";

export type ComponentInfoType = {
    uuid: string
    type: string
    title: string
    props: ComponentPropsType
}

const INIT_STATE: ComponentInfoType[] = []

export const componentsSlice = createSlice({
    name: 'components',
    initialState: INIT_STATE,
    reducers: {
        resetComponents: (state: ComponentInfoType[], action: PayloadAction<ComponentInfoType[]>) => {
            return action.payload
        },
        addComponent: produce((draft: ComponentInfoType[], action: PayloadAction<{component:ComponentInfoType, selectedId: string}>) => {
            const {component, selectedId} = action.payload
            const index = draft.findIndex(item => item.uuid === selectedId)

            if(index < 0){
                // No component is selected
                draft.push(component)
            } else {
                // A component is selected, insert after selected component
                draft.splice(index + 1, 0, component)
            }
        }),
        changeComponentProps: produce((draft: ComponentInfoType[], action: PayloadAction<{id: string, newProps: ComponentPropsType}>) => {
            const {id, newProps} = action.payload
            const index = draft.findIndex(item => item.uuid === id)
            if(index >= 0){
                draft[index].props = {
                    ...draft[index].props,
                    ...newProps
                }
            }
        }),
    }
})

export const {resetComponents, addComponent, changeComponentProps} = componentsSlice.actions

export default componentsSlice.reducer