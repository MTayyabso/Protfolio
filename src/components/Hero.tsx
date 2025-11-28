import { motion, useScroll, useTransform } from 'framer-motion';
import { Icon } from '@iconify/react';
import { fadeInUp, charReveal } from '../config/motionConfig';
import { useTypewriter } from '../hooks/useTypewriter';

const Hero = () => {
  const roles = [
    'React Developer',
    'Node.js Expert',
    'MongoDB Specialist', 
    'Express.js Developer',
    'UI/UX Enthusiast',
    'Database Architect',
    'RESTful API Designer'
  ];
  const currentRole = useTypewriter(roles, 100, 50, 2000);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const name = 'Muhammad Tayyab Sohail';
  const nameChars = name.split('');

  const floatingIcons = [
    { icon: 'mdi:code-braces', className: 'top-20 left-10', delay: 0 },
    { icon: 'mdi:react', className: 'bottom-32 right-16', delay: 0.5 },
    { icon: 'mdi:nodejs', className: 'top-40 right-20', delay: 1 },
    { icon: 'mdi:database', className: 'bottom-48 left-20', delay: 1.5 },
  ];

  const stats = [
    { value: '15+', label: 'Projects Completed', icon: 'mdi:briefcase-check' },
    { value: '10+', label: 'Happy Clients', icon: 'mdi:account-group' },
    { value: '1.5+', label: 'Years Experience', icon: 'mdi:trophy' },
  ];

  const socialLinks = [
    { icon: 'mdi:github', url: 'https://github.com/MTayyabso', label: 'GitHub' },
    { icon: 'mdi:linkedin', url: 'https://www.linkedin.com/in/m-tayyab-sohail-5779ab339/', label: 'LinkedIn' },
    { icon: 'mdi:email', url: '#contact', label: 'Email' },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden py-20">
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,143,0,0.15),transparent_50%)]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Decorative grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,143,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,143,0,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />

      <motion.div className="container mx-auto px-6 z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main content wrapper */}
          <div className="text-center mb-16">
            {/* Badge/Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 inline-block"
            >
              <div className="px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-full backdrop-blur-sm">
                <span className="text-sm font-medium text-gray-200 flex items-center gap-2">
                  <Icon icon="mdi:hand-wave" className="text-primary" />
                  Welcome to my portfolio
                </span>
              </div>
            </motion.div>

            {/* Profile Image/Avatar Area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-8 relative inline-block"
            >
             
            </motion.div>

            {/* Animated name with character reveal */}
            <motion.div
              initial="initial"
              animate="animate"
              className="mb-4"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-secondary leading-tight">
                {nameChars.map((char, index) => (
                  <motion.span
                    key={index}
                    variants={charReveal}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.03,
                      type: 'spring',
                      stiffness: 200,
                      damping: 10,
                    }}
                    className="inline-block"
                    style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            {/* Subtitle with typewriter */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              transition={{ delay: 1.5 }}
              className="mb-6"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300 mb-3">
                MERN Stack Developer
              </h2>
              <div className="text-base sm:text-lg md:text-xl text-gray-400 flex items-center justify-center gap-2">
                <span>{currentRole}</span>
                <span className="inline-block w-0.5 h-5 bg-secondary animate-blink" />
              </div>
            </motion.div>

            {/* Professional tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 }}
              className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Crafting exceptional digital experiences with modern technologies. 
              Specialized in building scalable web applications and elegant user interfaces.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              transition={{ delay: 1.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255,143,0,0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group flex items-center gap-2"
              >
                <span className="relative z-10">Let's Work Together</span>
                <Icon icon="mdi:arrow-right" className="relative z-10 text-xl" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, borderColor: '#FFB74D' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-secondary text-secondary font-semibold rounded-full hover:bg-secondary hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <Icon icon="mdi:folder-multiple" className="text-xl" />
                View Projects
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1 }}
              className="flex justify-center gap-4 mb-16"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all duration-300 backdrop-blur-sm"
                  aria-label={social.label}
                >
                  <Icon icon={social.icon} className="text-xl" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center relative overflow-hidden group"
              >
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <Icon icon={stat.icon} className="text-4xl text-primary mb-3 mx-auto" />
                  <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="text-center"
          >
            <a href="#about" className="inline-block">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-xs text-gray-500 uppercase tracking-wider">Scroll Down</span>
                <Icon icon="mdi:chevron-down" className="text-3xl text-primary" />
              </motion.div>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating animated icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.className} opacity-20 hidden lg:block`}
          style={{ y: index % 2 === 0 ? y1 : y2 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ delay: 2 + item.delay, duration: 0.8 }}
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Icon icon={item.icon} className="text-6xl md:text-8xl text-primary" />
          </motion.div>
        </motion.div>
      ))}
    </section>
  );
};

export default Hero;
