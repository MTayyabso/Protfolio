import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { fadeInUp, slideInLeft, slideInRight, bounceIn } from '../config/motionConfig';

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
    { icon: 'mdi:github', url: 'https://github.com/MTayyabso', label: 'GitHub', color: 'hover:text-gray-900 hover:bg-gray-100' },
    { icon: 'mdi:linkedin', url: 'https://www.linkedin.com/in/m-tayyab-sohail-5779ab339/', label: 'LinkedIn', color: 'hover:text-blue-600 hover:bg-blue-50' },
    { icon: 'mdi:email', url: 'mailto:mtayyabsohail8@gmail.com ', label: 'Email', color: 'hover:text-primary hover:bg-primary/10' },
  ];

  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let's create something amazing together!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left column - Info */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideInLeft}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Let's Talk</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                Feel free to reach out through the form or connect with me on social media.
              </p>
            </div>

            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 10, scale: 1.02 }}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon icon="mdi:email" className="text-2xl text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-gray-900">mtayyabsohail8@gmail.com</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10, scale: 1.02 }}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Icon icon="mdi:map-marker" className="text-2xl text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-semibold text-gray-900">Faisalabad,Punjab,Pakistan</p>
                </div>
              </motion.div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Connect With Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.15, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 ${social.color} transition-all duration-300 shadow-sm hover:shadow-md`}
                    aria-label={social.label}
                  >
                    <Icon icon={social.icon} className="text-2xl" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column - Dynamic Form */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideInRight}
          >
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Name Field */}
              <div className="relative">
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setIsFocused({ ...isFocused, name: true })}
                  onBlur={() => {
                    setIsFocused({ ...isFocused, name: false });
                    handleBlur('name');
                  }}
                  whileFocus={{ scale: 1.01 }}
                  className={`w-full px-4 py-4 bg-gray-50 border-2 ${
                    errors.name ? 'border-red-400' : 'border-gray-200'
                  } rounded-xl focus:border-primary focus:outline-none focus:bg-white transition-all duration-300`}
                  placeholder=" "
                />
                <label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    formData.name || isFocused.name
                      ? `-top-2 text-xs bg-white px-2 ${errors.name ? 'text-red-500' : 'text-primary'} font-medium`
                      : 'top-4 text-gray-500'
                  }`}
                >
                  Your Name {errors.name && '*'}
                </label>
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1 flex items-center gap-1"
                    >
                      <Icon icon="mdi:alert-circle" className="text-base" />
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Email Field */}
              <div className="relative">
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setIsFocused({ ...isFocused, email: true })}
                  onBlur={() => {
                    setIsFocused({ ...isFocused, email: false });
                    handleBlur('email');
                  }}
                  whileFocus={{ scale: 1.01 }}
                  className={`w-full px-4 py-4 bg-gray-50 border-2 ${
                    errors.email ? 'border-red-400' : 'border-gray-200'
                  } rounded-xl focus:border-primary focus:outline-none focus:bg-white transition-all duration-300`}
                  placeholder=" "
                />
                <label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    formData.email || isFocused.email
                      ? `-top-2 text-xs bg-white px-2 ${errors.email ? 'text-red-500' : 'text-primary'} font-medium`
                      : 'top-4 text-gray-500'
                  }`}
                >
                  Your Email {errors.email && '*'}
                </label>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1 flex items-center gap-1"
                    >
                      <Icon icon="mdi:alert-circle" className="text-base" />
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Message Field */}
              <div className="relative">
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setIsFocused({ ...isFocused, message: true })}
                  onBlur={() => {
                    setIsFocused({ ...isFocused, message: false });
                    handleBlur('message');
                  }}
                  rows={6}
                  whileFocus={{ scale: 1.01 }}
                  className={`w-full px-4 py-4 bg-gray-50 border-2 ${
                    errors.message ? 'border-red-400' : 'border-gray-200'
                  } rounded-xl focus:border-primary focus:outline-none focus:bg-white transition-all duration-300 resize-none`}
                  placeholder=" "
                />
                <label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    formData.message || isFocused.message
                      ? `-top-2 text-xs bg-white px-2 ${errors.message ? 'text-red-500' : 'text-primary'} font-medium`
                      : 'top-4 text-gray-500'
                  }`}
                >
                  Your Message {errors.message && '*'}
                </label>
                <AnimatePresence>
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1 flex items-center gap-1"
                    >
                      <Icon icon="mdi:alert-circle" className="text-base" />
                      {errors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                whileHover={!isSubmitting ? { scale: 1.02, boxShadow: '0 20px 40px rgba(255,143,0,0.3)' } : {}}
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
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
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Icon icon="mdi:check-circle" className="text-xl" />
                        Message Sent!
                      </motion.span>
                    ) : submitStatus === 'error' ? (
                      <motion.span
                        key="error"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Icon icon="mdi:alert-circle" className="text-xl" />
                        Failed to Send
                      </motion.span>
                    ) : (
                      <motion.span
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        Send Message
                        <Icon icon="mdi:send" className="text-xl" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                {!isSubmitting && submitStatus === 'idle' && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>

              {/* Success Message with Confetti */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    className="text-center p-4 bg-green-50 border-2 border-green-200 rounded-lg"
                  >
                    <motion.div
                      variants={bounceIn}
                      initial="initial"
                      animate="animate"
                      className="flex items-center justify-center gap-2 text-green-700 font-semibold"
                    >
                      <Icon icon="mdi:check-circle" className="text-2xl" />
                      Thank you! I'll get back to you soon.
                    </motion.div>
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    className="text-center p-4 bg-red-50 border-2 border-red-200 rounded-lg"
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
        </div>
      </div>
    </section>
  );
};

export default Contact;
