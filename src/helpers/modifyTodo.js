
export const modifyTodo = (todos, idTodo, propToModify, value) => {

    return todos.map(todo => {
        if (todo.id === idTodo) {
            todo[propToModify] = value;
        }
        return todo;
    })
};