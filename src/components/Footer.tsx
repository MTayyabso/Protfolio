import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { fadeInUp, slideInLeft, slideInRight } from '../config/motionConfig';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: 'mdi:github', url: 'https://github.com/MTayyabso', label: 'GitHub' },
    { icon: 'mdi:linkedin', url: 'https://www.linkedin.com/in/tayyab-sohail-dev/', label: 'LinkedIn' },
    { icon: 'mdi:email', url: 'mailto:mtayyabsohail8@gmail.com', label: 'Email' },
  ];

  const services = [
    'Full Stack Development',
    'React & Vue.js Development',
    'Node.js Backend',
    'MongoDB Database',
    'REST API Development',
    'Next.js & Nuxt.js',
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      {/* Wave separator */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-12 fill-white">
          <path d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,48C1248,53,1344,75,1392,85.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
        </svg>
      </div>

      <div className="container mx-auto px-6 pt-20 pb-8 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Column */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={slideInLeft}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Muhammad Tayyab Sohail
            </h3>
            <p className="text-gray-400 leading-relaxed">
              A passionate MERN stack developer crafting digital experiences that make a difference.
            </p>
            <div className="flex items-center gap-2 text-gray-400">
              <Icon icon="mdi:map-marker" className="text-primary" />
              <span className="text-sm">Faisalabad,Punjab,Pakistan</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <Icon 
                      icon="mdi:chevron-right" 
                      className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" 
                    />
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <motion.li
                  key={service}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-gray-400 flex items-center gap-2"
                >
                  <Icon icon="mdi:check-circle" className="text-secondary text-sm" />
                  {service}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={slideInRight}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white mb-4">Stay Connected</h4>
            <p className="text-gray-400 text-sm mb-4">
              Follow me on social media for updates and new projects
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary hover:bg-gray-700 transition-all duration-300"
                  aria-label={social.label}
                >
                  <Icon icon={social.icon} className="text-xl" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8" />

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex flex-col md:flex-row items-center gap-2 text-gray-400 text-sm">
            <p>
              © {currentYear} <span className="text-primary font-semibold">Muhammad Tayyab Sohail</span>
            </p>
            <span className="hidden md:inline">•</span>
            <p>All rights reserved.</p>
          </div>

        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
