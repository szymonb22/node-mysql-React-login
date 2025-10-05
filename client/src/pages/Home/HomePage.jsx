import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import './HomePage.css';
const HomePage = () => {

    const navigate = useNavigate()
    const [userData, setUserData] = useState([]);
    const handleLogOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    const isTokenExpired = (token) => {
        if (!token) return true;
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp < currentTime;
        } catch (error) {
            console.error('Error decoding token:', error);
            return true;
        }
    };
    const fetchUser = async() => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get('http://localhost:8800/api/users/user', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                setUserData(response.data)
            }
        } catch (err) {
            navigate('/login')
            console.log(err)
        }
    }

    useEffect(() => {
        fetchUser()

    }, [])

    useEffect(() => {
        const timer = setInterval(() => {

            if (localStorage.getItem('token')) {
                const token = localStorage.getItem('token');
                if (isTokenExpired(token)) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } else {
                navigate('/login');
            }
        }, 60 * 1000);
        return () => {
            clearInterval(timer);
        }
    }, []);

    return (
        <div className='home'>
            <h1>Hello {userData?.email}</h1> <button className='btn' onClick={handleLogOut}>LogOut</button>
        </div>
    );
}

export default HomePage;
