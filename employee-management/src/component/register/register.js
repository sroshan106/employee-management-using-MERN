import React, {useState} from 'react'
import { Link } from 'react-router-dom';

export default function Register() {
    const [user, setUser ] = useState({
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

    function handleSubmit() {
        console.log('handling submit');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
            mode: 'no-cors'
        };
        fetch('https://localhost:4600/register', requestOptions)
        .then(response => response)
        .then(data => console.log(data));
    }

    return (
        <div>
            <form method="POST" onSubmit={handleSubmit}>
                <div>
                    <label>
                    Name:
                    <input type="text" name="name" value={user.name} onChange={handleChangeUser} />
                    </label>
                </div>
                <div>
                    <label>
                    Email:
                    <input type="text" name="email" value={user.email} onChange={handleChangeUser} />
                    </label>
                </div>

                <div>
                    <label>
                    Password:
                    <input type="password" name="password" value={user.password} onChange={handleChangeUser} />
                    </label>
                </div>

                <div>
                    <label>
                    Confirm Password:
                    <input type="password" name="rePassword" value={user.rePassword} onChange={handleChangeUser} />
                    </label>
                </div>

                <input type="submit" value="Register" />
            </form>

            <h2>OR</h2>
            
            <Link to="/login">Login Now</Link>
        </div>
    )
}
