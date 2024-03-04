import React, {ChangeEvent, useState} from "react";
import {TaskType} from "./Todolist";

type EditableSpanType = {
    task: TaskType
    onClickHandler: () => void
    onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
}

export const EditableSpan = ({
                                 task,
                                 onClickHandler,
                                 onChangeHandler
                             }: EditableSpanType) => {
    const [editMode, setEditMode] = useState(true)
    const activateEditMode = () => {
    }
    return (
        <li key={task.id} className={task.isDone ? "is-done" : ""}>
            <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
            <span onDoubleClick={activateEditMode}>{task.title}</span>
            <button onClick={onClickHandler}>x</button>
        </li>
    );
};