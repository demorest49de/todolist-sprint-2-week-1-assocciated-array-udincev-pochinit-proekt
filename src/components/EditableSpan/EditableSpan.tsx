import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanType = {
    title: string,
    changeTitle: (title: string) => void
}

export const EditableSpan = ({
                                 title,
                                 changeTitle
                             }: EditableSpanType) => {

    const [editMode, setEditMode]
        = useState<boolean>(false)
    const [inputValue, setInputValue]
        = useState<string>(title)

    function onChangeH(e: ChangeEvent<HTMLInputElement>) {
        setInputValue(e.currentTarget.value)
    }

    function onKeyUpH(e: KeyboardEvent<HTMLInputElement>) {
        if (inputValue.trim() && e.key === 'Enter') {
            changeTitle(inputValue.trim())
            setEditMode(!editMode)
        }
    }

    function onBlurH() {
        if (inputValue.trim()) {
            setEditMode(!editMode)
            changeTitle(inputValue.trim())
        }
    }

    function onDoubleClickH() {
        setEditMode(!editMode)
    }

    return <>
        {editMode ?
            <input value={inputValue} onChange={onChangeH}
                   onKeyUp={onKeyUpH}
                   onBlur={onBlurH}
            />
            : <span onDoubleClick={onDoubleClickH}>{inputValue}</span>
        }
    </>
}