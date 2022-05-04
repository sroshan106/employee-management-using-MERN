import React, {useState} from 'react'

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
        console.log(user);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
            
            <button >Login Now</button>
        </div>
    )
}
