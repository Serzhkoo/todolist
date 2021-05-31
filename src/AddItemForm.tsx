import {IconButton, TextField} from "@material-ui/core";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Add} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError("");
        e.key === 'Enter' && addItem();
    }

    const addItem = () => {
        if (title.trim() === "") {
            setError('Title is required!')
        } else {
            props.addItem(title.trim());
            setTitle("");
        }
    }

    return (
        <div>
            <TextField error={!!error}
                       label="Type value"
                       helperText={error}
                       variant="outlined"
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
            <IconButton onClick={addItem} color={"primary"}>
                <Add/>
            </IconButton>
        </div>
    )
}