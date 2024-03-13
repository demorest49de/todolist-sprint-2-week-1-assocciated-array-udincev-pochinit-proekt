import React from 'react-dom';
import {FilterValuesType, TaskType} from "../../App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "../Button/Button";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";

type PropsType = {
    title: string
    todolistId: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    anonymousAddTask: (title: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean) => void
    filter: FilterValuesType
    removeTodolist: () => void
    UpdateTitleTask: (taskId: string, title: string) => void
    UpdateTitleTodolist: (title: string) => void
}

export const Todolist = (props: PropsType) => {
    const {
        title,
        tasks,
        filter,
        removeTask,
        changeFilter,
        anonymousAddTask,
        changeTaskStatus,
        todolistId,
        removeTodolist,
        UpdateTitleTask,
        UpdateTitleTodolist
    } = props

    const addTaskHandler = (taskItem: string) => {
        anonymousAddTask(taskItem)
    }

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter)
    }

    const removeTodolistHandler = () => {
        removeTodolist()
    }

    function updateTitleTodolistHandler(title: string) {
        UpdateTitleTodolist(title)
    }

    return (
        <div>
            <div className={"todolist-title-container"}>
                <h3><EditableSpan value={title}
                                  onChange={updateTitleTodolistHandler}/></h3>
                {/*<h3>{title}</h3>*/}
                <Button title={'x'} onClick={removeTodolistHandler}/>
            </div>
            <AddItemForm addItem={addTaskHandler}/>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {tasks.map((task) => {

                            const removeTaskHandler = () => {
                                removeTask(task.id)
                            }

                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                changeTaskStatus(task.id, newStatusValue)
                            }

                            function updateTaskHandler(newTitle: string) {
                                UpdateTitleTask(task.id, newTitle)
                            }

                            return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone}
                                       onChange={changeTaskStatusHandler}/>
                                <EditableSpan value={task.title}
                                              onChange={updateTaskHandler}/>
                                <Button onClick={removeTaskHandler} title={'x'}/>
                            </li>
                        })}
                    </ul>
            }
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}
                        onClick={() => changeFilterTasksHandler('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}
                        onClick={() => changeFilterTasksHandler('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}
                        onClick={() => changeFilterTasksHandler('completed')}/>
            </div>
        </div>
    )
}
