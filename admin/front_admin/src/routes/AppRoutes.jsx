import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Dashboard from '../pages/Dashboard';
import useAuthStore from '../store/authStore';


function PrivateRoute({ children }) {
    const token = useAuthStore();
    return token ? children : <Navigate to="/login" />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
            } />
            {/* Aquí puedes agregar más rutas protegidas */}
      </Routes>
    </BrowserRouter>
  );
}
