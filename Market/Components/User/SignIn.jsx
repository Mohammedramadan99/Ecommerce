import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EmailOutlined, Person, Key } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { register, login,reset } from "../../redux/auth/authSlice";
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import Spinner from '../Layout/Spinner'


export default function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormDate] = useState({
        email: "",
        password: "",
    });
    const { name, email, password } = formData;
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess && user) {
            navigate("/");
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormDate((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const signIn = (e) => {
        e.preventDefault()
        const userData = {
          email,password
        }
        dispatch(login(userData))
    }
    if (isLoading) {
        return <Spinner/>
    }
    return (
        <div className="signin">
            {message && message}
            <form onSubmit={signIn}>
                <div className="field">
                    <EmailOutlined />
                    <input 
                        type="email"
                        placeholder="email"
                        onChange={onChange}
                        name="email"
                        value={email}
                      />
                </div>
                <div className="field">
                    <Key />
                    <input 
                        type="password"
                        placeholder="password"
                        onChange={onChange}
                        name="password"
                        value={password}
                      />
                </div>
                <div className="field">
                    <input 
                        type="submit"
                        value="sign in"
                        onChange={onChange}
                      />
                </div>
            </form>
        </div>
    );
}
