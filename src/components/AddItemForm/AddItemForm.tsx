import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "../../Button";

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({
                                addItem
                            }
                                : AddItemFormType) => {
    const [value, setValue]
        = useState<string>('')
    const [error, setError]
        = useState<string | null>(null)

    function onAddItemHandler() {
        if (value.trim()) {
            addItem(value.trim());
            setValue('')
        } else {
            setError('enter some value!')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setValue(e.currentTarget.value);
    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onAddItemHandler();
        }
    }

    return (
        <div>
            <input value={value}
                   onChange={onChangeHandler}
                   onKeyUp={onKeyUpHandler}
                   className={error ? 'error' : ''}
            />
            <Button title={'+'} onClick={onAddItemHandler}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};