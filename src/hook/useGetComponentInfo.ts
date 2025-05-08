import {useSelector} from "react-redux";
import {StateType} from "../store";
import {ComponentInfoType} from "../store/componentsReducer";

/**
 * Get the component data from the store.
 * 1. The component list of the current questionnaire.
 * 2. The selectedId.
 * 3. The selected component.
 * 4. The copied component.
 */
function useGetComponentInfo(){
    // Load the component data from the store
    const components = useSelector<StateType>(state => state.components.present) as ComponentInfoType[];

    // Fetch the selectedId from the store
    const selectedId = useSelector<StateType>(state => state.selectedId) as string;

    // Find the selected component in the component list
    const selectedComponent = components.find(c => c.uuid === selectedId);

    // Fetch the copied component from the store
    const copiedComponent = useSelector<StateType>(state => state.copy) as ComponentInfoType;

    return {
        components,
        selectedId,
        selectedComponent,
        copiedComponent
    }
}

export default useGetComponentInfo