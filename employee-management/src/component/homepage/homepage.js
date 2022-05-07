import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authHeader from '../../service/auth-header';


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
                    name:data.username,
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
        <div>
            
            {id && <p>{id}</p>}
            {name && <p>{name}</p>}
            {email && <p>{email}</p>}
            {id && <button onClick={logOutUser}>Logout</button>}
        </div>
    )
}
export default Homepage;