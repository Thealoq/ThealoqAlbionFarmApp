import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Islands } from './View/Islands';
import { Island } from './View/Island';
import { CreateFarm } from './View/CreateFarm';
import { NotFound } from './View/NotFound';
import { Home } from './View/Home';
import { Login } from './View/Login';
import { EditIsland } from './View/EditIsland';
import { Storage } from './View/Storage';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './View/Dashboard';
import { useState } from 'react';

export default function App() {
  const isLoginPage = window.location.pathname === '/login';
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <BrowserRouter>
      {!isLoginPage && (
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      )}
      <main 
        className={`min-h-screen bg-slate-900 transition-all duration-300
          ${!isLoginPage ? (isCollapsed ? 'ml-16' : 'ml-64') : ''}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/islands" element={<Islands />} />
          <Route path="/island/:id" element={<Island />} />
          <Route path="/island/:id/edit" element={<EditIsland />} />
          <Route path="/create-farm" element={<CreateFarm />} />
          <Route path="/storage" element={<Storage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
