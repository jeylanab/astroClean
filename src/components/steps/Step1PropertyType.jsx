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
    <div className="w-full max-w-6xl flex flex-col items-start animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      {/* Question Header - Consistent with Step 0 Branding */}
      <div className="flex items-center gap-3 mb-10">
        <span className="bg-[#002664] text-white w-7 h-7 flex items-center justify-center rounded-lg text-xs font-black">
          01
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          What type of property do you have?
        </h2>
      </div>

      {/* Property Grid - 4 Columns on desktop for "longer/wider" look */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-12">
        {properties.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className={`group flex flex-col items-start p-3 rounded-[2rem] border-2 transition-all duration-500 bg-white
              ${selected?.id === item.id 
                ? 'border-[#002664] shadow-2xl scale-[1.03] z-10' 
                : 'border-slate-100 hover:border-slate-200 shadow-sm'}`}
          >
            {/* Image Container */}
            <div className={`w-full aspect-square rounded-[1.5rem] mb-4 flex items-center justify-center overflow-hidden transition-colors duration-500
              ${selected?.id === item.id ? 'bg-blue-50/50' : 'bg-slate-50 group-hover:bg-slate-100'}`}>
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-110" 
              />
            </div>

            {/* Label with Key Badge */}
            <div className="flex items-center gap-3 px-3 pb-3">
              <span className={`w-6 h-6 flex items-center justify-center border rounded-md text-[10px] font-black transition-all
                ${selected?.id === item.id 
                  ? 'bg-[#002664] text-white border-[#002664]' 
                  : 'bg-white text-slate-300 border-slate-200 group-hover:border-slate-400'}`}>
                {item.key}
              </span>
              <span className={`text-sm font-bold uppercase tracking-widest ${selected?.id === item.id ? 'text-[#002664]' : 'text-slate-500'}`}>
                {item.title}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Primary Action Button - Matching Step 0 */}
      <button
        onClick={onNext}
        disabled={!selected}
        className={`group flex items-center gap-3 font-bold py-4 px-12 rounded-2xl text-xl transition-all active:scale-95 shadow-xl
          ${selected 
            ? 'bg-[#002664] text-white hover:bg-slate-900' 
            : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-50'}`}
      >
        Continue
        <svg className={`w-5 h-5 transition-transform ${selected ? 'group-hover:translate-x-1' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>

    </div>
  );
};

export default Step1PropertyType;