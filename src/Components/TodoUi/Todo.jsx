import { useContext } from "react";
import { fetchApi } from "../../helpers/api";
import { modifyTodo } from "../../helpers/modifyTodo";
import { userStatusContext } from "../../TodoApp";

export const Todo = ({ valueTodo, idTodo, isComplete }) => {

    const { userData, setUserData } = useContext(userStatusContext);
    const { todos } = userData;

    const handleDelete = async () => {
        const todoFiletered = todos.filter(todo => todo.id !== idTodo);
        try {
            const resp = await fetchApi(`notes/delete/${idTodo}`, 'DELETE');
            console.log(resp)
            if (!resp.ok) { //Token eliminado del localStorage
                alert(resp.msg);
                setUserData({});
                return;
            }
            setUserData({ ...userData, todos: todoFiletered });
        } catch (error) {
            alert(error);
        }

    }

    const handleComplete = async () => {
        const findTodo = todos.find(todo => todo.id === idTodo);
        if (findTodo.complete) { //Tarea finalizada, por lo tanto, se desmarca como finalizada
            try {
                const resp = await fetchApi(`notes/nocomplete/${idTodo}`, 'PUT');
                console.log(resp)
                if (!resp.ok) { //Token eliminado del localStorage
                    alert(resp.msg);
                    setUserData({});
                    return;
                }
                const noCompleteTodo = modifyTodo(todos, idTodo, 'complete', false);
                setUserData({ ...userData, todos: noCompleteTodo });
            } catch (error) {
                alert(error);
            }
        } else { //Tarea pendiente, por lo tanto, se marca como finalizada
            try {
                const resp = await fetchApi(`notes/complete/${idTodo}`, 'PUT');
                console.log(resp)
                if (!resp.ok) { //Token eliminado del localStorage
                    alert(resp.msg);
                    setUserData({});
                    return;
                }
                const completeTodo = modifyTodo(todos, idTodo, 'complete', true);
                setUserData({ ...userData, todos: completeTodo });
            } catch (error) {
                alert(error);
            }

        }
    }

    return (
        <li className="animate__animated animate__fadeIn">
            {valueTodo}
            <i className={ isComplete ? "far fa-check-circle task-complete" : "far fa-check-circle"} onClick={handleComplete}></i>
            <i className="fas fa-times" onClick={handleDelete}></i>
        </li>
    )
}