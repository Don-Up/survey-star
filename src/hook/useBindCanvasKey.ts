import {useKeyPress} from "ahooks";
import {useDispatch} from "react-redux";
import {addComponent, removeSelectedComponent} from "../store/componentsReducer";
import useGetComponentInfo from "./useGetComponentInfo";
import {copySelectedComponent} from "../store/copyReducer";
import {nanoid} from "@reduxjs/toolkit";
import {setSelectedId} from "../store/selectIdReducer";
import {ActionCreators as UndoActionCreators} from "redux-undo";

/**
 * Check if the active element is valid.
 * Avoid deleting components when the user is editing the component like typing in an input.
 */
function isActiveElementValid(){
    const activeElement = document.activeElement
    if(activeElement === document.body){
        // If the active element is the body, it means that the user is not currently editing the component.
        return true
    }
    // If the active element is a button, it means that the user is currently editing the component.
    if(activeElement?.matches("div[role='button']")) return true
    return false
}

/**
 * A hook that binds the keyboard events to the canvas.
 */
function useBindCanvasKey(){
    const dispatch = useDispatch()
    const {selectedId, selectedComponent, copiedComponent, components} = useGetComponentInfo()

    // delete a component
    useKeyPress(["backspace",  "delete"], () => {
        if(!isActiveElementValid()) return
        dispatch(removeSelectedComponent(selectedId))
    })

    // copy a component
    useKeyPress(["ctrl.c", "meta.c"], () => {
        if (!isActiveElementValid()) return
        dispatch(copySelectedComponent(selectedComponent))
    })

    // paste a component
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

    // select the previous component
    useKeyPress(["uparrow"], () => {
        if (!isActiveElementValid()) return
        if (selectedId !== "") {
            const selectIndex = components.findIndex(item => item.uuid === selectedId)
            // If the current index is 0, there is no previous component.
            if (selectIndex <= 0) return
            dispatch(setSelectedId(components[selectIndex - 1].uuid))
        }
    })

    // select the next component
    useKeyPress(["downarrow"], () => {
        if (!isActiveElementValid()) return
        if (selectedId !== "") {
            const selectIndex = components.findIndex(item => item.uuid === selectedId)
            // If the current index is the last index, there is no next component.
            if (selectIndex < 0 || selectIndex >= components.length - 1) return
            dispatch(setSelectedId(components[selectIndex + 1].uuid))
        }
    })

    // undo, ctrl + z, meta + z
    useKeyPress(["ctrl.z", "meta.z"], () => {
        if (!isActiveElementValid()) return
        dispatch(UndoActionCreators.undo())
    }, {
        exactMatch: true,
    })

    // redo, ctrl + shift + z, meta + shift + z
    useKeyPress(["ctrl.shift.z", "meta.shift.z"], () => {
        if (!isActiveElementValid()) return
        dispatch(UndoActionCreators.redo())
    })
}


export default useBindCanvasKey