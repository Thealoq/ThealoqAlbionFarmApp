import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Map, Trash2, Sprout, Timer, Activity, Star, ArrowUpCircle, Crown } from 'lucide-react';
import { WaterEffect } from '../components/WaterEffect';

// Level konfigürasyonları
const ISLAND_LEVELS = {
  1: { farms: 1 },
  2: { farms: 3 },
  3: { farms: 6 },
  4: { farms: 8 },
  5: { farms: 12 },
  6: { farms: 16 }
};

// Ada yükseltme butonu komponenti
const UpgradeButton = ({ island }) => {
  if (!island.level || island.level >= 6) return null;

  const nextLevel = island.level + 1;
  const nextFarms = ISLAND_LEVELS[nextLevel].farms;

  return (
    <button
      onClick={(e) => upgradeIsland(island.id, e)}
      className="px-3 py-1.5 bg-primary-500/10 text-primary-500 rounded-lg
        hover:bg-primary-500/20 transition-colors text-sm flex items-center gap-2"
    >
      <ArrowUpCircle size={14} />
      <span>Yükselt ({nextFarms} Farm)</span>
    </button>
  );
};

export function Islands() {
  const [islands, setIslands] = useState(() => {
    const savedIslands = localStorage.getItem('islands');
    return savedIslands ? JSON.parse(savedIslands) : [];
  });

  const [playerLevel, setPlayerLevel] = useState(() => {
    const savedLevel = localStorage.getItem('playerLevel');
    return savedLevel ? JSON.parse(savedLevel) : {
      level: 1,
      xp: 0,
      lastXpUpdate: Date.now()
    };
  });

  const [coins, setCoins] = useState(() => {
    const savedCoins = localStorage.getItem('coins');
    return savedCoins ? parseInt(savedCoins) : 0;
  });

  // Player XP kontrolü için useEffect
  useEffect(() => {
    const checkAndAddPlayerXP = () => {
      const now = Date.now();
      const hoursPassed = (now - playerLevel.lastXpUpdate) / (1000 * 60 * 60);
      
      if (hoursPassed >= 24) {
        // Tüm aktif farmlardan XP hesapla
        const totalActiveFarms = islands.reduce((sum, island) => sum + (island.activeFarms || 0), 0);
        const xpGain = totalActiveFarms * 25; // Her farm için 25 XP
        
        const newXp = playerLevel.xp + xpGain;
        const newLevel = Math.floor(newXp / 1000) + 1; // Her 1000 XP'de level atlama
        
        const newPlayerLevel = {
          level: newLevel,
          xp: newXp,
          lastXpUpdate: now
        };
        
        setPlayerLevel(newPlayerLevel);
        localStorage.setItem('playerLevel', JSON.stringify(newPlayerLevel));
      }
    };

    checkAndAddPlayerXP();
    const interval = setInterval(checkAndAddPlayerXP, 1000 * 60 * 60); // Her saat kontrol
    return () => clearInterval(interval);
  }, [islands, playerLevel]);

  // Ada seviye atlama fonksiyonu
  const upgradeIsland = (islandId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newIslands = islands.map(island => {
      if (island.id === islandId && island.level < 6) {
        const newLevel = island.level + 1;
        return {
          ...island,
          level: newLevel,
          totalFarms: ISLAND_LEVELS[newLevel].farms
        };
      }
      return island;
    });

    setIslands(newIslands);
    localStorage.setItem('islands', JSON.stringify(newIslands));
  };

  const [showCreateModal, setShowCreateModal] = useState(false);
  const inputRef = useRef(null);

  const deleteIsland = (islandId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('Bu adayı silmek istediğinize emin misiniz?')) {
      const newIslands = islands.filter(island => island.id !== islandId)
        .map((island, index) => ({
          ...island,
          name: island.name.startsWith('Ada #') ? `Ada #${index + 1}` : island.name
        }));
      
      setIslands(newIslands);
      localStorage.setItem('islands', JSON.stringify(newIslands));
      localStorage.removeItem(`island_${islandId}_farms`);
    }
  };

  const handleCreateIsland = () => {
    const name = inputRef.current?.value;
    
    const nextId = islands.length > 0 
      ? Math.max(...islands.map(island => island.id)) + 1 
      : 1;
    
    const nextNumber = islands.length + 1;
    const startLevel = 1;
    
    const newIsland = {
      id: nextId,
      name: name || `Ada #${nextNumber}`,
      level: startLevel,
      totalFarms: ISLAND_LEVELS[startLevel].farms,
      activeFarms: 0,
      farms: Array(ISLAND_LEVELS[startLevel].farms).fill(null),
      status: 'active',
      lastHarvest: '-',
      lastXpUpdate: Date.now()
    };
    
    const newIslands = [...islands, newIsland];
    setIslands(newIslands);
    localStorage.setItem('islands', JSON.stringify(newIslands));
    setShowCreateModal(false);
    
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const getIslandStats = (island) => {
    return {
      level: island.level || 1,
      xp: island.xp || 0,
      lastHarvest: island.lastHarvest || '-',
      status: island.status || 'active' // active, inactive
    };
  };

  // İsim düzenleme state'i ekleyelim
  const [editingId, setEditingId] = useState(null);

  // İsim düzenleme fonksiyonu
  const handleNameEdit = (islandId, newName, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!newName.trim()) return;
    
    const newIslands = islands.map(island => 
      island.id === islandId 
        ? { ...island, name: newName.trim() }
        : island
    );
    
    setIslands(newIslands);
    localStorage.setItem('islands', JSON.stringify(newIslands));
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-background pt-16 px-4">
      <WaterEffect className="opacity-30" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-medium text-white">
                Adalarım <span className="text-primary-500">({islands.length})</span>
              </h1>
              <div className="px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-lg text-sm">
                Seviye {playerLevel.level}
              </div>
              <div className="px-3 py-1 bg-primary-500/10 text-primary-500 rounded-lg text-sm">
                {coins} 💰
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-white/60">
                Toplam {islands.reduce((acc, island) => acc + island.activeFarms, 0)} aktif farm
              </p>
              <div className="text-white/60">•</div>
              <p className="text-white/60">
                {playerLevel.xp} XP
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {islands.map(island => {
            const stats = getIslandStats(island);
            
            return (
              <Link key={island.id} to={`/island/${island.id}`} className="group">
                <div className="bg-gradient-to-br from-background-light to-background rounded-2xl 
                  border border-border hover:border-primary-500/20 transition-all duration-200 overflow-hidden">
                  
                  {/* Üst Kısım */}
                  <div className="p-5 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center">
                            <Map className="w-6 h-6 text-primary-500" />
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-md bg-yellow-500/10 
                            flex items-center justify-center">
                            <Crown className="w-3 h-3 text-yellow-500" />
                          </div>
                        </div>
                        <div>
                          {editingId === island.id ? (
                            <form 
                              onSubmit={(e) => {
                                e.preventDefault();
                                const input = e.target.elements.name;
                                handleNameEdit(island.id, input.value, e);
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-2"
                            >
                              <input
                                name="name"
                                type="text"
                                defaultValue={island.name}
                                autoFocus
                                className="bg-background/50 border border-primary-500/20 rounded-lg 
                                  px-2 py-1 text-white text-lg font-medium focus:outline-none 
                                  focus:border-primary-500 w-full"
                                onKeyDown={(e) => {
                                  if (e.key === 'Escape') {
                                    setEditingId(null);
                                  }
                                }}
                              />
                              <button
                                type="submit"
                                className="text-primary-500 hover:text-primary-400"
                              >
                                ✓
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setEditingId(null);
                                }}
                                className="text-red-500 hover:text-red-400"
                              >
                                ✕
                              </button>
                            </form>
                          ) : (
                            <>
                              <h2 
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setEditingId(island.id);
                                }}
                                className="text-lg font-medium text-white group-hover:text-primary-500 
                                  transition-colors duration-200 cursor-pointer hover:underline"
                              >
                                {island.name}
                              </h2>
                              <p className="text-white/50 text-sm">Ada #{island.id}</p>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => deleteIsland(island.id, e)}
                          className="p-2 rounded-lg text-white/40 hover:text-red-400
                            hover:bg-red-400/10 transition-colors duration-200"
                          title="Adayı Sil"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* İstatistikler */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-background/40 backdrop-blur-sm rounded-xl p-3">
                        <div className="flex items-center gap-1.5 text-white/50 text-xs mb-1">
                          <Sprout size={12} />
                          <span>Aktif Farm</span>
                        </div>
                        <div className="text-lg font-medium text-white">
                          {island.activeFarms || 0}
                        </div>
                      </div>

                      <div className="bg-background/40 backdrop-blur-sm rounded-xl p-3">
                        <div className="flex items-center gap-1.5 text-white/50 text-xs mb-1">
                          <Star size={12} className="text-yellow-400" />
                          <span>XP</span>
                        </div>
                        <div className="text-lg font-medium text-white">
                          {stats.xp}
                        </div>
                      </div>

                      <div className="bg-background/40 backdrop-blur-sm rounded-xl p-3">
                        <div className="flex items-center gap-1.5 text-white/50 text-xs mb-1">
                          <Timer size={12} />
                          <span>Son Hasat</span>
                        </div>
                        <div className="text-lg font-medium text-white">
                          {stats.lastHarvest}
                        </div>
                      </div>
                    </div>

                    {/* Level Bilgisi */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="px-2 py-1 bg-primary-500/10 text-primary-500 rounded-lg text-sm">
                          Seviye {stats.level}
                        </div>
                        <span className="text-white/40 text-sm">
                          {ISLAND_LEVELS[island.level].farms} Farm Kapasitesi
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Alt Kısım - Yükseltme */}
                  {island.level < 6 && (
                    <div className="px-5 py-3 border-t border-border bg-background/40 backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          <ArrowUpCircle size={14} className="text-primary-500" />
                          <span>Sonraki Seviye:</span>
                          <span className="text-white font-medium">
                            {ISLAND_LEVELS[island.level + 1].farms} Farm
                          </span>
                        </div>
                        <button
                          onClick={(e) => upgradeIsland(island.id, e)}
                          className="px-3 py-1.5 bg-primary-500 hover:bg-primary-600 text-white 
                            rounded-lg transition-colors text-sm"
                        >
                          Yükselt
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-background-light rounded-xl p-4 max-w-sm w-full">
              <h2 className="text-lg font-medium text-white mb-4">Yeni Ada</h2>
              <input
                ref={inputRef}
                type="text"
                placeholder="Ada ismi"
                className="w-full bg-background border border-border rounded-lg px-3 py-2 
                  text-white focus:outline-none focus:border-primary-500 transition-colors"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateIsland();
                  }
                }}
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-white/60 hover:text-white transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={handleCreateIsland}
                  className="px-4 py-2 bg-primary-500 hover:bg-primary-600 
                    text-white rounded-lg transition-colors"
                >
                  Oluştur
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}