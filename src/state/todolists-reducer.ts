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
    todoListTitle: string
    todoListId: string
}
export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todoListId: string
    todoListTitle: string
}
export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    todoListId: string
    todoListFilter: FilterValuesType
}

export type FilterValuesType = "all" | "completed" | "active";

export type TodoListType = {
    todoListId: string
    title: string
    filter: FilterValuesType
}

export const todoListId1 = v1();
export const todoListId2 = v1();

const initialState: TodoListType[] = [
    {todoListId: todoListId1, title: "What to learn", filter: "all"},
    {todoListId: todoListId2, title: "What to buy", filter: "all"}
];

export const todoListsReducer = (state: TodoListType[] = initialState, action: ActionsType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(st => action.todoListId !== st.todoListId);
        case 'ADD-TODOLIST':
            return [{todoListId: action.todoListId, title: action.todoListTitle, filter: 'all'}, ...state];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(st => {
                if (st.todoListId === action.todoListId) {
                    return {...st, title: action.todoListTitle};
                } else return {...st}
            });
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(st => {
                if (st.todoListId === action.todoListId) {
                    return {...st, filter: action.todoListFilter};
                } else return {...st}
            });
        default:
            return state;
    }
};

export const removeTodoListAC = (todoListId: string): RemoveTodoListActionType => {
    return { type: 'REMOVE-TODOLIST', todoListId} as const
}

export const addTodoListAC = (todoListTitle: string): AddTodoListActionType => {
    return { type: 'ADD-TODOLIST', todoListTitle, todoListId: v1()} as const
}

export const changeTodoListTitleAC = (todoListId: string, todoListTitle: string): ChangeTodoListTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', todoListId, todoListTitle } as const
}

export const changeTodoListFilterAC = (todoListId: string, todoListFilter: FilterValuesType): ChangeTodoListFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', todoListId, todoListFilter} as const
}
