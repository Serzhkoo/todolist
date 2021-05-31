import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableTitlePropsType = {
    title: string
    onChange: (title: string) => void
}

export function EditableTitle(props: EditableTitlePropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState('');
    const [error, setError] = useState("");

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('');
        e.key === 'Enter' && deActivateEditMode();
    }

    const deActivateEditMode = () => {
        if (title.trim() === "") {
            setError('Title is required!');
        } else {
            setEditMode(false)
            props.onChange(title.trim())
        }
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        editMode
            ? <TextField error={!!error}
                         helperText={error}
                         variant={"outlined"}
                         value={title}
                         onChange={onChangeTitleHandler}
                         onBlur={deActivateEditMode}
                         onKeyPress={onKeyPressHandler}
                         autoFocus/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}