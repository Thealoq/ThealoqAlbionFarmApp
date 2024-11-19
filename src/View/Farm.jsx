import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { WaterEffect } from '../components/WaterEffect';
import { Flower, Timer, X } from 'lucide-react';

export function Farm() {
  const { id: islandId, farmId } = useParams();
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [plots, setPlots] = useState(() => {
    const savedFarms = localStorage.getItem(`island_${islandId}_farms`);
    if (savedFarms) {
      const farms = JSON.parse(savedFarms);
      return farms.find(f => f.id === parseInt(farmId))?.plots || [];
    }
    return [];
  });

  // Mahsul listesi
  const crops = [
    { id: 'wheat', name: 'Buğday', growthTime: 60, color: 'from-yellow-500 to-yellow-600' },
    { id: 'corn', name: 'Mısır', growthTime: 120, color: 'from-yellow-400 to-yellow-500' },
    { id: 'carrot', name: 'Havuç', growthTime: 180, color: 'from-orange-400 to-orange-500' },
    { id: 'potato', name: 'Patates', growthTime: 240, color: 'from-yellow-700 to-yellow-800' }
  ];

  const handlePlotClick = (plot) => {
    if (plot.status === 'empty') {
      setSelectedPlot(plot);
      setShowModal(true);
    } else if (plot.status === 'ready') {
      // Hasat işlemi
      harvestCrop(plot);
    }
  };

  const plantCrop = (cropId) => {
    if (!selectedPlot) return;

    const crop = crops.find(c => c.id === cropId);
    if (!crop) return;

    const newPlots = plots.map(p => {
      if (p.id === selectedPlot.id) {
        return {
          ...p,
          crop,
          plantedAt: Date.now(),
          status: 'growing'
        };
      }
      return p;
    });

    setPlots(newPlots);
    updateFarmInStorage(newPlots);
    setShowModal(false);
    setSelectedPlot(null);
  };

  const harvestCrop = (plot) => {
    // Depo sistemine ürünü ekle
    const storage = JSON.parse(localStorage.getItem('storage') || '{}');
    storage[plot.crop.id] = (storage[plot.crop.id] || 0) + 1;
    localStorage.setItem('storage', JSON.stringify(storage));

    // Alanı temizle
    const newPlots = plots.map(p => {
      if (p.id === plot.id) {
        return {
          ...p,
          crop: null,
          plantedAt: null,
          status: 'empty'
        };
      }
      return p;
    });

    setPlots(newPlots);
    updateFarmInStorage(newPlots);
  };

  const updateFarmInStorage = (updatedPlots) => {
    const savedFarms = localStorage.getItem(`island_${islandId}_farms`);
    if (savedFarms) {
      const farms = JSON.parse(savedFarms);
      const farmIndex = farms.findIndex(f => f.id === parseInt(farmId));
      if (farmIndex !== -1) {
        farms[farmIndex].plots = updatedPlots;
        localStorage.setItem(`island_${islandId}_farms`, JSON.stringify(farms));
      }
    }
  };

  // Büyüme kontrolü
  useEffect(() => {
    const timer = setInterval(() => {
      const updatedPlots = plots.map(plot => {
        if (plot.status === 'growing' && plot.plantedAt) {
          const elapsed = (Date.now() - plot.plantedAt) / 1000;
          if (elapsed >= plot.crop.growthTime) {
            return { ...plot, status: 'ready' };
          }
        }
        return plot;
      });

      if (JSON.stringify(updatedPlots) !== JSON.stringify(plots)) {
        setPlots(updatedPlots);
        updateFarmInStorage(updatedPlots);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [plots]);

  return (
    <div className="min-h-screen bg-farm p-8">
      <WaterEffect className="opacity-20" />
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-farm-accent">
          Farm Yönetimi
        </h1>
        <p className="text-white/60">Ekin yönetimi</p>
      </div>

      {/* Farm Grid */}
      <div className="grid grid-cols-3 gap-4">
        {plots.map((plot) => (
          <div
            key={plot.id}
            onClick={() => handlePlotClick(plot)}
            className={`aspect-square rounded-xl p-4 cursor-pointer
              transition-all duration-300 relative overflow-hidden
              ${plot.status === 'empty' 
                ? 'bg-slate-800/50 hover:bg-slate-800/70' 
                : plot.status === 'growing'
                ? 'bg-green-500/20 hover:bg-green-500/30'
                : 'bg-yellow-500/20 hover:bg-yellow-500/30'}`}
          >
            <div className="absolute inset-0 backdrop-blur-sm -z-10" />
            
            <div className="h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-white/60 text-sm">Alan #{plot.id}</span>
                {plot.status !== 'empty' && (
                  <span className={`text-sm px-2 py-0.5 rounded
                    ${plot.status === 'growing' 
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'}`}
                  >
                    {plot.status === 'growing' ? 'Büyüyor' : 'Hazır'}
                  </span>
                )}
              </div>

              {plot.crop ? (
                <div className="text-center">
                  <div className="text-lg font-medium text-white mb-1">
                    {plot.crop.name}
                  </div>
                  {plot.status === 'growing' && (
                    <div className="text-sm text-gray-400 flex items-center justify-center gap-1">
                      <Timer size={14} />
                      <span>
                        {Math.max(0, Math.ceil(plot.crop.growthTime - 
                          ((Date.now() - plot.plantedAt) / 1000)))}s
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-500 flex flex-col items-center gap-2">
                  <Flower size={24} />
                  <span>Ekim için tıkla</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 