import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from 'validator';
import { fetchApi } from "../../helpers/api";
import { useForm } from "../../hooks/useForm"
import { userStatusContext } from "../../TodoApp";

export const FormRegister = () => {

    const navigate = useNavigate();
    const { userData, setUserData } = useContext(userStatusContext);
    const [isMounted, setIsMounted] = useState(true);

    const [inputValues, handleChangeInput, resetForm] = useForm({
        rName: '',
        rEmail: '',
        rPassword: ''
    });
    const { rName, rEmail, rPassword } = inputValues;

    useEffect(() => {
        return () => {
            setIsMounted(false);
        }
    }, [userData])

    const [alertInputName, setAlertInputName] = useState('');
    const [alertInputEmail, setAlertInputEmail] = useState('');
    const [alertInputPasssword, setAlertInputPassword] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (rName.trim().length <= 0) {
            setAlertInputName('Name is empty');
            setInterval(() => setAlertInputName(''), 2000);
            return;
        } else if (rEmail.trim().length <= 0) {
            setAlertInputEmail('Email is empty');
            setInterval(() => setAlertInputEmail(''), 2000);
            return;
        } else if (rPassword.trim().length <= 0) {
            setAlertInputPassword('Password is empty');
            setInterval(() => setAlertInputPassword(''), 2000);
            return;
        }

        if (!validator.isEmail(rEmail)) {
            setAlertInputEmail('Not is a valid email');
            setInterval(() => setAlertInputEmail(''), 2000);
            return;
        }

        if (rPassword.length <= 5) {
            setAlertInputPassword('Min length of password is 6 characters')
            setInterval(() => setAlertInputPassword(''), 2000);
            return;
        }

        try {
            const resp = await fetchApi('auth/create', 'POST', inputValues);
            console.log(resp)
            if (!resp.ok) { //Usuario ya existe
                setAlertInputEmail(resp.msg)
                setInterval(() => setAlertInputEmail(''), 2000);
                return;
            }

            localStorage.setItem('token', resp.userData.token);
            if (isMounted) {
                setUserData(resp.userData);
                navigate('/todoUi');
                resetForm();
            }

        } catch (error) {
            alert('Internal error')
        }

    }

    return (
        <div className="container__form-register animate__animated animate__fadeIn">

            <form className="form" onSubmit={handleSubmit}>

                <h2>Form register</h2>

                <div className="input-container">
                    <i className="fas fa-user"></i>
                    <input
                        autoComplete="off"
                        type="text"
                        name="rName"
                        placeholder="Name"
                        onChange={handleChangeInput}
                    />
                    <small className="input-container__msg-alert">{alertInputName}</small>
                </div>

                <div className="input-container">
                    <i className="fas fa-envelope"></i>
                    <input
                        autoComplete="off"
                        type="text"
                        name="rEmail"
                        placeholder="Email"
                        onChange={handleChangeInput}
                    />
                    <small className="input-container__msg-alert">{alertInputEmail}</small>
                </div>

                <div className="input-container">
                    <i className="fas fa-lock"></i>
                    <input
                        autoComplete="off"
                        type="password"
                        name="rPassword"
                        placeholder="Password"
                        onChange={handleChangeInput}
                    />
                    <small className="input-container__msg-alert">{alertInputPasssword}</small>
                </div>

                <span onClick={() => navigate('/login')}>¿ Already register ?</span>

                <button className="form-register__btn-register">
                    Submit
                </button>

            </form>

        </div>
    )
}