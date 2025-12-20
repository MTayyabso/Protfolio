
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  
  // Smooth background and shadow transitions
  const backgroundColor = useTransform(
    scrollY,
    [0, 50, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.95)']
  );
  
  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    ['0 0 0 0 rgba(0, 0, 0, 0)', '0 4px 20px 0 rgba(0, 0, 0, 0.1)']
  );

  const navLinks = [
    { name: 'Home', href: '#', icon: 'mdi:home' },
    { name: 'About', href: '#about', icon: 'mdi:account' },
    { name: 'Skills', href: '#skills', icon: 'mdi:code-braces' },
    { name: 'Projects', href: '#projects', icon: 'mdi:briefcase' },
    { name: 'Contact', href: '#contact', icon: 'mdi:email' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always keep navbar visible and sticky
      setIsVisible(true);
      
      // Update scrolled state for styling
      if (currentScrollY < 50) {
        setScrolled(false);
      } else {
        setScrolled(true);
      }
      
      setLastScrollY(currentScrollY);

      // Update active section
      const sections = navLinks.map(link => link.href);
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] === '#') continue;
        const section = document.querySelector(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
      
      // Set home as active when at top
      if (currentScrollY < 300) {
        setActiveSection('#');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
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
    <>
      <motion.nav
        style={{ 
          backgroundColor: scrolled ? backgroundColor : 'rgba(255, 255, 255, 0)',
          boxShadow: scrolled ? boxShadow : '0 0 0 0 rgba(0, 0, 0, 0)',
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ 
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? 'backdrop-blur-xl' : ''}`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => handleNavClick(e, '#')}
              className="relative"
            >
              {/* Show full logo on desktop, icon on mobile */}
              <div className="hidden sm:block">
                <Logo variant="full" />
              </div>
              <div className="block sm:hidden">
                <Logo variant="icon" />
              </div>
            </a>

            {/* Desktop Navigation with enhanced design */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, type: 'spring' }}
                  className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 group ${
                    activeSection === link.href
                      ? 'text-white'
                      : scrolled 
                      ? 'text-gray-700 hover:text-primary'
                      : 'text-white hover:text-primary-light'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Active background */}
                  {activeSection === link.href && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl shadow-lg"
                      initial={false}
                      transition={{ 
                        type: 'spring', 
                        stiffness: 500, 
                        damping: 30,
                      }}
                    />
                  )}
                  
                  {/* Hover background */}
                  <motion.div
                    className={`absolute inset-0 ${scrolled ? 'bg-gray-100' : 'bg-white/20'} rounded-xl`}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: activeSection === link.href ? 0 : 0.8 }}
                    transition={{ duration: 0.2 }}
                  />
                  
                  {/* Content */}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon icon={link.icon} className="text-lg" />
                    <span className="hidden lg:inline">{link.name}</span>
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button - Enhanced */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden w-12 h-12 flex items-center justify-center rounded-xl ${
                scrolled ? 'bg-gray-100 text-gray-700' : 'bg-white/20 text-white'
              } backdrop-blur-sm shadow-lg`}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? 'close' : 'menu'}
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon
                    icon={isOpen ? 'mdi:close' : 'mdi:menu'}
                    className="text-3xl"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Enhanced */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            
            {/* Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Close button */}
                <div className="flex justify-end mb-8">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700"
                  >
                    <Icon icon="mdi:close" className="text-3xl" />
                  </motion.button>
                </div>

                {/* Navigation links */}
                <div className="flex flex-col gap-3">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, type: 'spring' }}
                      className={`flex items-center gap-4 p-4 rounded-xl font-semibold text-lg transition-all ${
                        activeSection === link.href
                          ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon icon={link.icon} className="text-2xl" />
                      {link.name}
                    </motion.a>
                  ))}
                </div>

                {/* Social links in mobile menu */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 pt-8 border-t border-gray-200"
                >
                  <p className="text-sm text-gray-500 mb-4">Connect with me</p>
                  <div className="flex gap-3">
                    {[
                      { icon: 'mdi:github', label: 'GitHub' },
                      { icon: 'mdi:linkedin', label: 'LinkedIn' },
                      { icon: 'mdi:twitter', label: 'Twitter' },
                      { icon: 'mdi:email', label: 'Email' },
                    ].map((social) => (
                      <motion.a
                        key={social.label}
                        href="#"
                        whileHover={{ scale: 1.2, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white transition-all"
                        aria-label={social.label}
                      >
                        <Icon icon={social.icon} className="text-xl" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;