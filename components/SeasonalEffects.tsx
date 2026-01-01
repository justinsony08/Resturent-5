import React, { useEffect, useState } from 'react';
import { Moon, Star, Snowflake, Heart, Flame, Egg } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

const SeasonalEffects: React.FC = () => {
  const { seasonalMode } = useRestaurant();
  const [particles, setParticles] = useState<any[]>([]);

  // CSS for atmospheric animations
  const styles = `
    @keyframes mistMove {
      from { background-position: 0 0; }
      to { background-position: 100% 0; }
    }
    @keyframes sunSweep {
      0% { transform: translateX(-100%) rotate(30deg); opacity: 0; }
      20% { opacity: 1; }
      80% { opacity: 1; }
      100% { transform: translateX(100%) rotate(30deg); opacity: 0; }
    }
    @keyframes heartFloat {
      0% { transform: translateY(100vh) scale(0.5); opacity: 0; }
      20% { opacity: 0.6; }
      80% { opacity: 0.6; }
      100% { transform: translateY(-100px) scale(1); opacity: 0; }
    }
    @keyframes diyaGlow {
      0% { box-shadow: inset 0 0 20px rgba(255, 165, 0, 0.1); }
      50% { box-shadow: inset 0 0 60px rgba(255, 140, 0, 0.3); }
      100% { box-shadow: inset 0 0 20px rgba(255, 165, 0, 0.1); }
    }
    @keyframes franceSweep {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;

  useEffect(() => {
    // Determine number and type of particles based on mode
    let particleCount = 0;
    
    if (seasonalMode === 'christmas') particleCount = 40;
    if (seasonalMode === 'newyear') particleCount = 30;
    if (seasonalMode === 'eid') particleCount = 15;
    if (seasonalMode === 'valentine') particleCount = 20;
    if (seasonalMode === 'diwali') particleCount = 15;
    if (seasonalMode === 'easter') particleCount = 20;

    if (particleCount === 0) {
        setParticles([]);
        return;
    }

    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // Random horizontal position %
      delay: Math.random() * 20, // Random delay
      duration: 15 + Math.random() * 15, // Random duration
      size: Math.random() * 1.5 + 0.5, // Random scale
      opacity: Math.random() * 0.5 + 0.2, // Random opacity
      type: seasonalMode === 'eid' && Math.random() > 0.7 ? 'moon' : 'dot',
      colorVar: Math.floor(Math.random() * 4), // 0-3 for easter colors
    }));
    setParticles(newParticles);
  }, [seasonalMode]);

  if (seasonalMode === 'none') return null;

  return (
    <>
      <style>{styles}</style>
      <div className="fixed inset-0 pointer-events-none z-[40] overflow-hidden">
          
          {/* ================= ATMOSPHERIC OVERLAYS ================= */}

          {/* WINTER / CHRISTMAS: Cold Mist Overlay */}
          {(seasonalMode === 'christmas') && (
            <div 
              className="absolute inset-0 z-[-1]"
              style={{
                background: 'radial-gradient(circle, transparent 50%, rgba(200, 220, 255, 0.05) 100%)',
                animation: 'mistMove 60s linear infinite',
              }}
            />
          )}

          {/* SUMMER: Sun Sweep */}
          {seasonalMode === 'summer' && (
             <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-yellow-200/5 mix-blend-screen">
                <div 
                  className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  style={{ animation: 'sunSweep 15s ease-in-out infinite' }}
                />
             </div>
          )}

          {/* EID: Green Glow */}
          {seasonalMode === 'eid' && (
             <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(16,185,129,0.15)]" />
          )}

          {/* DIWALI: Warm Pulsing Glow */}
          {seasonalMode === 'diwali' && (
             <div className="absolute inset-0" style={{ animation: 'diyaGlow 4s ease-in-out infinite' }} />
          )}

          {/* FRANCE: Patriotic Gradient */}
          {seasonalMode === 'france' && (
             <div 
                className="absolute inset-0 opacity-20"
                style={{
                  background: 'linear-gradient(90deg, rgba(0,0,255,0.1), rgba(255,255,255,0.05), rgba(255,0,0,0.1))',
                  backgroundSize: '200% 200%',
                  animation: 'franceSweep 10s ease infinite'
                }}
             />
          )}

           {/* VALENTINE: Pink Tint */}
           {seasonalMode === 'valentine' && (
             <div className="absolute inset-0 bg-pink-500/5 mix-blend-overlay" />
          )}

           {/* EASTER: Pastel Gradient Overlay */}
           {seasonalMode === 'easter' && (
             <div className="absolute inset-0 bg-gradient-to-tr from-pink-200/5 via-yellow-200/5 to-blue-200/5 mix-blend-overlay" />
          )}

          {/* ================= PARTICLE SYSTEMS ================= */}

          {/* CHRISTMAS: Falling Snow */}
          {seasonalMode === 'christmas' && particles.map((p) => (
            <div
              key={p.id}
              className="absolute top-0 text-white/60"
              style={{
                left: `${p.left}%`,
                animation: `snowfall ${p.duration}s linear infinite`,
                animationDelay: `-${p.delay}s`,
                opacity: p.opacity,
                transform: `scale(${p.size})`,
              }}
            >
               {p.size > 1.2 ? <Snowflake size={12} /> : <div className="rounded-full bg-white w-2 h-2 blur-[1px]" />}
            </div>
          ))}

          {/* NEW YEAR: Bubbles/Confetti */}
          {seasonalMode === 'newyear' && particles.map((p) => (
            <div
              key={p.id}
              className="absolute bottom-0 rounded-full bg-gradient-to-tr from-gold-600 to-gold-300 shadow-[0_0_5px_gold]"
              style={{
                left: `${p.left}%`,
                width: `${p.size * 6}px`,
                height: `${p.size * 6}px`,
                animation: `rise ${p.duration}s linear infinite`,
                animationDelay: `-${p.delay}s`,
                opacity: p.opacity,
              }}
            />
          ))}

          {/* VALENTINE: Floating Hearts */}
          {seasonalMode === 'valentine' && particles.map((p) => (
            <div
              key={p.id}
              className="absolute bottom-0 text-pink-500"
              style={{
                left: `${p.left}%`,
                animation: `heartFloat ${p.duration}s linear infinite`,
                animationDelay: `-${p.delay}s`,
                opacity: p.opacity,
                transform: `scale(${p.size})`,
              }}
            >
               <Heart fill="currentColor" size={20 * p.size} />
            </div>
          ))}

          {/* EID: Floating Crescents/Stars */}
          {seasonalMode === 'eid' && particles.map((p) => (
            <div
              key={p.id}
              className="absolute text-gold-500"
              style={{
                left: `${p.left}%`,
                top: `${Math.random() * 80 + 10}%`, 
                animation: `float ${p.duration * 0.5}s ease-in-out infinite`,
                animationDelay: `-${p.delay}s`,
                opacity: p.opacity,
                transform: `scale(${p.size})`,
              }}
            >
              {p.type === 'moon' ? <Moon size={24} fill="currentColor" className="opacity-80" /> : <Star size={12} fill="currentColor" className="opacity-60" />}
            </div>
          ))}

           {/* DIWALI: Sparkles/Flames */}
           {seasonalMode === 'diwali' && particles.map((p) => (
            <div
              key={p.id}
              className="absolute text-orange-500"
              style={{
                left: `${p.left}%`,
                top: `${Math.random() * 90}%`, 
                animation: `float ${p.duration * 0.2}s ease-in-out infinite`,
                animationDelay: `-${p.delay}s`,
                opacity: p.opacity,
              }}
            >
              <Flame size={10} fill="currentColor" className="blur-[1px]" />
            </div>
          ))}
          
           {/* EASTER: Floating Eggs */}
           {seasonalMode === 'easter' && particles.map((p) => {
             const pastelColors = ['text-pink-300', 'text-blue-300', 'text-yellow-300', 'text-green-300'];
             return (
              <div
                key={p.id}
                className={`absolute bottom-0 ${pastelColors[p.colorVar]}`}
                style={{
                  left: `${p.left}%`,
                  animation: `heartFloat ${p.duration}s linear infinite`,
                  animationDelay: `-${p.delay}s`,
                  opacity: p.opacity,
                  transform: `scale(${p.size})`,
                }}
              >
                 <Egg fill="currentColor" size={20 * p.size} />
              </div>
             );
           })}

      </div>
    </>
  );
};

export default SeasonalEffects;