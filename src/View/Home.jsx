import React from 'react';
import { WaterEffect } from '../components/WaterEffect';
import { 
  ArrowRight,
  CheckCircle2,
  Sprout,
  DollarSign,
  Users,
  ChevronRight
} from 'lucide-react';

export function Home() {
  const features = [
    {
      icon: <Sprout className="text-[#7c3aed] w-6 h-6" />,
      title: "Kolay Çiftlik Yönetimi",
      description: "Adalarınızı ve mahsullerinizi tek bir yerden yönetin, veriminizi artırın."
    },
    {
      icon: <DollarSign className="text-[#7c3aed] w-6 h-6" />,
      title: "Gelir Takibi",
      description: "Günlük, haftalık ve aylık kazançlarınızı detaylı raporlarla analiz edin."
    },
    {
      icon: <Users className="text-[#7c3aed] w-6 h-6" />,
      title: "Topluluk Desteği",
      description: "Diğer çiftçilerle iletişim kurun, deneyimlerinizi paylaşın."
    }
  ];

  const benefits = [
    "7/24 Çiftlik takibi",
    "Detaylı istatistikler",
    "Otomatik hasat bildirimleri",
    "Hava durumu entegrasyonu",
    "Stok yönetimi",
    "Mobil uygulama desteği"
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <WaterEffect className="opacity-5" />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#7c3aed]/10 to-transparent">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Çiftliğinizi Dijital Dünyaya Taşıyın 🌾
            </h1>
            <p className="text-lg text-zinc-400 mb-8">
              Modern çiftlik yönetim sistemi ile mahsullerinizi takip edin, 
              veriminizi artırın ve kazancınızı maksimize edin.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button className="bg-[#7c3aed] text-white px-8 py-3 rounded-xl
                hover:bg-[#6d28d9] transition-colors">
                Hemen Başla
              </button>
              <button className="text-white px-8 py-3 rounded-xl border border-white/10
                hover:bg-white/5 transition-colors">
                Demo İzle
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Neden FarmFlow?
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Modern çiftçiliğin tüm ihtiyaçlarını karşılayan gelişmiş özellikleriyle
              işlerinizi kolaylaştırın.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-[#111] p-6 rounded-xl border border-white/5
                hover:border-[#7c3aed]/20 transition-all duration-300">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-medium text-white mb-2">{feature.title}</h3>
                <p className="text-zinc-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-[#111] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Çiftliğinizi Daha Verimli Yönetin
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="text-[#7c3aed] w-5 h-5" />
                    <span className="text-zinc-300">{benefit}</span>
                  </div>
                ))}
              </div>
              <button className="mt-8 flex items-center gap-2 text-[#7c3aed] hover:text-[#6d28d9]
                transition-colors">
                <span>Tüm özellikleri keşfet</span>
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="bg-[#0A0A0A] p-8 rounded-xl border border-white/5">
              {/* Placeholder for dashboard preview or screenshot */}
              <div className="aspect-video bg-[#1a1a1a] rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Hemen Şimdi Başlayın
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
            Çiftliğinizi dijital dünyaya taşımak için ilk adımı atın.
            14 gün ücretsiz deneme ile başlayın.
          </p>
          <button className="bg-[#7c3aed] text-white px-8 py-3 rounded-xl
            hover:bg-[#6d28d9] transition-colors inline-flex items-center gap-2">
            <span>Ücretsiz Dene</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

