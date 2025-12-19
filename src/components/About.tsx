import { motion, useScroll, useTransform } from 'framer-motion';
import { Icon } from '@iconify/react';
import { fadeInUp, slideInLeft, slideInRight, imageReveal, bounceIn } from '../config/motionConfig';
import { useState, useEffect, useRef } from 'react';
import profileImg from '../assets/profileimg.png';
import { TiltCard, ScrollReveal, GlassCard } from './animations';

const About = () => {
  const [yearsCount, setYearsCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    if (!isInView) return;

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
      setYearsCount(Math.min(Math.round(yearsIncrement * currentStep * 10) / 10, yearsTarget));
      setProjectsCount(Math.min(Math.round(projectsIncrement * currentStep), projectsTarget));
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView]);

  const timeline = [
    { year: '2023', title: 'Started Web Development', description: 'Began learning HTML, CSS, and JavaScript' },
    { year: '2023', title: 'MERN Stack Mastery', description: 'Deep dive into React, Node.js, Express, MongoDB' },
    { year: '2024', title: 'Professional Projects', description: 'Building production-ready applications' },
    { year: 'Now', title: 'Continuous Learning', description: 'Expanding into Next.js, TypeScript, and more' },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="py-12 sm:py-16 md:py-20 bg-gray-50 relative overflow-hidden"
    >
      {/* Animated background decorations */}
      <motion.div 
        className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        style={{ y: backgroundY }}
      />
      <motion.div 
        className="absolute bottom-20 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
        style={{ y: backgroundY }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          onViewportEnter={() => setIsInView(true)}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <motion.span 
            className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Get to know me
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <motion.div 
            className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Image with 3D tilt effect */}
          <ScrollReveal direction="left" delay={0.2}>
            <TiltCard 
              tiltAmount={10} 
              glareEnabled={true} 
              scale={1.02}
              className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 max-w-full"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
                className="relative w-full h-full"
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

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6"
                  >
                    <span className="text-white text-sm font-medium px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                      Muhammad Tayyab Sohail
                    </span>
                  </motion.div>
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-3 border border-gray-100"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-gray-700">Available for work</span>
                  </div>
                </motion.div>
              </motion.div>
            </TiltCard>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal direction="right" delay={0.3}>
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
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

              {/* Animated stats with glassmorphism */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, type: 'spring' }}
                >
                  <GlassCard className="p-4 bg-white/80 border-gray-200">
                    <motion.div
                      className="flex items-center gap-3"
                      whileHover={{ x: 5 }}
                    >
                      <motion.div 
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon icon="mdi:briefcase" className="text-xl sm:text-2xl text-primary" />
                      </motion.div>
                      <div>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">{yearsCount}+</p>
                        <p className="text-xs sm:text-sm text-gray-600">Years Experience</p>
                      </div>
                    </motion.div>
                  </GlassCard>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: 'spring' }}
                >
                  <GlassCard className="p-4 bg-white/80 border-gray-200">
                    <motion.div
                      className="flex items-center gap-3"
                      whileHover={{ x: 5 }}
                    >
                      <motion.div 
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon icon="mdi:check-all" className="text-xl sm:text-2xl text-secondary" />
                      </motion.div>
                      <div>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">{projectsCount}+</p>
                        <p className="text-xs sm:text-sm text-gray-600">Projects Done</p>
                      </div>
                    </motion.div>
                  </GlassCard>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 sm:mt-20 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-10">My Journey</h3>
          
          <div className="relative">
            {/* Timeline line */}
            <motion.div
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ transformOrigin: 'top' }}
            />

            {/* Timeline items */}
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.15, type: 'spring' }}
                  className={`relative flex items-center gap-4 md:gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg transform md:-translate-x-1/2 z-10"
                    whileHover={{ scale: 1.5 }}
                  />

                  {/* Content card */}
                  <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                    >
                      <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded mb-2">
                        {item.year}
                      </span>
                      <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
