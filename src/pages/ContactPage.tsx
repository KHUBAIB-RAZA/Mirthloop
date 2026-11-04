import React, { useState } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { siteConfig } from '../config/site';
import { Mail, Send, MessageSquare, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  useDocumentTitle({
    title: 'Contact Us — Support & Inquiries',
    description: 'Get in touch with the Mirthloop team for feedback, bug reports, or game suggestions.',
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email format';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please enter a message';
    } else if (formData.message.length < 10) {
      errs.message = 'Message must be at least 10 characters long';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Contact the Mirthloop Team
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Have an idea for our next game, spotted a bug in Arrow Dash, or want to provide feedback? We welcome messages from players worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Direct Email Contact Info Card */}
        <div className="md:col-span-1 space-y-4">
          <div className="arcade-glow-card rounded-2xl p-6 border border-[#232C4F] space-y-4">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 w-fit">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Direct Email Support</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              For direct communication, partnership inquiries, or legal notifications:
            </p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="inline-block font-mono text-xs text-cyan-400 hover:text-cyan-300 break-all underline"
            >
              {siteConfig.contactEmail}
            </a>
          </div>

          <div className="p-5 rounded-2xl bg-[#0F1424] border border-[#232C4F] space-y-2 text-xs text-slate-400">
            <div className="flex items-center space-x-1.5 text-slate-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>V1 Static Frontend Notice</span>
            </div>
            <p className="leading-relaxed">
              Mirthloop is a serverless static web application. Messages submitted via the form simulate client validation; please send an email directly to <span className="font-mono text-cyan-400">{siteConfig.contactEmail}</span> for guaranteed replies.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <div className="arcade-glow-card rounded-2xl p-6 sm:p-8 border border-[#232C4F]">
            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Thank You for Your Feedback!</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Your message was verified by our client validator. Since Mirthloop operates as a serverless static platform, please also feel free to copy your inquiry to{' '}
                  <span className="font-mono text-cyan-300 font-semibold">{siteConfig.contactEmail}</span>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="mt-4 px-5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Your Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Hunter"
                    className={`w-full bg-[#0A0D18] border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      errors.name ? 'border-rose-500 focus:border-rose-500' : 'border-[#232C4F] focus:border-cyan-500'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Your Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@example.com"
                    className={`w-full bg-[#0A0D18] border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-[#232C4F] focus:border-cyan-500'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Subject (Optional)
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Arrow Dash Feature Suggestion"
                    className="w-full bg-[#0A0D18] border border-[#232C4F] focus:border-cyan-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your feedback, question, or bug description here..."
                    className={`w-full bg-[#0A0D18] border rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors resize-none ${
                      errors.message ? 'border-rose-500 focus:border-rose-500' : 'border-[#232C4F] focus:border-cyan-500'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-glow-button transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Feedback</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
