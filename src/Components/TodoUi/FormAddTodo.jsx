import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "../../helpers/api";
import { useForm } from "../../hooks/useForm"
import { userStatusContext } from "../../TodoApp";

export const FormAddTodo = () => {

    const { setUserData, userData } = useContext(userStatusContext);
    const [inputValues, handleChangeInput, resetForm] = useForm({ contentNote: '' })
    const { todos } = userData;
    const navigate = useNavigate();

    const [inputContentNoteAlert, setInputContentNoteAlert] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputValues.contentNote.trim().length <= 2) {
            setInputContentNoteAlert('Min length of text is 3 characters');
            setInterval(() => setInputContentNoteAlert(''), 2000);
            return;
        }
        try {
            const resp = await fetchApi('notes/create', 'POST', inputValues);
            console.log(resp)
            if (!resp.ok) { //Token eliminado del localStorage
                alert(resp.msg);
                setUserData({});
                navigate('/login')
                return;
            }
            setUserData({ ...userData, todos: [...todos, resp.newTodo] })
            resetForm();
            setInputContentNoteAlert('Task added successfully !')
            setInterval( () => setInputContentNoteAlert(''),2000);
        } catch (error) {
            alert('Internal error, check you interner connection')
        }

    }

    return (
        <div className="container-form-add-todo animate__animated animate__fadeIn">
            <form onSubmit={handleSubmit} className="form-add-todo">
                <i className="fas fa-times" onClick={ () => navigate('/todoui')}></i>
                <h2>Add new todo</h2>
                <div className="input-container">
                    <i className="far fa-sticky-note"></i>
                    <input
                        type="text"
                        onChange={handleChangeInput}
                        autoComplete="off"
                        placeholder="Type text"
                        name="contentNote"
                        value={inputValues.contentNote}
                    />
                    <small className="input-container__msg-alert"> {inputContentNoteAlert} </small>
                    <small className="input-container__msg-alert-successfully"> {inputContentNoteAlert} </small>
                </div>
                <button>Add task</button>
            </form>
        </div>

    )
}