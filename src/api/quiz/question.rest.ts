import axiosConfig from "../axiosConfig"

export interface IQuestion {
    question_id: number,
    question_text: string
    order: number
    explain: string
    image: string
    audio: string
    parent_question_id: number
    options: IAnswer[]
    answers: string[]
    index?: number
}

export interface IAnswer {
    label: string
    value: string
    option_id: number
    answer_option_id: number
}

export interface ICreateQuestion {
    question_text: string 
    imageUrl?: string
    order: number
    guideContent?: string
    tag_question?: string
    answers?: any[]
}

export interface ICreateSingleChoiceQuestion {
    quiz_id: string,
    type_question: string
    group_question_id: number
    questions: ICreateQuestion[]
}

export interface ICreateQuestionPayload {

}

export const createQuestionSingleChoiceApi = async (payload: ICreateSingleChoiceQuestion):Promise<any> => {
    const res = await axiosConfig.post('question/create-question/sing-choice', payload)
    return res.data
}