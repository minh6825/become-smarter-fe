import { IGroupQuestion } from "./group.rest"

export interface ISection {
    section_id: number
    section_content: string
    order: number
    section_name: string
    group_question: IGroupQuestion[]
}