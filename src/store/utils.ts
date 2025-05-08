import {ComponentInfoType} from "./componentsReducer";

/**
 * Retrieves the UUID of the next selected component in a list.
 * This function finds the component with the specified UUID in the component list
 * and returns the UUID of the next component. If the specified UUID is the last
 * component in the list, it returns the UUID of the previous component.
 * If the list contains only one component or the specified UUID is not found,
 * it returns an empty string.
 *
 * @param uuid - The UUID of the currently selected component.
 * @param componentList - An array of ComponentInfoType objects representing the components.
 * @returns The UUID of the next selected component, or an empty string if no next component is available.
 */
export function getNextSelectedId(uuid: string, componentList: ComponentInfoType[]){
    const visibleComponents = componentList.filter(c => !c.isHidden)
    // Find the index of the component with the specified UUID
    const index = visibleComponents.findIndex(c => c.uuid === uuid);
    // If the component is not found, return an empty string
    if(index < 0){
        return "";
    }
    // Initialize the next selected component's UUID as an empty string
    let nextSelectedId = "";
    // Get the length of the component list
    const length = visibleComponents.length
    // If the list contains only one component, return an empty string since there is no component after deleting
    if(length <= 1){
        return "";
    } else {
        // If the current component is the last in the list
        if(index === length - 1){
            // Set the next selected component's UUID to the previous component's UUID
            nextSelectedId = visibleComponents[index - 1].uuid;
        } else {
            // Otherwise, set the next selected component's UUID to the next component's UUID
            nextSelectedId = visibleComponents[index + 1].uuid;
        }
    }
    // Return the UUID of the next selected component
    return nextSelectedId;
}
