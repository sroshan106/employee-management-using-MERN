import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authHeader from '../../service/auth-header';
import './homepage.css';

function Homepage(props) {

    const Navigate = useNavigate();

    const { currentUser, setCurrentUser } = props;
    const {id, email, name} = currentUser;
    useEffect( () => {
        if ( !id ) {
            Navigate('/login')
        }
        const requestOptions = {
            method: 'GET',
            headers: authHeader(),
        };
        fetch('http://localhost:4600/homepage', requestOptions)
        .then(response => response.json())
        .then((data) => {
            if(data.isLoggedIn && data.username) {
                let userData = {
                    name:data.username.toUpperCase(),
                    id:data.id,
                    email:data.email
                }
                setCurrentUser( {...currentUser, ...userData });
            } else {
                let userData = {
                    name:'',
                    id:'',
                    email:''
                }
                setCurrentUser( {...currentUser, ...userData });
            }
        }
        );
    }, [currentUser, setCurrentUser, id, Navigate ])

    const logOutUser = () => {
        localStorage.removeItem('token');
        let userData = {
            name:'',
            id:'',
            email:''
        }
        setCurrentUser( {...currentUser, ...userData } );
    }
    return (
        <div className='homepage-container'>
            
            {id && <p>Your login ID: {id}</p>}
            {name && <p>Your user name: {name}</p>}
            {email && <p>Your Email: {email}</p>}
            {id && <button className='logout-button' onClick={logOutUser}>Logout</button>}
        </div>
    )
}
export default Homepage;