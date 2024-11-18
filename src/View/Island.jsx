import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { WaterEffect } from '../components/WaterEffect';
import { Calculator } from 'lucide-react';

export function Island() {
  const { id } = useParams();
  const [island, setIsland] = useState(null);
  const [selectedField, setSelectedField] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [stats, setStats] = useState({
    totalInvestment: 0,
    expectedIncome: 0,
    profit: 0,
    profitPercentage: 0
  });

  const crops = [
    { 
      id: 1, 
      name: 'Havuç', 
      image: 'https://render.albiononline.com/v1/item/Carrots.png?locale=en',
      type: 'carrot',
      growthTime: '2 saat',
      price: 100,
      color: 'from-orange-500/10 to-orange-500/5'
    },
    {
      id: 2,
      name: 'Fasulye',
      image: 'https://render.albiononline.com/v1/item/Beans.png?locale=en', 
      type: 'beans',
      growthTime: '3 saat',
      price: 150,
      color: 'from-green-500/10 to-green-500/5'
    },
    {
      id: 3,
      name: 'Buğday',
      image: 'https://render.albiononline.com/v1/item/Sheaf%20of%20Wheat.png?locale=en',
      type: 'wheat',
      growthTime: '4 saat', 
      price: 200,
      color: 'from-yellow-500/10 to-yellow-500/5'
    },
    {
      id: 4,
      name: 'Şalgam',
      image: 'https://render.albiononline.com/v1/item/Turnips.png?locale=en',
      type: 'turnip',
      growthTime: '5 saat',
      price: 250,
      color: 'from-purple-500/10 to-purple-500/5'
    },
    {
      id: 5,
      name: 'Lahana',
      image: 'https://render.albiononline.com/v1/item/Cabbage.png?locale=en',
      type: 'cabbage', 
      growthTime: '6 saat',
      price: 300,
      color: 'from-green-600/10 to-green-600/5'
    },
    {
      id: 6,
      name: 'Patates',
      image: 'https://render.albiononline.com/v1/item/Potatoes.png?locale=en',
      type: 'potato',
      growthTime: '7 saat',
      price: 350,
      color: 'from-yellow-600/10 to-yellow-600/5'
    },
    {
      id: 7,
      name: 'Mısır',
      image: 'https://render.albiononline.com/v1/item/Bundle%20of%20Corn.png?locale=en',
      type: 'corn',
      growthTime: '8 saat',
      price: 400,
      color: 'from-yellow-400/10 to-yellow-400/5'
    },
    {
      id: 8,
      name: 'Balkabağı',
      image: 'https://render.albiononline.com/v1/item/Pumpkin.png?locale=en',
      type: 'pumpkin',
      growthTime: '9 saat',
      price: 450,
      color: 'from-orange-600/10 to-orange-600/5'
    }
  ];

  const animals = [
    {
      id: 1,
      name: 'Civciv',
      image: 'https://render.albiononline.com/v1/item/Baby%20Chickens.png?locale=en',
      type: 'chicken',
      growthTime: '22 saat',
      price: 1000,
      color: 'from-yellow-300/10 to-yellow-300/5'
    },
    {
      id: 2,
      name: 'Oğlak',
      image: 'https://render.albiononline.com/v1/item/Kid.png?locale=en',
      type: 'goat',
      growthTime: '24 saat',
      price: 1200,
      color: 'from-gray-400/10 to-gray-400/5'
    },
    {
      id: 3,
      name: 'Kaz Yavrusu',
      image: 'https://render.albiononline.com/v1/item/Gosling.png?locale=en',
      type: 'goose',
      growthTime: '26 saat',
      price: 1400,
      color: 'from-white/10 to-white/5'
    },
    {
      id: 4,
      name: 'Kuzu',
      image: 'https://render.albiononline.com/v1/item/Lamb.png?locale=en',
      type: 'sheep',
      growthTime: '28 saat',
      price: 1600,
      color: 'from-gray-300/10 to-gray-300/5'
    },
    {
      id: 5,
      name: 'Domuz Yavrusu',
      image: 'https://render.albiononline.com/v1/item/Piglet.png?locale=en',
      type: 'pig',
      growthTime: '30 saat',
      price: 1800,
      color: 'from-pink-400/10 to-pink-400/5'
    },
    {
      id: 6,
      name: 'Buzağı',
      image: 'https://render.albiononline.com/v1/item/Calf.png?locale=en',
      type: 'cow',
      growthTime: '32 saat',
      price: 2000,
      color: 'from-brown-500/10 to-brown-500/5'
    }
  ];

  const horseFoals = [
    {
      id: 'journeyman_foal',
      name: 'Öğrenci At Yavrusu',
      image: 'https://render.albiononline.com/v1/item/Journeyman%27s%20Foal.png?locale=en',
      type: 'horse',
      tier: 'III',
      growthTime: '36 saat',
      price: 5000,
      color: 'from-amber-700/10 to-amber-700/5'
    },
    {
      id: 'adept_foal',
      name: 'Usta At Yavrusu',
      image: 'https://render.albiononline.com/v1/item/Adept%27s%20Foal.png?locale=en',
      type: 'horse',
      tier: 'IV',
      growthTime: '36 saat',
      price: 7500,
      color: 'from-amber-700/10 to-amber-700/5'
    },
    {
      id: 'expert_foal',
      name: 'Uzman At Yavrusu',
      image: 'https://render.albiononline.com/v1/item/Expert%27s%20Foal.png?locale=en',
      type: 'horse',
      tier: 'V',
      growthTime: '36 saat',
      price: 10000,
      color: 'from-amber-700/10 to-amber-700/5'
    },
    {
      id: 'master_foal',
      name: 'Usta At Yavrusu',
      image: 'https://render.albiononline.com/v1/item/Master%27s%20Foal.png?locale=en',
      type: 'horse',
      tier: 'VI',
      growthTime: '36 saat',
      price: 15000,
      color: 'from-amber-700/10 to-amber-700/5'
    },
    {
      id: 'grandmaster_foal',
      name: 'Büyük Usta At Yavrusu',
      image: 'https://render.albiononline.com/v1/item/Grandmaster%27s%20Foal.png?locale=en',
      type: 'horse',
      tier: 'VII',
      growthTime: '36 saat',
      price: 25000,
      color: 'from-amber-700/10 to-amber-700/5'
    },
    {
      id: 'elder_foal',
      name: 'Yaşlı Usta At Yavrusu',
      image: 'https://render.albiononline.com/v1/item/Elder%27s%20Foal.png?locale=en',
      type: 'horse',
      tier: 'VIII',
      growthTime: '36 saat',
      price: 40000,
      color: 'from-amber-700/10 to-amber-700/5'
    }
  ];

  useEffect(() => {
    const savedIslands = JSON.parse(localStorage.getItem('islands') || '[]');
    const currentIsland = savedIslands.find(i => i.id === Number(id));
    if (currentIsland) {
      if (!currentIsland.fields) {
        currentIsland.fields = Array(16).fill(null);
      }
      setIsland(currentIsland);
    }
  }, [id]);

  useEffect(() => {
    if (island?.fields) {
      const totalInv = island.fields.reduce((sum, field) => {
        return sum + (field?.price || 0);
      }, 0);

      const expectedInc = island.fields.reduce((sum, field) => {
        return sum + (field?.price ? field.price * 1.5 : 0);
      }, 0);

      const profit = expectedInc - totalInv;
      const profitPerc = totalInv > 0 ? (profit / totalInv) * 100 : 0;

      setStats({
        totalInvestment: totalInv,
        expectedIncome: expectedInc,
        profit: profit,
        profitPercentage: profitPerc
      });
    }
  }, [island?.fields]);

  // Tarla gruplarını kontrol et
  const checkFieldGroups = () => {
    const groups = {
      group1: island.fields.slice(0, 4).filter(Boolean).length,
      group2: island.fields.slice(4, 8).filter(Boolean).length,
      group3: island.fields.slice(8, 12).filter(Boolean).length,
      group4: island.fields.slice(12, 16).filter(Boolean).length
    };

    return groups;
  };

  // Modal içinde tarla seçimi öncesi kontrol
  const handleFieldClick = (index) => {
    const groupIndex = Math.floor(index / 4); // Hangi grupta olduğunu bul (0-3)
    const groups = checkFieldGroups();
    
    // Önceki gruplar tamamen dolu değilse izin verme
    for (let i = 0; i < groupIndex; i++) {
      const groupFields = groups[`group${i + 1}`];
      if (groupFields < 4) {
        alert('Önceki tarla grubu tamamen dolmadan bu alana ekleyemezsiniz!');
        return;
      }
    }

    setSelectedField(index);
    setShowCropModal(true);
  };

  const handleCropSelect = (crop) => {
    const updatedFields = [...island.fields];
    updatedFields[selectedField] = {
      ...crop,
      plantedAt: new Date().toISOString()
    };

    const updatedIsland = { ...island, fields: updatedFields };
    setIsland(updatedIsland);

    // LocalStorage güncelleme
    const savedIslands = JSON.parse(localStorage.getItem('islands') || '[]');
    const updatedIslands = savedIslands.map(i => 
      i.id === Number(id) ? updatedIsland : i
    );
    localStorage.setItem('islands', JSON.stringify(updatedIslands));

    setShowCropModal(false);
  };

  if (!island) return null;

  return (
    <div className="w-full min-h-screen bg-slate-900 pt-16 px-3 relative overflow-hidden">
      <WaterEffect />
      <div className="container mx-auto max-w-5xl relative z-10">
        <h1 className="text-lg font-bold text-white mb-3 text-center">{island?.name}</h1>

        <div className="flex gap-3">
          <div className="flex-1 bg-slate-800/50 backdrop-blur-sm rounded-xl p-3">
            <div className="grid grid-cols-1 gap-3">
              {[0, 4, 8, 12].map((startIndex) => (
                <div key={startIndex} className="grid grid-cols-4 gap-1.5">
                  {Array.from({ length: 4 }).map((_, i) => {
                    const index = startIndex + i;
                    return (
                      <button
                        key={index}
                        onClick={() => handleFieldClick(index)}
                        className={`aspect-square rounded-lg relative group
                          ${island.fields[index] ? 'bg-gradient-to-br ' + island.fields[index].color : 'bg-slate-900/80'}
                          hover:scale-105 transition-all duration-200 ease-out
                          border border-slate-700/50 hover:border-slate-600
                          flex items-center justify-center`}
                      >
                        {island.fields[index] ? (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg" />
                            <div className="relative h-full w-full flex flex-col items-center justify-center p-1">
                              <img 
                                src={island.fields[index].image} 
                                alt={island.fields[index].name} 
                                className="w-full h-full object-contain mb-0.5 group-hover:scale-110 transition-transform"
                              />
                              <div className="absolute bottom-0.5 left-0.5 right-0.5">
                                <div className="text-[7px] text-white/80 text-center font-medium truncate">
                                  {island.fields[index].name}
                                </div>
                                {island.fields[index].tier && (
                                  <div className="absolute -top-1 -right-1 text-[6px] font-bold px-1 py-0.5
                                    bg-yellow-500 text-slate-900 rounded-md tracking-wide">
                                    {island.fields[index].tier}
                                  </div>
                                )}
                                <div className="text-[6px] text-yellow-500/80 text-center font-medium">
                                  {island.fields[index].price}s
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="text-slate-500 text-[8px]">
                            Boş Tarla
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="w-64 shrink-0 bg-slate-800/50 backdrop-blur-sm rounded-xl p-3">
            <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Calculator size={14} />
              Ada İstatistikleri
            </h2>
            
            <div className="space-y-2">
              <div className="bg-slate-900/50 rounded-lg p-2.5 flex flex-col">
                <span className="text-gray-400 text-xs mb-0.5">Toplam Yatırım</span>
                <span className="text-white font-medium text-sm">
                  {stats.totalInvestment.toLocaleString()}s
                </span>
              </div>
              
              <div className="bg-slate-900/50 rounded-lg p-2.5 flex flex-col">
                <span className="text-gray-400 text-xs mb-0.5">Beklenen Gelir</span>
                <span className="text-white font-medium text-sm">
                  {stats.expectedIncome.toLocaleString()}s
                </span>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-2.5 flex flex-col">
                <span className="text-gray-400 text-xs mb-0.5">Kar/Zarar</span>
                <span className={`font-medium ${stats.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stats.profit.toLocaleString()}s
                </span>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-2.5 flex flex-col">
                <span className="text-gray-400 text-xs mb-0.5">Kar Oranı</span>
                <span className={`font-medium ${stats.profitPercentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  %{Math.abs(stats.profitPercentage).toFixed(1)}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-xs font-medium text-white/80 mb-2">Ürün Dağılımı</h3>
              <div className="space-y-1.5">
                {Object.entries(
                  island?.fields.reduce((acc, field) => {
                    if (field?.name) {
                      acc[field.name] = (acc[field.name] || 0) + 1;
                    }
                    return acc;
                  }, {}) || {}
                ).map(([name, count]) => (
                  <div key={name} className="flex items-center justify-between text-[10px]">
                    <span className="text-white/80">{name}</span>
                    <span className="text-gray-400">{count} adet</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {showCropModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-xl p-4 w-[420px] max-w-[95vw] border border-slate-700">
              <h2 className="text-lg font-bold text-white mb-4">Eklenecek Ürünü Seç</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-white/80 mb-2">Mahsuller</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {crops.map((crop) => (
                      <button
                        key={crop.id}
                        onClick={() => handleCropSelect(crop)}
                        className="flex flex-col items-center p-2 rounded-lg bg-slate-700/50 
                          hover:bg-slate-700 transition-colors"
                      >
                        <img src={crop.image} alt={crop.name} className="w-8 h-8 mb-1" />
                        <span className="text-[10px] text-white text-center">{crop.name}</span>
                        <span className="text-[8px] text-yellow-500">{crop.price}s</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-white/80 mb-2">Hayvanlar</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {animals.map((animal) => (
                      <button
                        key={animal.id}
                        onClick={() => handleCropSelect(animal)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-lg
                          bg-gradient-to-br ${animal.color} border border-slate-700
                          hover:border-slate-600 hover:scale-105 transition-all duration-200`}
                      >
                        <img 
                          src={animal.image} 
                          alt={animal.name} 
                          className="w-10 h-10 object-contain"
                        />
                        <span className="text-white text-[10px] font-medium text-center">{animal.name}</span>
                        <div className="flex items-center gap-1 text-[8px]">
                          <span className="text-slate-400">{animal.growthTime}</span>
                          <span className="text-yellow-500">{animal.price}s</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-white/80 mb-2">At Yavruları</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {horseFoals.map((horse) => (
                      <button
                        key={horse.id}
                        onClick={() => handleCropSelect(horse)}
                        className={`flex flex-col items-center gap-1 p-3 rounded-lg
                          bg-gradient-to-br ${horse.color} border border-slate-700
                          hover:border-slate-600 hover:scale-105 transition-all duration-200`}
                      >
                        <div className="relative">
                          <img 
                            src={horse.image} 
                            alt={horse.name} 
                            className="w-12 h-12 object-contain"
                          />
                          <span className="absolute -top-1 -right-1 text-[8px] font-bold px-1.5 py-0.5
                            bg-yellow-500 text-slate-900 rounded-md tracking-wide">
                            {horse.tier}
                          </span>
                        </div>
                        <span className="text-white text-[10px] font-medium text-center leading-tight">
                          {horse.name}
                        </span>
                        <div className="flex flex-col items-center gap-0.5 text-[8px]">
                          <span className="text-slate-400">{horse.growthTime}</span>
                          <span className="text-yellow-500 font-medium">{horse.price}s</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowCropModal(false)}
                className="mt-3 w-full py-2 bg-slate-700 text-white text-xs
                  hover:bg-slate-600 transition-colors"
              >
                İptal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}