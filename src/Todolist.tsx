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
        removeTodolist
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

    let [currentTitle, setCurrentTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    //funcs
    const addItem = (title: string) => {
        addTask(title, todolistId)
    }

    //handlers
    const addTaskHandler = () => {
        if (currentTitle.trim() !== "") {
            addTask(currentTitle.trim(), todolistId);
            setCurrentTitle("");
        } else {
            setError("Title is required");
        }
    }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setCurrentTitle(e.currentTarget.value)
    // }
    //
    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.key === 'Enter') {
    //         addTaskHandler();
    //     }
    // }

    const onAllClickHandler = () => changeFilter(todolistId, fvenum.all);
    const onActiveClickHandler = () => changeFilter(todolistId, fvenum.active);
    const onCompletedClickHandler = () => changeFilter(todolistId, fvenum.completed);
    const removeTodoHandler = () => removeTodolist(todolistId)

    return <div>
        <div className={s[`todolist__title-block`]}>
            <h3>{title}</h3>
            <button onClick={removeTodoHandler}>X</button>
        </div>
        <AddItemForm addItem={addItem}/>
        {/*<div>*/}
        {/*    <input value={currentTitle}*/}
        {/*           onChange={onChangeHandler}*/}
        {/*           onKeyPress={onKeyPressHandler}*/}
        {/*           className={error ? "error" : ""}*/}
        {/*    />*/}
        {/*    <button onClick={addTaskHandler}>+</button>*/}
        {/*    {error && <div className="error-message">{error}</div>}*/}
        {/*</div>*/}
        <ul>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => removeTask(todolistId, t.id)

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(todolistId, t.id, e.currentTarget.checked);
                    }

                    return <EditableSpan
                        task={t}
                        onClickHandler={onClickHandler}
                        onChangeHandler={onChangeHandler}
                    />
                    // <li key={t.id} className={t.isDone ? "is-done" : ""}>
                    //     <input type="checkbox"
                    //            onChange={onChangeHandler}
                    //            checked={t.isDone}/>
                    //     <span>{t.title}</span>
                    //     <button onClick={onClickHandler}>x</button>
                    // </li>
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
