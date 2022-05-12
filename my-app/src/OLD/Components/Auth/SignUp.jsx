import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EmailOutlined, Person, Key } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { register, login, reset } from "../../redux/auth/authSlice";
import { toast } from 'react-toastify'
import Spinner from '../Spinner'

export default function SignUp() {
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
            toast.error(message);
        }
        if (isSuccess) {
            navigate("/");
        }
        // dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormDate((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    
    const signup = (e) => {
        e.preventDefault()
        const userData = {
          name,email,password
        }
        dispatch(register(userData))
    }
    if (isLoading) {
        return <Spinner/>
    }
    return (
        <div className="register">
            {message && message}
            <form onSubmit={signup}>
                <div className="field">
                    <Person/>
                    <input 
                        type="text"
                        placeholder="name"
                        onChange={onChange}
                        name="name"
                        value={name}
                      />
                </div>
                <div className="field">
                    <EmailOutlined/>
                    <input 
                        type="email"
                        placeholder="email"
                        onChange={onChange}
                        name="email"
                        value={email}
                      />
                </div>
                <div className="field">
                    <Key/>
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
                        value="register"
                        onChange={onChange}
                      />
                </div>
            </form>
            <p>
                if you don't have an account,
                <Link to="/signUp"> create an account </Link>{" "}
            </p>
        </div>
    );
}
