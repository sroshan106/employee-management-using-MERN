import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { validEmail,validName, validPassword } from '../regex/regex';

export default function Register() {
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


    function handleChangeUser(e) {
        const {name, value} = e.target;

        setUser({
            ...user,
            [name]:value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        validateInput();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        };
        fetch('http://localhost:4600/register', requestOptions)
        .then(response => response)
        .then(data => console.log(data));
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
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                    Name:
                    <input type="text" name="name" value={user.name} onChange={handleChangeUser} />
                    </label>
                    {error.name && <span className='err'>{error.name}</span>}
                </div>
                <div>
                    <label>
                    Email:
                    <input type="text" name="email" value={user.email} onChange={handleChangeUser} />
                    </label>
                    {error.email && <span className='err'>{error.email}</span>}
                </div>

                <div>
                    <label>
                    Password:
                    <input type="password" name="password" value={user.password} onChange={handleChangeUser} />
                    </label>
                    {error.password && <span className='err'>{error.password}</span>}
                </div>

                <div>
                    <label>
                    Confirm Password:
                    <input type="password" name="rePassword" value={user.rePassword} onChange={handleChangeUser} />
                    </label>
                    {error.rePassword && <span className='err'>{error.rePassword}</span>}
                </div>

                <button type="submit">Register</button>
            </form>

            <h2>OR</h2>
            
            <Link to="/login">Login Now</Link>
        </div>
    )
}
