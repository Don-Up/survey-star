export type QuestionnaireTextAreaPropsType = {
    title?: string
    placeholder?: string

    onChange?: (newProps: QuestionnaireTextAreaPropsType) => void
    disabled?: boolean
}

export const QuestionnaireTextAreaDefaultProps: QuestionnaireTextAreaPropsType = {
    title: "Please enter a title",
    placeholder: "Please enter the content",
}