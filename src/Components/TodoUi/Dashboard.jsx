import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { userStatusContext } from "../../TodoApp";

export const Dashboard = () => {

    const { setUserData } = useContext(userStatusContext);
    const naviage = useNavigate();

    const handleLogout = () => {
        setUserData({});
        localStorage.removeItem('token');
        naviage('/login')
    }

    return (
        <div className="container-todoui__dashboard">
            <span onClick={handleLogout}>Logout</span>
        </div>
    )
}