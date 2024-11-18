import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, Home as HomeIcon } from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  const isIslandPage = location.pathname.includes('/island/');
  const isHomePage = location.pathname === '/';
  const islandNumber = isIslandPage ? location.pathname.split('/')[2] : null;

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/login';
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-900/90 backdrop-blur-sm px-4 py-3 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          {!isHomePage && (
            <Link 
              to="/islands" 
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft size={20} />
              <span>Geri Dön</span>
            </Link>
          )}
          
          {isIslandPage && (
            <div className="flex items-center gap-2 text-gray-400">
              <HomeIcon size={16} />
              <span>/</span>
              <Link to="/islands" className="hover:text-white transition-colors">
                Adalarım
              </Link>
              <span>/</span>
              <span className="text-yellow-500">
                {islandNumber} Numaralı Ada
              </span>
            </div>
          )}
        </div>

        <Link 
          to="/" 
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 
            text-white font-bold text-xl hover:text-yellow-500 transition-colors"
        >
          <span>Farm Planner</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link 
            to="/"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Ana Sayfa
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    </nav>
  );
}
