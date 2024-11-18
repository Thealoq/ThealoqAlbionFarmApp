import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import { WaterEffect } from '../components/WaterEffect';

export function NotFound() {
  return (
    <div className="w-full min-h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden">
      <WaterEffect />
      
      <div className="relative z-10 text-center px-4">
        <div className="flex items-center justify-center mb-6 text-yellow-500">
          <AlertTriangle size={64} />
        </div>

        <h1 className="text-4xl font-bold text-white mb-2">
          404
        </h1>
        
        <h2 className="text-xl font-medium text-white/90 mb-4">
          Sayfa Bulunamadı
        </h2>
        
        <p className="text-slate-400 text-sm max-w-md mx-auto mb-8">
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir. 
          Ana sayfaya dönüp tekrar deneyebilirsiniz.
        </p>

        <Link 
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 
            bg-yellow-500 hover:bg-yellow-400 
            text-slate-900 text-sm font-medium rounded-lg
            transition-colors duration-200"
        >
          <Home size={16} />
          Ana Sayfaya Dön
        </Link>

        {/* Dekoratif Elementler */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          w-[300px] h-[300px] bg-slate-500/5 rounded-full blur-2xl -z-10" />
      </div>
    </div>
  );
} 