import React, {useState} from 'react'
import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent} from "react";
import {Button} from "./Button";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import {debug} from "node:util";

type PropsType = {
    title: string
    todolistId: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
    changeTaskTitle: (title: string, taskId: string, todolistId: string) => void
}

export const Todolist = (props: PropsType) => {
    const {
        title,
        tasks,
        filter,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        todolistId,
        removeTodolist,
        changeTodolistTitle,
        changeTaskTitle
    } = props

    const [errorSpan, setErrorSpan] = useState<string>('')

    function CheckErrorMessage(errorValue: string, inputValue: string) {
        setErrorSpan(errorValue)
    }

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, props.todolistId)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    function ChangeTaskHandler(title: string) {
        changeTodolistTitle(title, todolistId)
    }

    return (
        <div>
            <div className={"todolist-title-container"}>
                <h3><EditableSpan title={title}

                                  changeTitle={ChangeTaskHandler}
                                  CheckErrorMessage={(title, inputValue) => CheckErrorMessage(title, inputValue)}
                /></h3>
                <Button title={'x'} onClick={removeTodolistHandler}/>
            </div>
            <div>
                <AddItemForm addItem={(title) => addTask(title, todolistId)}/>
            </div>
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
                                changeTaskStatus(task.id, newStatusValue, todolistId)
                            }
                            console.log(' task.title: ', task.title);
                            return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                <EditableSpan title={task.title}
                                              changeTitle={(title) => changeTaskTitle(title, task.id, todolistId)}
                                              CheckErrorMessage={(errorValue, inputValue) =>
                                                  CheckErrorMessage(errorValue, inputValue)
                                              }
                                />
                                <Button onClick={removeTaskHandler} title={'x'}/>
                                {!task.title && <div className={'error-message'}>{errorSpan}</div>}
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
