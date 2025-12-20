import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useState, useRef } from 'react';
import { fadeInUp } from '../config/motionConfig';
import { ScrollReveal, RippleEffect, MagneticButton } from './animations';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  // Email validation regex
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Web3Forms API Integration
      const formDataToSend = new FormData();
      formDataToSend.append('access_key', import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '');
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('subject', `New Contact Form Submission from ${formData.name}`);
      formDataToSend.append('from_name', 'Portfolio Contact Form');
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        console.log('Form submitted successfully:', result);
        setSubmitStatus('success');
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({ name: '', email: '', message: '' });
          setSubmitStatus('idle');
        }, 3000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
      
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      
      // Reset error status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleBlur = (field: keyof FormErrors) => {
    // Validate individual field on blur
    const newErrors: FormErrors = { ...errors };

    switch (field) {
      case 'name':
        if (!formData.name.trim()) {
          newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        }
        break;
      case 'email':
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
          newErrors.email = 'Please enter a valid email';
        }
        break;
      case 'message':
        if (!formData.message.trim()) {
          newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
          newErrors.message = 'Message must be at least 10 characters';
        }
        break;
    }

    setErrors(newErrors);
  };

  const socialLinks = [
    { icon: 'mdi:github', url: 'https://github.com/MTayyabso', label: 'GitHub', color: 'hover:text-gray-900 hover:bg-gray-100', hoverShadow: 'rgba(0,0,0,0.2)' },
    { icon: 'mdi:linkedin', url: 'https://www.linkedin.com/in/tayyab-sohail-dev/', label: 'LinkedIn', color: 'hover:text-blue-600 hover:bg-blue-50', hoverShadow: 'rgba(37,99,235,0.3)' },
    { icon: 'mdi:email', url: 'mailto:mtayyabsohail8@gmail.com', label: 'Email', color: 'hover:text-primary hover:bg-primary/10', hoverShadow: 'rgba(255,143,0,0.3)' },
  ];

  const contactInfo = [
    { icon: 'mdi:email', label: 'Email', value: 'mtayyabsohail8@gmail.com', color: 'primary' },
    { icon: 'mdi:map-marker', label: 'Location', value: 'Faisalabad, Punjab, Pakistan', color: 'secondary' },
  ];

  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Contact me
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <motion.div 
            className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let's create something amazing together!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left column - Info */}
          <ScrollReveal direction="left" delay={0.2}>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Let's Talk</h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                  Feel free to reach out through the form or connect with me on social media.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 10, scale: 1.02 }}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group"
                  >
                    <motion.div 
                      className={`w-12 h-12 bg-${info.color}/10 rounded-lg flex items-center justify-center`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon icon={info.icon} className={`text-2xl text-${info.color}`} />
                    </motion.div>
                    <div>
                      <p className="text-sm text-gray-500">{info.label}</p>
                      <p className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Connect With Me</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <MagneticButton key={social.label} magneticStrength={0.4}>
                      <motion.a
                        href={social.url}
                        target={social.label !== 'Email' ? '_blank' : undefined}
                        rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + index * 0.1, type: 'spring' }}
                        whileHover={{ 
                          y: -5,
                          boxShadow: `0 10px 30px ${social.hoverShadow}`,
                        }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 ${social.color} transition-all duration-300 shadow-sm hover:shadow-lg`}
                        aria-label={social.label}
                      >
                        <Icon icon={social.icon} className="text-2xl" />
                      </motion.a>
                    </MagneticButton>
                  ))}
                </div>
              </div>

              {/* Availability status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-800">Available for freelance</p>
                    <p className="text-sm text-green-600">Typically respond within 24 hours</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Right column - Form */}
          <ScrollReveal direction="right" delay={0.3}>
            <motion.div
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8"
              whileHover={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
              transition={{ duration: 0.3 }}
            >
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Name Field */}
                <div className="relative">
                  <motion.div
                    animate={{
                      scale: isFocused.name ? 1.02 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setIsFocused({ ...isFocused, name: true })}
                      onBlur={() => {
                        setIsFocused({ ...isFocused, name: false });
                        handleBlur('name');
                      }}
                      className={`w-full px-4 py-4 bg-gray-50 border-2 ${
                        errors.name ? 'border-red-400' : isFocused.name ? 'border-primary' : 'border-gray-200'
                      } rounded-xl focus:outline-none focus:bg-white transition-all duration-300`}
                      placeholder=" "
                    />
                    <label
                      htmlFor="name"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        formData.name || isFocused.name
                          ? `-top-2.5 text-xs bg-white px-2 ${errors.name ? 'text-red-500' : 'text-primary'} font-medium`
                          : 'top-4 text-gray-500'
                      }`}
                    >
                      Your Name {errors.name && '*'}
                    </label>
                  </motion.div>
                  
                  {/* Focus indicator line */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                    initial={{ width: 0, x: '-50%' }}
                    animate={{ 
                      width: isFocused.name ? '100%' : 0,
                      x: isFocused.name ? '-50%' : '-50%'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="text-red-500 text-sm mt-2 flex items-center gap-1"
                      >
                        <Icon icon="mdi:alert-circle" className="text-base" />
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <motion.div
                    animate={{
                      scale: isFocused.email ? 1.02 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setIsFocused({ ...isFocused, email: true })}
                      onBlur={() => {
                        setIsFocused({ ...isFocused, email: false });
                        handleBlur('email');
                      }}
                      className={`w-full px-4 py-4 bg-gray-50 border-2 ${
                        errors.email ? 'border-red-400' : isFocused.email ? 'border-primary' : 'border-gray-200'
                      } rounded-xl focus:outline-none focus:bg-white transition-all duration-300`}
                      placeholder=" "
                    />
                    <label
                      htmlFor="email"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        formData.email || isFocused.email
                          ? `-top-2.5 text-xs bg-white px-2 ${errors.email ? 'text-red-500' : 'text-primary'} font-medium`
                          : 'top-4 text-gray-500'
                      }`}
                    >
                      Your Email {errors.email && '*'}
                    </label>
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                    initial={{ width: 0, x: '-50%' }}
                    animate={{ 
                      width: isFocused.email ? '100%' : 0,
                      x: isFocused.email ? '-50%' : '-50%'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="text-red-500 text-sm mt-2 flex items-center gap-1"
                      >
                        <Icon icon="mdi:alert-circle" className="text-base" />
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Message Field */}
                <div className="relative">
                  <motion.div
                    animate={{
                      scale: isFocused.message ? 1.01 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <textarea
                      name="message"
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setIsFocused({ ...isFocused, message: true })}
                      onBlur={() => {
                        setIsFocused({ ...isFocused, message: false });
                        handleBlur('message');
                      }}
                      rows={6}
                      className={`w-full px-4 py-4 bg-gray-50 border-2 ${
                        errors.message ? 'border-red-400' : isFocused.message ? 'border-primary' : 'border-gray-200'
                      } rounded-xl focus:outline-none focus:bg-white transition-all duration-300 resize-none`}
                      placeholder=" "
                    />
                    <label
                      htmlFor="message"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        formData.message || isFocused.message
                          ? `-top-2.5 text-xs bg-white px-2 ${errors.message ? 'text-red-500' : 'text-primary'} font-medium`
                          : 'top-4 text-gray-500'
                      }`}
                    >
                      Your Message {errors.message && '*'}
                    </label>
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                    initial={{ width: 0, x: '-50%' }}
                    animate={{ 
                      width: isFocused.message ? '100%' : 0,
                      x: isFocused.message ? '-50%' : '-50%'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="text-red-500 text-sm mt-2 flex items-center gap-1"
                      >
                        <Icon icon="mdi:alert-circle" className="text-base" />
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit Button */}
                <RippleEffect className="w-full rounded-xl">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || submitStatus === 'success'}
                    whileHover={!isSubmitting ? { 
                      scale: 1.02,
                      boxShadow: '0 20px 40px rgba(255,143,0,0.3)'
                    } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    className={`w-full px-8 py-4 font-semibold rounded-xl shadow-lg transition-all duration-300 relative overflow-hidden group ${
                      submitStatus === 'success'
                        ? 'bg-green-500 text-white'
                        : submitStatus === 'error'
                        ? 'bg-red-500 text-white'
                        : 'bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-2xl'
                    } ${isSubmitting || submitStatus === 'success' ? 'cursor-not-allowed opacity-80' : ''}`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <AnimatePresence mode="wait">
                        {isSubmitting ? (
                          <motion.span
                            key="loading"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex items-center gap-2"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                              <Icon icon="mdi:loading" className="text-xl" />
                            </motion.div>
                            Sending...
                          </motion.span>
                        ) : submitStatus === 'success' ? (
                          <motion.span
                            key="success"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="flex items-center gap-2"
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: [0, 1.2, 1] }}
                              transition={{ duration: 0.5 }}
                            >
                              <Icon icon="mdi:check-circle" className="text-xl" />
                            </motion.div>
                            Message Sent!
                          </motion.span>
                        ) : submitStatus === 'error' ? (
                          <motion.span
                            key="error"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="flex items-center gap-2"
                          >
                            <Icon icon="mdi:alert-circle" className="text-xl" />
                            Failed to Send
                          </motion.span>
                        ) : (
                          <motion.span
                            key="default"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex items-center gap-2"
                          >
                            Send Message
                            <motion.span
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <Icon icon="mdi:send" className="text-xl" />
                            </motion.span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    
                    {/* Hover gradient overlay */}
                    {!isSubmitting && submitStatus === 'idle' && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                </RippleEffect>

                {/* Status Messages */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="flex items-center justify-center gap-2 text-green-700 font-semibold"
                      >
                        <Icon icon="mdi:check-circle" className="text-2xl" />
                        Thank you! I'll get back to you soon.
                      </motion.div>
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="text-center p-4 bg-red-50 border-2 border-red-200 rounded-xl"
                    >
                      <div className="flex items-center justify-center gap-2 text-red-700 font-semibold">
                        <Icon icon="mdi:alert-circle" className="text-2xl" />
                        Oops! Something went wrong. Please try again.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
