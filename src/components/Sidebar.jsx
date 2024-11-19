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
import { useEffect } from 'react';

export function Sidebar({ isCollapsed, setIsCollapsed }) {
  const location = useLocation();

  useEffect(() => {
    const savedCollapsedState = localStorage.getItem('sidebarCollapsed');
    if (savedCollapsedState !== null) {
      setIsCollapsed(JSON.parse(savedCollapsedState));
    }
  }, []);

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  };

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

  return (
    <aside 
      className={`fixed top-0 left-0 h-screen 
        bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a]
        border-r border-white/5 backdrop-blur-sm
        transition-all duration-300 ease-in-out z-50
        ${isCollapsed ? 'w-20' : 'w-72'}`}
    >
      {/* Logo Section */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
        {!isCollapsed && (
          <span className="text-white font-bold text-xl bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Farm Planner
          </span>
        )}
        <button
          onClick={toggleCollapse}
          className="p-2 rounded-xl hover:bg-white/5 text-white/60 hover:text-white
            transition-all duration-200 ease-in-out"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu Items */}
      <div className="py-6 px-4 flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200
              group relative
              ${location.pathname === item.path 
                ? 'bg-[#7c3aed] text-white font-medium shadow-lg shadow-[#7c3aed]/20' 
                : 'text-white/60 hover:text-white hover:bg-white/5'} 
              ${isCollapsed ? 'justify-center' : ''}`}
          >
            <div className={`${location.pathname === item.path ? '' : 'group-hover:scale-110'} 
              transition-transform duration-200`}>
              {item.icon}
            </div>
            
            {!isCollapsed && <span>{item.title}</span>}
            
            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full ml-4 px-3 py-2 bg-[#1a1a1a] rounded-lg
                text-sm text-white whitespace-nowrap opacity-0 group-hover:opacity-100
                pointer-events-none transition-opacity duration-200 shadow-xl">
                {item.title}
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5
        bg-gradient-to-t from-[#1a1a1a] to-transparent">
        <div className="space-y-2">
          <Link
            to="/settings"
            className={`flex items-center gap-4 p-3 rounded-xl
              text-white/60 hover:text-white hover:bg-white/5
              transition-all duration-200
              ${isCollapsed ? 'justify-center' : ''}`}
          >
            <Settings size={20} />
            {!isCollapsed && <span>Ayarlar</span>}
          </Link>
          
          <button
            onClick={() => {
              localStorage.removeItem('isLoggedIn');
              window.location.href = '/login';
            }}
            className={`w-full flex items-center gap-4 p-3 rounded-xl
              text-white/60 hover:text-white hover:bg-white/5
              transition-all duration-200
              ${isCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={20} />
            {!isCollapsed && <span>Çıkış Yap</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
