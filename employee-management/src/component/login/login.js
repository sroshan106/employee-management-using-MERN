import React, { useState } from 'react';
import { Link } from 'react-router-dom';


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

    function handleSubmit() {
        console.log(user);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                    Name:
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