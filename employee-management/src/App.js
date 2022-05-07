import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Homepage from './component/homepage/homepage';
import Login from './component/login/login';
import Register from './component/register/register';
import './app.css';


function App() {

  const [currentUser,setCurrentUser] = useState({
    id:"",
    name:"",
    email:""
  })
  
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </ul>

              <p>{currentUser.name}</p>
            </nav>

            <Routes>
              <Route path="/" element={<Homepage currentUser={currentUser} setCurrentUser={setCurrentUser}   />}></Route>
              <Route path="/login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />}></Route>
              <Route path="/register" element={<Register currentUser={currentUser} setCurrentUser={setCurrentUser} />}></Route>
            </Routes>
          </div>
        </Router>
      </header>
    </div>
    
  );
}

export default App;
