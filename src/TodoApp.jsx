import { createContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { FormLogin } from './Components/Auth/FormLogin';
import { FormRegister } from './Components/Auth/FormRegister';
import { FormAddTodo } from './Components/TodoUi/FormAddTodo';
import { verifyAuth } from './helpers/api';
import { Auth } from './views/Auth';
import { TodoUi } from './views/TodoUi';

export const userStatusContext = createContext({}); //Provedor de la data del usuario

export const TodoApp = () => {

    const [userData, setUserData] = useState({});

    useEffect(() => { //Verifica si el usuario esta auth
        verifyAuth().then(resp => {
            if (!resp) {
                return;
            }
            setUserData(resp.userData);
        })
    }, []);

    return (
        <userStatusContext.Provider value={{ userData, setUserData }}>
            <Routes>
                {
                    (Object.keys(userData).length === 0) //Objeto vacio === no auth
                        ? <>
                            <Route path='/' element={<Auth />}>
                                <Route index element={<FormLogin />}></Route>
                                <Route path='/login' element={<FormLogin />}></Route>
                                <Route path='/register' element={<FormRegister />}></Route>
                                <Route path='*' element={<FormLogin />}></Route>
                            </Route>
                        </>

                        : <>
                            <Route path='/todoui' element={<TodoUi />}>
                                <Route path='/todoui/addtodo' element={<FormAddTodo />}></Route>
                            </Route>
                            <Route path='*' element={<TodoUi />}></Route>
                        </>
                }
            </Routes>
        </userStatusContext.Provider>
    )

}