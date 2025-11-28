import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { fadeInUp, slideInLeft, slideInRight, imageReveal, bounceIn } from '../config/motionConfig';
import { useState, useEffect } from 'react';
import profileImg from '../assets/profileimg.png';

const About = () => {
  const [yearsCount, setYearsCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);

  useEffect(() => {
    // Animate counters
    const yearsTarget = 1.5;
    const projectsTarget = 15;
    const duration = 2000;
    const steps = 50;
    const yearsIncrement = yearsTarget / steps;
    const projectsIncrement = projectsTarget / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setYearsCount(Math.min(Math.round(yearsIncrement * currentStep), yearsTarget));
      setProjectsCount(Math.min(Math.round(projectsIncrement * currentStep), projectsTarget));
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Image with reveal effect */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideInLeft}
            className="relative order-1 lg:order-1"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotateZ: 2 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
              className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 max-w-full"
            >
              {/* Decorative backgrounds */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl sm:rounded-3xl rotate-6"
                animate={{ rotate: [6, 8, 6] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ opacity: 0.2 }}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-secondary to-primary rounded-2xl sm:rounded-3xl -rotate-6"
                animate={{ rotate: [-6, -8, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ opacity: 0.2 }}
              />
              
              {/* Main image container */}
              <motion.div
                variants={imageReveal}
                className="relative w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-4 border-white shadow-xl sm:shadow-2xl"
              >
                {/* Profile image */}
                <img 
                  src={profileImg} 
                  alt="Muhammad Tayyab Sohail"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to icon if image doesn't load
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                {/* Fallback icon if image fails to load */}
                <div className="w-full h-full hidden items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                  <Icon icon="mdi:account" className="text-7xl sm:text-8xl md:text-9xl text-gray-400" />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideInRight}
            className="space-y-4 sm:space-y-5 md:space-y-6 order-2 lg:order-2"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Full-Stack Developer &amp; Problem Solver
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Passionate MERN stack developer with expertise in building modern, scalable web applications.
              I specialize in creating seamless user experiences with React, developing robust APIs with Node.js,
              and crafting beautiful, responsive interfaces.
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              With a keen eye for design and a commitment to clean code, I transform ideas into
              production-ready applications that users love. I'm constantly learning and staying updated
              with the latest web technologies.
            </p>

            {/* Animated stats */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6">
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={bounceIn}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon icon="mdi:briefcase" className="text-xl sm:text-2xl text-primary" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{yearsCount}+</p>
                  <p className="text-xs sm:text-sm text-gray-600">Years Experience</p>
                </div>
              </motion.div>

              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={bounceIn}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon icon="mdi:check-all" className="text-xl sm:text-2xl text-secondary" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{projectsCount}+</p>
                  <p className="text-xs sm:text-sm text-gray-600">Projects Done</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
