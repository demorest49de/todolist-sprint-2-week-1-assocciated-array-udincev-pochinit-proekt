import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, fvenum, TodoListEntryType} from './App';

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
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    todolist: TodoListEntryType
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
        todolist
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

    console.log(' tasks todolist: ', tasks, todolist);

    let [currentTitle, setCurrentTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (currentTitle.trim() !== "") {
            addTask(currentTitle.trim());
            setCurrentTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTaskHandler();
        }
    }

    const onAllClickHandler = () => changeFilter(todolistId, fvenum.all);
    const onActiveClickHandler = () => changeFilter(todolistId, fvenum.active);
    const onCompletedClickHandler = () => changeFilter(todolistId, fvenum.completed);


    return <div>
        <h3>{title}</h3>
        <div>
            <input value={currentTitle}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTaskHandler}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => removeTask(todolistId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
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
