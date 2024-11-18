import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Islands } from './View/Islands';
import { Island } from './View/Island';
import { CreateFarm } from './View/CreateFarm';
import { NotFound } from './View/NotFound';
import { Home } from './View/Home';
import { Login } from './View/Login';
import { EditIsland } from './View/EditIsland';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/islands" element={<Islands />} />
        <Route path="/island/:id" element={<Island />} />
        <Route path="/island/:id/edit" element={<EditIsland />} />
        <Route path="/create-farm" element={<CreateFarm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
