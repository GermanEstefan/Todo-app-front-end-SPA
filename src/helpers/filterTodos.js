export const filterTodos = (todos, valueToFilter) => {
    return todos.filter(todo => todo.complete === valueToFilter);
}