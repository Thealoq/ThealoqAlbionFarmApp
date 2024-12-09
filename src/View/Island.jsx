import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Plus, Trash2, X, Timer, Eraser, Info, Sprout, PawPrint, Bike, Search, Filter } from 'lucide-react';
import { WaterEffect } from '../components/WaterEffect';

// Seviye - Farm sayısı konfigürasyonu
const ISLAND_LEVELS = {
  1: { farms: 1 },
  2: { farms: 3 },
  3: { farms: 6 },
  4: { farms: 8 },
  5: { farms: 12 },
  6: { farms: 16 }
};

// Ekinler
const CROPS = [
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

// Hayvanlar
const ANIMALS = [
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

// Atlar
const HORSES = [
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

export function Island() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showBulkPlantModal, setShowBulkPlantModal] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [selectedFarmId, setSelectedFarmId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('crops');
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [showAllFarmsModal, setShowAllFarmsModal] = useState(false);
  
  // Adalar
  const [islands, setIslands] = useState(() => {
    const savedIslands = localStorage.getItem('islands');
    return savedIslands ? JSON.parse(savedIslands) : [];
  });

  // Mevcut ada
  const currentIsland = islands.find(island => island.id === parseInt(id));
  const maxFarms = currentIsland ? ISLAND_LEVELS[currentIsland.level || 1].farms : 1;

  // Farmlar
  const [farms, setFarms] = useState(() => {
    const savedFarms = localStorage.getItem(`island_${id}_farms`);
    if (savedFarms) return JSON.parse(savedFarms);
    
    return Array(maxFarms).fill(null).map((_, farmIndex) => ({
      id: farmIndex + 1,
      plots: Array(9).fill(null).map((_, plotIndex) => ({
        id: plotIndex + 1,
        crop: null,
        plantedAt: null,
        status: 'empty'
      }))
    }));
  });

  // Filtreleme fonksiyonu
  const getFilteredItems = () => {
    switch (selectedCategory) {
      case 'crops':
        return CROPS;
      case 'animals':
        return ANIMALS;
      case 'horses':
        return HORSES;
      default:
        return CROPS;
    }
  };

  // Farm ekleme
  const addFarm = () => {
    if (farms.length >= maxFarms) {
      alert(`Seviye ${currentIsland?.level || 1} için maksimum farm sayısına ulaştınız (${maxFarms})`);
      return;
    }

    const newFarmId = farms.length + 1;
    const newFarm = {
      id: newFarmId,
      plots: Array(9).fill(null).map((_, plotIndex) => ({
        id: plotIndex + 1,
        crop: null,
        plantedAt: null,
        status: 'empty'
      }))
    };

    const newFarms = [...farms, newFarm];
    setFarms(newFarms);
    localStorage.setItem(`island_${id}_farms`, JSON.stringify(newFarms));
  };

  // Farm silme
  const deleteFarm = (farmId) => {
    if (window.confirm('Bu farm\'ı silmek istediğinize emin misiniz?')) {
      const newFarms = farms.filter(farm => farm.id !== farmId)
        .map((farm, index) => ({
          ...farm,
          id: index + 1
        }));
      
      setFarms(newFarms);
      localStorage.setItem(`island_${id}_farms`, JSON.stringify(newFarms));
    }
  };

  // Tüm farmları sıfırlama
  const deleteAllFarms = () => {
    if (window.confirm('Tüm farmları silmek istediğinize emin misiniz?')) {
      const newFarms = Array(maxFarms).fill(null).map((_, farmIndex) => ({
        id: farmIndex + 1,
        plots: Array(9).fill(null).map((_, plotIndex) => ({
          id: plotIndex + 1,
          crop: null,
          plantedAt: null,
          status: 'empty'
        }))
      }));
      
      setFarms(newFarms);
      localStorage.setItem(`island_${id}_farms`, JSON.stringify(newFarms));
    }
  };

  // Farm'a ekin ekme
  const plantCrop = (farmId, plotId, item) => {
    const newFarms = farms.map(farm => {
      if (farm.id === farmId) {
        return {
          ...farm,
          plots: farm.plots.map(plot => {
            if (plot.id === plotId) {
              return {
                ...plot,
                crop: item,
                plantedAt: Date.now(),
                status: 'growing'
              };
            }
            return plot;
          })
        };
      }
      return farm;
    });

    setFarms(newFarms);
    localStorage.setItem(`island_${id}_farms`, JSON.stringify(newFarms));
    setShowModal(false);
    setSelectedPlot(null);
  };

  // Farm'daki tüm ekinleri temizleme
  const clearFarmCrops = (farmId) => {
    if (window.confirm('Bu farm\'daki tüm ekinleri silmek istediğinize emin misiniz?')) {
      const newFarms = farms.map(farm => {
        if (farm.id === farmId) {
          return {
            ...farm,
            plots: farm.plots.map(plot => ({
              ...plot,
              crop: null,
              plantedAt: null,
              status: 'empty'
            }))
          };
        }
        return farm;
      });
      
      setFarms(newFarms);
      localStorage.setItem(`island_${id}_farms`, JSON.stringify(newFarms));
    }
  };

  // Seviye değişiminde farm sayısını kontrol et
  useEffect(() => {
    if (currentIsland && (!farms.length || farms.length > maxFarms)) {
      const newFarms = Array(maxFarms).fill(null).map((_, farmIndex) => ({
        id: farmIndex + 1,
        plots: Array(9).fill(null).map((_, plotIndex) => ({
          id: plotIndex + 1,
          crop: null,
          plantedAt: null,
          status: 'empty'
        }))
      }));
      
      setFarms(newFarms);
      localStorage.setItem(`island_${id}_farms`, JSON.stringify(newFarms));
    }
  }, [currentIsland?.level, id, maxFarms, farms.length]);

  // Toplu ekim fonksiyonu
  const bulkPlantCrop = (item) => {
    let newFarms = [...farms];
    
    // Eğer seçili bir farm varsa sadece o farm'a ek
    if (selectedFarmId) {
      newFarms = farms.map(farm => {
        if (farm.id === selectedFarmId) {
          return {
            ...farm,
            plots: farm.plots.map(plot => ({
              ...plot,
              crop: item,
              plantedAt: Date.now(),
              status: 'growing'
            }))
          };
        }
        return farm;
      });
    } 
    // Seçili farm yoksa tüm farmlara ek
    else {
      newFarms = farms.map(farm => ({
        ...farm,
        plots: farm.plots.map(plot => ({
          ...plot,
          crop: item,
          plantedAt: Date.now(),
          status: 'growing'
        }))
      }));
    }

    setFarms(newFarms);
    localStorage.setItem(`island_${id}_farms`, JSON.stringify(newFarms));
    setShowBulkPlantModal(false);
    setSelectedFarmId(null);
  };

  // Tüm hayvanları ekleme fonksiyonu
  const plantAllAnimals = (farmId, animalType) => {
    if (window.confirm(`Tüm parsellere ${animalType.name} eklemek istediğinize emin misiniz?`)) {
      const newFarms = farms.map(farm => {
        if (farmId ? farm.id === farmId : true) {
          return {
            ...farm,
            plots: farm.plots.map(plot => ({
              ...plot,
              crop: animalType,
              plantedAt: Date.now(),
              status: 'growing'
            }))
          };
        }
        return farm;
      });

      setFarms(newFarms);
      localStorage.setItem(`island_${id}_farms`, JSON.stringify(newFarms));
      setShowModal(false);
      setSelectedPlot(null);
    }
  };

  // Yeni fonksiyon - seçili ürünü tüm farmlara ekler
  const plantSelectedToAllFarms = (selectedCrop) => {
    if (window.confirm(`Bu ürünü tüm farmlardaki tüm parsellere ekmek istediğinize emin misiniz?`)) {
      const newFarms = farms.map(farm => ({
        ...farm,
        plots: farm.plots.map(plot => ({
          ...plot,
          crop: selectedCrop,
          plantedAt: Date.now(),
          status: 'growing'
        }))
      }));

      setFarms(newFarms);
      localStorage.setItem(`island_${id}_farms`, JSON.stringify(newFarms));
      setShowModal(false);
    }
  };

  // Tüm farmlara eklemek için fonksiyon
  const plantToAllFarms = (selectedCrop) => {
    if (window.confirm(`Bu ürünü tüm farmlardaki tüm parsellere ekmek istediğinize emin misiniz?`)) {
      const newFarms = farms.map(farm => ({
        ...farm,
        plots: farm.plots.map(plot => ({
          ...plot,
          crop: selectedCrop,
          plantedAt: Date.now(),
          status: 'growing'
        }))
      }));

      setFarms(newFarms);
      localStorage.setItem(`island_${id}_farms`, JSON.stringify(newFarms));
      setShowAllFarmsModal(false);
    }
  };

  // Seçilen ür��nü tüm farmlara ekleyen fonksiyon
  const plantToAllFarmsInIsland = (selectedItem) => {
    if (window.confirm(`Bu ürünü adadaki tüm farmlara ekmek istediğinize emin misiniz?`)) {
      const newFarms = farms.map(farm => ({
        ...farm,
        plots: farm.plots.map(plot => ({
          ...plot,
          crop: selectedItem,
          plantedAt: Date.now(),
          status: 'growing'
        }))
      }));

      setFarms(newFarms);
      localStorage.setItem(`island_${id}_farms`, JSON.stringify(newFarms));
      setShowBulkPlantModal(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background pt-16 px-4">
      <WaterEffect className="!fixed" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Ada #{id} - Seviye {currentIsland?.level || 1}
            </h1>
            <p className="text-gray-500">
              {farms.length} / {maxFarms} farm alanı
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Farm Ekleme */}
            

          

            {/* Tüm Farmları Sıfırla */}
            <button
              onClick={() => setShowBulkPlantModal(true)}
              className="p-2 bg-red-500/10 text-primary-500 rounded-lg
                hover:bg-red-500/20 transition-colors"
              title="Tüm Farmları Sıfırla"
            >
              <Grid size={20} />
            </button>

            <button
              onClick={() => plantSelectedToAllFarms(selectedCrop)}
              className="p-2 bg-red-500/10 text-yellow-500 rounded-lg
                hover:bg-red-500/20 transition-colors"
              title="Tüm Farmlara Ekle"
            >
              <Eraser size={20} />
            </button>
          </div>
        </div>

        {/* Farm Listesi */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {farms.map(farm => (
            <div key={farm.id} className="bg-background-light rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">
                  Farm #{farm.id}
                </h3>
                
                <div className="flex items-center gap-2">
                  {/* Farm'a Özel Toplu Ekim */}
                  <button
                    onClick={() => {
                      setSelectedFarmId(farm.id);
                      setShowBulkPlantModal(true);
                    }}
                    className="p-1.5 bg-primary-500/10 text-primary-500 rounded-lg
                      hover:bg-primary-500/20 transition-colors"
                    title="Bu Farm'a Toplu Ekim"
                  >
                    <Grid size={16} />
                  </button>

                  {/* Farm'daki Ekinleri Temizle */}
                  <button
                    onClick={() => clearFarmCrops(farm.id)}
                    className="p-1.5 bg-yellow-500/10 text-yellow-500 rounded-lg
                      hover:bg-yellow-500/20 transition-colors"
                    title="Farm'daki Ekinleri Temizle"
                  >
                    <Eraser size={16} />
                  </button>

                  {/* Farm'ı Sil */}
                  
                </div>
              </div>

              {/* Plot Grid'i */}
              <div className="grid grid-cols-3 gap-2">
                {farm.plots.map(plot => (
                  <button
                    key={plot.id}
                    onClick={() => {
                      setSelectedPlot(plot);
                      setSelectedFarmId(farm.id);
                      setShowModal(true);
                    }}
                    className="aspect-square bg-background/50 rounded-lg p-2
                      hover:bg-background-lighter transition-colors"
                  >
                    {plot.crop ? (
                      <img 
                        src={plot.crop.image} 
                        alt={plot.crop.name}
                        className="w-full h-full object-contain" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Plus className="w-6 h-6 text-gray-500" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Ekin Seçme Modalı */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#111] rounded-2xl w-full max-w-4xl border border-white/5 shadow-2xl">
              {/* Modal Header */}
              <div className="p-6 border-b border-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-semibold text-white">
                        {selectedPlot ? `Parsel #${selectedPlot.id}` : 'Parsel Seçimi'}
                      </h2>
                      <span className="px-2 py-1 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-medium">
                        Farm #{selectedFarmId}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400 mt-1">
                      Ekmek istediğiniz ürünü seçin veya toplu işlem yapın
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {/* bilgi modalı */}}
                      className="p-2 text-zinc-400 hover:text-white rounded-lg
                        hover:bg-white/5 transition-colors"
                    >
                      <Info size={20} />
                    </button>
                    <button 
                      onClick={() => {
                        setShowModal(false);
                        setSelectedPlot(null);
                      }}
                      className="p-2 text-zinc-400 hover:text-white rounded-lg
                        hover:bg-white/5 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Quick Actions */}
                
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Category Tabs */}
                <div className="flex items-center gap-2 p-1 bg-[#0A0A0A] rounded-lg mb-6">
                  <button
                    onClick={() => setSelectedCategory('crops')}
                    className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium 
                      transition-all duration-200 flex items-center justify-center gap-2
                      ${selectedCategory === 'crops' 
                        ? 'text-white bg-[#7c3aed]' 
                        : 'text-zinc-400 hover:text-zinc-300 hover:bg-white/5'}`}
                  >
                    <Sprout size={16} />
                    <span>Ekinler</span>
                  </button>
                  <button
                    onClick={() => setSelectedCategory('animals')}
                    className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium 
                      transition-all duration-200 flex items-center justify-center gap-2
                      ${selectedCategory === 'animals' 
                        ? 'text-white bg-[#7c3aed]' 
                        : 'text-zinc-400 hover:text-zinc-300 hover:bg-white/5'}`}
                  >
                    <PawPrint size={16} />
                    <span>Hayvanlar</span>
                  </button>
                  <button
                    onClick={() => setSelectedCategory('horses')}
                    className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium 
                      transition-all duration-200 flex items-center justify-center gap-2
                      ${selectedCategory === 'horses' 
                        ? 'text-white bg-[#7c3aed]' 
                        : 'text-zinc-400 hover:text-zinc-300 hover:bg-white/5'}`}
                  >
                    <Bike size={16} />
                    <span>Atlar</span>
                  </button>
                </div>

                {/* Search & Filter */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 relative">
                    <input 
                      type="text"
                      placeholder="Ürün ara..."
                      className="w-full bg-[#0A0A0A] text-zinc-400 text-sm rounded-lg pl-10 pr-4 py-2.5
                        border border-white/5 focus:outline-none focus:border-[#7c3aed]"
                    />
                    <Search size={16} className="absolute left-3 top-3 text-zinc-500" />
                  </div>
                  <button className="p-2.5 text-zinc-400 hover:text-white rounded-lg
                    bg-[#0A0A0A] border border-white/5 hover:border-[#7c3aed]
                    transition-colors">
                    <Filter size={16} />
                  </button>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 
                  max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 
                  scrollbar-track-transparent">
                  {selectedCategory === 'horses' ? HORSES.map(item => (
                    <button
                      key={item.id}
                      onClick={() => plantToAllFarmsInIsland(item)}
                      className="bg-[#0A0A0A] p-4 rounded-xl border border-white/5
                        hover:border-[#7c3aed]/20 hover:scale-[1.02] transition-all duration-200"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-contain" 
                        />
                        <div className="text-sm font-medium text-white">
                          {item.name}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                          <Timer size={14} />
                          <span>{item.growthTime}</span>
                        </div>
                        {item.tier && (
                          <span className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-white/60">
                            Tier {item.tier}
                          </span>
                        )}
                      </div>
                    </button>
                  )) : getFilteredItems().map(item => (
                    <div key={item.id} className="group">
                      <button
                        onClick={() => plantCrop(selectedFarmId, selectedPlot?.id, item)}
                        className="w-full bg-[#0A0A0A] rounded-xl overflow-hidden
                          group hover:scale-[1.02] transition-all duration-200
                          border border-white/5 hover:border-[#7c3aed]/20"
                      >
                        <div className="p-4">
                          <div className="flex-1 flex items-center justify-center mb-4">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-16 h-16 object-contain drop-shadow-2xl
                                transition-transform duration-300 group-hover:scale-110" 
                            />
                          </div>
                          
                          <div className="space-y-3">
                            <div className="text-sm font-medium text-center">
                              <span className="text-white group-hover:text-white/90 
                                transition-colors">
                                {item.name}
                              </span>
                              {item.tier && (
                                <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded-md
                                  bg-white/5 text-white/60">
                                  {item.tier}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center justify-between px-3 py-2
                              bg-black/30 rounded-lg backdrop-blur-sm">
                              <div className="flex items-center gap-1.5">
                                <Timer size={14} className="text-[#7c3aed]" />
                                <span className="text-xs text-zinc-400">
                                  {item.growthTime}
                                </span>
                              </div>
                              <span className="text-xs font-medium bg-gradient-to-r 
                                from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                                {item.price} 💰
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                      
                      {/* Plant All Button */}
                      <button
                        onClick={() => plantAllAnimals(selectedFarmId, item)}
                        className="w-full mt-2 px-3 py-2 rounded-lg text-xs font-medium
                          bg-[#7c3aed]/10 text-[#7c3aed] hover:bg-[#7c3aed]/20
                          transition-all duration-200 flex items-center justify-center gap-1.5
                          opacity-0 group-hover:opacity-100"
                      >
                        <Plus size={12} />
                        <span>Tümüne Ekle</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Toplu Ekim Modalı */}
        {showBulkPlantModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#111] rounded-2xl w-full max-w-4xl border border-white/5">
              {/* Modal Header */}
              <div className="p-6 border-b border-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      Tüm Farmlara Ekle
                    </h2>
                    <p className="text-sm text-zinc-400 mt-1">
                      Seçtiğiniz ürün adadaki tüm farmlara ekilecek
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowBulkPlantModal(false)}
                    className="p-2 text-zinc-400 hover:text-white rounded-lg
                      hover:bg-white/5 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Category Tabs */}
                <div className="flex items-center gap-2 p-1 bg-[#0A0A0A] rounded-lg mb-6">
                  <button
                    onClick={() => setSelectedCategory('crops')}
                    className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium 
                      transition-all duration-200 flex items-center justify-center gap-2
                      ${selectedCategory === 'crops' 
                        ? 'text-white bg-[#7c3aed]' 
                        : 'text-zinc-400 hover:text-zinc-300 hover:bg-white/5'}`}
                  >
                    <Sprout size={16} />
                    <span>Ekinler</span>
                  </button>
                  <button
                    onClick={() => setSelectedCategory('animals')}
                    className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium 
                      transition-all duration-200 flex items-center justify-center gap-2
                      ${selectedCategory === 'animals' 
                        ? 'text-white bg-[#7c3aed]' 
                        : 'text-zinc-400 hover:text-zinc-300 hover:bg-white/5'}`}
                  >
                    <PawPrint size={16} />
                    <span>Hayvanlar</span>
                  </button>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {getFilteredItems().map(item => (
                    <button
                      key={item.id}
                      onClick={() => plantToAllFarmsInIsland(item)}
                      className="bg-[#0A0A0A] p-4 rounded-xl border border-white/5
                        hover:border-[#7c3aed]/20 hover:scale-[1.02] transition-all duration-200"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-contain" 
                        />
                        <div className="text-sm font-medium text-white">
                          {item.name}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                          <Timer size={14} />
                          <span>{item.growthTime}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tüm Farmlara Ekleme Modalı */}
        {showAllFarmsModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#111] rounded-2xl w-full max-w-4xl border border-white/5 shadow-2xl">
              {/* Modal Header */}
              <div className="p-6 border-b border-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      Tüm Farmlara Ekle
                    </h2>
                    <p className="text-sm text-zinc-400 mt-1">
                      Seçtiğiniz ürün tüm farmlardaki tüm parsellere ekilecek
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowAllFarmsModal(false)}
                    className="p-2 text-zinc-400 hover:text-white rounded-lg
                      hover:bg-white/5 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Items Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {CROPS.map(crop => (
                    <button
                      key={crop.id}
                      onClick={() => plantToAllFarms(crop)}
                      className="bg-[#0A0A0A] p-4 rounded-xl border border-white/5
                        hover:border-[#7c3aed]/20 hover:scale-[1.02] transition-all duration-200"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <img 
                          src={crop.image} 
                          alt={crop.name}
                          className="w-16 h-16 object-contain" 
                        />
                        <div className="text-sm font-medium text-white">
                          {crop.name}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                          <Timer size={14} />
                          <span>{crop.growthTime}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}