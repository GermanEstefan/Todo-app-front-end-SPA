import { useContext } from "react"
import { userStatusContext } from "../../TodoApp";

export const Dashboard = () => {

    const { setUserData } = useContext(userStatusContext);

    const handleLogout = () => {
        //No es necesario hacer una navegacion programatica ya que las rutas protegidas hacen el trabajo 
        setUserData({});
        localStorage.removeItem('token');
    }

    return (
        <div className="container-todoui__dashboard">
            <span onClick={handleLogout}>Logout</span>
        </div>
    )
}