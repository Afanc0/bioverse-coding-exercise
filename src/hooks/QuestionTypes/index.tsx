
import questionSelection from "@bioverse-intake/data/questionnaire.json"

export type QuestionSelectionItem = {
    [id: string]: string;
};

export const useQuestionTypes = () => {
    const selection: QuestionSelectionItem = questionSelection
    const selectionKey = Object.keys(questionSelection)
    return { selection, keys: selectionKey }
}