import {useKeyPress} from "ahooks";
import {useDispatch} from "react-redux";
import {addComponent, removeSelectedComponent} from "../store/componentsReducer";
import useGetComponentInfo from "./useGetComponentInfo";
import {copySelectedComponent} from "../store/copyReducer";
import {nanoid} from "@reduxjs/toolkit";
import {setSelectedId} from "../store/selectIdReducer";

function isActiveElementValid(){
    const activeElement = document.activeElement
    if(activeElement === document.body){
        return true
    }
    if(activeElement?.matches("div[role='button']")) return true
    return false
}

function useBindCanvasKey(){
    const dispatch = useDispatch()
    const {selectedId, selectedComponent, copiedComponent, components} = useGetComponentInfo()
    // delete a component
    useKeyPress(["backspace",  "delete"], () => {
        if(!isActiveElementValid()) return
        dispatch(removeSelectedComponent(selectedId))
    })

    useKeyPress(["ctrl.c", "meta.c"], () => {
        if (!isActiveElementValid()) return
        dispatch(copySelectedComponent(selectedComponent))
    })

    useKeyPress(["ctrl.v", "meta.v"], () => {
        if (!isActiveElementValid()) return
        if(copiedComponent != null){
            const newId = nanoid()
            dispatch(addComponent({
                component: {...copiedComponent, uuid: newId},
                selectedId,
            }))
        }
    })

    // Select the previous component
    useKeyPress(["uparrow"], () => {
        if (!isActiveElementValid()) return
        if (selectedId !== "") {
            const selectIndex = components.findIndex(item => item.uuid === selectedId)
            // If the current index is 0, there is no previous component.
            if (selectIndex <= 0) return
            dispatch(setSelectedId(components[selectIndex - 1].uuid))
        }
    })

    // Select the next component
    useKeyPress(["downarrow"], () => {
        if (!isActiveElementValid()) return
        if (selectedId !== "") {
            const selectIndex = components.findIndex(item => item.uuid === selectedId)
            // If the current index is the last index, there is no next component.
            if (selectIndex < 0 || selectIndex >= components.length - 1) return
            dispatch(setSelectedId(components[selectIndex + 1].uuid))
        }
    })
}


export default useBindCanvasKey