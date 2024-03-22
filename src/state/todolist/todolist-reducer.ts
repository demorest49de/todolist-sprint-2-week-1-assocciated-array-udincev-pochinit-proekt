import {FilterValuesType, TodolistType} from "../../App";
import {v1} from "uuid";

export type RemoveTodoType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodoType = {
    type: 'ADD-TODOLIST',
    title: string
}

export type ChangeTitleTodoType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string
    id: string
}

export type ChangeFilterTodoType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionType =
    RemoveTodoType
    | AddTodoType
    | ChangeTitleTodoType
    | ChangeFilterTodoType
    ;


export const todolistReducer = (state: Array<TodolistType>, action: ActionType) => {

    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(st => st.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(s => s.id === action.id ? {...s, title: action.title} : s)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(s => s.id === action.id ? {...s, filter: action.filter} : s)
        default:
            throw new Error('I don\'t understand this type')
    }
}
