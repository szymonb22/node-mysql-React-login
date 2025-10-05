import axios from 'axios';
import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterPage.css';
const RegisterPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [formErr,setFormErr]=useState("")
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
        if (password.length+1<6) {
            setPasswordErr('Password must have at least 6 characters');
        } else {
            setPasswordErr('');
        }
    };

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(email.length ===0 && password.length===0){
            setFormErr('Please fill the register form')
            return;
        }
        try {
            const res = await axios.post('http://localhost:8800/api/auth/signUp', { email, password })
            if (res.status === 201) {
                navigate('/login')
            }
            
        } catch (error) {
            setFormErr('User already exist')
        }
    }
    return (
        <div className='main'>
            <form action="" className='wrapper'>
                <h1>Register</h1>
                <div className="input-box">
                    <input
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={handleEmailChange}
                        required />
                    <IoMail className='icon' />
                   {{emailErr} && <p className='err'>{emailErr}</p>}
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={handlePasswordChange}
                        required />
                    <FaLock className='icon' />
                   {{passwordErr} && <p className='err'>{passwordErr}</p>}
                </div>
                <div className="login-button">
                    <button onClick={handleSubmit} disabled={emailErr.length>0||passwordErr.length>0} type="submit">Register</button>
                </div>
                {{formErr}&&<p className='err'>{formErr}</p>}
                <div className='login-link'>
                    <p>Arleady have an account? <Link to='/login'>Login</Link> </p>
                </div>
            </form>

        </div>
    );
}

export default RegisterPage;
