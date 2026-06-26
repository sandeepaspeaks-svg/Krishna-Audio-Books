import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Headphones, Clock, BookOpen, ExternalLink, HelpCircle } from 'lucide-react';
import { Audiobook, AudiobookTrack } from '../types';
import { ElegantFlourish } from './DecorativeDividers';

interface BookDetailModalProps {
  book: Audiobook | null;
  isOpen: boolean;
  onClose: () => void;
  activeTrack: AudiobookTrack | null;
  onPlayTrack: (track: AudiobookTrack, book: Audiobook) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  isOpen,
  onClose,
  activeTrack,
  onPlayTrack
}) => {
  if (!book || !isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-devotional-blue-dark/85 backdrop-blur-sm"
          id="modal-backdrop"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ scale: 0.93, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.93, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-4xl bg-parchment-light rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(20,34,48,0.4)] border-2 border-gold-base/55 z-10 flex flex-col max-h-[90vh]"
          id="book-detail-modal"
        >
          {/* Top Gold Border strip */}
          <div className="h-1.5 bg-gradient-to-r from-gold-dark via-gold-base to-gold-dark"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-devotional-blue/10 hover:bg-devotional-blue/20 text-devotional-blue flex items-center justify-center transition focus:outline-none focus:ring-2 focus:ring-gold-base cursor-pointer"
            aria-label="Close details"
            id="btn-close-modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal scrollable body */}
          <div className="overflow-y-auto p-5 md:p-8 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
              
              {/* Left Column: Cover & Quick Stats */}
              <div className="md:col-span-4 flex flex-col items-center">
                
                {/* Simulated Book Cover */}
                <div className={`w-44 h-64 md:w-full md:h-80 rounded-lg ${book.coverImage} p-4 shadow-xl flex flex-col justify-between border-2 border-gold-base relative overflow-hidden group`}>
                  {/* Ornate corners */}
                  <div className="absolute top-1 left-1 right-1 bottom-1 border border-gold-base/30 pointer-events-none rounded"></div>
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-gold-base/65"></div>
                  <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-gold-base/65"></div>
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-gold-base/65"></div>
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-gold-base/65"></div>
                  
                  {/* Subtle circular mandala watermark */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-gold-base/15 rounded-full flex items-center justify-center pointer-events-none">
                    <div className="w-24 h-24 border border-dashed border-gold-base/10 rounded-full"></div>
                  </div>

                  <div className="text-center relative z-10 mt-4">
                    <p className="text-[10px] font-display uppercase tracking-widest text-gold-light opacity-80 mb-1">Devotional Classic</p>
                    <h3 className="font-display font-bold text-parchment-light leading-tight text-base md:text-lg px-1 text-shadow-sm">
                      {book.title}
                    </h3>
                  </div>

                  <div className="text-center relative z-10 mb-4">
                    <div className="w-8 h-[1px] bg-gold-base mx-auto mb-2 opacity-50"></div>
                    <p className="text-[10px] italic text-parchment-dark/90 leading-tight">By the Founder-Acharya of ISKCON</p>
                    <p className="text-xs font-display text-gold-light mt-1 font-medium">{book.author}</p>
                  </div>
                </div>

                {/* Quick stats panel */}
                <div className="w-full mt-5 bg-parchment-base border border-gold-base/30 rounded-lg p-3 grid grid-cols-2 gap-2 text-center">
                  <div className="border-r border-gold-base/20 py-1">
                    <p className="text-[10px] uppercase tracking-wider text-devotional-blue/50 flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" /> Duration
                    </p>
                    <p className="text-sm font-display font-bold text-devotional-blue mt-0.5">{book.duration}</p>
                  </div>
                  <div className="py-1">
                    <p className="text-[10px] uppercase tracking-wider text-devotional-blue/50 flex items-center justify-center gap-1">
                      <BookOpen className="w-3 h-3" /> Chapters
                    </p>
                    <p className="text-sm font-display font-bold text-devotional-blue mt-0.5">{book.chaptersCount}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 justify-center mt-4">
                  {book.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-sans font-medium px-2 py-0.5 rounded bg-devotional-blue/5 text-devotional-blue border border-devotional-blue/10">
                      {tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* Right Column: Descriptions & Chapter List */}
              <div className="md:col-span-8 flex flex-col">
                <div className="border-b border-gold-base/20 pb-4">
                  <span className="text-xs uppercase tracking-widest font-semibold text-terracotta">{book.author}</span>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-devotional-blue leading-tight mt-1">
                    {book.title}
                  </h2>
                  {book.subTitle && (
                    <p className="text-sm italic text-devotional-blue/70 font-serif mt-1">
                      “{book.subTitle}”
                    </p>
                  )}
                </div>

                {/* Text Description */}
                <div className="mt-4 text-devotional-blue/85 leading-relaxed font-serif text-base">
                  <p className="dropcap pr-2">
                    {book.longDescription}
                  </p>
                </div>

                {/* Narrator credit */}
                <div className="mt-3 flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded px-3 py-1.5 text-xs text-amber-900 font-serif italic">
                  <Headphones className="w-4 h-4 text-gold-dark shrink-0" />
                  <span>Narrated with devotional gravity and correct pronunciation by <strong className="not-italic font-sans font-semibold text-devotional-blue">{book.narrator}</strong>.</span>
                </div>

                <ElegantFlourish className="my-2 opacity-50" />

                {/* Chapter List */}
                <div className="mt-2">
                  <h4 className="font-display font-bold text-devotional-blue text-sm uppercase tracking-wider mb-2.5 flex items-center gap-2">
                    <span>Available Audio Tracks</span>
                    <span className="text-xs font-sans font-normal text-devotional-blue/50 italic">({book.tracks.length} Samples listed)</span>
                  </h4>

                  <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                    {book.tracks.map((track, idx) => {
                      const isCurrentPlaying = activeTrack?.title === track.title;
                      return (
                        <div
                          key={idx}
                          className={`flex items-center justify-between p-2.5 rounded-lg border transition group ${
                            isCurrentPlaying 
                              ? 'bg-devotional-blue text-parchment-light border-gold-base shadow-sm' 
                              : 'bg-parchment-base/50 hover:bg-parchment-base border-gold-base/25 hover:border-gold-base/40 text-devotional-blue'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            {/* Play Indicator / Number */}
                            <button
                              onClick={() => onPlayTrack(track, book)}
                              className={`w-7 h-7 rounded-full flex items-center justify-center transition shrink-0 cursor-pointer ${
                                isCurrentPlaying
                                  ? 'bg-gold-base text-devotional-blue-dark'
                                  : 'bg-devotional-blue/5 hover:bg-gold-base hover:text-white text-devotional-blue group-hover:scale-105'
                              }`}
                              aria-label={`Play ${track.title}`}
                            >
                              {isCurrentPlaying ? (
                                <span className="flex gap-[1.5px] items-end h-2.5">
                                  <span className="w-[2px] h-2.5 bg-devotional-blue-dark animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                                  <span className="w-[2px] h-1.5 bg-devotional-blue-dark animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                                  <span className="w-[2px] h-2 bg-devotional-blue-dark animate-bounce" style={{ animationDelay: '0.5s' }}></span>
                                </span>
                              ) : (
                                <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                              )}
                            </button>

                            <div className="min-w-0 flex-1">
                              <p className={`text-xs md:text-sm font-medium truncate ${isCurrentPlaying ? 'text-gold-light' : 'text-devotional-blue'}`}>
                                {track.title}
                              </p>
                              <p className={`text-[10px] ${isCurrentPlaying ? 'text-parchment-dark/70' : 'text-devotional-blue/55'} mt-0.5`}>
                                Narrator: {track.narrator}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 ml-2">
                            <span className="text-[11px] font-mono opacity-70">
                              {track.duration}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* External links block */}
                <div className="mt-6 bg-amber-500/5 rounded-lg border border-gold-base/30 p-4">
                  <h4 className="font-display font-semibold text-devotional-blue text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5 text-gold-dark" />
                    <span>Access Full Recordings & Texts</span>
                  </h4>
                  <p className="text-xs text-devotional-blue/70 mb-3">
                    These works are preserved and distributed for free download or purchase. Click below to access complete editions:
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {book.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-sans font-medium px-3 py-1.5 rounded bg-white hover:bg-gold-light/25 text-gold-dark border border-gold-base/40 hover:border-gold-base transition shadow-sm"
                        id={`external-link-${book.id}-${idx}`}
                      >
                        <span>{link.label}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
