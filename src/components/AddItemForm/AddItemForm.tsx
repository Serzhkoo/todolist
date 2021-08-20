import { IconButton, TextField } from '@material-ui/core';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Add } from '@material-ui/icons';

export type AddItemFormPropsType = {
  addItem: (title: string) => void
  disabled?: boolean
}

export const AddItemForm = React.memo(({ addItem, disabled = false }: AddItemFormPropsType) => {
  console.log('AddItemForm called');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    error !== '' && setError('');
    e.key === 'Enter' && addItemHandler();
  };

  const addItemHandler = () => {
    if (title.trim() === '') {
      setError('Title is required!');
    } else {
      addItem(title.trim());
      setTitle('');
    }
  };

  return (
    <div>
      <TextField
        error={!!error}
        disabled={disabled}
        label="Type value"
        helperText={error}
        variant="outlined"
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
      />
      <IconButton onClick={addItemHandler} color={'primary'} disabled={disabled}>
        <Add/>
      </IconButton>
    </div>
  );
});