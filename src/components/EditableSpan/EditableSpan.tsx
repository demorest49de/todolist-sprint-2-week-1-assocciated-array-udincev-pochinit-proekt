import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanType = {
    title: string,
    changeTitle: (title: string) => void
    CheckErrorMessage: (errorValue: string, inputValue: string) => void
}

export const EditableSpan = ({
                                 title,
                                 changeTitle,
                                 CheckErrorMessage,
                             }: EditableSpanType) => {

    const [editMode, setEditMode]
        = useState<boolean>(false)
    const [inputValue, setInputValue]
        = useState<string>(title)
    const [error, setError]
        = useState<string>('')


    function onChangeH(e: ChangeEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;
        if (value) {
            setError('')
            CheckErrorMessage('', value)
        } else {
            setError('value should not be empty')
            CheckErrorMessage('value should not be empty', value)
        }
        setInputValue(value)
        changeTitle(value.trim())
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
                   autoFocus={true}
                   className={error ? 'error' : ''}
            />
            : <span onDoubleClick={onDoubleClickH}>{inputValue}</span>
        }
    </>
}