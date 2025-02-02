export type OptionType = {
    text: string
    value: string
    checked: boolean
}

export type QuestionnaireCheckBoxPropsType = {
    title?: string
    isVertical?: boolean
    list?: OptionType[]

    onChange?: (newProps: QuestionnaireCheckBoxPropsType) => void
    disabled?: boolean
}

export const QuestionnaireCheckBoxDefaultProps: QuestionnaireCheckBoxPropsType = {
    title: 'Please select (multiple)',
    isVertical: false,
    list: [
        {
            text: 'Op 1',
            value: '1',
            checked: false
        },
        {
            text: 'Op 2',
            value: '2',
            checked: false
        },
        {
            text: 'Op 3',
            value: '3',
            checked: false
        }
    ],
}