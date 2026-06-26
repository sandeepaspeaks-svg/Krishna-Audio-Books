import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book, Sliders, Calculator, Send, CheckCircle, ArrowRight, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';
import { QuoteFormInput } from '../types';

interface QuoteWizardProps {
  onClose?: () => void;
}

export const QuoteWizard: React.FC<QuoteWizardProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<QuoteFormInput>({
    name: '',
    email: '',
    organization: '',
    bookTitle: '',
    authorName: '',
    wordCount: 45000,
    narratorGender: 'male',
    audioStyle: 'narration-drone',
    comments: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Constants for calculations
  const WORDS_PER_FINISHED_HOUR = 9000;
  const BASE_PFH_RATE = 175; // Per Finished Hour

  // Calculate stats based on form inputs
  const calculateStats = () => {
    const finishedHours = Math.max(1, Math.round((formData.wordCount / WORDS_PER_FINISHED_HOUR) * 10) / 10);
    
    // Rate multiplier based on audio style
    let stylePremium = 0;
    if (formData.audioStyle === 'narration-drone') stylePremium = 30;
    if (formData.audioStyle === 'narration-music-fx') stylePremium = 75;

    const ratePerHour = BASE_PFH_RATE + stylePremium;
    const estimatedCostBase = finishedHours * ratePerHour;
    
    // Provide a reasonable price range (-10% to +15% for safety margin)
    const minCost = Math.round(estimatedCostBase * 0.9);
    const maxCost = Math.round(estimatedCostBase * 1.15);

    // Format hours
    const hours = Math.floor(finishedHours);
    const mins = Math.round((finishedHours - hours) * 60);
    const durationStr = `${hours}h ${mins > 0 ? `${mins}m` : ''}`;

    return {
      duration: durationStr,
      finishedHours,
      costRange: `$${minCost.toLocaleString()} - $${maxCost.toLocaleString()}`,
      ratePerHour
    };
  };

  const { duration, costRange } = calculateStats();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'wordCount' ? parseInt(value) || 0 : value
    }));
  };

  const handleNext = () => {
    // Basic validation
    if (step === 1 && (!formData.bookTitle || !formData.authorName)) {
      alert("Please fill in the book title and author name.");
      return;
    }
    if (step === 3 && (!formData.name || !formData.email)) {
      alert("Please provide your name and email address.");
      return;
    }
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      organization: '',
      bookTitle: '',
      authorName: '',
      wordCount: 45000,
      narratorGender: 'male',
      audioStyle: 'narration-drone',
      comments: ''
    });
    setStep(1);
    setIsSuccess(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gold-base/30 overflow-hidden max-w-2xl mx-auto" id="quote-wizard-container">
      
      {/* Header bar */}
      <div className="bg-devotional-blue text-parchment-light px-6 py-4 border-b border-gold-base/30 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Calculator className="w-5 h-5 text-gold-base" />
          <h3 className="font-display font-semibold text-base md:text-lg text-gold-light tracking-wide">
            Audiobook Quote Calculator
          </h3>
        </div>
        {step < 4 && !isSuccess && (
          <div className="text-xs font-sans text-parchment-dark/75">
            Step {step} of 3
          </div>
        )}
      </div>

      {/* Progress Line */}
      {step < 4 && !isSuccess && (
        <div className="w-full h-1 bg-parchment-base">
          <motion.div 
            className="h-full bg-gold-base"
            initial={{ width: '33.3%' }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      {/* Main Form Area */}
      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-8"
              key="success-screen"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4 text-emerald-600">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-display font-bold text-devotional-blue">Quote Request Received!</h4>
              <p className="text-sm font-sans text-devotional-blue/70 mt-2 max-w-md mx-auto">
                Thank you for submitting your project <strong>{formData.bookTitle}</strong>. Our spiritual publishing consultants will review your word count and narration style, listen to sample matches, and reach out to you within 24 hours at <strong>{formData.email}</strong>.
              </p>

              {/* Estimate Summary Plaque */}
              <div className="my-6 p-4 rounded-lg bg-parchment-light border border-gold-base/35 inline-block text-left max-w-sm w-full shadow-inner">
                <p className="text-xs font-display font-semibold text-gold-dark uppercase tracking-wider text-center border-b border-gold-base/25 pb-1.5 mb-2.5">Estimated Booking Reference</p>
                <div className="space-y-1 text-xs text-devotional-blue/80">
                  <div className="flex justify-between"><span>Title:</span> <span className="font-bold">{formData.bookTitle}</span></div>
                  <div className="flex justify-between"><span>Word Count:</span> <span className="font-bold">{formData.wordCount.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Estimated Length:</span> <span className="font-bold text-devotional-blue">{duration}</span></div>
                  <div className="flex justify-between border-t border-gold-base/20 pt-1.5 mt-1.5">
                    <span className="font-semibold text-gold-dark">Cost Estimate:</span> 
                    <span className="font-bold text-sm text-terracotta">{costRange}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-sans font-medium text-gold-dark hover:text-gold-base transition cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Calculate Another Book</span>
                </button>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="px-5 py-2 rounded bg-devotional-blue text-parchment-light text-xs font-sans font-semibold hover:bg-devotional-blue-light transition shadow cursor-pointer"
                  >
                    Close Wizard
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} key={`step-${step}`}>
              
              {/* Step 1: Book Details */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Book className="w-4 h-4 text-gold-base" />
                    <h4 className="text-sm uppercase tracking-wider font-semibold text-gold-dark">Book & Author Information</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-devotional-blue/80 mb-1" htmlFor="bookTitle">Book Title *</label>
                      <input
                        type="text"
                        name="bookTitle"
                        id="bookTitle"
                        required
                        value={formData.bookTitle}
                        onChange={handleInputChange}
                        placeholder="e.g. Sri Caitanya-caritamrta Study Guide"
                        className="w-full text-sm font-sans px-3 py-2 rounded border border-gold-base/30 focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base/40 bg-parchment-light"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-devotional-blue/80 mb-1" htmlFor="authorName">Original Author / Translator *</label>
                      <input
                        type="text"
                        name="authorName"
                        id="authorName"
                        required
                        value={formData.authorName}
                        onChange={handleInputChange}
                        placeholder="e.g. Srila Rupa Gosvami"
                        className="w-full text-sm font-sans px-3 py-2 rounded border border-gold-base/30 focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base/40 bg-parchment-light"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-medium text-devotional-blue/80" htmlFor="wordCount">
                        Total Word Count: <strong className="text-gold-dark font-mono text-sm">{formData.wordCount.toLocaleString()} words</strong>
                      </label>
                      <span className="text-[10px] text-devotional-blue/50 italic">~{duration} finished audio</span>
                    </div>
                    <input
                      type="range"
                      name="wordCount"
                      id="wordCount"
                      min="5000"
                      max="150000"
                      step="5000"
                      value={formData.wordCount}
                      onChange={handleInputChange}
                      className="w-full h-1.5 bg-parchment-base rounded-lg appearance-none cursor-pointer accent-gold-base"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-devotional-blue/45 mt-1">
                      <span>5k words (Small booklet)</span>
                      <span>80k words (Medium book)</span>
                      <span>150k words (Epic shastra)</span>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-500/5 rounded border border-gold-base/20 flex gap-2 items-start mt-4">
                    <AlertCircle className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
                    <p className="text-[11px] font-serif text-devotional-blue/70">
                      Standard audiobooks average 150 words per minute. A 45,000-word devotional text typically creates about 5 hours of final mastered audio files.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Styling and Customizations */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Sliders className="w-4 h-4 text-gold-base" />
                    <h4 className="text-sm uppercase tracking-wider font-semibold text-gold-dark">Narration & Audio Aesthetics</h4>
                  </div>

                  <div>
                    <span className="block text-xs font-medium text-devotional-blue/80 mb-2">Narrator Voice Preference</span>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { val: 'male', label: 'Devotional Male', desc: 'Resonant, deep, classical gravity' },
                        { val: 'female', label: 'Devotional Female', desc: 'Clairvoyant, pure, elegant pacing' },
                        { val: 'no-preference', label: 'No Preference', desc: 'Best fit for this specific manuscript style' }
                      ].map(opt => (
                        <label
                          key={opt.val}
                          className={`border rounded-lg p-3 flex flex-col justify-between cursor-pointer transition text-left ${
                            formData.narratorGender === opt.val
                              ? 'border-gold-base bg-amber-500/5 ring-1 ring-gold-base'
                              : 'border-gold-base/20 hover:border-gold-base/55 hover:bg-parchment-base/20'
                          }`}
                        >
                          <input
                            type="radio"
                            name="narratorGender"
                            value={opt.val}
                            checked={formData.narratorGender === opt.val}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div>
                            <p className="text-xs font-bold text-devotional-blue">{opt.label}</p>
                            <p className="text-[10px] text-devotional-blue/60 mt-1 leading-normal">{opt.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-medium text-devotional-blue/80 mb-2">Background Sound & Post-Production</span>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { val: 'narration-only', label: 'Solo Vocal Only', desc: 'Completely raw voice, traditional academic standard' },
                        { val: 'narration-drone', label: 'Voice + Tanpura', desc: 'Meditative background Indian drone chord' },
                        { val: 'narration-music-fx', label: 'Vocal + Soundscapes', desc: 'Bansuri flute transitions & sacred effects' }
                      ].map(opt => (
                        <label
                          key={opt.val}
                          className={`border rounded-lg p-3 flex flex-col justify-between cursor-pointer transition text-left ${
                            formData.audioStyle === opt.val
                              ? 'border-gold-base bg-amber-500/5 ring-1 ring-gold-base'
                              : 'border-gold-base/20 hover:border-gold-base/55 hover:bg-parchment-base/20'
                          }`}
                        >
                          <input
                            type="radio"
                            name="audioStyle"
                            value={opt.val}
                            checked={formData.audioStyle === opt.val}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div>
                            <p className="text-xs font-bold text-devotional-blue">{opt.label}</p>
                            <p className="text-[10px] text-devotional-blue/60 mt-1 leading-normal">{opt.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Estimate, Contact and Submit */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  {/* Dynamic Quote Summary Card */}
                  <div className="p-4 rounded-lg bg-devotional-blue-light text-parchment-light border border-gold-base/40 shadow-md">
                    <h4 className="text-xs font-display uppercase tracking-widest text-gold-light border-b border-gold-base/20 pb-1.5 mb-3">Live Estimation Summary</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center md:text-left">
                      <div>
                        <p className="text-[10px] text-parchment-dark/75 uppercase tracking-wider">Book Title</p>
                        <p className="text-sm font-display font-semibold text-gold-light truncate">{formData.bookTitle}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-parchment-dark/75 uppercase tracking-wider">Estimated Audio Length</p>
                        <p className="text-sm font-display font-semibold text-gold-light">~{duration}</p>
                      </div>
                      <div className="col-span-2 md:col-span-1 border-t md:border-t-0 border-gold-base/15 pt-2.5 md:pt-0">
                        <p className="text-[10px] text-gold-light/95 uppercase tracking-wider font-semibold">Estimated Cost Range</p>
                        <p className="text-lg font-display font-bold text-white leading-tight">{costRange}</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-parchment-dark/60 mt-3 text-center border-t border-gold-base/10 pt-1.5 leading-normal">
                      *Includes raw recording, professional vocal cleaning, spectral editing, custom chapter marking metadata, and Audible (ACX) compatibility audit.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <Send className="w-4 h-4 text-gold-base" />
                    <h4 className="text-sm uppercase tracking-wider font-semibold text-gold-dark">Contact & Publishing Details</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-devotional-blue/80 mb-1" htmlFor="name">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Gerald Das"
                        className="w-full text-sm font-sans px-3 py-2 rounded border border-gold-base/30 focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base/40 bg-parchment-light"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-devotional-blue/80 mb-1" htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. gerald@dharma-press.com"
                        className="w-full text-sm font-sans px-3 py-2 rounded border border-gold-base/30 focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base/40 bg-parchment-light"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-devotional-blue/80 mb-1" htmlFor="organization">Organization / Temple (Optional)</label>
                      <input
                        type="text"
                        name="organization"
                        id="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        placeholder="e.g. Vaishnava Literature Trust"
                        className="w-full text-sm font-sans px-3 py-2 rounded border border-gold-base/30 focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base/40 bg-parchment-light"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-devotional-blue/80 mb-1" htmlFor="comments">Special Requests (Optional)</label>
                      <textarea
                        name="comments"
                        id="comments"
                        value={formData.comments}
                        onChange={handleInputChange}
                        rows={1}
                        placeholder="e.g. Sanskrit verse chanting in BG is highly critical..."
                        className="w-full text-sm font-sans px-3 py-1.5 rounded border border-gold-base/30 focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base/40 bg-parchment-light"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gold-base/20">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex items-center gap-1.5 px-4 py-2 border border-gold-base/45 hover:border-gold-base rounded text-xs font-sans font-medium text-gold-dark hover:bg-parchment-base/10 transition cursor-pointer"
                    id="btn-prev-step"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-5 py-2 rounded bg-gold-base text-devotional-blue-dark font-sans font-bold text-xs hover:bg-gold-light transition shadow-md cursor-pointer"
                    id="btn-next-step"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-1.5 px-6 py-2.5 rounded bg-terracotta text-white font-sans font-bold text-xs hover:bg-red-800 disabled:opacity-50 transition shadow-md cursor-pointer"
                    id="btn-submit-quote"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Booking...</span>
                      </>
                    ) : (
                      <>
                        <span>Request Final Quote</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                )}
              </div>

            </form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
