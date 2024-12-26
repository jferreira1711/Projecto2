import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import './Logins.css'

const URI = 'http://localhost:8000/usuarios/login';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    

    // Procedimiento para verificar usuario y contraseña
    const login = async (e) => {

        try {
            const response = await axios.post(URI, {
                username: username,
                password: password
            });

            if (response.data.success) { // Suponemos que el backend responde con { success: true }
                navigate('/dashboard'); // Cambia '/home' a la ruta que necesites para la redirección
            } else {
                setError("Incorrect username or password");
            }
        } catch (error) {
            setError("There was an error logging in. Please try again.");
            console.error(error);
        }
    };

    return (
        
        <div className="login-page">

            <div className="login-box">
                <div className="illustration-wrapper">
                    <img src="https://img.freepik.com/foto-gratis/medico-enfermeras-equipos-especiales_23-2148980721.jpg?semt=ais_hybrid" alt="Login" />
                </div>
                <Form
                    name="login-form"
                    initialValues={{ remember: true }}
                    onFinish={login}
                >
                    <p className="form-title">JS Hospital</p>
                    <p>Login with your user</p>

                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>

                

                    {error && <p className="error-message">{error}</p>}

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            LOGIN
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
