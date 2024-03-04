import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormType = {
    addItem: (title: string) => void
}

const AddItemForm = ({
                         addItem,
                     }: AddItemFormType) => {

    const [title, setTitle] = useState('')
    const [error, setError]
        = useState<string | null>(null)

    const addItemHandler = () => {
        debugger
        if (title.trim() !== '') {
            addItem(title);
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }

    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        setError(null)
        if (e.key === "Enter") {
            addItemHandler()
        }
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={addItemHandler}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    );
};

export default AddItemForm;