import {useSelector} from "react-redux";
import {StateType} from "../store";
import {ComponentInfoType} from "../store/componentsReducer";


function useGetComponentInfo(){
    const components = useSelector<StateType>(state => state.components) as ComponentInfoType[];

    const selectedId = useSelector<StateType>(state => state.selectedId) as string;

    const selectedComponent = components.find(c => c.uuid === selectedId);

    return {
        components,
        selectedId,
        selectedComponent
    }
}

export default useGetComponentInfo