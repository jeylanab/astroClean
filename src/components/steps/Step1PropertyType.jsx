import React from 'react';

// Importing assets
import detachedImg from '../../assets/detached.png';
import semiDetachedImg from '../../assets/semi-detached.png';
import terracedImg from '../../assets/terraced.png';
import townHouseImg from '../../assets/town-house.png';
import bungalowImg from '../../assets/bungalow.png';
import flatImg from '../../assets/flat.png';

const properties = [
  { id: 'detached', title: 'Detached', key: 'A', img: detachedImg },
  { id: 'semi-detached', title: 'Semi-Detached', key: 'B', img: semiDetachedImg },
  { id: 'terraced', title: 'Terraced', key: 'C', img: terracedImg },
  { id: 'town-house', title: 'Town House', key: 'D', img: townHouseImg },
  { id: 'bungalow', title: 'Bungalow', key: 'E', img: bungalowImg },
  { id: 'flat', title: 'Flat', key: 'F', img: flatImg },
];

const Step1PropertyType = ({ selected, onSelect, onNext }) => {
  return (
    <div className="w-full flex flex-col items-start animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Property Grid: Using a 4-column layout on large screens, matching the reference images */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-12">
        {properties.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className={`group flex flex-col items-start p-4 rounded-2xl border-2 transition-all duration-300
              ${selected?.id === item.id 
                ? 'border-black bg-black/5 shadow-lg' 
                : 'border-black/10 bg-black/5 hover:border-black/30'}`}
          >
            {/* Image Container: Clean, no white background, allows global BG to show through */}
            <div className="w-full aspect-video mb-4 flex items-center justify-center overflow-hidden">
              <img 
                src={item.img} 
                alt={item.title} 
                className={`w-full h-full object-contain transition-transform duration-500 
                  ${selected?.id === item.id ? 'scale-110' : 'group-hover:scale-105'}`} 
              />
            </div>

            {/* Label with Key Badge */}
            <div className="flex items-center gap-3">
              <span className={`w-7 h-7 flex items-center justify-center rounded-md font-black text-xs transition-all
                ${selected?.id === item.id 
                  ? 'bg-black text-[#FFD700]' 
                  : 'bg-black/10 text-white group-hover:bg-black/20'}`}>
                {item.key}
              </span>
              <span className="text-sm font-bold text-white/80 uppercase">
                {item.title}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Action Button: Only show if needed, otherwise selection can trigger auto-next in Quote.jsx */}
      {selected && (
        <button
          onClick={onNext}
          className="bg-black text-white font-black py-4 px-10 rounded-xl text-sm uppercase tracking-widest animate-in fade-in zoom-in-95 duration-300 hover:bg-slate-900 active:scale-95"
        >
          Continue
        </button>
      )}
    </div>
  );
};

export default Step1PropertyType;