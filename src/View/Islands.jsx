import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Settings, Power, TrendingUp, Clock, Coins } from 'lucide-react';
import { WaterEffect } from '../components/WaterEffect';

export function Islands() {
  const [islands, setIslands] = useState(() => {
    const savedIslands = localStorage.getItem('islands');
    return savedIslands ? JSON.parse(savedIslands).map(island => ({
      ...island,
      isActive: island.isActive ?? true // Varsayılan olarak aktif
    })) : [];
  });

  useEffect(() => {
    localStorage.setItem('islands', JSON.stringify(islands));
  }, [islands]);

  const removeIsland = (id) => {
    setIslands(islands.filter(island => island.id !== id));
  };

  const toggleIslandStatus = (id) => {
    setIslands(islands.map(island => 
      island.id === id 
        ? { ...island, isActive: !island.isActive }
        : island
    ));
  };

  // Her ada için istatistikleri hesapla
  const calculateStats = (island) => {
    if (!island.fields) return { totalInvestment: 0, expectedIncome: 0, profit: 0, hourlyIncome: 0 };
    
    const stats = island.fields.reduce((acc, field) => {
      if (!field || !island.isActive) return acc;
      
      const investment = field.price || 0;
      const income = field.price * 1.5; // Örnek kar marjı
      const growthHours = parseInt(field.growthTime) || 24; // Büyüme süresi (saat)
      
      return {
        totalInvestment: acc.totalInvestment + investment,
        expectedIncome: acc.expectedIncome + income,
        profit: acc.profit + (income - investment),
        hourlyIncome: acc.hourlyIncome + (income / growthHours)
      };
    }, { totalInvestment: 0, expectedIncome: 0, profit: 0, hourlyIncome: 0 });

    return stats;
  };

  // Tüm adaların toplam istatistiklerini hesapla
  const calculateTotalStats = () => {
    return islands.reduce((total, island) => {
      const stats = calculateStats(island);
      return {
        totalInvestment: total.totalInvestment + stats.totalInvestment,
        expectedIncome: total.expectedIncome + stats.expectedIncome,
        profit: total.profit + stats.profit,
        hourlyIncome: total.hourlyIncome + stats.hourlyIncome
      };
    }, { totalInvestment: 0, expectedIncome: 0, profit: 0, hourlyIncome: 0 });
  };

  const totalStats = calculateTotalStats();

  return (
    <div className="w-full min-h-screen bg-slate-800 pt-16 px-3 relative overflow-hidden">
      <WaterEffect />
      <div className="container mx-auto max-w-2xl relative z-10">
        {/* Toplam İstatistikler */}
        <div className="bg-slate-900/90 backdrop-blur-sm rounded-lg p-3 mb-3 border border-yellow-500/20">
          <h2 className="text-sm font-bold text-white/80 mb-2 flex items-center gap-1.5">
            <TrendingUp size={14} />
            Toplam İstatistikler
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-800/50 rounded-lg p-2 flex flex-col">
              <span className="text-[10px] text-gray-400 flex items-center gap-1 mb-0.5">
                <Coins size={10} />
                Toplam Yatırım
              </span>
              <span className="text-sm font-medium text-white">
                {totalStats.totalInvestment.toLocaleString()}s
              </span>
            </div>
            
            <div className="bg-slate-800/50 rounded-lg p-2 flex flex-col">
              <span className="text-[10px] text-gray-400 flex items-center gap-1 mb-0.5">
                <TrendingUp size={10} />
                Toplam Beklenen Gelir
              </span>
              <span className="text-sm font-medium text-white">
                {totalStats.expectedIncome.toLocaleString()}s
              </span>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-2 flex flex-col">
              <span className="text-[10px] text-gray-400 flex items-center gap-1 mb-0.5">
                <Clock size={10} />
                Toplam Saatlik Gelir
              </span>
              <span className="text-sm font-medium text-white">
                {Math.round(totalStats.hourlyIncome).toLocaleString()}s
              </span>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-2 flex flex-col">
              <span className="text-[10px] text-gray-400 flex items-center gap-1 mb-0.5">
                <TrendingUp size={10} />
                Toplam Kâr/Zarar
              </span>
              <span className={`text-sm font-medium 
                ${totalStats.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}
              >
                {totalStats.profit >= 0 ? '+' : ''}{totalStats.profit.toLocaleString()}s
              </span>
            </div>
          </div>
        </div>

        {/* Ada Listesi */}
        <div className="grid gap-2 mb-16">
          {islands.map((island) => {
            const stats = calculateStats(island);
            
            return (
              <div 
                key={island.id}
                className={`bg-slate-900/80 backdrop-blur-sm rounded-lg p-3 border
                  ${island.isActive 
                    ? 'border-green-500/20' 
                    : 'border-red-500/20'}`}
              >
                {/* Üst Kısım - İsim ve Butonlar */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h2 className="text-base font-bold text-white">{island.name}</h2>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium
                        ${island.isActive 
                          ? 'bg-green-500/10 text-green-400' 
                          : 'bg-red-500/10 text-red-400'}`}
                      >
                        {island.isActive ? 'Aktif' : 'Pasif'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link 
                        to={`/island/${island.id}`}
                        className="text-yellow-500 hover:text-yellow-400 text-xs transition-colors"
                      >
                        Adaya Git →
                      </Link>
                      <Link 
                        to={`/island/${island.id}/edit`}
                        className="text-gray-400 hover:text-white text-xs transition-colors 
                          flex items-center gap-1"
                      >
                        <Settings size={12} />
                        Düzenle
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleIslandStatus(island.id)}
                      className={`transition-colors p-1.5 rounded-lg
                        ${island.isActive 
                          ? 'text-green-400 hover:text-green-300 hover:bg-green-500/10' 
                          : 'text-red-400 hover:text-red-300 hover:bg-red-500/10'}`}
                    >
                      <Power size={16} />
                    </button>
                    <button
                      onClick={() => removeIsland(island.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 
                        transition-colors p-1.5 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Alt Kısım - İstatistikler */}
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="bg-slate-800/50 rounded-lg p-2 flex flex-col">
                    <span className="text-[10px] text-gray-400 flex items-center gap-1 mb-0.5">
                      <Coins size={10} />
                      Toplam Yatırım
                    </span>
                    <span className="text-xs font-medium text-white">
                      {stats.totalInvestment.toLocaleString()}s
                    </span>
                  </div>
                  
                  <div className="bg-slate-800/50 rounded-lg p-2 flex flex-col">
                    <span className="text-[10px] text-gray-400 flex items-center gap-1 mb-0.5">
                      <TrendingUp size={10} />
                      Beklenen Gelir
                    </span>
                    <span className="text-xs font-medium text-white">
                      {stats.expectedIncome.toLocaleString()}s
                    </span>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-2 flex flex-col">
                    <span className="text-[10px] text-gray-400 flex items-center gap-1 mb-0.5">
                      <Clock size={10} />
                      Saatlik Gelir
                    </span>
                    <span className="text-xs font-medium text-white">
                      {Math.round(stats.hourlyIncome).toLocaleString()}s
                    </span>
                  </div>

                  {/* Kâr/Zarar */}
                  <div className="col-span-3 bg-slate-800/50 rounded-lg p-2 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">Toplam Kâr/Zarar</span>
                    <span className={`text-xs font-medium 
                      ${stats.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {stats.profit >= 0 ? '+' : ''}{stats.profit.toLocaleString()}s
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ada Oluştur Butonu */}
        <Link
          to="/create-farm"
          className="fixed bottom-0 left-0 w-full bg-yellow-500 hover:bg-yellow-400 
            text-slate-900 py-3 flex items-center justify-center gap-1.5 text-sm font-medium 
            transition-colors"
        >
          <Plus size={16} />
          Ada Oluştur
        </Link>
      </div>
    </div>
  );
}