import { useState, useMemo } from 'react';
import { PLACES } from './data';
import { useAppStore } from './store';
import { PlaceCard } from './components/PlaceCard';
import { PlaceModal } from './components/PlaceModal';
import { FiltersPanel } from './components/FiltersPanel';
import { CouponsTab } from './components/CouponsTab';
import { IdeasTab } from './components/IdeasTab';
import { Place } from './types';
import { Footer } from './components/Footer';
import { 
  PLACE_TRANSLATIONS, 
  UI_TRANSLATIONS,
  Language 
} from './translationsAndCoords';
import { Map, Ticket, Lightbulb, Filter, Search } from 'lucide-react';

export default function App() {
  const { 
    state, 
    togglePlace, 
    setNote, 
    setLanguage
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'catalog' | 'coupons' | 'ideas'>('catalog');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  
  // Filters state
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    couponType: 'all',
    badWeather: false,
    teens: false
  });
  const [sort, setSort] = useState('city');

  const lang = state.language || 'ru';
  const t = UI_TRANSLATIONS[lang];

  // Derive dynamic list of sights with coordinates, travel times, and translations
  const placesWithCoordsAndTranslations = useMemo(() => {
    return PLACES.map(p => {
      // Live Translation lookup
      let name = p.name;
      let city = p.city;
      let description = p.description;

      if (lang !== 'ru') {
        const translated = PLACE_TRANSLATIONS[p.id]?.[lang];
        if (translated) {
          name = translated.name || p.name;
          city = translated.city || p.city;
          description = translated.description || p.description;
        }
      }

      const searchQueryString = p.queryName || `${p.name}, ${p.city}, Baden-Württemberg, Germany`;
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQueryString)}`;
      let website = p.website;

      return {
        ...p,
        name,
        city,
        description,
        googleMapsUrl,
        website
      };
    });
  }, [lang]);

  // Apply filters and sort on the dynamically computed places
  const filteredPlaces = useMemo(() => {
    let result = [...placesWithCoordsAndTranslations];

    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.city.toLowerCase().includes(q));
    }

    // Type of site
    if (filters.type !== 'all') {
      result = result.filter(p => p.type === filters.type);
    }

    // Used / Unused state
    if (filters.status !== 'all') {
      const isUsed = filters.status === 'used';
      result = result.filter(p => state.usedPlaces.includes(p.id) === isUsed);
    }

    // Free / Promo conditions
    if (filters.couponType !== 'all') {
      result = result.filter(p => p.couponType === filters.couponType);
    }

    // Indoor/Outdoor weathering suitability selection
    if (filters.badWeather) {
      result = result.filter(p => p.weather === 'indoor' || p.weather === 'mixed');
    }
    if (filters.teens) {
      result = result.filter(p => p.goodForTeens);
    }

    // Sort order mapping
    result.sort((a, b) => {
      switch (sort) {
        case 'city': return a.city.localeCompare(b.city);
        case 'type': return a.type.localeCompare(b.type);
        case 'unused': return (state.usedPlaces.includes(a.id) ? 1 : 0) - (state.usedPlaces.includes(b.id) ? 1 : 0);
        case 'free': return (a.couponType === 'free' ? -1 : 1) - (b.couponType === 'free' ? -1 : 1);
        default: return 0;
      }
    });

    return result;
  }, [placesWithCoordsAndTranslations, filters, sort, state.usedPlaces, searchQuery]);

  return (
    <div className="min-h-screen bg-bg-surface flex flex-col font-sans text-natural-900 select-none pb-8">
      {/* Header */}
      <header className="bg-white border-b border-border-subtle sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row py-3 sm:py-4 justify-between sm:items-center gap-3 sm:gap-4">
            
            {/* Title Block */}
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <div className="bg-natural-600 rounded-xl p-2.5 text-white shadow-sm flex-shrink-0">
                <Map className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h1 className="text-sm sm:text-base md:text-lg font-black text-gray-950 tracking-tight leading-tight truncate">
                  {t.appTitle}
                </h1>
              </div>
            </div>

            {/* Quick Actions & Settings */}
            <div className="flex items-center justify-between sm:justify-end gap-2 pr-0.5 w-full sm:w-auto">
              
              {/* Language Selector in Header */}
              <div className="flex bg-natural-50 p-1 rounded-xl border border-border-subtle language-switcher flex-shrink-0">
                {(['ru', 'de', 'en'] as Language[]).map((langCode) => (
                  <button
                    key={langCode}
                    onClick={() => setLanguage(langCode)}
                    className={`text-[11px] font-black w-10 sm:w-9 h-7 flex items-center justify-center rounded-lg uppercase transition-all cursor-pointer ${
                      lang === langCode
                        ? 'bg-natural-600 text-white shadow-sm'
                        : 'text-natural-500 hover:text-natural-800'
                    }`}
                  >
                    {langCode}
                  </button>
                ))}
              </div>

            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex flex-row flex-nowrap space-x-1 sm:space-x-4 border-t border-gray-100 overflow-x-auto no-scrollbar pt-1 pb-0.5">
            <button 
              onClick={() => setActiveTab('catalog')}
              className={`flex rounded-t-lg py-3 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'catalog' 
                  ? 'border-natural-600 text-natural-600 font-extrabold' 
                  : 'border-transparent text-gray-400 hover:text-natural-700 hover:border-border-subtle'
              }`}
            >
              <Map className="w-4 h-4 mr-2" />
              {t.catalogTab}
            </button>
            <button 
              onClick={() => setActiveTab('coupons')}
              className={`flex rounded-t-lg py-3 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'coupons' 
                  ? 'border-natural-600 text-natural-600 font-extrabold' 
                  : 'border-transparent text-gray-400 hover:text-natural-700 hover:border-border-subtle'
              }`}
            >
              <Ticket className="w-4 h-4 mr-2" />
              {t.couponsTab}
            </button>
            <button 
              onClick={() => setActiveTab('ideas')}
              className={`flex rounded-t-lg py-3 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'ideas' 
                  ? 'border-natural-600 text-natural-600 font-extrabold' 
                  : 'border-transparent text-gray-400 hover:text-natural-700 hover:border-border-subtle'
              }`}
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              {t.ideasTab}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {activeTab === 'catalog' && (
          <div className="animate-in fade-in duration-300">
            
            {/* Search Input and Filter trigger */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Search className="h-4.5 w-4.5 text-natural-400" />
                </div>
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-border-subtle rounded-xl text-xs sm:text-sm bg-white placeholder-natural-400 focus:outline-none focus:ring-2 focus:ring-natural-600 focus:border-natural-600 shadow-sm"
                />
              </div>
              
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex justify-center items-center px-6 py-3 border rounded-xl text-xs font-black whitespace-nowrap transition-all shadow-sm ${
                  showFilters 
                    ? 'bg-natural-50 border-natural-300 text-natural-800' 
                    : 'bg-white border-border-subtle text-natural-700 hover:bg-natural-50 hover:border-natural-400'
                }`}
              >
                <Filter className="w-4 h-4 mr-2 text-natural-500" />
                {t.filtersBtn} {
                  filters.type !== 'all' || 
                  filters.status !== 'all' || 
                  filters.couponType !== 'all' || 
                  filters.badWeather || 
                  filters.teens ? t.filtersActive : ''
                }
              </button>
            </div>

            {/* Collapsible Filter Panel */}
            <FiltersPanel 
              show={showFilters} 
              onClose={() => setShowFilters(false)}
              filters={filters}
              setFilters={setFilters}
              sort={sort}
              setSort={setSort}
            />

            {/* Found list count banner */}
            <div className="mb-4 text-xs font-bold text-natural-400 uppercase tracking-wider text-center sm:text-left">
              {t.resultsFound}: <span className="text-natural-700">{filteredPlaces.length}</span>
            </div>

            {/* Sights Output Grid */}
            {filteredPlaces.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-border-subtle shadow-sm">
                <div className="mx-auto w-16 h-16 bg-natural-50 rounded-2xl flex items-center justify-center mb-4 border border-natural-100">
                    <Search className="w-8 h-8 text-natural-300" />
                </div>
                <h3 className="text-base font-extrabold text-natural-900 mb-1">{t.noResults}</h3>
                <p className="text-xs text-natural-400 leading-relaxed max-w-xs mx-auto">{t.noResultsSub}</p>
                <button 
                  onClick={() => {
                    setFilters({ type: 'all', status: 'all', couponType: 'all', badWeather: false, teens: false });
                    setSearchQuery('');
                  }}
                  className="mt-6 text-xs font-black text-natural-600 hover:text-natural-700 border-b border-natural-600"
                >
                  {t.resetFilters}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredPlaces.map(place => (
                  <PlaceCard 
                    key={place.id}
                    place={place}
                    isUsed={state.usedPlaces.includes(place.id)}
                    onToggleUsed={() => togglePlace(place.id)}
                    onClick={() => setSelectedPlace(place)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'coupons' && <CouponsTab />}
        
        {activeTab === 'ideas' && (
          <IdeasTab 
            onOpenPlace={setSelectedPlace} 
            placesWithCoords={placesWithCoordsAndTranslations} // Propagate translated sights list
          />
        )}
      </main>

      <Footer lang={lang} />

      {/* Sights Detail Modal */}
      {selectedPlace && (
        <PlaceModal 
          // Find target item from computed coordinates lists to match dynamic values in detail view
          place={placesWithCoordsAndTranslations.find(p => p.id === selectedPlace.id) || selectedPlace}
          isUsed={state.usedPlaces.includes(selectedPlace.id)}
          onToggleUsed={() => togglePlace(selectedPlace.id)}
          note={state.notes[selectedPlace.id] || ''}
          onSaveNote={(note) => setNote(selectedPlace.id, note)}
          onClose={() => setSelectedPlace(null)}
        />
      )}

    </div>
  );
}
