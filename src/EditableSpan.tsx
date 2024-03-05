import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
    title: string
    saveText: (title: string) => void
    isH3Title?: boolean
}

export const EditableSpan = ({
                                 title,
                                 saveText,
                                 isH3Title,
                             }: EditableSpanType) => {
    const [editMode, setEditMode] = useState<Boolean>(true)
    const [currTitle, setCurrTitle] = useState<string>(title)
    const activateEditMode = () => {
        const isChanged = !editMode;
        setEditMode(isChanged)
    }
    console.log(' isH3Title: ', isH3Title);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrTitle(e.currentTarget.value)
        saveText(e.currentTarget.value)
    }
    return editMode
        ? (isH3Title ? <h3 onDoubleClick={activateEditMode}>{currTitle}</h3> :
            <span onDoubleClick={activateEditMode}>{currTitle}</span>)
        : <input value={currTitle} onBlur={activateEditMode} onChange={onChangeHandler} autoFocus/>
};