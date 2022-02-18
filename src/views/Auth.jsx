import { Outlet } from "react-router-dom"
import { Header } from "../Components/Auth/Header"

export const Auth = () => {
    return (
        <div className="container-auth">
            <Header />
            <main>
                <Outlet />
            </main>
            <span className="dev">Developed by German</span>
        </div>
    )
}