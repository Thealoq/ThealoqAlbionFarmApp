import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Trash2, AlertCircle } from 'lucide-react';
import { WaterEffect } from '../components/WaterEffect';

export function EditIsland() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [island, setIsland] = useState(null);
  const [islandName, setIslandName] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const savedIslands = JSON.parse(localStorage.getItem('islands') || '[]');
    const currentIsland = savedIslands.find(i => i.id === Number(id));
    if (currentIsland) {
      setIsland(currentIsland);
      setIslandName(currentIsland.name);
    }
  }, [id]);

  const handleSave = () => {
    const savedIslands = JSON.parse(localStorage.getItem('islands') || '[]');
    const updatedIslands = savedIslands.map(i => 
      i.id === Number(id) ? { ...i, name: islandName } : i
    );
    localStorage.setItem('islands', JSON.stringify(updatedIslands));
    navigate('/islands');
  };

  const handleDelete = () => {
    const savedIslands = JSON.parse(localStorage.getItem('islands') || '[]');
    const updatedIslands = savedIslands.filter(i => i.id !== Number(id));
    localStorage.setItem('islands', JSON.stringify(updatedIslands));
    navigate('/islands');
  };

  if (!island) return null;

  return (
    <div className="w-full min-h-screen bg-slate-800 pt-16 px-3 relative overflow-hidden">
      <WaterEffect />
      <div className="container mx-auto max-w-md relative z-10">
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-4">
          <h1 className="text-lg font-bold text-white mb-4">Ada Düzenle</h1>

          <div className="space-y-4">
            <div>
              <label className="block text-white/60 text-sm mb-1">Ada İsmi</label>
              <input
                type="text"
                value={islandName}
                onChange={(e) => setIslandName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 
                  text-sm text-white focus:outline-none focus:border-yellow-400 transition-colors"
                placeholder="Ada ismini girin"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-800/50 rounded-lg p-3">
                <span className="text-white/60 text-xs">Toplam Tarla</span>
                <div className="text-xl font-bold text-white">16</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <span className="text-white/60 text-xs">Ekili Tarla</span>
                <div className="text-xl font-bold text-white">0</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3">
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-red-400 hover:text-red-300 
                  transition-colors rounded-lg text-sm"
              >
                <Trash2 size={16} />
                <span>Adayı Sil</span>
              </button>

              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 bg-yellow-500 hover:bg-yellow-400 
                  text-slate-900 px-4 py-1.5 rounded-lg transition-colors text-sm"
              >
                <Save size={16} />
                <span>Kaydet</span>
              </button>
            </div>
          </div>
        </div>

        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 rounded-lg p-4 max-w-xs w-full">
              <div className="flex items-center gap-2 text-yellow-400 mb-3">
                <AlertCircle size={20} />
                <h2 className="text-base font-bold">Adayı Sil</h2>
              </div>
              <p className="text-white/60 text-sm mb-4">
                Bu adayı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
              </p>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="text-white/60 hover:text-white px-3 py-1.5 rounded-lg transition-colors text-sm"
                >
                  İptal
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-400 text-white px-3 py-1.5 rounded-lg transition-colors text-sm"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 