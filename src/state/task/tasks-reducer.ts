import {TasksStateType} from "../../App";
import {v1} from "uuid";
import {AddTodolistActionType} from "../todolist/todolists-reducer";


export type DeleteTaskActionType =
    ReturnType<typeof removeTaskAC>

export type AddTaskActionType =
    ReturnType<typeof addTaskAC>

export type ChangeTaskStatusActionType =
    ReturnType<typeof ChangeTaskStatusAC>

export type ChangeTaskTitleActionType =
    ReturnType<typeof ChangeTaskTitleAC>

export type ActionsType =
    DeleteTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType):
    TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]:
                    state[action.todolistId]
                        .filter(t => t.id !== action.taskId)
            };
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [{id: action.id, title: action.title, isDone: false},
                    ...state[action.todolistId]
                ]
            };
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]:
                    state[action.todolistId]
                        .map(t =>
                            t.id === action.taskId
                                ? {...t, isDone: action.status} : t
                        )
            };
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]:
                    state[action.todolistId]
                        .map(t =>
                            t.id === action.taskId
                                ? {...t, title: action.title} : t
                        )
            };
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.newTodolistId]: []
            };
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

export const ChangeTaskStatusAC =
    (status: boolean, taskid: string, todolistId: string) => {
        return {
            type: 'CHANGE-TASK-STATUS',
            status: status,
            taskId: taskid,
            todolistId: todolistId,
        } as const
    }

export const ChangeTaskTitleAC =
    (title: string, taskId: string, todolistId: string) => {
        return {
            type: 'CHANGE-TASK-TITLE',
            title: title,
            taskId: taskId,
            todolistId: todolistId,
        } as const
    }