export type QuestionnaireInputPropsType = {
    title?: string
    placeholder?: string

    onChange?: (newProps: QuestionnaireInputPropsType) => void
}

export const QuestionnaireInputDefaultProps: QuestionnaireInputPropsType = {
    title: "Please enter a title",
    placeholder: "Please enter the content",
}