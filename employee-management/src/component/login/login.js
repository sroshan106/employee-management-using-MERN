import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validEmail, validPassword } from '../regex/regex';
import './login.css';
import logo from './login-icon.jpg';

function Login(props) {

    const [user, setUser ] = useState({
        email:"",
        password:"",
    });
    const [loginError, setLoginError ] = useState("");
    const { currentUser } = props;
    const Navigate = useNavigate();

    useEffect( () => { 
        if ( currentUser.id ){
            Navigate('/');
        }
    }, [currentUser, Navigate])

    function handleChangeUser(e) {
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]:value
        })
    }

    function validateInput() {

        if( ! validEmail.test(user.email) ){
            return false;
        } else{
            return true;
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if ( ! validateInput() ) {
            setLoginError("Please enter a valid email*");
            return
        }
        setLoginError("");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        };
        fetch('/login', requestOptions)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            if(data.isValid && data.token) {
                localStorage.setItem("token", data.token);
                Navigate('/');
            } else {
                setLoginError(data.message);
            }
        }
        );
    }

    return (

        <div className='login-container'>
            <div className='login-wrapper'>
                <div className="imgcontainer">
                    <img src={logo} alt="Avatar" className="avatar" />
                </div>

                <form onSubmit={handleSubmit}>
                    {loginError && <div className='warning-message'><p>{loginError}</p></div>}
                    <div className='inputBoxes'>
                        <input type="text" name="email"value={user.email} onChange={handleChangeUser} placeholder="Email"/>
                    </div>
                    <div className='inputBoxes'>
                        <input type="password" name="password"value={user.password} onChange={handleChangeUser} placeholder="Password"/>
                    </div>
                    
                    <div className="login-button"><input type="submit" value="Login" /></div>
                </form>
                
                <h2>OR</h2>
                <div className='register-button'>
                    <Link to="/register">Register Now</Link>
                </div>
            </div>
        </div>
    )
}
export default Login;