import {ComponentPropsType} from "../../components/QuestionnaireComponents";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {produce} from "immer";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../index";
import {setSelectedId} from "../selectIdReducer";

export type ComponentInfoType = {
    id: string
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
        addComponent: produce((draft: ComponentInfoType[], action: PayloadAction<ComponentInfoType>) => {
            const newComponent = action.payload
            const selectedId = useSelector<StateType>(state => state.selectedId)
            const index = draft.findIndex(item => item.id === selectedId)

            if(index < 0){
                // No component is selected
                draft.push(newComponent)
            } else {
                // A component is selected, insert after selected component
                draft.splice(index + 1, 0, newComponent)
            }
            const dispatch = useDispatch()
            dispatch(setSelectedId(newComponent.id))
        }),
    }
})

export const {resetComponents, addComponent} = componentsSlice.actions

export default componentsSlice.reducer