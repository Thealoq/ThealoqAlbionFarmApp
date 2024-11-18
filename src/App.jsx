import React from 'react';
import { Compass } from 'lucide-react';
import { WaterEffect } from './components/WaterEffect';
import { IslandSection } from './components/IslandSection';
import { FieldSection } from './components/FieldSection';

function App() {
  return (
    <div className="min-h-screen bg-slate-800 flex items-center justify-center p-8">
      <div className="relative w-[600px] h-[500px]">
        <div className="absolute inset-0 bg-[#2C7BBF]">
          <WaterEffect />
          
          {/* Ana ada - düzgün ve büyük */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%]">
            <svg viewBox="0 0 120 100" className="absolute inset-0 w-full h-full">
            <path
    d="M30,30 
       C40,10 80,10 90,30
       C100,50 90,70 70,70
       C50,70 40,50 30,30"
    className="fill-[#deb887]"
  />

              <path
                d="M15,50
                   C20,40 30,40 35,45
                   C40,50 35,55 30,60
                   C25,65 20,65 15,60
                   C10,55 10,50 15,50"
                className="fill-[#deb887]"
              />

              <path
                d="M90,50
                   C95,40 105,40 110,45
                   C115,50 110,55 105,60
                   C100,65 95,65 90,60
                   C85,55 85,50 90,50"
                className="fill-[#deb887]"
              />
            </svg>
          </div>

          {/* Tarla yerleşimi */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%]">
            {/* Ana ada tarlası */}
            <FieldSection 
              className="left-[45%] top-[40%] w-[30%] h-[30%]" 
              fieldCount={10} 
            />
            
            {/* Sol ada tarlası */}
            <FieldSection 
              className="left-[10%] top-[50%] w-[20%] h-[20%]" 
              fieldCount={4} 
            />
            
            {/* Sağ ada tarlası */}
            <FieldSection 
              className="left-[80%] top-[50%] w-[20%] h-[20%]" 
              fieldCount={4} 
            />
          </div>

          {/* Pusula */}
          <div className="absolute bottom-6 right-6 text-white">
            <Compass size={48} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;