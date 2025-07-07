import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, getCurrentUser } from '../services/authService';

import '../assets/styles/auth.css';
import useAuthStore from '../store/authStore';

export default function LoginPage() {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const { setToken, setUser } = useAuthStore();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(form);
            const { access } = res.data;

            setToken(access);

            const userRes = await getCurrentUser(access);
            setUser(userRes.data);

            navigate('/dashboard');
            console.log("Redirigiendo a Dashboard");
        } catch (err) {
            console.error("Error al loguear:", err);
            alert('Credenciales incorrectas');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <input name="username" onChange={handleChange} placeholder="Usuario" required />
                    <input name="password" type="password" onChange={handleChange} placeholder="Contraseña" required />
                    <button type="submit">Ingresar</button>
                </form>
                <div className="link">
                    <span>¿No tienes cuenta? </span>
                    <Link to="/register">Regístrate</Link>
                </div>
            </div>
        </div>
    );
}
