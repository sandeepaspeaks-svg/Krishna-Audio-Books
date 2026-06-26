import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Phone, MapPin, Send, CheckCircle, Clock } from 'lucide-react';
import { ContactFormInput } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubject?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  initialSubject = ''
}) => {
  const [formData, setFormData] = useState<ContactFormInput>({
    name: '',
    email: '',
    subject: initialSubject || 'Audiobook Service Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: 'Audiobook Service Inquiry', message: '' });
    setIsSuccess(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-devotional-blue-dark/80 backdrop-blur-sm"
          id="contact-backdrop"
        />

        {/* Content Box */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          className="relative w-full max-w-2xl bg-parchment-light rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(20,34,48,0.35)] border border-gold-base/50 z-10"
          id="contact-modal"
        >
          {/* Top Gold strip */}
          <div className="h-1 bg-gradient-to-r from-gold-dark via-gold-base to-gold-dark" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-devotional-blue/10 hover:bg-devotional-blue/20 text-devotional-blue flex items-center justify-center transition focus:outline-none cursor-pointer"
            id="btn-close-contact"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-5">
            
            {/* Left side: Contact Card */}
            <div className="md:col-span-2 bg-devotional-blue text-parchment-light p-6 md:p-8 flex flex-col justify-between border-r border-gold-base/20">
              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-gold-light">Krishna Audiobooks™</h3>
                <p className="text-xs text-parchment-dark/75 leading-relaxed font-serif">
                  Preserving eternal teachings of Dharma through dedicated, high-fidelity vocal recitation.
                </p>

                <div className="space-y-3.5 pt-4 text-xs">
                  <div className="flex gap-2.5 items-start">
                    <Mail className="w-4 h-4 text-gold-base shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-parchment-dark/50 font-sans uppercase">Email Consultants</p>
                      <p className="font-medium text-parchment-light">sandeepaspeaks@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <Phone className="w-4 h-4 text-gold-base shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-parchment-dark/50 font-sans uppercase">Contact Helpline</p>
                      <p className="font-medium text-parchment-light">+1-646-296-0795</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <MapPin className="w-4 h-4 text-gold-base shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-parchment-dark/50 font-sans uppercase">Headquarters</p>
                      <p className="font-medium text-parchment-light leading-snug">Vaishnava Digital Trust<br />Vrindavan, UP, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gold-base/15 text-[10px] text-parchment-dark/50 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gold-base shrink-0" />
                <span>Response expected within 1 business day.</span>
              </div>
            </div>

            {/* Right side: Contact Form */}
            <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-6"
                    key="success-state"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3 text-emerald-600">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-display font-bold text-devotional-blue">Message Dispatched!</h4>
                    <p className="text-xs font-sans text-devotional-blue/70 mt-2 max-w-xs mx-auto leading-relaxed">
                      Thank you for contacting us. Your message has been received, and our publishers will respond to you shortly.
                    </p>
                    <button
                      onClick={handleReset}
                      className="mt-4 px-4 py-1.5 rounded bg-devotional-blue hover:bg-devotional-blue-light text-parchment-light text-xs font-semibold shadow-sm transition cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5" key="form-state">
                    <div>
                      <h4 className="text-base font-display font-bold text-devotional-blue">Send a Message</h4>
                      <p className="text-[11px] text-devotional-blue/60 mt-0.5">Have a question or custom request? Let us know!</p>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-wider text-devotional-blue/75 mb-0.5" htmlFor="contact-name">Your Full Name</label>
                      <input
                        type="text"
                        name="name"
                        id="contact-name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Gerald Infinity"
                        className="w-full text-xs font-sans px-3 py-2 rounded border border-gold-base/35 bg-white focus:outline-none focus:border-gold-base"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-wider text-devotional-blue/75 mb-0.5" htmlFor="contact-email">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        id="contact-email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. gerald@example.com"
                        className="w-full text-xs font-sans px-3 py-2 rounded border border-gold-base/35 bg-white focus:outline-none focus:border-gold-base"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-wider text-devotional-blue/75 mb-0.5" htmlFor="contact-subject">Inquiry Subject</label>
                      <input
                        type="text"
                        name="subject"
                        id="contact-subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full text-xs font-sans px-3 py-2 rounded border border-gold-base/35 bg-white focus:outline-none focus:border-gold-base"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-wider text-devotional-blue/75 mb-0.5" htmlFor="contact-message">Detailed Message</label>
                      <textarea
                        name="message"
                        id="contact-message"
                        required
                        rows={3}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Write your questions, book length details, or custom project ideas..."
                        className="w-full text-xs font-sans px-3 py-2 rounded border border-gold-base/35 bg-white focus:outline-none focus:border-gold-base"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded bg-terracotta hover:bg-red-800 text-white font-sans font-bold text-xs shadow-md transition disabled:opacity-50 cursor-pointer"
                      id="btn-submit-contact-msg"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          <span>Delivering...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
