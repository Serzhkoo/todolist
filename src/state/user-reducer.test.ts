import {userReducer} from './user-reducer';

test('user reducer should increment only age', () => {
    const startState = { age: 30, childrenCount: 2, name: 'Serzhkoo' };

    const endState = userReducer(startState, { type: 'INCREMENT-AGE' })

    expect(endState.age).toBe(31);
    expect(endState.childrenCount).toBe(2);
});

test('user reducer should increment only childrenCount', () => {
    const startState = { age: 30, childrenCount: 2, name: 'Serzhkoo' };

    const endState = userReducer(startState, { type: 'INCREMENT-CHILDREN-COUNT' })

    expect(endState.age).toBe(30);
    expect(endState.childrenCount).toBe(3);
});

test('user reducer should change name of user', () => {
    const startState = { name: 'Serzhkoo', age: 30, childrenCount: 2 };
    const newName = 'Serzhku';
    const endState = userReducer(startState, { type: 'CHANGE-NAME', newName: newName })

    expect(endState.name).toBe(newName);
});
