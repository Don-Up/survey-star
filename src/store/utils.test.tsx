import { getNextSelectedId } from './utils'; // Adjust the import path as necessary

// Define the ComponentInfoType based on the expected structure
type ComponentInfoType = {
    uuid: string;
    type: string;
    title: string;
    props: any; // Adjust the type of props as necessary
};

describe('getNextSelectedId', () => {
    it('should return an empty string if the component is not found', () => {
        const componentList: ComponentInfoType[] = [
            { uuid: '1', type: 'type1', title: 'Title 1', props: {} },
            { uuid: '2', type: 'type2', title: 'Title 2', props: {} },
            { uuid: '3', type: 'type3', title: 'Title 3', props: {} }
        ];
        expect(getNextSelectedId('4', componentList)).toBe('');
    });

    it('should return an empty string if the list contains only one component', () => {
        const componentList: ComponentInfoType[] = [
            { uuid: '1', type: 'type1', title: 'Title 1', props: {} }
        ];
        expect(getNextSelectedId('1', componentList)).toBe('');
    });

    it('should return the UUID of the previous component if the current component is the last', () => {
        const componentList: ComponentInfoType[] = [
            { uuid: '1', type: 'type1', title: 'Title 1', props: {} },
            { uuid: '2', type: 'type2', title: 'Title 2', props: {} },
            { uuid: '3', type: 'type3', title: 'Title 3', props: {} }
        ];
        expect(getNextSelectedId('3', componentList)).toBe('2');
    });

    it('should return the UUID of the next component if the current component is not the last', () => {
        const componentList: ComponentInfoType[] = [
            { uuid: '1', type: 'type1', title: 'Title 1', props: {} },
            { uuid: '2', type: 'type2', title: 'Title 2', props: {} },
            { uuid: '3', type: 'type3', title: 'Title 3', props: {} }
        ];
        expect(getNextSelectedId('1', componentList)).toBe('2');
    });

    it('should return an empty string if the list is empty', () => {
        const componentList: ComponentInfoType[] = [];
        expect(getNextSelectedId('1', componentList)).toBe('');
    });
});
