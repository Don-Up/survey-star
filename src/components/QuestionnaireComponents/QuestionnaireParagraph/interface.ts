export type QuestionnaireParagraphPropsType = {
    text?: string
    isCenter?: boolean

    onChange?: (newProps: QuestionnaireParagraphPropsType) => void
    disabled?: boolean
}

export const QuestionnaireParagraphDefaultProps: QuestionnaireParagraphPropsType = {
    text: 'A row of paragraphs',
    isCenter: false
}
