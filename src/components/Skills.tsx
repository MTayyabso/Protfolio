import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Icon } from '@iconify/react';
import { fadeInUp, staggerContainer, popIn } from '../config/motionConfig';
import { useState, useRef } from 'react';
import { GlassCard, StaggerChildren, StaggerItem } from './animations';

interface Skill {
  name: string;
  icon: string;
  color: string;
  level: number;
}

const skills: Skill[] = [
  { name: 'React', icon: 'mdi:react', color: '#61DAFB', level: 95 },
  { name: 'Node.js', icon: 'mdi:nodejs', color: '#339933', level: 90 },
  { name: 'MongoDB', icon: 'mdi:database', color: '#47A248', level: 85 },
  { name: 'Express', icon: 'simple-icons:express', color: '#000000', level: 88 },
  { name: 'TypeScript', icon: 'mdi:language-typescript', color: '#3178C6', level: 92 },
  { name: 'JavaScript', icon: 'mdi:language-javascript', color: '#F7DF1E', level: 95 },
  { name: 'Tailwind CSS', icon: 'mdi:tailwind', color: '#06B6D4', level: 93 },
  { name: 'Git', icon: 'mdi:git', color: '#F05032', level: 90 },
  { name: 'Next.js', icon: 'mdi:nuxt', color: '#000000', level: 88 },
  { name: 'Vue.js', icon: 'mdi:vuejs', color: '#4FC08D', level: 85 },
  { name: 'Nuxt.js', icon: 'mdi:nuxt', color: '#00DC82', level: 82 },
  { name: 'REST API', icon: 'mdi:api', color: '#FF8F00', level: 92 },
];

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 100 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{
        perspective: 1000,
      }}
      className="cursor-pointer"
    >
      <motion.div
        animate={{
          y: isHovered ? -12 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        style={{
          rotateX: isHovered ? springRotateX : 0,
          rotateY: isHovered ? springRotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative group"
      >
        {/* Card front */}
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
          style={{ backfaceVisibility: 'hidden' }}
          className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100/50 relative"
        >
          {/* Glassmorphism effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
          
          {/* Gradient overlay on hover */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: isHovered ? '100%' : '-100%' }}
            transition={{ duration: 0.6 }}
          />

          <div className="relative z-10 flex flex-col items-center gap-4">
            {/* Icon with 3D rotation and glow */}
            <motion.div
              animate={{
                rotateY: isHovered ? 360 : 0,
                rotateX: isHovered ? [0, 10, 0] : 0,
              }}
              transition={{ 
                rotateY: { duration: 0.8, type: 'spring' },
                rotateX: { duration: 0.4, delay: 0.1 }
              }}
              className="relative w-16 h-16 flex items-center justify-center rounded-xl bg-white shadow-lg"
              style={{ 
                color: skill.color,
                boxShadow: isHovered ? `0 10px 40px ${skill.color}40` : undefined,
                transformStyle: 'preserve-3d',
              }}
            >
              <Icon icon={skill.icon} className="text-4xl" style={{ transform: 'translateZ(10px)' }} />
              
              {/* Glowing ring on hover */}
              <motion.div
                className="absolute inset-0 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: isHovered ? [0.5, 0.8, 0.5] : 0,
                  scale: isHovered ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ 
                  border: `2px solid ${skill.color}`,
                  boxShadow: `0 0 20px ${skill.color}60`
                }}
              />
            </motion.div>

            <div className="text-center w-full">
              <h3 className="font-bold text-gray-900 mb-3">{skill.name}</h3>

              {/* Progress bar with shimmer */}
              <div className="w-full bg-gray-200/80 rounded-full h-2.5 overflow-hidden backdrop-blur-sm">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 1.5, 
                    delay: index * 0.08,
                    type: 'spring',
                    stiffness: 30,
                    damping: 15,
                  }}
                  className="h-full rounded-full relative overflow-hidden"
                  style={{ 
                    background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})` 
                  }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    }}
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: index * 0.1 }}
                  />
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 + 0.5 }}
                className="text-xs mt-2 font-semibold"
                style={{ color: skill.color }}
              >
                {skill.level}%
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Card back (shows on flip) */}
        <motion.div
          initial={{ rotateY: -180 }}
          animate={{ rotateY: isFlipped ? 0 : -180 }}
          transition={{ duration: 0.6, type: 'spring' }}
          style={{ backfaceVisibility: 'hidden' }}
          className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center text-white"
        >
          <Icon icon={skill.icon} className="text-5xl mb-3" style={{ color: skill.color }} />
          <h3 className="font-bold mb-2">{skill.name}</h3>
          <p className="text-sm text-gray-300 text-center">
            {skill.level >= 90 ? 'Expert Level' : skill.level >= 80 ? 'Advanced' : 'Proficient'}
          </p>
          <p className="text-xs text-gray-400 mt-2">Click to flip back</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-40 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
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
            What I work with
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            My <span className="text-primary">Skills</span>
          </h2>
          <motion.div 
            className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks I use to build exceptional web applications
          </p>

          {/* Interactive hint */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="text-sm text-gray-400 mt-4 flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:gesture-tap" className="text-lg" />
            Click cards to flip, hover for 3D effect
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
