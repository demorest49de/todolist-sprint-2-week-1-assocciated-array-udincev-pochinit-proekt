import {TasksStateType, TodolistType} from "../../App";
import {AddTodolistAC, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "../task/tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistType> = []

    const action = AddTodolistAC('new todolist')

    const endTaskState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTaskState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.newTodolistId)
    expect(idFromTodolists).toBe(action.newTodolistId)
})