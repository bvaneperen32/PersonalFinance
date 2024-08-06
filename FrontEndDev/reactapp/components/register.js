import React, { useState } from 'react';
import axios from 'axios'; 

function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [errorMessage, setErrorMessage] = useState('');

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
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required />

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password"
                required />

            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required />

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <button type="submit">Register</button>
        </form>
    )
}

export default RegisterForm;

const register = ReactDOM.createRoot(document.getElementById('register'));
register.render(
    <React.StrictMode>
        <RegisterForm />
    </React.StrictMode>
)