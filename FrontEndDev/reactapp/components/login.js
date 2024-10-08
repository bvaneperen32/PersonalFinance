﻿import React, { useState } from 'react';
import axios from 'axios'; 
import logoWithWords from "../../../wwwroot/images/logoWithWords.png"; 

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (email === "" || password === "") {
            setErrorMessage("Please enter email and password"); 
            return; 
        }

        setErrorMessage(''); 
        try {
            const response = await axios.post('/api/account/login', { email, password, rememberMe });
            console.log('Login successful:', response.data);
            setErrorMessage('');
            return;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage('Invalid email or password.');
            } else {
                console.log(error); 
                setErrorMessage('An error occurred, Please try again later.');
            }
        }
    }

    const handleRegisterClick = () => {
        window.location.href = '/home/register'; 
    }


    return (
        <div className="login-background">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="logo">
                        <img src={logoWithWords} alt="Logo" className="img-fluid" />
                    </div>
                    <div className="col-9 col-md-8 col-lg-4 login-container">
                        <div className="text-center top-text mb-4">
                            <h1>Login</h1>
                            <p>Financial Freedom Starts Here</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-control form-group">
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                <label>
                                    <span style={{ transitionDelay: "0ms" }}>E</span>
                                    <span style={{ transitionDelay: "50ms" }}>m</span>
                                    <span style={{ transitionDelay: "100ms" }}>a</span>
                                    <span style={{ transitionDelay: "150ms" }}>i</span>
                                    <span style={{ transitionDelay: "200ms" }}>l</span>

                                </label>
                            </div>
                            <div className="form-control form-group">
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <label>
                                    <span style={{ transitionDelay: "0ms" }}>P</span>
                                    <span style={{ transitionDelay: "50ms" }}>a</span>
                                    <span style={{ transitionDelay: "100ms" }}>s</span>
                                    <span style={{ transitionDelay: "150ms" }}>s</span>
                                    <span style={{ transitionDelay: "200ms" }}>w</span>
                                    <span style={{ transitionDelay: "250ms" }}>o</span>
                                    <span style={{ transitionDelay: "300ms" }}>r</span>
                                    <span style={{ transitionDelay: "350ms" }}>d</span>

                                </label>
                            </div>
                            <div className="form-group form-check check">
                                <label className="form-check-label remember">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    Remember Me</label>
                                <a href="/forgotpassword">Forgot Password?</a>
                            </div>

                            {errorMessage && <p className="text-danger">{errorMessage}</p>}
                            <div>
                                <button className="btn btn-primary btn-block w-100" type="submit">Login</button>
                            </div>
                            <div>
                                <button className="btn btn-secondary btn-block mt-2 w-100" type="button" onClick={handleRegisterClick}>Register</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;

const login = ReactDOM.createRoot(document.getElementById('login'));
login.render(
    <React.StrictMode>
        <Login />
    </React.StrictMode>
);
