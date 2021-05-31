import {v1} from "uuid";

type ActionsType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType;

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    todoListId: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string
}
export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type FilterValuesType = "all" | "completed" | "active";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const todoListId1 = v1();
export const todoListId2 = v1();

const initialState: TodoListType[] = [
    {id: todoListId1, title: "What to learn", filter: "all"},
    {id: todoListId2, title: "What to buy", filter: "all"}
]

export const todoListsReducer = (state: TodoListType[] = initialState, action: ActionsType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(st => action.todoListId !== st.id);
        case 'ADD-TODOLIST':
            return [{id: action.todoListId, title: action.title, filter: 'all'}, ...state];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(st => {
                if (st.id === action.id) {
                    return {...st, title: action.title};
                } else return {...st}
            });
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(st => {
                if (st.id === action.id) {
                    return {...st, filter: action.filter};
                } else return {...st}
            });
        default:
            return state;
    }
};

export const removeTodoListAC = (todoListId: string): RemoveTodoListActionType => {
    return { type: 'REMOVE-TODOLIST', todoListId: todoListId} as const
}

export const addTodoListAC = (todoListTitle: string): AddTodoListActionType => {
    return { type: 'ADD-TODOLIST', title: todoListTitle, todoListId: v1()} as const
}

export const changeTodoListTitleAC = (todoListId: string, todoListTitle: string): ChangeTodoListTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: todoListId, title: todoListTitle } as const
}

export const changeTodoListFilterAC = (todoListId: string, todoListFilter: FilterValuesType): ChangeTodoListFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: todoListId, filter: todoListFilter} as const
}