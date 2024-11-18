import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  LogOut, 
  Package, 
  Map, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard
} from 'lucide-react';

export function Sidebar({ isCollapsed, setIsCollapsed }) {
  const location = useLocation();

  const menuItems = [
    {
      path: '/',
      icon: <Home size={20} />,
      title: 'Ana Sayfa'
    },
    {
      path: '/islands',
      icon: <Map size={20} />,
      title: 'Adalarım'
    },
    {
      path: '/storage',
      icon: <Package size={20} />,
      title: 'Depo'
    },
    {
      path: '/dashboard',
      icon: <LayoutDashboard size={20} />,
      title: 'Panel'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/login';
  };

  return (
    <div 
      className={`fixed top-0 left-0 h-screen bg-slate-900 border-r border-slate-800
        transition-all duration-300 z-50
        ${isCollapsed ? 'w-16' : 'w-64'}`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
        {!isCollapsed && (
          <span className="text-white font-bold text-lg">Farm Planner</span>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg
            hover:bg-slate-800"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu Items */}
      <div className="py-4 flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2.5 transition-colors
              ${location.pathname === item.path 
                ? 'text-yellow-500 bg-yellow-500/10' 
                : 'text-gray-400 hover:text-white hover:bg-slate-800'}
              ${isCollapsed ? 'justify-center' : ''}`}
          >
            {item.icon}
            {!isCollapsed && <span>{item.title}</span>}
          </Link>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 w-full border-t border-slate-800">
        <Link
          to="/settings"
          className={`flex items-center gap-3 px-4 py-3 text-gray-400 
            hover:text-white hover:bg-slate-800 transition-colors
            ${isCollapsed ? 'justify-center' : ''}`}
        >
          <Settings size={20} />
          {!isCollapsed && <span>Ayarlar</span>}
        </Link>
        
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-4 py-3 text-gray-400 
            hover:text-white hover:bg-slate-800 transition-colors
            ${isCollapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={20} />
          {!isCollapsed && <span>Çıkış Yap</span>}
        </button>
      </div>
    </div>
  );
}
