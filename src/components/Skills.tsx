import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Icon } from '@iconify/react';
import { fadeInUp, staggerContainer, popIn } from '../config/motionConfig';
import { useState } from 'react';

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
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  return (
    <motion.div
      variants={popIn}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -10, scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Icon with rotation animation */}
        <motion.div
          animate={{
            rotate: isHovered ? 360 : 0,
          }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
          className="w-16 h-16 flex items-center justify-center rounded-xl bg-white shadow-lg"
          style={{ color: skill.color }}
        >
          <Icon icon={skill.icon} className="text-4xl" />
        </motion.div>

        <div className="text-center w-full">
          <h3 className="font-bold text-gray-900 mb-3">{skill.name}</h3>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ 
                duration: 1.2, 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 50,
                damping: 15,
              }}
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
            >
              <motion.div
                className="absolute inset-0 bg-white/30"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.5 }}
            className="text-xs text-gray-500 mt-2 font-semibold"
          >
            {skill.level}%
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            My <span className="text-primary">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks I use to build exceptional web applications
          </p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
