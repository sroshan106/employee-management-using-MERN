import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authHeader from '../../service/auth-header';


function Homepage(props) {

    const Navigate = useNavigate();

    const { currentUser, setCurrentUser } = props;
    const {id, email, name} = currentUser;
    useEffect( () => { 
        const requestOptions = {
            method: 'GET',
            headers: authHeader(),
        };
        fetch('http://localhost:4600/homepage', requestOptions)
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            if(data.isLoggedIn && data.username) {
                // console.log(data);
                let userData = {
                    name:data.username,
                    id:data.id,
                    email:data.email
                }
                setCurrentUser( {...currentUser, ...userData });
            } else{
                let userData = {
                    name:'',
                    id:'',
                    email:''
                }
                setCurrentUser( {...currentUser, ...userData });
            }
        }
        );
    }, [])

    const logOutUser = () =>{
        localStorage.removeItem('token');
        let userData = {
            name:'',
            id:'',
            email:''
        }
        setCurrentUser( {...currentUser, ...userData });
    }
    return (
        <div>
            { ! id && Navigate('/login')}
            {id && <p>{id}</p>}
            {name && <p>{name}</p>}
            {email && <p>{email}</p>}
            {id && <button onClick={logOutUser}>Logout</button>}
        </div>
    )
}
export default Homepage;