import { Outlet, useNavigate } from "react-router-dom"
import { Dashboard } from "../Components/TodoUi/Dashboard"
import { ToDoListContainer } from "../Components/TodoUi/ToDoListContainer"
import { UserInfo } from "../Components/TodoUi/UserInfo"

export const TodoUi = () => {

    const navigate = useNavigate('');
    
    return (
        <div className="container-todoui animate__animated animate__fadeIn">
            <Dashboard />
            <main>
                <UserInfo />
                <ToDoListContainer />
                <Outlet />
                <i
                    className="fas fa-plus container-todoui__add-todo"
                    onClick={() => navigate('/todoui/addtodo')}
                ></i>
                <span className="container-todoui__dev">Developed by German</span>
            </main>
        </div>
    )
}