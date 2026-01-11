
import React, { useState } from 'react';
import { X, Send, Clapperboard, Star, Sparkles, CheckCircle } from 'lucide-react';

interface InquireModalProps {
  onClose: () => void;
}

const InquireModal: React.FC<InquireModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    rating: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRating = (r: number) => {
    setFormData(prev => ({ ...prev, rating: r }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Construct Email Content
    const subject = encodeURIComponent(`Production Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Producer/Client: ${formData.name}\n` +
      `Production Priority Rating: ${formData.rating}/5\n\n` +
      `Project Brief:\n${formData.message}`
    );
    
    // Simulate a cinematic processing delay
    setTimeout(() => {
      window.location.href = `mailto:faimmpathan@gmail.com?subject=${subject}&body=${body}`;
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Auto close after success message
      setTimeout(() => {
        onClose();
      }, 3000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-500" 
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-neutral-950 border border-white/10 shadow-[0_0_100px_rgba(220,38,38,0.1)] overflow-hidden animate-in zoom-in fade-in duration-500">
        
        {/* Progress Bar (Visual Only) */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
          <div 
            className="h-full bg-red-600 transition-all duration-500" 
            style={{ width: isSubmitting ? '100%' : isSuccess ? '100%' : '0%' }}
          ></div>
        </div>

        {/* Header */}
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.5em] mb-1">Inquiry Terminal</span>
            <h2 className="font-heading text-4xl tracking-tighter uppercase">START PRODUCTION</h2>
          </div>
          <button 
            onClick={onClose} 
            className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors border border-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8">
          {isSuccess ? (
            <div className="py-20 flex flex-col items-center text-center space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="w-24 h-24 rounded-full border-2 border-red-600 flex items-center justify-center text-red-600 animate-pulse">
                <CheckCircle size={48} />
              </div>
              <div className="space-y-2">
                <h3 className="font-heading text-3xl uppercase tracking-tight">Dispatch Sent</h3>
                <p className="text-white/40 text-sm font-light italic">Your project brief has been encrypted and routed to the Director.</p>
              </div>
              <button 
                onClick={onClose}
                className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors"
              >
                Close Console
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Field */}
              <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 group-focus-within:text-red-600 transition-colors">01. Producer Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="IDENTIFY YOURSELF..."
                  className="w-full bg-black border border-white/10 p-5 text-xl font-heading tracking-tight outline-none focus:border-red-600 focus:shadow-[0_0_20px_rgba(220,38,38,0.1)] transition-all placeholder:text-white/5"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 group-focus-within:text-red-600 transition-colors">02. Project Brief / Msg Box</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="TELL US THE STORY..."
                  className="w-full bg-black border border-white/10 p-5 text-sm font-medium leading-relaxed outline-none focus:border-red-600 focus:shadow-[0_0_20px_rgba(220,38,38,0.1)] transition-all placeholder:text-white/5 resize-none"
                ></textarea>
              </div>

              {/* Rating Box */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">03. Production Tier / Rating Box</label>
                <div className="flex gap-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRating(star)}
                      className={`group relative w-14 h-14 flex items-center justify-center border transition-all duration-300 ${
                        formData.rating >= star 
                        ? 'border-red-600 bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]' 
                        : 'border-white/10 bg-black text-white/20 hover:border-white/40'
                      }`}
                    >
                      <Clapperboard size={20} className={formData.rating >= star ? 'animate-bounce' : ''} />
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-black opacity-0 group-hover:opacity-100 transition-opacity">TIER 0{star}</span>
                    </button>
                  ))}
                </div>
                <p className="text-[9px] text-white/20 italic font-light">Select the intensity/tier required for this production archive.</p>
              </div>

              {/* Action */}
              <button 
                disabled={isSubmitting}
                type="submit"
                className={`w-full py-6 flex items-center justify-center gap-4 text-xs font-black uppercase tracking-[0.4em] transition-all relative overflow-hidden ${
                  isSubmitting ? 'bg-neutral-800 cursor-wait' : 'bg-red-600 hover:bg-red-700 active:scale-[0.98]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    TRANSMITTING...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    SEND DISPATCH
                  </>
                )}
                
                {/* Visual Glitch Decor */}
                <div className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center">
                    <Sparkles className="animate-pulse" size={40} />
                </div>
              </button>
            </form>
          )}
        </div>

        {/* Footer Text */}
        <div className="p-6 bg-black text-center border-t border-white/5">
           <p className="text-[8px] text-white/20 font-black uppercase tracking-widest">
            DIRECT SECURE CHANNEL: FAIMMPATHAN@GMAIL.COM — EST. 2025
             </p> <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.5em] mb-1">CONTACT: 9921892269</span>
           
        </div>
      </div>
    </div>
  );
};

export default InquireModal;
