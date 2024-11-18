import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [licenseKey, setLicenseKey] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (licenseKey.toUpperCase() === 'X') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('licenseKey', licenseKey);
      navigate('/islands');
      setError('');
    } else {
      setError('Geçersiz lisans anahtarı!');
    }
  };

  return (
    <div className="w-full h-screen bg-slate-800 flex items-center justify-center">
      <div className="w-full h-full bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center">
        <div className="w-full max-w-md px-8">
          <h1 className="text-2xl font-bold text-white mb-2 text-center">Farm Planner</h1>
          <p className="text-white/60 text-center mb-8">Devam etmek için lisans anahtarınızı girin</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                placeholder="Lisans Anahtarı"
                className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white 
                  focus:outline-none focus:border-yellow-400 text-center uppercase tracking-wider"
              />
            </div>
            
            {error && (
              <div className="text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-900 
                font-medium rounded transition-colors duration-200"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 