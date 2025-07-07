import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Dumbbell, 
  LogOut, 
  Activity,
  ChevronRight 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: Activity
    },
    {
      to: "/horarios",
      label: "Gestionar Horarios",
      icon: Calendar
    },
    {
      to: "/pacientes", 
      label: "Ver Pacientes",
      icon: Users
    },
    {
      to: "/progreso",
      label: "Progreso Terapéutico", 
      icon: TrendingUp
    },
    {
      to: "/ejercicios",
      label: "Ver Ejercicios",
      icon: Dumbbell
    }
  ];

  return (
    <div className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="logo-container">
          <Activity className="logo-icon" size={32} />
          <h2 className="sidebar-title">FISIOPLUS</h2>
        </div>
        <div className="brand-line"></div>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <li key={index} className="menu-item">
                <a href={item.to} className="menu-link">
                  <div className="menu-content">
                    <div className="menu-icon-wrapper">
                      <IconComponent size={20} className="menu-icon" />
                    </div>
                    <span className="menu-text">{item.label}</span>
                  </div>
                  <ChevronRight size={16} className="menu-arrow" />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-button">
          <LogOut size={18} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
