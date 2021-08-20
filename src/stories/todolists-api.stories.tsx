import React, {useEffect, useState} from 'react'
import {todoListsAPI} from "../api/todolists-api";

export default {
    title: 'API'
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todoListsAPI.getTodoList()
            .then((response) => {
                setState(response.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsAPI.createTodoList('New todoList 10')
            .then((response) => {
                setState(response.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = 'b1a60281-d4cb-4e09-b245-c08a37d58a1c';
        todoListsAPI.deleteTodoList(todoListId)
            .then((response) => {
                setState(response.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodoListTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '026d81a3-460b-49a3-8023-ac6aec0d85d5';
        todoListsAPI.updateTodoList(todoListId, 'Qwerty')
            .then((response) => {
                setState(response.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        const todoListId = '5865b7a6-9978-41ea-9bd3-4fc0a945f8fa';
        todoListsAPI.getTasks(todoListId)
            .then((response) => {
                setState(response.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '5865b7a6-9978-41ea-9bd3-4fc0a945f8fa'
        todoListsAPI.createTask(todoListId, 'Task 4')
            .then((response) => {
                setState(response.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        const todoListId = '5865b7a6-9978-41ea-9bd3-4fc0a945f8fa';
        const taskId = '6fffba2a-a964-423c-ab40-f7fa409f07a8';
        todoListsAPI.deleteTask(todoListId, taskId)
            .then((response) => {
                setState(response.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '5865b7a6-9978-41ea-9bd3-4fc0a945f8fa';
        const taskId = '9fd9394b-a5c3-4c1d-a4cd-97099bc0d61f';
        todoListsAPI.updateTask(todoListId, taskId,{
            title: 'Task 1',
            description: null,
            status: 0,
            priority: 1,
            startDate: null,
            deadline: null
        })
            .then((response) => {
                setState(response.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}