import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/auth';
import InputField from '../component/InputField';
import Button from '../component/Button';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = () => {
        setIsLoading(true);
        setTimeout(async () => {
            const result = await login(email, password);
            if (result) {
                navigate('/dashboard');
            } else {
                alert('Login gagal, periksa kembali username dan password anda')
            }
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-deep-red to-bright-red p-4 max-w-[400px] relative m-auto">
            <img src="/images/wave-top.png" alt="wave top" className="absolute top-0 w-full" />
            <h2 className="text-2xl text-white mb-6">Hi Please Login!</h2>

            <InputField
                type="username"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                showPasswordToggle
                showPassword={showPassword}
                togglePasswordVisibility={() => setShowPassword(!showPassword)}
            />

            <div className="flex items-center justify-end w-full mb-4">
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="mr-2"
                />
                <label className="text-white">Remember me</label>
            </div>

            <Button isLoading={isLoading} onClick={handleLogin}>
                Login
            </Button>
            <img src="/images/wave-down.png" alt="wave down" className="absolute bottom-0 w-full" />
        </div>
    );
};

export default Login;
