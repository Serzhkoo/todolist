import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType, todoListId1, todoListId2} from "./todolists-reducer";

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType;

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    taskTitle: string
    todoListId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    todoListId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    todoListId: string
    taskTitle: string
}

export type TaskType = {
    taskId: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {
    [todoListId1]: [
        {taskId: v1(), title: "HTML and CSS", isDone: true},
        {taskId: v1(), title: "JS", isDone: true},
        {taskId: v1(), title: "React", isDone: false},
        {taskId: v1(), title: "Redux", isDone: false}
    ],
    [todoListId2]: [
        {taskId: v1(), title: "Villa", isDone: false},
        {taskId: v1(), title: "BMW", isDone: false},
        {taskId: v1(), title: "Audi", isDone: false},
        {taskId: v1(), title: "Milk", isDone: true}
    ]
};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.taskId !== action.taskId)
            };
        case 'ADD-TASK':
            return {
                ...state,
                [action.todoListId]: [{taskId: v1(), title: action.taskTitle, isDone: false}, ...state[action.todoListId],]
            };
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.taskId === action.taskId ? {...t, isDone: !t.isDone} : t)
            };
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.taskId === action.taskId ? {...t, title: action.taskTitle} : t)
            };
        case 'ADD-TODOLIST':
            return {...state, [action.todoListId]: []};
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state};
            delete stateCopy[action.todoListId];
            return stateCopy;
        default:
            return state;
    }
};

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todoListId} as const
}

export const addTaskAC = (taskTitle: string, todoListId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', taskTitle, todoListId} as const
}

export const changeTaskStatusAC = (taskId: string, todoListId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, todoListId} as const
}

export const changeTaskTitleAC = (taskId: string, todoListId: string, taskTitle: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, todoListId, taskTitle} as const
}