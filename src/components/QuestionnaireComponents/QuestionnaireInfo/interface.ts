export type QuestionnaireInfoPropsType = {
    title?: string
    desc?: string

    onChange?: (newProps: QuestionnaireInfoPropsType) => void
    disabled?: boolean
}

export const QuestionnaireInfoDefaultProps: QuestionnaireInfoPropsType = {
    title: 'A questionnaire',
    desc: 'A questionnaire description'
}