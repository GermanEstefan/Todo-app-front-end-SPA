import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { userStatusContext } from "../../TodoApp";
import { fetchApi } from "../../helpers/api";
import { useForm } from "../../hooks/useForm";

export const FormLogin = () => {

    const [isMounted, setIsMounted] = useState(true);
    const { userData, setUserData } = useContext(userStatusContext);
    const navigate = useNavigate();

    const [inputValues, handleChangeInput, resetForm] = useForm({
        lEmail: '',
        lPassword: ''
    });
    const { lEmail, lPassword } = inputValues;

    useEffect(() => {
        return () => {
            setIsMounted(false);
        }
    }, [userData])

    const [alertInputEmail, setAlertInputEmail] = useState('');
    const [alertInputPassword, setAlertInputPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        if (lEmail.trim().length <= 0) {
            setAlertInputEmail('Name is empty');
            setInterval(() => setAlertInputEmail(''), 2000);
            return;

        } else if (lPassword.trim().length <= 0) {
            setAlertInputPassword('Password is empty');
            setInterval(() => setAlertInputPassword(''), 2000);
            return;
        }

        if (!validator.isEmail(lEmail)) {
            setAlertInputEmail('Email is invalid');
            setInterval(() => setAlertInputEmail(''), 2000);
            return;
        }

        if (lPassword.length <= 5) {
            setAlertInputPassword('Min length of password is 6 characters');
            setInterval(() => setAlertInputPassword(''), 2000);
            return;
        }

        try {
            const resp = await fetchApi('auth/login', 'POST', inputValues);

            if (!resp.ok) {

                if (resp.msg.toUpperCase().includes('EMAIL')) {
                    setAlertInputEmail('The email does not exist');
                    setInterval(() => setAlertInputEmail(''), 2000);
                    return;
                }

                if (resp.msg.toUpperCase().includes('PASSWORD')) {
                    setAlertInputPassword(resp.msg);
                    setInterval(() => setAlertInputPassword(''), 2000)
                    return;
                }
            }

            //Credenciales validas
            localStorage.setItem('token', resp.userData.token);
            if (isMounted) {
                setUserData(resp.userData);
                navigate('/todoui')
                resetForm();
            }
        } catch (error) {
            alert('Internal error, please check your internet');
        }
    }

    return (
        <div className="container__form-login animate__animated animate__fadeIn">

            <form className="form" onSubmit={handleLogin}>

                <h2>Form login</h2>

                <div className="input-container">
                    <i className="fas fa-envelope"></i>
                    <input
                        autoComplete="off"
                        type="text"
                        name="lEmail"
                        placeholder="Email"
                        onChange={handleChangeInput}
                        value={lEmail}
                    />
                    <small className="input-container__msg-alert">{alertInputEmail}</small>
                </div>

                <div className="input-container">
                    <i className="fas fa-lock"></i>
                    <input
                        autoComplete="off"
                        type="password"
                        name="lPassword"
                        placeholder="Password"
                        onChange={handleChangeInput}
                        value={lPassword}
                    />
                    <small className="input-container__msg-alert"> {alertInputPassword} </small>
                </div>

                <span className="form-login__span-register">Dont have account ? <b onClick={() => navigate("/register")}>Register</b></span>

                <button type="submit" className="form-login__btn-login">
                    Login
                </button>

            </form>

        </div>
    )
}