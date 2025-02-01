export type QuestionnaireTitlePropsType = {
    text?: string
    level?: 1 | 2 | 3 | 4 | 5
    isCenter?: boolean

    onChange?: (newProps: QuestionnaireTitlePropsType) => void
    disabled?: boolean
}

export const QuestionnaireTitleDefaultProps: QuestionnaireTitlePropsType ={
    text: 'A row of headers',
    level: 1,
    isCenter: false
}