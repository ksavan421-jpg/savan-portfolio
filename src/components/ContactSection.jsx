import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { LinkedinIcon, DribbbleIcon } from './Icons';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail Id: ${formData.email}\nContact Number: ${formData.phone}\n\nWrite Your Message:\n${formData.message}`
    );

    // Sends directly to ksavan421@gmail.com
    window.location.href = `mailto:ksavan421@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setTimeout(() => setIsSuccess(false), 8000);
    }, 500);
  };

  return (
    <section 
      id="contact" 
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
    >
      {/* 0033FF 56% Radial Glow on Top Left of Contact */}
      <div 
        className="pointer-events-none absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full blur-3xl opacity-50 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(0, 51, 255, 0.56) 0%, rgba(0, 29, 143, 0.20) 45%, rgba(0, 0, 0, 0) 75%)'
        }}
      />
      {/* 0033FF 46% Radial Glow on Bottom Right of Contact */}
      <div 
        className="pointer-events-none absolute -bottom-20 -right-20 w-[600px] h-[600px] rounded-full blur-3xl opacity-45 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(0, 51, 255, 0.46) 0%, rgba(0, 29, 143, 0.18) 45%, rgba(0, 0, 0, 0) 75%)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-[0.28em] text-white/90 uppercase block mb-2 sm:mb-3">
            START A CONVERSATION
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-sans-ui">
            Let's Build Something Extraordinary
          </h2>
          <p className="mt-3 sm:mt-4 text-zinc-400 max-w-2xl mx-auto text-xs sm:text-base">
            Have a project in mind or looking for a UI/UX Designer who can also hand-code the frontend? Send a message and let's connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#090d1a]/80 border border-white/10 shadow-xl space-y-5 sm:space-y-6">
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src="/profile-pic.png" 
                    alt="Savan" 
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#0033FF]"
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-black" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Savan</h3>
                  <p className="text-xs text-blue-300 font-medium">Sr. UI/UX &amp; Web Designer</p>
                  <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                    ● Fast response within 24h
                  </p>
                </div>
              </div>

              {/* Contact Details: ksavan421@gmail.com and New Delhi, India */}
              <div className="space-y-4 pt-4 border-t border-white/10 text-sm">
                
                <a 
                  href="mailto:ksavan421@gmail.com" 
                  className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#001D8F] transition-colors">
                    <Mail className="w-4 h-4 text-blue-400 group-hover:text-white" />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-500 block">Email Id</span>
                    <span className="font-medium text-white">ksavan421@gmail.com</span>
                  </div>
                </a>

                <div className="flex items-center gap-3 text-zinc-300">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-500 block">Location</span>
                    <span className="font-medium text-white">New Delhi, India</span>
                  </div>
                </div>

              </div>

              {/* Social links (GitHub & Pinterest removed as requested) */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-xs text-zinc-400 font-medium block mb-3">Connect on Professional Networks</span>
                <div className="flex items-center gap-2.5">
                  {[
                    { label: 'LinkedIn', icon: <LinkedinIcon className="w-4 h-4" />, href: 'https://linkedin.com' },
                    { label: 'Dribbble', icon: <DribbbleIcon className="w-4 h-4" />, href: 'https://dribbble.com' }
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-[#001D8F] hover:border-[#0033FF] transition-all duration-300 shadow-sm flex items-center gap-2 text-xs font-medium"
                      title={s.label}
                    >
                      {s.icon}
                      <span>{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Custom Form */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#090d1a]/80 border border-white/10 shadow-2xl relative">
              
              {isSuccess && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>Thank you! Your message has been prepared to send to ksavan421@gmail.com. Savan will get back to you shortly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Name* and Email Id* Fields in Flex (50% - 50%) */}
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="w-full sm:w-1/2 space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
                      Name*
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#0033FF] focus:outline-none text-white text-sm placeholder-zinc-500 transition-colors"
                    />
                  </div>

                  <div className="w-full sm:w-1/2 space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
                      Email Id*
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#0033FF] focus:outline-none text-white text-sm placeholder-zinc-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Contact Number* Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
                    Contact Number*
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter your contact / phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#0033FF] focus:outline-none text-white text-sm placeholder-zinc-500 transition-colors"
                  />
                </div>

                {/* Write Your Message Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
                    Write Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#0033FF] focus:outline-none text-white text-sm placeholder-zinc-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-[#001D8F] hover:bg-[#0027bd] border border-[#0033FF]/40 shadow-xl shadow-[#001D8F]/50 hover:shadow-[#0033FF]/60 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Preparing Message...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send to ksavan421@gmail.com
                    </span>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
