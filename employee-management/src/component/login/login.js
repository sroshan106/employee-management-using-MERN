import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { validEmail, validPassword } from '../regex/regex';

function Login() {
    const [user, setUser ] = useState({
        email:"",
        password:"",
    });


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
            console.log(data)
            if(data.message==="Success" && data.token) {
                localStorage.setItem("token", data.token);
            }
        }
        );
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                    Email:
                    <input type="text" name="email"value={user.email} onChange={handleChangeUser} />
                    </label>
                </div>

                <div>
                    <label>
                    Password:
                    <input type="password" name="password"value={user.password} onChange={handleChangeUser} />
                    </label>
                </div>

                <input type="submit" value="Login" />
            </form>

            <h2>OR</h2>
            <Link to="/register">Register Now</Link>
        </div>
    )
}
export default Login;