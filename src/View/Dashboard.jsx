import { WaterEffect } from '../components/WaterEffect';
import { 
  TrendingUp, 
  Clock, 
  Package, 
  Map,
  Sprout,
  DollarSign,
  Calendar,
  Activity
} from 'lucide-react';

export function Dashboard() {
  // Örnek veriler (gerçek verilerle değiştirilecek)
  const stats = [
    {
      title: "Toplam Ada",
      value: "3",
      icon: <Map size={20} />,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Aktif Mahsul",
      value: "24",
      icon: <Sprout size={20} />,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Günlük Gelir",
      value: "1,234",
      icon: <DollarSign size={20} />,
      color: "from-yellow-500 to-yellow-600"
    },
    {
      title: "Depo Doluluk",
      value: "65%",
      icon: <Package size={20} />,
      color: "from-purple-500 to-purple-600"
    }
  ];

  const activities = [
    { text: "Ada #1'de buğday hasadı yapıldı", time: "5 dakika önce" },
    { text: "Yeni mahsul ekildi: Havuç", time: "15 dakika önce" },
    { text: "Ada #2'de sulama yapıldı", time: "1 saat önce" },
    { text: "Depoya 500 buğday eklendi", time: "2 saat önce" }
  ];

  const tasks = [
    { text: "Ada #3'te hasat zamanı", time: "2 saat kaldı" },
    { text: "Ada #1'de sulama gerekiyor", time: "5 saat kaldı" },
    { text: "Depo kapasitesi %90'a ulaştı", time: "Kritik" }
  ];

  return (
    <div className="min-h-screen bg-slate-900 pt-6 px-6 relative">
      <WaterEffect />
      
      <div className="relative z-10">
        {/* Başlık */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Kontrol Paneli</h1>
          <p className="text-gray-400">Çiftliğinizin genel durumu</p>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br ${stat.color} rounded-xl p-4
                shadow-lg hover:scale-105 transition-transform`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80">{stat.title}</span>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Alt Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Son Aktiviteler */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity size={20} className="text-blue-500" />
              <h2 className="text-lg font-medium text-white">Son Aktiviteler</h2>
            </div>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start justify-between gap-4">
                  <span className="text-gray-300">{activity.text}</span>
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Yaklaşan Görevler */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={20} className="text-yellow-500" />
              <h2 className="text-lg font-medium text-white">Yaklaşan Görevler</h2>
            </div>
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div key={index} className="flex items-start justify-between gap-4">
                  <span className="text-gray-300">{task.text}</span>
                  <span className="text-sm text-yellow-500 whitespace-nowrap">
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