import { useState, useEffect } from 'react';
import { Plus, Minus, Package } from 'lucide-react';
import { WaterEffect } from '../components/WaterEffect';

export function Storage() {
  const [storage, setStorage] = useState(() => {
    const savedStorage = localStorage.getItem('storage');
    return savedStorage ? JSON.parse(savedStorage) : {
      wheat: 0,    // Buğday
      corn: 0,     // Mısır
      carrot: 0,   // Havuç
      potato: 0,   // Patates
      flour: 0,    // Un (Buğdaydan)
      bread: 0,    // Ekmek (Un + Su)
      feed: 0,     // Yem (Mısır + Buğday)
      soup: 0      // Çorba (Havuç + Patates + Su)
    };
  });

  // Malzeme listesi
  const ingredients = [
    { id: 'wheat', name: 'Buğday', color: 'from-yellow-500 to-yellow-600' },
    { id: 'corn', name: 'Mısır', color: 'from-yellow-400 to-yellow-500' },
    { id: 'carrot', name: 'Havuç', color: 'from-orange-400 to-orange-500' },
    { id: 'potato', name: 'Patates', color: 'from-yellow-700 to-yellow-800' }
  ];

  // Craft tarifleri
  const recipes = [
    {
      id: 'flour',
      name: 'Un',
      ingredients: { wheat: 2 },
      output: 1,
      color: 'from-gray-200 to-gray-300'
    },
    {
      id: 'bread',
      name: 'Ekmek',
      ingredients: { flour: 1 },
      output: 1,
      color: 'from-yellow-600 to-yellow-700'
    },
    {
      id: 'feed',
      name: 'Yem',
      ingredients: { wheat: 1, corn: 1 },
      output: 2,
      color: 'from-orange-300 to-orange-400'
    },
    {
      id: 'soup',
      name: 'Çorba',
      ingredients: { carrot: 2, potato: 1 },
      output: 1,
      color: 'from-red-400 to-red-500'
    }
  ];

  useEffect(() => {
    localStorage.setItem('storage', JSON.stringify(storage));
  }, [storage]);

  const craftItem = (recipe) => {
    // Malzemeleri kontrol et
    for (const [ingredient, amount] of Object.entries(recipe.ingredients)) {
      if (storage[ingredient] < amount) {
        alert(`Yetersiz malzeme: ${ingredient}`);
        return;
      }
    }

    // Malzemeleri kullan
    const newStorage = { ...storage };
    for (const [ingredient, amount] of Object.entries(recipe.ingredients)) {
      newStorage[ingredient] -= amount;
    }
    newStorage[recipe.id] += recipe.output;
    setStorage(newStorage);
  };

  return (
    <div className="w-full min-h-screen bg-slate-900 pt-16 px-3 relative overflow-hidden">
      <WaterEffect />
      <div className="container mx-auto max-w-4xl relative z-10">
        <h1 className="text-2xl font-bold text-white mb-6">Depo & Üretim</h1>

        {/* Hammaddeler */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 mb-6">
          <h2 className="text-lg font-medium text-white mb-4">Hammaddeler</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ingredients.map(item => (
              <div 
                key={item.id}
                className={`bg-gradient-to-br ${item.color} rounded-lg p-3
                  flex flex-col items-center gap-2`}
              >
                <span className="text-slate-900 font-medium">{item.name}</span>
                <span className="text-2xl font-bold text-slate-900">
                  {storage[item.id]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Üretim Tarifleri */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4">
          <h2 className="text-lg font-medium text-white mb-4">Üretim</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {recipes.map(recipe => (
              <div 
                key={recipe.id}
                className="bg-slate-900/50 rounded-lg p-3"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${recipe.color}`} />
                  <div className="flex-1 px-3">
                    <h3 className="text-white font-medium">{recipe.name}</h3>
                    <p className="text-sm text-gray-400">{recipe.ingredients.wheat} Buğday, {recipe.ingredients.corn} Mısır</p>
                    <div className="mt-2">
                      <button onClick={() => craftItem(recipe)} className="text-sm text-white bg-blue-500 rounded-lg p-2">
                        <Package className="mr-2" /> Üret
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 