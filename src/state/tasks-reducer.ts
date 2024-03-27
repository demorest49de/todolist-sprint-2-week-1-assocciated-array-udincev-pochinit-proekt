import {TasksStateType} from "../App";


export type FirstActionType = {
    type: '',
    id: string
}
export type SecondtActionType = {
    type: '',
    title: string
}

export type ActionsType = FirstActionType | SecondtActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case '':
            return state
        default:
            throw new Error("I don't understand this type")
    }
}

export const firstAC = (todolistId: string) => {
    return { type: '', id: todolistId}
}
export const secondAC = (title: string) => {
    return { type: '', title: title}
}