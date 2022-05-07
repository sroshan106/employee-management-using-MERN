import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { validEmail,validName, validPassword } from '../regex/regex';
import './register.css'

export default function Register(props) {
    const [user, setUser ] = useState({
        name:"",
        email:"",
        password:"",
        rePassword:""
    });

    const [error, setError ] = useState({
        name:"",
        email:"",
        password:"",
        rePassword:""
    });

    const [registrationError, setRegistrationError] = useState("");
    const Navigate = useNavigate();
    const { currentUser } = props;
    

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

    function handleSubmit(e) {
        e.preventDefault();
        if ( ! validateInput() ) {
            setRegistrationError('');
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        };
        fetch('http://localhost:4600/register', requestOptions)
        .then(response => response.json())
        .then( (data) => {
            if(data.isSaved) {
                Navigate('/login');
                setRegistrationError('');
            } else {
                setRegistrationError(data.message);
            }

        });
    }
    

    function validateInput() {
        let inputVar = {}
        if( ! validName.test(user.name)){
            inputVar['name'] = 'Please enter valid name';
        } else{
            inputVar['name'] = '';
        }

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

    
        if ( user.password !== user.rePassword ){
            inputVar['rePassword'] = 'Password does not match';
        } else {
            inputVar['rePassword'] = '';

        }
        setError({ ...inputVar, error});
        if (inputVar.name==="" && inputVar.email==="" && inputVar.password==="" && inputVar.rePassword==="" ){
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className='register-container'>
            <div className='register-wrapper'>
                <h2 className="header-form">Sign up for free to start working.</h2>
                <form onSubmit={handleSubmit}>
                    {registrationError && <p className='warning-message-big'>{registrationError}</p> }
                    <div className='inputBoxes'>
                        <input type="text" name="name" value={user.name} onChange={handleChangeUser} placeholder="Name"/>
                    </div>
                    {error.name && <div className='warning-message'>{error.name}</div>}
                    <div className='inputBoxes'>
                        <input type="text" name="email" value={user.email} onChange={handleChangeUser} placeholder="Email"/>
                    </div>
                    {error.email && <div className='warning-message'>{error.email}</div>}
                    <div className='inputBoxes'>
                        <input type="password" name="password" value={user.password} onChange={handleChangeUser} placeholder="Password"/>
                    </div>
                    <div> <p className='info-message'>**Password must contain letters and number</p></div>
                    {error.password && <div className='warning-message'>{error.password}</div>}
                    <div className='inputBoxes'>
                        <input type="password" name="rePassword" value={user.rePassword} onChange={handleChangeUser} placeholder="Confirm Password"/>
                    </div>
                    {error.rePassword && <div className='warning-message'>{error.rePassword}</div>}

                    <button className='register-button' type="submit">Register</button>
                </form>
                <h2>OR</h2>
                
                <div className='login-button'>
                    <Link to="/login">Login Now</Link>
                </div>
            </div>
        </div>
    )
}
