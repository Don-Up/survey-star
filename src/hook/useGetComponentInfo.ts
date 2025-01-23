import {useSelector} from "react-redux";
import {StateType} from "../store";
import {ComponentInfoType} from "../store/componentsReducer";


function useGetComponentInfo(){
    const components = useSelector<StateType>(state => state.components) as ComponentInfoType[];

    // console.log("xxxx", components, components.length)
    return {
        components
    }
}

export default useGetComponentInfo