import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
    taskTitle: string
    saveTitle: (title: string) => void
}

export const EditableSpan = ({
                                 taskTitle,
                                 saveTitle
                             }: EditableSpanType) => {
    const [editMode, setEditMode] = useState<Boolean>(true)
    const [currTitle, setCurrTitle] = useState<string>(taskTitle)
    const activateEditMode = () => {
        const isChanged = !editMode;
        setEditMode(isChanged)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrTitle(e.currentTarget.value)
        saveTitle(e.currentTarget.value)
    }
    return editMode
        ? <span onDoubleClick={activateEditMode}>{currTitle}</span>
        : <input value={currTitle} onBlur={activateEditMode} onChange={onChangeHandler} autoFocus/>
};