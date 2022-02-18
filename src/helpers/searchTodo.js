export const searchTodo = (todos, searchValue) => {
    return todos.filter( todo => todo.contentNote.toUpperCase().includes(searchValue.toUpperCase()));
}