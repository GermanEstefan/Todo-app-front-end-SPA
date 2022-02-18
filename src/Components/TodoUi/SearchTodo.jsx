import { useContext, useState } from 'react';
import { searchTodo } from '../../helpers/searchTodo';
import { useForm } from '../../hooks/useForm'
import { userStatusContext } from '../../TodoApp';

export const SearchTodo = ({ setSearchTodos }) => {

    const [{ nameTodo }, handleInputChange, resetForm] = useForm({ nameTodo: '' });
    const { userData } = useContext(userStatusContext)
    const [alertInput, setAlertInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const search = searchTodo(userData.todos, nameTodo);
        if (search.length === 0) {
            setAlertInput('No matches')
            setInterval(() => setAlertInput(''), 2000);
            resetForm();
            return;
        }
        setSearchTodos(search);
        resetForm();
    }

    return (
        <form onSubmit={handleSubmit} className="container-todoui__to-do-list-container__form-search">
            <div className='input-container'>
                <i className="fas fa-sticky-note"></i>
                <input
                    name='nameTodo'
                    onChange={handleInputChange}
                    value={nameTodo}
                    placeholder="Search any todo"
                    autoComplete='off'
                >
                </input>
                <small className="input-container__msg-alert"> {alertInput} </small>
            </div>
            <i className="fas fa-search" onClick={handleSubmit}></i>
        </form>

    )
}
