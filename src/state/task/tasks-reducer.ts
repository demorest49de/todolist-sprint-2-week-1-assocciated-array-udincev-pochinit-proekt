import {TasksStateType} from "../../App";
import {v1} from "uuid";


export type DeleteTaskActionType =
    ReturnType<typeof removeTaskAC>

export type AddTaskActionType =
    ReturnType<typeof addTaskAC>


export type ActionsType =
    DeleteTaskActionType
    | AddTaskActionType


export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)};
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [{id: action.id, title: action.title, isDone: false},
                    ...state[action.todolistId]
                ]
            }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        taskId: taskId,
        todolistId: todolistId
    } as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        title: title,
        todolistId: todolistId,
        id: v1(),
    } as const
}