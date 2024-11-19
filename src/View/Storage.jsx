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
     { id: 'wheat', name: 'Buğday', icon: '🌾' },
    { id: 'corn', name: 'Mısır', icon: '🌽' },
    { id: 'carrot', name: 'Havuç', icon: '🥕' },
    { id: 'potato', name: 'Patates', icon: '🥔' },
  ];

  // Craft tarifleri
  const recipes = [
    {
      id: 'flour',
      name: 'Un',
      ingredients: { wheat: 2 },
      output: 1,
      icon: '🌾'
    },
    {
      id: 'bread',
      name: 'Ekmek',
      ingredients: { wheat: 1 },
      output: 1,
      icon: '🍞'
    },
    {
      id: 'feed',
      name: 'Yem',
      ingredients: { wheat: 1, corn: 1 },
      output: 2,
      icon: '🌽'
    },
    {
      id: 'soup',
      name: 'Çorba',
      ingredients: { carrot: 2, potato: 1 },
      output: 1,
      icon: '🥕'
    }
  ];

  useEffect(() => {
    localStorage.setItem('storage', JSON.stringify(storage));
  }, [storage]);

  const craftItem = (recipe) => {
    for (const [ingredient, amount] of Object.entries(recipe.ingredients)) {
      if (storage[ingredient] < amount) {
        alert(`Yetersiz malzeme: ${ingredient}`);
        return;
      }
    }


    const newStorage = { ...storage };
    for (const [ingredient, amount] of Object.entries(recipe.ingredients)) {
      newStorage[ingredient] -= amount;
    }
    newStorage[recipe.id] += recipe.output;
    setStorage(newStorage);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16 px-4">
      <WaterEffect className="opacity-5" />
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-zinc-100">Depo & Üretim</h1>
          <p className="text-zinc-500 mt-1">Hammadde ve üretim yönetimi</p>
        </div>

        <div className="bg-[#141414] rounded-xl border border-[#1f1f1f] mb-6">
          <div className="p-5 border-b border-[#1f1f1f]">
            <h2 className="text-lg font-medium text-zinc-100">Hammaddeler</h2>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {ingredients.map(item => (
                <div 
                  key={item.id}
                  className="bg-[#1a1a1a] rounded-xl p-4 border border-[#262626]
                    hover:border-[#333333] hover:bg-[#1f1f1f] transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-zinc-200 font-medium">{item.name}</span>
                  </div>
                  <div className="text-2xl font-medium text-zinc-100">
                    {storage[item.id]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#141414] rounded-xl border border-[#1f1f1f]">
          <div className="p-5 border-b border-[#1f1f1f]">
            <h2 className="text-lg font-medium text-zinc-100">Üretim</h2>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recipes.map(recipe => (
                <div 
                  key={recipe.id}
                  className="bg-[#1a1a1a] rounded-xl p-4 border border-[#262626]
                    hover:border-[#333333] hover:bg-[#1f1f1f] transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{recipe.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-zinc-200 font-medium mb-1">{recipe.name}</h3>
                      <p className="text-sm text-zinc-500">
                        {Object.entries(recipe.ingredients)
                          .map(([key, value]) => `${value} ${ingredients.find(i => i.id === key)?.name}`)
                          .join(', ')}
                      </p>
                    </div>
                    <button 
                      onClick={() => craftItem(recipe)}
                      className="px-4 py-2 bg-[#7c3aed] hover:bg-[#6d28d9] 
                        text-white rounded-lg transition-colors"
                    >
                      Üret
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 