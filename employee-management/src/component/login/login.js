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
        let inputVar = {}

        if( ! validEmail.test(user.email)){
            inputVar['email'] = 'Please enter valid email';
        } else{
            inputVar['email'] = '';
        }

        if( ! validPassword.test(user.password)){
            inputVar['password'] = 'Please enter valid password';
        } else{
            inputVar['password'] = '';
        }

        if ( inputVar['password']==="" && inputVar['email']==="" ){
            return true;
        } else {
            return false;
        }
    }

    function handleSubmit(e) {
        
        e.preventDefault();
        if ( ! validateInput() ) {
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        };
        fetch('http://localhost:4600/login', requestOptions)
        .then(response => response.json())
        .then((data) => {
            if(data.message==="Success" && data.token) {
                localStorage.setItem("token", data.token);
                
                Navigate('/');
            }
        }
        );
    }

    return (
        <div className='container'>
            <div className='login-wrapper'>
                <div className="imgcontainer">
                    <img src={logo} alt="Avatar" className="avatar" />
                </div>

                <form onSubmit={handleSubmit}>
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