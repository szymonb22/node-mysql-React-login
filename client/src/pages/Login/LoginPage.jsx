import React, { useState } from 'react';
import './LoginPage.css';
import { IoMail } from 'react-icons/io5';
import { FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [formErr, setFormErr] = useState("")
    const isEmailValid = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        if (!isEmailValid(value)) {
            setEmailErr('Invalid email format.');
        } else {
            setEmailErr('');
        }
    };
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        if (password.length + 1 < 6) {
            setPasswordErr('Password must have at least 6 characters');
        } else {
            setPasswordErr('');
        }
    }
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:8800/api/auth/login', { email, password })
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token);
                navigate('/');
            }
        } catch (error) {
            setFormErr('Wrong credentials')
        }
    }

    return (
        <div className='main'>
            <form action="" className='wrapper'>
                <h1>Login</h1>
                <div className="input-box">
                    <input
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <IoMail className='icon' />
                    {{ emailErr } && <p className='err'>{emailErr}</p>}
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={handlePasswordChange}
                        required />

                    <FaLock className='icon' />
                    {{ passwordErr } && <p className='err'>{passwordErr}</p>}

                </div>
                <div className="login-button">
                    <button onClick={handleLogin} type="submit">Log in</button>
                </div>
                {{ formErr } && <p className='err'>{formErr}</p>}
                <div className='register-link'>
                    <p>Don't have an account? <Link to='/signUp'>Register</Link> </p>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
