import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios'; 
import logoWithWords from "../../../wwwroot/images/logoWithWords.png"; 

function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const validatePassword = (password) => {
        const hasNumber = /\d/.test(password); 
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasNonAplhaNumeric = /\W/.test(password);
        const isLongEnough = password.length >= 6; 

        return hasNumber && hasLowercase && hasUppercase && hasNonAplhaNumeric && isLongEnough;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePassword(password)) {
            setErrorMessage('Password must be at least 6 characters long and contain a number, lowercase letter, uppercase letter, and special character.');
            return; 
        }

        setErrorMessage('');

        if (password != confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return; 
        }

        setErrorMessage(''); 

        try {
            const response = await axios.post('/api/account/register', { email, password, confirmPassword });
            setSuccessMessage('Registration successful. Redirecting to login...'); 
            setTimeout(() => {
                window.location.href = '../..'; 
            }, 2000);
            console.log(response.data);
        } catch (error) {
            if (error.response && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                console.error(error);
                setErrorMessage("An unexpected error occurred.");
            }
        }
    };

    return (
        <div>
        <div className="login-background">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="logo">
                        <img src={logoWithWords} alt="Logo" className="img-fluid" />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 login-container">
                        <div className="text-center top-text mb-4">
                            <h1>Register</h1>
                            <p>Financial Freedom Starts Here</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password"
                                    required
                                />
                            </div>
                            {successMessage && <p className="text-danger">{successMessage}</p>}
                            {errorMessage && <p className="text-danger">{errorMessage}</p>}
                            <div>
                                <button className="btn btn-secondary btn-block mt-2 w-100" type="submit">Register</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default RegisterForm;

const register = ReactDOM.createRoot(document.getElementById('register'));
register.render(
    <React.StrictMode>
        <RegisterForm />
    </React.StrictMode>
)