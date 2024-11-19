import React from 'react';
import { WaterEffect } from '../components/WaterEffect';
import { 
  Map,
  Sprout,
  DollarSign,
  Package,
  TrendingUp,
  AlertCircle,
  Plus,
  Search,
 
} from 'lucide-react';

export function Dashboard() {
  const stats = [
    {
      title: "Toplam Ada",
      value: "3",
      change: "+1 bu ay",
      icon: <Map size={20} />,
      trend: "up"
    },
    {
      title: "Aktif Mahsul",
      value: "24", 
      change: "+6 bu hafta",
      icon: <Sprout size={20} />,
      trend: "up"
    },
    {
      title: "Günlük Gelir",
      value: "1,234₺",
      change: "+12% artış",
      icon: <DollarSign size={20} />,
      trend: "up"
    },
    {
      title: "Depo Doluluk",
      value: "65%",
      change: "Kritik seviye",
      icon: <Package size={20} />,
      trend: "warning"
    }
  ];

  const activities = [
    { 
      text: "Ada #1'de buğday hasadı yapıldı",
      time: "5 dakika önce",
      amount: "+500 Buğday",
      type: "success"
    },
    { 
      text: "Yeni mahsul ekildi: Havuç",
      time: "15 dakika önce",
      amount: "-200 Tohum",
      type: "danger"
    },
    { 
      text: "Ada #2'de sulama yapıldı",
      time: "1 saat önce",
      type: "info"
    }
  ];

  const tasks = [
    {
      text: "Ada #1'de hasat zamanı yaklaşıyor",
      time: "2 saat kaldı",
      status: "normal"
    },
    {
      text: "Ada #3'te sulama gerekiyor",
      time: "Kritik",
      status: "critical"
    },
    {
      text: "Depo kapasitesi %85'e ulaştı",
      time: "Uyarı",
      status: "warning"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex justify-center items-center">
      <WaterEffect className="opacity-5" />
      <div className="w-full max-w-6xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              Hoş Geldin, Çiftçi 👋
            </h1>
            <p className="text-zinc-500 text-sm">
              İşte çiftliğinin bugünkü durumu
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                type="text"
                placeholder="Ara..."
                className="bg-[#111] text-zinc-400 text-xs rounded-lg pl-8 pr-4 py-2
                  border border-white/5 focus:outline-none focus:border-[#7c3aed]"
              />
              <Search size={14} className="absolute left-3 top-2.5 text-zinc-500" />
            </div>
            <button className="flex items-center gap-2 bg-[#7c3aed] text-white px-4 py-2 rounded-lg
              hover:bg-[#6d28d9] transition-colors">
              <Plus size={18} />
              <span>Yeni Ada</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-[#111] rounded-xl p-4 border border-white/5 hover:border-[#7c3aed]/20 
                transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-[#7c3aed]/10 rounded-lg">
                  {React.cloneElement(stat.icon, { 
                    className: "text-[#7c3aed]"
                  })}
                </div>
                {stat.trend === "up" ? (
                  <div className="text-emerald-500 text-xs">
                    <TrendingUp size={14} />
                  </div>
                ) : (
                  <div className="text-amber-500 text-xs">
                    <AlertCircle size={14} />
                  </div>
                )}
              </div>
              <h3 className="text-zinc-400 text-xs mb-1">{stat.title}</h3>
              <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
              <p className="text-xs text-zinc-500">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Activities */}
          <div className="bg-[#111] rounded-xl border border-white/5">
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <h2 className="text-sm font-medium text-white">Son Aktiviteler</h2>
              <button className="text-xs text-[#7c3aed] hover:text-[#6d28d9] transition-colors">
                Tümünü Gör
              </button>
            </div>
            <div className="p-4 space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start justify-between group">
                  <div className="flex items-start gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full mt-2 ${
                      activity.type === 'success' ? 'bg-emerald-500' :
                      activity.type === 'danger' ? 'bg-red-500' : 'bg-[#7c3aed]'
                    }`} />
                    <div>
                      <p className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                        {activity.text}
                      </p>
                      <span className="text-xs text-zinc-500">{activity.time}</span>
                    </div>
                  </div>
                  {activity.amount && (
                    <span className={`text-xs font-medium ${
                      activity.amount.startsWith('+') 
                        ? 'text-emerald-500' 
                        : 'text-red-500'
                    }`}>
                      {activity.amount}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div className="bg-[#111] rounded-xl border border-white/5">
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <h2 className="text-sm font-medium text-white">Yaklaşan Görevler</h2>
              <select className="bg-[#1a1a1a] text-xs text-zinc-400 rounded-lg px-2 py-1
                border border-white/5 focus:outline-none focus:border-[#7c3aed]">
                <option>Bugün</option>
                <option>Bu Hafta</option>
              </select>
            </div>
            <div className="p-4 space-y-3">
              {tasks.map((task, index) => (
                <div key={index} 
                  className="flex items-center justify-between p-3 rounded-lg
                    bg-[#1a1a1a] border border-white/5 hover:border-[#7c3aed]/20
                    transition-all duration-300 group"
                >
                  <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                    {task.text}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    task.status === 'critical' 
                      ? 'bg-red-500/10 text-red-500' 
                      : task.status === 'warning'
                      ? 'bg-amber-500/10 text-amber-500'
                      : 'bg-[#7c3aed]/10 text-[#7c3aed]'
                  }`}>
                    {task.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 