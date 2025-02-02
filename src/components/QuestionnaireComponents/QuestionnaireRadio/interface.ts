export type QuestionnaireRadioPropsType = {
    title?: string
    isVertical?: boolean
    options?: OptionType[]
    value?: string

    onChange?: (newProps: QuestionnaireRadioPropsType) => void
    disabled?: boolean
}

export const QuestionnaireRadioDefaultProps: QuestionnaireRadioPropsType = {
    title: 'Please select',
    isVertical: false,
    value: '',
    options: [
        {
            text: 'Op 1',
            value: '1'
        },
        {
            text: 'Op 2',
            value: '2'
        },
        {
            text: 'Op 3',
            value: '3'
        }
    ]
}

export type OptionType = {
    text: string
    value: string
}