import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, fvenum, TodoListEntryType} from './App';
import s from './Todolist.module.css'
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    todolist: TodoListEntryType
    removeTodolist: (todolistId: string) => void
    EditTask: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todoId: string, title: string) => void
}

export function Todolist(
    {
        todolistId,
        title,
        tasks,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        todolist,
        removeTodolist,
        EditTask,
        changeTodolistTitle
    }: PropsType) {

    let tasksForTodolist = tasks;

    function filterTasks() {
        if (todolist.filter === fvenum.active) {
            tasksForTodolist = tasks.filter(t => t.isDone === false);
        }
        if (todolist.filter === fvenum.completed) {
            tasksForTodolist = tasks.filter(t => t.isDone === true);
        }
    }

    filterTasks();

    //functionality
    const addTaskItemHandler = (title: string) => {
        if (title.trim() !== "") {
            addTask(title.trim(), todolistId);
        }
    }

    function changeTodolistTitleHandler(title: string) {
        changeTodolistTitle(todolistId, title)
    }

    //handlers

    const onAllClickHandler = () => changeFilter(todolistId, fvenum.all);
    const onActiveClickHandler = () => changeFilter(todolistId, fvenum.active);
    const onCompletedClickHandler = () => changeFilter(todolistId, fvenum.completed);
    const removeTodoHandler = () => removeTodolist(todolistId)

    return <div>
        <div className={s[`todolist__title-block`]}>
            <EditableSpan saveText={changeTodolistTitleHandler} title={title} isH3Title={true}/>
            <button onClick={removeTodoHandler}>X</button>
        </div>
        <AddItemForm addItem={addTaskItemHandler}/>
        <ul>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => removeTask(todolistId, t.id)

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(todolistId, t.id, e.currentTarget.checked);
                    }

                    function saveTaskText(title: string) {
                        EditTask(todolistId, t.id, title)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan saveText={saveTaskText} title={t.title}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={todolist.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={todolist.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={todolist.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
