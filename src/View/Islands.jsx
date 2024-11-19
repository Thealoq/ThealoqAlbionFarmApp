import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Map, ArrowUpCircle, Sprout, Timer, Plus, X, Trash2 } from 'lucide-react';
import { WaterEffect } from '../components/WaterEffect';

// Level konfigürasyonlarını en üstte tanımla
const ISLAND_LEVELS = {
  1: { farms: 1 },
  2: { farms: 3 },
  3: { farms: 6 },
  4: { farms: 8 },
  5: { farms: 12 },
  6: { farms: 16 }
};

export function Islands() {
  const [islands, setIslands] = useState(() => {
    const savedIslands = localStorage.getItem('islands');
    return savedIslands ? JSON.parse(savedIslands) : [];
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const inputRef = useRef();

  // Yeni ada oluşturma
  const handleCreateIsland = () => {
    const name = inputRef.current?.value;
    
    const nextId = islands.length > 0 
      ? Math.max(...islands.map(island => island.id)) + 1 
      : 1;
    
    const nextNumber = islands.length + 1;
    
    const newIsland = {
      id: nextId,
      name: name || `Ada #${nextNumber}`,
      level: 1,
      totalFarms: ISLAND_LEVELS[1].farms,
      activeFarms: 0,
      status: 'active',
      lastHarvest: '-'
    };
    
    const newIslands = [...islands, newIsland];
    setIslands(newIslands);
    localStorage.setItem('islands', JSON.stringify(newIslands));
    setShowCreateModal(false);
    
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  // Ada yükseltme fonksiyonu
  const upgradeIsland = (islandId) => {
    const newIslands = islands.map(island => {
      if (island.id === islandId) {
        const currentLevel = island.level || 1;
        if (currentLevel < 6) {
          const newLevel = currentLevel + 1;
          return {
            ...island,
            level: newLevel,
            totalFarms: ISLAND_LEVELS[newLevel].farms
          };
        }
      }
      return island;
    });

    setIslands(newIslands);
    localStorage.setItem('islands', JSON.stringify(newIslands));
  };

  // Ada silme fonksiyonu
  const deleteIsland = (islandId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('Bu adayı silmek istediğinize emin misiniz?')) {
      const newIslands = islands.filter(island => island.id !== islandId);
      setIslands(newIslands);
      localStorage.setItem('islands', JSON.stringify(newIslands));
      
      // Ada'ya ait farm verilerini de sil
      localStorage.removeItem(`island_${islandId}_farms`);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16 px-4">
      <WaterEffect className="opacity-30" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-medium text-white">
                Adalarım <span className="text-primary-500">({islands.length})</span>
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-white/60">
                Toplam {islands.reduce((acc, island) => acc + (island.activeFarms || 0), 0)} aktif farm
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white 
              rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <Plus size={20} />
            Yeni Ada
          </button>
        </div>

        {/* Ada Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {islands.map(island => {
            const currentLevel = island.level || 1;
            const nextLevel = currentLevel < 6 ? currentLevel + 1 : 6;
            
            return (
              <div key={island.id} className="bg-background-light rounded-xl p-5 border border-border
                hover:border-primary-500/20 hover:bg-background-lighter transition-all duration-200">
                {/* Ada Başlığı */}
                <div className="flex items-start justify-between mb-6">
                  <Link to={`/island/${island.id}`} className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                      <Map className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <h2 className="text-white font-medium group-hover:text-primary-500 transition-colors">
                        {island.name}
                      </h2>
                      <p className="text-white/60 text-sm">Ada #{island.id}</p>
                    </div>
                  </Link>

                  {/* Kontrol Butonları */}
                  <div className="flex items-center gap-2">
                    <div className="px-2 py-1 bg-primary-500/10 text-primary-500 rounded-lg text-sm">
                      Seviye {currentLevel}
                    </div>
                    
                    {currentLevel < 6 && (
                      <button
                        onClick={() => upgradeIsland(island.id)}
                        className="px-3 py-1.5 bg-primary-500/10 text-primary-500 rounded-lg
                          hover:bg-primary-500/20 transition-colors text-sm flex items-center gap-2"
                      >
                        <ArrowUpCircle size={14} />
                        <span>Yükselt ({ISLAND_LEVELS[nextLevel].farms} Farm)</span>
                      </button>
                    )}
                    
                    <button
                      onClick={(e) => deleteIsland(island.id, e)}
                      className="p-1.5 bg-red-500/10 text-red-500 rounded-lg
                        hover:bg-red-500/20 transition-colors"
                      title="Adayı Sil"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Farm Bilgisi */}
                <div className="text-sm text-white/60">
                  Toplam Farm: {ISLAND_LEVELS[currentLevel].farms}
                </div>

                {/* İstatistikler */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-background/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                      <Sprout size={14} />
                      <span>Aktif Farm</span>
                    </div>
                    <div className="text-xl font-medium text-white">
                      {island.activeFarms || 0}
                    </div>
                  </div>

                  <div className="bg-background/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                      <Timer size={14} />
                      <span>Son Hasat</span>
                    </div>
                    <div className="text-xl font-medium text-white">
                      {island.lastHarvest || '-'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Yeni Ada Oluşturma Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-background-light rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium text-white">Yeni Ada Oluştur</h2>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Ada Adı
                  </label>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Ada #1"
                    className="w-full px-4 py-2.5 bg-background border border-gray-800 rounded-lg
                      text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                  />
                </div>

                <button
                  onClick={handleCreateIsland}
                  className="w-full px-4 py-2.5 bg-primary-500 hover:bg-primary-600
                    text-white rounded-lg transition-colors"
                >
                  Ada Oluştur
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}