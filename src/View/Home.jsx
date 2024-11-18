import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Sprout, Timer, ArrowRight, BookOpen } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-slate-800 pt-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-3">
            Farm Planner'a Hoş Geldiniz
          </h1>
          <p className="text-lg text-white/60 mb-6">
            Adalarınızı yönetin, mahsullerinizi planlayın ve çiftliğinizi geliştirin
          </p>
          <button
            onClick={() => navigate('/islands')}
            className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-6 py-3 
              rounded-lg font-medium transition-colors inline-flex items-center gap-2"
          >
            Adalarıma Git
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Özellikler */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-5 text-center">
            <div className="bg-yellow-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Map className="text-yellow-400" size={24} />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Çoklu Ada Sistemi</h2>
            <p className="text-sm text-white/60">
              Her biri 16 tarlaya sahip adalarınızı ayrı ayrı yönetin
            </p>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-5 text-center">
            <div className="bg-yellow-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sprout className="text-yellow-400" size={24} />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Çeşitli Mahsuller</h2>
            <p className="text-sm text-white/60">
              4 farklı mahsul türü ile çiftliğinizi çeşitlendirin
            </p>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-5 text-center">
            <div className="bg-yellow-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Timer className="text-yellow-400" size={24} />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Verimli Planlama</h2>
            <p className="text-sm text-white/60">
              Mahsul büyüme sürelerini takip edin ve planlamanızı yapın
            </p>
          </div>
        </div>

        {/* Nasıl Çalışır */}
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-6 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="text-yellow-400" size={20} />
            <h2 className="text-xl font-bold text-white">Nasıl Çalışır?</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-slate-900 font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Ada Seçimi</h3>
                <p className="text-sm text-white/60">Yönetmek istediğiniz adayı seçin veya yeni bir ada ekleyin</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-slate-900 font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Tarla Seçimi</h3>
                <p className="text-sm text-white/60">16 tarladan birini seçerek ekim yapmaya başlayın</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-slate-900 font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Mahsul Ekimi</h3>
                <p className="text-sm text-white/60">4 farklı mahsul arasından seçim yapın ve ekiminizi gerçekleştirin</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => navigate('/islands')}
            className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-3 
              rounded-lg font-medium transition-colors"
          >
            Hemen Başla
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;