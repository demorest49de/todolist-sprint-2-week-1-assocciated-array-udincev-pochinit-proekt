import React, {ChangeEvent, useState} from 'react'

type PropsType = {
    value: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = ({value, onChange}: PropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)


    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {

        setTitle(event.currentTarget.value)
    }

    const deactivateEditModeHandler = () =>{
        title && onChange(title)
        setEditMode(false)
    }

    const activateEditModeHandler = () =>{
        setEditMode(true)
    }

    return (
        <>
            {editMode ? (
                <input
                    value={title}
                    onChange={changeTitleHandler}
                    onBlur={deactivateEditModeHandler}
                    autoFocus
                />
            ) : (
                <span onDoubleClick={activateEditModeHandler}>{value}</span>
            )}
        </>
    )
}