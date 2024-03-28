import {
    addTaskAC,
    AddTodolistAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from './tasks-reducer'
import {TasksStateType} from "../../App";

test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action
        = removeTaskAC('2', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState).totoStrictEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    })
})

test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }
    const title = 'juce'
    const todoId2 = 'todolistId2'
    const action
        = addTaskAC(title, todoId2)

    const endState = tasksReducer(startState, action)
    expect(endState[todoId2].length).toBe(4)
    expect(endState[todoId2][0].title).toBe(title)
})

test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const status = true
    const taskId = '1'
    const todoId = 'todolistId2'

    const action
        = ChangeTaskStatusAC(status, taskId, todoId)

    const endState = tasksReducer(startState, action)
    expect(endState[todoId][0].isDone).toBe(status)
})

test('title of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const title = 'black bread'
    const taskId = '1'
    const todoId = 'todolistId2'

    const action
        = ChangeTaskTitleAC(title, taskId, todoId)

    const endState = tasksReducer(startState, action)
    expect(endState[todoId][0].title).toBe(title)
})

test("new array should be added when new todolist is added", () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = AddTodolistAC('new todolist');


    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    const lastKey = keys[keys.length - 1]

    expect(keys.length).toBe(3)
    expect(endState[lastKey]).toEqual([])
})