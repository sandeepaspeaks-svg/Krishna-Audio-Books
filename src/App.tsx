import React, { useState } from 'react';
import { 
  Headphones, 
  BookOpen, 
  Volume2, 
  HelpCircle, 
  ArrowRight, 
  X, 
  Award, 
  Shield, 
  Sparkles, 
  Play, 
  ExternalLink, 
  Calculator,
  MessageSquare,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Data and Types
import { FEATURED_AUDIOBOOKS, PRODUCTION_SERVICES, FAQS } from './data';
import { Audiobook, AudiobookTrack } from './types';

// Custom Components
import { AudioPlayer } from './components/AudioPlayer';
import { BookDetailModal } from './components/BookDetailModal';
import { QuoteWizard } from './components/QuoteWizard';
import { ContactModal } from './components/ContactModal';
import { 
  GoldLineDivider, 
  ElegantFlourish, 
  MandalaIcon 
} from './components/DecorativeDividers';

// Asset references
const heroImg = '/src/assets/images/devotional_hero_1782440850866.jpg';
const logoImg = "https://lh3.googleusercontent.com/pw/AP1GczPiEfXwx974xVHOQ5JC6re2IaF7hZ5m50FmHib8HMzf23n7O8z_HHz9S1DsEiAi_3ODdzh8lraoE9E45a1pepXsf_dwQdi3KWTXMrSYPw8Lw7DhcOV1BsWO8_fVCiwhSVxAYh0wk1_wJQAC-7vrWys=w1294-h863-s-no-gm?authuser=1";

export default function App() {
  // Interactive modal/sheet states
  const [selectedBook, setSelectedBook] = useState<Audiobook | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState('');
  
  // Audio playback state (shared with player)
  const [activeTrack, setActiveTrack] = useState<AudiobookTrack | null>(null);
  const [activeBook, setActiveBook] = useState<Audiobook | null>(null);
  const [activePlaylist, setActivePlaylist] = useState<AudiobookTrack[]>([]);

  // Quote wizard display toggle
  const [isQuoteWizardOpen, setIsQuoteWizardOpen] = useState(false);

  // FAQ accordion state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Quick action: Play sample instantly
  const playInstantSample = () => {
    const defaultBook = FEATURED_AUDIOBOOKS[0]; // Bhagavad-gita
    const defaultTrack = defaultBook.tracks[0];  // Chapter 1
    setActiveTrack(defaultTrack);
    setActiveBook(defaultBook);
    setActivePlaylist(defaultBook.tracks);
  };

  const handleBookSelect = (book: Audiobook) => {
    setSelectedBook(book);
    setIsDetailOpen(true);
  };

  const triggerContactWithSubject = (subject: string) => {
    setContactSubject(subject);
    setIsContactOpen(true);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-sans parchment-grain selection:bg-gold-base/30 selection:text-devotional-blue relative pb-28 md:pb-24 text-devotional-blue-dark">
      
      {/* 1. Header (Navigation & Logo) */}
      <header className="sticky top-0 z-40 bg-parchment-light/95 backdrop-blur-md border-b border-gold-base/20 shadow-sm" id="main-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 md:py-0 md:h-20 gap-3 md:gap-4">
            
            {/* Logo Row */}
            <div className="flex items-center justify-between w-full md:w-auto">
              {/* Logo and Tagline */}
              <div className="flex flex-col cursor-pointer" onClick={() => scrollToSection('hero')}>
                <div className="flex items-center gap-2">
                  <img 
                    src={logoImg} 
                    alt="Krishna Audiobooks Logo" 
                    className="h-8 md:h-10 w-auto object-contain shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <h1 className="font-display font-bold text-lg md:text-2xl text-devotional-blue tracking-wider">
                    Krishna<span className="text-gold-base">Audiobooks</span>™.com
                  </h1>
                </div>
                <p className="text-[9px] uppercase tracking-widest text-gold-dark font-sans font-semibold pl-9 md:pl-10 -mt-1 block">
                  “Where Sacred Books Come Alive”
                </p>
              </div>

              {/* Mobile/Tablet Request Quote Button */}
              <button
                onClick={() => triggerContactWithSubject('Audiobook Production Quote Request')}
                className="md:hidden px-3 py-1.5 text-[10px] font-sans font-bold uppercase tracking-wider bg-gold-base text-devotional-blue-dark rounded border border-gold-dark/40 shadow-sm hover:bg-gold-light transition cursor-pointer"
                id="mobile-header-btn-quote"
              >
                Quote
              </button>
            </div>

            {/* Navigation links - Directly visible on all screens */}
            <nav className="flex items-center justify-center md:justify-end gap-3 sm:gap-5 md:gap-7 flex-wrap w-full md:w-auto border-t border-gold-base/10 md:border-0 pt-2.5 md:pt-0">
              <button 
                onClick={() => scrollToSection('hero')} 
                className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider text-devotional-blue/80 hover:text-gold-base transition cursor-pointer"
                id="nav-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider text-devotional-blue/80 hover:text-gold-base transition cursor-pointer"
                id="nav-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('directory')} 
                className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider text-devotional-blue/80 hover:text-gold-base transition cursor-pointer"
                id="nav-directory"
              >
                Audiobooks
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider text-devotional-blue/80 hover:text-gold-base transition cursor-pointer"
                id="nav-services"
              >
                Services
              </button>
              <button 
                onClick={playInstantSample} 
                className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider text-devotional-blue/80 hover:text-gold-base flex items-center gap-1 transition cursor-pointer"
                id="nav-sample"
              >
                <Volume2 className="w-3 h-3 text-gold-base" />
                <span>Sample</span>
              </button>
              <button 
                onClick={() => setIsContactOpen(true)} 
                className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider text-devotional-blue/80 hover:text-gold-base transition cursor-pointer"
                id="nav-contact"
              >
                Contact
              </button>

              {/* Desktop Request Quote Button */}
              <button
                onClick={() => triggerContactWithSubject('Audiobook Production Quote Request')}
                className="hidden md:block px-4 py-2 text-xs font-sans font-bold uppercase tracking-wider bg-gold-base text-devotional-blue-dark rounded border border-gold-dark/40 shadow-sm hover:bg-gold-light hover:shadow transition cursor-pointer ml-2"
                id="header-btn-quote"
              >
                Request Quote
              </button>
            </nav>

          </div>
        </div>
      </header>

      {/* 2. Hero Banner Section */}
      <section className="relative bg-devotional-blue-dark text-parchment-light overflow-hidden py-16 md:py-24" id="hero">
        
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImg} 
            alt="Sacred scriptures on bookshelf background" 
            className="w-full h-full object-cover opacity-35 filter brightness-90 saturate-50 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-devotional-blue-dark via-devotional-blue-dark/75 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-devotional-blue-dark/95 via-transparent to-devotional-blue-dark/95"></div>
        </div>

        {/* Coming Soon Gold Ribbon Overlay */}
        <div className="absolute top-8 right-[-50px] rotate-45 bg-gradient-to-r from-gold-dark via-gold-base to-gold-dark text-devotional-blue-dark py-1 px-14 text-[10px] md:text-xs font-sans font-extrabold uppercase tracking-widest shadow-md border-y border-gold-light/40 z-10">
          COMING SOON
        </div>

        {/* Content container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-base/10 border border-gold-base/40 text-gold-light text-xs font-sans font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-gold-base animate-pulse" />
                <span>Premium Spiritual Narrations</span>
              </div>

              {/* Main Headlines */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold leading-[1.1] tracking-wide text-white drop-shadow-md">
                A Directory of Audiobooks on <br />
                <span className="text-gold-light">Bhakti and Dharma</span>
              </h1>
              
              <p className="text-sm md:text-base text-parchment-dark/85 font-serif max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Preserving timeless wisdom through professional devotional narration. Discover, stream, and study classical Vaishnava scriptures, philosophical treatises, and modern spiritual guides in high-definition audio.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
                <button
                  onClick={playInstantSample}
                  className="w-full sm:w-auto px-7 py-3.5 bg-gold-base text-devotional-blue-dark hover:bg-gold-light font-sans font-bold uppercase tracking-wider text-xs rounded border border-gold-dark/40 shadow-md hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
                  id="btn-listen-samples-hero"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Listen to Samples</span>
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="w-full sm:w-auto px-7 py-3.5 bg-devotional-blue-light/70 hover:bg-devotional-blue-light text-parchment-light border border-gold-base/35 font-sans font-bold uppercase tracking-wider text-xs rounded hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
                  id="btn-services-hero"
                >
                  <Headphones className="w-4 h-4" />
                  <span>Audiobook Services</span>
                </button>
              </div>

            </div>

            {/* Hero Right Visual: Open Sacred Book & Waveform Animation */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-sm aspect-square bg-gradient-to-b from-amber-500/5 to-amber-500/10 border border-gold-base/20 rounded-2xl p-6 shadow-inner flex flex-col items-center justify-center">
                
                {/* Mandala Background behind artwork */}
                <div className="absolute opacity-15">
                  <MandalaIcon className="w-72 h-72 text-gold-base animate-[spin_120s_linear_infinite]" />
                </div>

                {/* Simulated Ethereal Audio Waves */}
                <div className="flex items-end gap-[4px] h-16 w-full max-w-[200px] justify-center relative z-10 mb-4">
                  {[24, 16, 44, 32, 56, 12, 48, 20, 60, 36, 18, 40, 24, 30].map((h, i) => (
                    <motion.span
                      key={i}
                      className="w-[3px] bg-gradient-to-t from-gold-dark via-gold-base to-gold-light rounded-full"
                      animate={{ height: [h, h * 0.3, h * 1.1, h] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1.2 + (i % 3) * 0.2, 
                        ease: 'easeInOut' 
                      }}
                    />
                  ))}
                </div>

                {/* Tiny Label */}
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold-light/65 relative z-10 mb-1">Ethereal Soundwave</span>
                <p className="text-xs italic text-parchment-dark/75 text-center font-serif relative z-10 max-w-[220px]">
                  “srotram ca caksuh sparsanam ca rasanam ghranam eva ca...”
                </p>

              </div>
            </div>

          </div>
        </div>

        {/* Wave Divider decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-4 overflow-hidden pointer-events-none">
          <svg className="w-full h-full text-parchment-light fill-current" viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,74L1320,74C1200,74,960,74,720,74C480,74,240,74,120,74L0,74Z" />
          </svg>
        </div>

      </section>

      {/* 3. About / Introduction Section */}
      <section className="py-12 md:py-16 max-w-4xl mx-auto px-4 text-center relative" id="about">
        <div className="absolute top-4 left-4 opacity-5 pointer-events-none">
          <MandalaIcon className="w-32 h-32 text-gold-dark" />
        </div>

        <span className="text-xs uppercase tracking-widest text-gold-dark font-sans font-bold">Preserving Scripture in Sound</span>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-devotional-blue mt-1 mb-4">
          Where Devotion Meets High Fidelity
        </h2>
        <p className="text-base md:text-lg text-devotional-blue/80 font-serif leading-relaxed italic max-w-2xl mx-auto">
          “KrishnaAudiobooks™.com is dedicated to building the ultimate directory of pure devotional speech. We believe that Sanskrit stotras, Vedic purports, and Dharma books are living sound representations of transcendence. Our mission is to preserve these books in pristine audio formats, making them universally accessible to modern seekers, commuters, and scholars alike.”
        </p>

        <GoldLineDivider className="my-8" />
      </section>

      {/* 4. Featured Audiobook Directory (6 Cards) */}
      <section className="py-12 bg-parchment-base/30 border-y border-gold-base/15" id="directory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-1 mb-10">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-dark">Curated Digital Library</span>
            <h2 className="text-3xl font-display font-extrabold text-devotional-blue tracking-wide">
              Featured Audiobook Collections
            </h2>
            <p className="text-xs md:text-sm text-devotional-blue/65 font-serif max-w-xl mx-auto">
              Explore professional audio adaptations of classical texts, fully indexed with chapters, transcripts, and download links.
            </p>
          </div>

          {/* Grid of 6 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {FEATURED_AUDIOBOOKS.map((book) => (
              <motion.div
                key={book.id}
                whileHover={{ y: -6 }}
                className="bg-white rounded-xl border border-gold-base/30 hover:border-gold-base/75 overflow-hidden transition-all duration-300 flex flex-col justify-between p-5 hover:shadow-[0_12px_24px_rgba(158,122,59,0.12)] relative group"
                id={`book-card-${book.id}`}
              >
                
                {/* Visual Cover Top Banner */}
                <div className="flex gap-4">
                  
                  {/* Outer spine structure */}
                  <div className={`w-20 h-28 shrink-0 rounded ${book.coverImage} p-2 shadow-md flex flex-col justify-between border border-gold-base/50 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-1 left-1 bottom-1 w-[2px] bg-gold-light/25"></div>
                    <p className="text-[6px] font-display uppercase tracking-widest text-gold-light/90 text-center truncate">Classic</p>
                    <p className="text-[8px] font-display font-bold text-white leading-tight text-center truncate px-0.5">{book.title}</p>
                    <div className="w-3 h-[1px] bg-gold-base/30 mx-auto"></div>
                  </div>

                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-terracotta bg-amber-500/10 px-1.5 py-0.5 rounded">
                      {book.tags[0] || 'Veda'}
                    </span>
                    <h3 className="text-base md:text-lg font-display font-bold text-devotional-blue leading-tight mt-1 truncate">
                      {book.title}
                    </h3>
                    <p className="text-[11px] font-serif italic text-devotional-blue/65 mt-0.5">
                      By {book.author}
                    </p>
                    <p className="text-xs text-devotional-blue/80 line-clamp-2 mt-2 leading-relaxed">
                      Complete professional audiobook narration.
                    </p>
                  </div>

                </div>

                {/* Meta Strip */}
                <div className="border-t border-gold-base/20 my-4 pt-3 flex items-center justify-between text-[11px] text-devotional-blue/60 font-mono">
                  <span className="flex items-center gap-1">
                    <Headphones className="w-3.5 h-3.5 text-gold-base" />
                    <span>{book.duration}</span>
                  </span>
                  <span>{book.chaptersCount} Tracks</span>
                </div>

                {/* Explore button */}
                <button
                  onClick={() => handleBookSelect(book)}
                  className="w-full text-center py-2 border border-gold-base/45 hover:border-gold-base bg-parchment-light hover:bg-gold-base hover:text-devotional-blue-dark text-gold-dark text-xs font-sans font-bold uppercase tracking-wider rounded transition-all duration-300 cursor-pointer flex items-center justify-center gap-1"
                  id={`btn-explore-${book.id}`}
                >
                  <span>Explore Audiobooks</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Second Directory Section: Contemporary Authors "Coming Soon" */}
      <section className="py-12 bg-white border-b border-gold-base/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          
          <div className="space-y-1 mb-8">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-dark">Preserving Modern Insights</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-devotional-blue">
              Contemporary Hindu, Vaishnava & Dharma Authors
            </h2>
            <p className="text-xs md:text-sm text-devotional-blue/60 font-serif max-w-lg mx-auto">
              Expanding the tradition for modern listeners. We are curating indexes of contemporary academic scholars, yoga teachers, and spiritual gurus.
            </p>
          </div>

          {/* Plaque coming soon */}
          <div className="relative p-6 md:p-8 rounded-xl bg-parchment-light border-2 border-gold-base/30 max-w-xl mx-auto shadow-inner overflow-hidden flex flex-col items-center">
            
            {/* Ornate corners */}
            <div className="absolute top-1.5 left-1.5 right-1.5 bottom-1.5 border border-dashed border-gold-base/20 pointer-events-none rounded-lg"></div>
            <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-gold-base/50"></div>
            <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-gold-base/50"></div>
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-gold-base/50"></div>
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-gold-base/50"></div>

            <div className="bg-gold-base/10 rounded-full p-2 mb-3 border border-gold-base/30 text-gold-dark">
              <Sparkles className="w-5 h-5 text-gold-dark" />
            </div>

            <h3 className="font-display font-bold text-base uppercase text-devotional-blue tracking-wider mb-1">
              Author Directory In Compilation
            </h3>
            <p className="text-xs text-devotional-blue/70 font-serif max-w-md mx-auto leading-relaxed">
              We are actively cooperating with publishers of contemporary commentaries to host their sample files. If you are an author of a Hinduism, Bhakti, or Dharma text, we invite you to list your work or order premium narration.
            </p>

            <button
              onClick={() => triggerContactWithSubject('Contemporary Author Partnership')}
              className="mt-4 px-5 py-2 text-xs font-sans font-bold uppercase tracking-wider text-gold-dark hover:text-white hover:bg-gold-dark rounded border border-gold-base/45 hover:border-gold-dark transition cursor-pointer"
              id="btn-partner-authors"
            >
              Partner with Us
            </button>
            
          </div>

        </div>
      </section>

      {/* 6. Services Section */}
      <section className="py-16 bg-parchment-light" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-1.5 mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-dark">Premium Production Services</span>
            <h2 className="text-3xl font-display font-bold text-devotional-blue">
              Audiobook Production Services for Authors & Publishers
            </h2>
            <p className="text-sm text-devotional-blue/70 font-serif max-w-2xl mx-auto">
              We help authors, translators, temples, and spiritual organizations turn theological, philosophical, and devotional books into world-class audiobooks suitable for global distribution.
            </p>
          </div>

          {/* Services Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {PRODUCTION_SERVICES.map((serv) => (
              <div
                key={serv.id}
                className="bg-white rounded-xl border border-gold-base/20 p-6 flex flex-col justify-between hover:border-gold-base/60 transition shadow-sm relative group"
                id={`service-card-${serv.id}`}
              >
                <div>
                  {/* Badge representing icon */}
                  <div className="w-10 h-10 rounded-lg bg-gold-base/10 border border-gold-base/30 text-gold-dark flex items-center justify-center mb-4">
                    <Headphones className="w-5 h-5" />
                  </div>

                  <h3 className="text-base md:text-lg font-display font-bold text-devotional-blue group-hover:text-gold-dark transition">
                    {serv.title}
                  </h3>
                  <p className="text-xs text-devotional-blue/75 font-serif mt-2 leading-relaxed">
                    {serv.description}
                  </p>

                  <ul className="mt-4 space-y-2 text-xs text-devotional-blue/80 pl-1">
                    {serv.details.slice(0, 3).map((det, idx) => (
                      <li key={idx} className="flex gap-2 items-start font-sans leading-snug">
                        <span className="text-gold-base font-bold select-none">•</span>
                        <span>{det}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-gold-base/10 pt-4 flex justify-between items-center">
                  <span className="text-[10px] text-devotional-blue/45 font-mono">Expert Devotional Tier</span>
                  <button
                    onClick={() => triggerContactWithSubject(`Service Inquiry: ${serv.title}`)}
                    className="text-xs font-sans font-bold uppercase tracking-wider text-gold-dark hover:text-gold-base flex items-center gap-1 transition cursor-pointer"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Interactive Audiobook Quote Request / Calculator Block */}
      <section className="py-12 bg-parchment-base/50 border-t border-gold-base/25">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-dark">Request an Estimate</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-devotional-blue">
              Estimate Your Production Project
            </h2>
            <p className="text-xs md:text-sm text-devotional-blue/60 font-serif max-w-md mx-auto mt-1">
              Select your manuscript details below to view instant pricing ranges for custom narration, mastering, and ACX distribution.
            </p>
          </div>

          <QuoteWizard />
        </div>
      </section>

      {/* 8. Call to Action (Big Banner) */}
      <section className="py-16 bg-devotional-blue text-parchment-light relative overflow-hidden text-center">
        {/* Background watermark */}
        <div className="absolute opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <MandalaIcon className="w-96 h-96 text-gold-base" />
        </div>

        <div className="max-w-3xl mx-auto px-4 relative z-10 space-y-5">
          <Award className="w-10 h-10 text-gold-base mx-auto animate-bounce" />
          
          <h2 className="text-2xl md:text-4xl font-display font-bold text-white leading-tight">
            Have a Hinduism, Bhakti, or Dharma book <br />
            that should become an audiobook?
          </h2>
          
          <p className="text-sm text-parchment-dark/85 font-serif max-w-xl mx-auto leading-relaxed">
            Cooperate with our dedicated production cell. We restore cassette tapes, narrate translations, align shloka recordings with traditional tanpura, and deliver fully polished audio files certified for Audible.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => triggerContactWithSubject('Audiobook Production Quote Request')}
              className="px-7 py-3 rounded bg-gold-base hover:bg-gold-light text-devotional-blue-dark font-sans font-bold uppercase tracking-wider text-xs shadow-md hover:scale-105 active:scale-95 transition cursor-pointer"
              id="cta-btn-quote"
            >
              Request a Production Quote
            </button>
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-7 py-3 rounded bg-transparent hover:bg-white/5 text-parchment-light border border-gold-base/55 font-sans font-bold uppercase tracking-wider text-xs transition cursor-pointer"
              id="cta-btn-contact"
            >
              Speak with a Consultant
            </button>
          </div>
        </div>
      </section>

      {/* 9. FAQs Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center space-y-1 mb-8">
            <HelpCircle className="w-6 h-6 text-gold-base mx-auto" />
            <h2 className="text-2xl font-display font-bold text-devotional-blue">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-devotional-blue/60 font-serif">
              Answers regarding Sanskrit recitation, licensing, distribution, and sound aesthetics.
            </p>
          </div>

          <div className="space-y-3.5 max-w-2xl mx-auto">
            {FAQS.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div key={idx} className="border border-gold-base/20 rounded-lg overflow-hidden bg-parchment-light/30">
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full text-left px-4 py-3.5 flex justify-between items-center gap-3 hover:bg-amber-500/5 transition cursor-pointer"
                    id={`faq-btn-${idx}`}
                  >
                    <span className="text-xs md:text-sm font-bold text-devotional-blue font-sans">
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gold-dark shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-xs md:text-sm text-devotional-blue/80 font-serif leading-relaxed border-t border-gold-base/10 pt-2.5">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 10. Footer Section */}
      <footer className="bg-devotional-blue-dark text-parchment-light border-t-2 border-gold-base/55 py-12 relative" id="main-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Logo and Tagline Column */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <img 
                  src={logoImg} 
                  alt="Krishna Audiobooks Logo" 
                  className="h-8 w-auto object-contain shrink-0"
                  referrerPolicy="no-referrer"
                />
                <h3 className="font-display font-bold text-xl text-white tracking-widest">
                  Krishna<span className="text-gold-base">Audiobooks</span>™
                </h3>
              </div>
              <p className="text-xs text-parchment-dark/75 leading-relaxed font-serif max-w-xs">
                “Where Sacred Books Come Alive.” Providing a clean repository of Vedic literature audio guides and professional vocal mastering.
              </p>
              <div className="text-[10px] text-parchment-dark/50">
                © 2026 KrishnaAudiobooks™.com. All rights reserved.
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-gold-light mb-3">
                Resource Navigation
              </h4>
              <ul className="space-y-2 text-xs text-parchment-dark/80">
                <li><button onClick={() => scrollToSection('hero')} className="hover:text-gold-base transition cursor-pointer">Home Hub</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-gold-base transition cursor-pointer">Our Mission</button></li>
                <li><button onClick={() => scrollToSection('directory')} className="hover:text-gold-base transition cursor-pointer">Book Directory</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-gold-base transition cursor-pointer">Narration Services</button></li>
              </ul>
            </div>

            {/* Trust and Social Icons placeholders */}
            <div>
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-gold-light mb-3">
                Security & Standards
              </h4>
              <p className="text-xs text-parchment-dark/65 font-serif mb-4 leading-normal">
                All production services carry non-disclosure guarantees. Delivered audio exceeds Audible, iTunes, and Spotify standards.
              </p>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-gold-base border border-gold-base/30 px-1.5 py-0.5 rounded bg-white/5 select-none font-bold">ACX COMPLIANT</span>
                <span className="text-[10px] font-mono text-gold-base border border-gold-base/30 px-1.5 py-0.5 rounded bg-white/5 select-none font-bold">100% SECURE</span>
              </div>
            </div>

          </div>

          {/* Legal strip */}
          <div className="border-t border-gold-base/15 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-parchment-dark/55 gap-3">
            <div className="flex gap-4">
              <a href="#privacy" className="hover:text-gold-base transition">Privacy Policy</a>
              <span>•</span>
              <a href="#terms" className="hover:text-gold-base transition">Terms of Service</a>
            </div>
            <p className="italic font-serif">
              A work of Vaishnava Digital Trust. Under guidance of standard Acharyas.
            </p>
          </div>

        </div>
      </footer>

      {/* 11. Overlays & Modals */}
      
      {/* Audiobook Details Sheet Modal */}
      <BookDetailModal
        book={selectedBook}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedBook(null);
        }}
        activeTrack={activeTrack}
        onPlayTrack={(track, book) => {
          setActiveTrack(track);
          setActiveBook(book);
          setActivePlaylist(book.tracks);
        }}
      />

      {/* Full-screen Quote Wizard Overlay */}
      <AnimatePresence>
        {isQuoteWizardOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQuoteWizardOpen(false)}
              className="fixed inset-0 bg-devotional-blue-dark/85 backdrop-blur-sm"
              id="quote-wizard-backdrop"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-xl z-10"
              id="quote-wizard-modal"
            >
              <button
                onClick={() => setIsQuoteWizardOpen(false)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                id="btn-close-quote-wizard"
              >
                <X className="w-4 h-4" />
              </button>
              <QuoteWizard onClose={() => setIsQuoteWizardOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* General Contact Form Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialSubject={contactSubject}
      />

      {/* Custom persistent devotional audio panel */}
      <AudioPlayer
        activeTrack={activeTrack}
        activeBook={activeBook}
        playlist={activePlaylist}
        onClose={() => {
          setActiveTrack(null);
          setActiveBook(null);
          setActivePlaylist([]);
        }}
        onTrackChange={(track, book) => {
          setActiveTrack(track);
          setActiveBook(book);
        }}
      />

    </div>
  );
}

