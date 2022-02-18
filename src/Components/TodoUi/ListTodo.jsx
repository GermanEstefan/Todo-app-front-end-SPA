import React, { useContext, useState, useEffect } from "react";
import { userStatusContext } from "../../TodoApp";
import { Todo } from "./Todo";
import { filterTodos } from '../../helpers/filterTodos';
import { AddNewTodo } from "./AddNewTodo";

export const ListTodo = ({ todoListToShow, searchTodos }) => {

    const { userData } = useContext(userStatusContext);
    const [todos, setTodos] = useState(userData.todos);

    useEffect(() => {
        setTodos(searchTodos)
    }, [searchTodos])
    
    useEffect(() => {
        switch (todoListToShow.name) {
            case 'All':
                setTodos(userData.todos);
                break;
            case 'Pending':
                const todosPending = filterTodos(userData.todos, false);
                setTodos(todosPending)
                break;
            case 'Complete':
                const todosComplete = filterTodos(userData.todos, true);
                setTodos(todosComplete);
                break;
            default:
                break;
        }
    }, [todoListToShow, userData.todos]);

    return (
        <div className="list-todo-container">
            <ol className="list-todo">
                {
                    (Object.keys(userData.todos).length === 0)
                        ? <AddNewTodo/>
                        : todos.map(todo => {
                            return <Todo
                                key={todo.id}
                                valueTodo={todo.contentNote}
                                idTodo={todo.id}
                                isComplete={todo.complete}
                            />
                        })
                }
            </ol>
        </div>
    )
}
