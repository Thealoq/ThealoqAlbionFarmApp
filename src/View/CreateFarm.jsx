import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X } from 'lucide-react';
import { WaterEffect } from '../components/WaterEffect';

export function CreateFarm() {
  const navigate = useNavigate();
  const [farmName, setFarmName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    { 
      id: 1, 
      name: 'Boş Ada', 
      description: '16 boş tarla ile başlayın', 
      icon: '🏝️',
      fields: Array(16).fill(null)
    },
    { 
      id: 2, 
      name: 'Başlangıç Adası', 
      description: '4 ekili tarla ile başlayın', 
      icon: '🌾',
      fields: Array(16).fill(null).map((_, index) => index < 4 ? { type: 'wheat', plantedAt: new Date() } : null)
    },
    { 
      id: 3, 
      name: 'Premium Ada', 
      description: '8 ekili tarla ile başlayın', 
      icon: '⭐',
      fields: Array(16).fill(null).map((_, index) => index < 8 ? { type: 'carrot', plantedAt: new Date() } : null)
    },
  ];

  const handleCreate = () => {
    if (!farmName || !selectedTemplate) return;

    const savedIslands = JSON.parse(localStorage.getItem('islands') || '[]');
    const newId = savedIslands.length > 0 ? Math.max(...savedIslands.map(i => i.id)) + 1 : 1;
    
    const selectedTemplateData = templates.find(t => t.id === selectedTemplate);
    
    const newIsland = {
      id: newId,
      name: farmName,
      template: selectedTemplate,
      fields: selectedTemplateData.fields,
      createdAt: new Date().toISOString()
    };

    savedIslands.push(newIsland);
    localStorage.setItem('islands', JSON.stringify(savedIslands));
    navigate('/islands');
  };

  return (
    <div className="w-full min-h-screen bg-slate-800 pt-16 px-3 relative overflow-hidden">
      <WaterEffect />
      <div className="container mx-auto max-w-md relative z-10">
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-bold text-white">Yeni Ada Oluştur</h1>
            <button
              onClick={() => navigate('/islands')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* İsim Girişi */}
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1">Ada İsmi</label>
            <input
              type="text"
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 
                text-sm text-white focus:outline-none focus:border-yellow-500 transition-colors"
              placeholder="Adanızın ismini girin"
            />
          </div>

          {/* Şablonlar */}
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1">Ada Şablonu</label>
            <div className="grid grid-cols-1 gap-2">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all text-sm
                    ${selectedTemplate === template.id 
                      ? 'border-yellow-500 bg-yellow-500/10' 
                      : 'border-slate-700 hover:border-slate-600'}`}
                >
                  <span className="text-xl">{template.icon}</span>
                  <div className="text-left">
                    <h3 className="text-white font-medium">{template.name}</h3>
                    <p className="text-xs text-gray-400">{template.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Oluştur Butonu */}
          <button
            onClick={handleCreate}
            disabled={!farmName || !selectedTemplate}
            className={`w-full py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1.5
              ${farmName && selectedTemplate
                ? 'bg-yellow-500 hover:bg-yellow-400 text-slate-900'
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}
          >
            <Plus size={16} />
            Ada Oluştur
          </button>
        </div>
      </div>
    </div>
  );
} 