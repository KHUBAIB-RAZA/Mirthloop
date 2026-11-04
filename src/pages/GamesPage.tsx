import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { gamesCatalog } from '../config/site';
import { AdUnit } from '../components/ads/AdUnit';
import { Search, Play, Filter, Star, Sparkles, Tag } from 'lucide-react';

export const GamesPage: React.FC = () => {
  useDocumentTitle({
    title: 'Arcade Games Catalogue',
    description: 'Explore the full games library on Mirthloop. Play original, lightweight web games built for speed and responsive fun.',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Arcade Survival', 'Retro', 'Action', 'Fast-Paced'];

  // Filter architecture ready for future titles while keeping V1 completely honest
  const filteredGames = gamesCatalog.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || game.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Web Arcade</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Arcade Games Library
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Browse our hand-crafted, high-performance web games. Every title is tested for zero-delay controls, touch responsiveness, and zero bloated downloads.
        </p>
      </div>

      {/* Search and Category Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#121729] border border-[#232C4F]">
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search games or tags..."
            className="w-full bg-[#0A0D18] border border-[#232C4F] focus:border-cyan-500 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-glow-button'
                  : 'bg-[#0A0D18] text-slate-400 hover:text-white border border-[#232C4F]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.map((game) => (
            <article
              key={game.id}
              className="arcade-glow-card rounded-3xl p-6 border border-[#232C4F] flex flex-col justify-between group hover:border-purple-500/50 transition-all duration-300"
            >
              <div>
                {/* Visual Thumbnail Banner */}
                <div className="relative w-full aspect-video rounded-2xl bg-gradient-to-tr from-[#090D1A] to-[#161D36] border border-[#232C4F] flex items-center justify-center overflow-hidden mb-5 group-hover:scale-[1.02] transition-transform duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 p-0.5 shadow-glow-purple">
                    <div className="w-full h-full bg-[#0A0D18] rounded-[14px] flex items-center justify-center">
                      <Play className="w-6 h-6 text-cyan-400 fill-cyan-400" />
                    </div>
                  </div>
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live V1
                  </span>
                </div>

                {/* Game Title & Category */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1">
                    <Tag className="w-3 h-3" />
                    <span>{game.category}</span>
                  </span>
                  <span className="flex items-center space-x-1 text-xs text-amber-400 font-mono">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{game.ratingScore}</span>
                  </span>
                </div>

                <h2 className="text-2xl font-black text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {game.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed mb-4">
                  {game.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#232C4F] flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400">Pure Canvas 60FPS</span>
                <Link
                  to={`/games/${game.slug}`}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-glow-button flex items-center space-x-1.5 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Play Now</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 p-8 rounded-3xl bg-[#121729] border border-[#232C4F] max-w-md mx-auto space-y-3">
          <p className="text-base font-bold text-white">No games match &quot;{searchQuery}&quot;</p>
          <p className="text-xs text-slate-400">
            Try adjusting your search keywords or resetting the category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 text-white"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Catalog Ad Placement */}
      <div className="pt-8">
        <AdUnit format="leaderboard" label="Sponsored Arcade Partner" />
      </div>
    </div>
  );
};
