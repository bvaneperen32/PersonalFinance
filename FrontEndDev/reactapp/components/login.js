import React, { useState } from 'react';
import axios from 'axios'; 

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

    return (
        <div>
            <div>
                <h1>Login</h1>
                <p>Welcome Back! Please login to your account</p>
            </div>
            <div>
                <form onSubmit={handleSubmit }>
                    <div>
                        <input 
                        type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            />
                    </div>
                    <div>
                    <label>
                    <input 
                            type="checkbox"
                            value={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                            Remember Me</label>
                    </div>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} 
                    <button className="btn btn-primary" type="submit">Login</button>
                </form>
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
