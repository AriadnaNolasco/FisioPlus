import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Dashboard from '../pages/Dashboard';
import useAuthStore from '../store/authStore';
import HorarioPage from '../pages/HorarioPage';


function PrivateRoute({ children }) {
  const { token } = useAuthStore();
  console.log('PrivateRoute token:', token);
  return token ? children : <Navigate to="/login" />;
}


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/horarios" element={<HorarioPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
