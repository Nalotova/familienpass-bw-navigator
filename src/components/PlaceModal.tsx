import React from 'react';
import { Place } from '../types';
import { X, MapPin, CloudSun, Ticket, ExternalLink, Globe, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { useAppStore } from '../store';
import { UI_TRANSLATIONS, translateType, getLocalizedCouponInfo, translateWeather } from '../translationsAndCoords';

interface PlaceModalProps {
  place: Place;
  isUsed: boolean;
  onToggleUsed: () => void;
  note: string;
  onSaveNote: (note: string) => void;
  onClose: () => void;
}

export function PlaceModal({ place, isUsed, onToggleUsed, note, onSaveNote, onClose }: PlaceModalProps) {
  const [localNote, setLocalNote] = React.useState(note);
  
  const { state } = useAppStore();
  const lang = state.language || 'ru';
  const t = UI_TRANSLATIONS[lang];

  React.useEffect(() => {
    setLocalNote(note);
  }, [note]);

  const handleSave = () => {
    onSaveNote(localNote);
  };

  const translatedType = translateType(place.type, lang).toUpperCase();
  const translatedCondition = place.couponType === 'free' ? t.freeLabel : place.couponType === 'discount' ? t.discountLabel : t.specialPriceLabel;

  const weatherValue = (() => {
    if (place.weather === 'indoor') return t.suitBadWeather;
    if (place.weather === 'outdoor') return t.suitDryWeather;
    return t.suitMixedWeather;
  })();

  return (
    <div id="place-detail-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6 bg-black/60 backdrop-blur-sm shadow-2xl animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="relative h-56 sm:h-72 bg-gray-100 shrink-0">
           {place.photoUrl ? (
            <img src={place.photoUrl} alt={place.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-slate-50">
              <ImageIcon className="w-12 h-12 mb-3 opacity-30" />
              <span className="text-base font-medium">{t.photoNotFound}</span>
            </div>
          )}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12">
            <div className="flex gap-2 mb-2">
              <span className="bg-white/20 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-xs font-medium border border-white/20">
                {translatedType}
              </span>
              {isUsed && (
                <span className="bg-black/60 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 uppercase tracking-wide">
                  <CheckCircle className="w-3 h-3" />
                  {t.usedTag}
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">{place.name}</h2>
            <div className="flex items-center text-white/80 text-sm mt-2">
              <MapPin className="w-4 h-4 mr-1.5" />
              {place.city}
            </div>
          </div>
        </div>

        <div className="overflow-y-auto p-6 flex flex-col gap-6">
          <p className="text-gray-700 text-[14px] leading-relaxed">
            {place.description}
          </p>

          <div className="bg-natural-50 rounded-2xl p-4 border border-natural-200">
            <h4 className="text-sm font-semibold text-natural-800 mb-2 flex items-center">
              <Ticket className="w-4 h-4 mr-2 text-natural-600" />
              {t.copuonCardDetails}
            </h4>
            <p className="text-sm text-natural-700 leading-relaxed mb-1">
              <span className="font-bold text-xs uppercase tracking-wider text-natural-700">{translatedCondition}</span>
            </p>
            <p className="text-xs text-natural-600 leading-relaxed whitespace-pre-wrap">
              {getLocalizedCouponInfo(place, lang)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100 flex flex-col items-center justify-center text-center">
              <CloudSun className="w-5 h-5 text-gray-400 mb-1" />
              <span className="text-xs font-bold text-gray-950 capitalize">{translateWeather(place.weather, lang)}</span>
              <span className="text-[9px] uppercase font-bold tracking-wider text-gray-400 mt-0.5">{t.weather}</span>
            </div>
            <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100 flex flex-col items-center justify-center text-center">
              <span className="text-lg font-extrabold text-gray-400 mb-0.5 leading-none">{place.goodForTeens ? '12+' : '0+'}</span>
              <span className="text-xs font-bold text-gray-950">{place.goodForTeens ? t.yes : t.no}</span>
              <span className="text-[9px] uppercase font-bold tracking-wider text-gray-400 mt-0.5">{t.teenagers}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-950">{t.notesLabel}</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={localNote}
                onChange={(e) => setLocalNote(e.target.value)}
                placeholder={t.notesPlaceholder}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-natural-500/20 focus:border-natural-500"
              />
              <button 
                onClick={handleSave}
                className="bg-natural-900 text-white px-5 rounded-xl text-xs font-bold hover:bg-natural-800 transition-colors"
              >
                {t.save}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-2 shrink-0">
            <button 
              onClick={onToggleUsed}
              className={`flex-1 flex justify-center items-center py-3.5 rounded-xl font-bold text-xs transition-all border ${
                isUsed 
                ? 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50' 
                : 'bg-natural-600 text-white border-natural-600 hover:bg-natural-700'
              }`}
            >
              {isUsed ? t.toggleUnusedBtn : t.toggleUsedBtn}
            </button>
            <div className="flex gap-3">
              <a 
                href={place.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 font-bold text-xs border border-gray-200 transition-colors"
                title={t.openWebsite}
              >
                <Globe className="w-4 h-4 text-gray-500" />
                {t.openWebsite}
              </a>
              <a 
                href={place.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 font-bold text-xs border border-gray-200 transition-colors"
                title="Google Maps"
              >
                <ExternalLink className="w-4 h-4 text-gray-500" />
                {t.mapBtn}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
