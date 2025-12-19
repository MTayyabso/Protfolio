import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { fadeInUp, staggerContainer, scaleIn } from '../config/motionConfig';
import { useRef, useState } from 'react';
import { TiltCard, ScrollReveal, MagneticButton } from './animations';
import BrainwaveImg from '../assets/Brainwave.png';
import DocTimeImg from '../assets/Doctime.png';
import XoraImg from '../assets/Xora.png';
import codefleximg from '../assets/codeflex.png';

interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveLink: string;
  githubLink: string;
  color: string;
  features?: string[];
}

const projects: Project[] = [
  {
    title: 'AI skeleton Frontend',
    description: 'A fully designed frontend website with sections for pricing plans, a beginner-friendly guide, and a roadmap showcasing future updates, all crafted with a clean, responsive, and user-friendly design.',
    image: BrainwaveImg,
    tech: ['Next.js', 'Tailwind'],
    liveLink: 'https://brainwave-chi-topaz.vercel.app/',
    githubLink: 'https://github.com/MTayyabso/Brainwave',
    color: 'from-blue-500 to-purple-500',
    features: ['Responsive Design', 'Modern UI', 'Fast Loading'],
  },
  {
    title: 'DocTime',
    description: 'Built a full-stack web app for booking doctor appointments with user roles (Admin, Doctor, Patient), JWT authentication, real-time notifications, and responsive UI.',
    image: DocTimeImg,
    tech: ['Next.js', 'Tailwind', 'Node.js', 'Express', 'MongoDB'],
    liveLink: 'https://doc-time-nu.vercel.app/',
    githubLink: 'https://github.com/MTayyabso/DocTime',
    color: 'from-green-500 to-teal-500',
    features: ['User Auth', 'Real-time', 'Full-stack'],
  },
  {
    title: 'Xora',
    description: 'A fully designed frontend website with sections for pricing plans, a beginner-friendly guide, and a roadmap showcasing future updates.',
    image: XoraImg,
    tech: ['React', 'Tailwind'],
    liveLink: 'https://xora-woad.vercel.app/',
    githubLink: 'https://github.com/MTayyabso/Xora',
    color: 'from-pink-500 to-rose-500',
    features: ['Animations', 'Clean Code', 'SEO Ready'],
  },
  {
    title: 'CodeFlex',
    description: 'Voice-powered AI fitness coach combining real-time voice processing with LLMs. Captures key metrics and leverages Gemini API for personalized fitness regimes.',
    image: codefleximg,
    tech: ['Next.js', 'OpenAI', 'Tailwind', 'Convex', 'Clerk'],
    liveLink: 'https://code-flex-ai-one.vercel.app/',
    githubLink: 'https://github.com/MTayyabso/CodeFlex_Ai',
    color: 'from-orange-500 to-amber-500',
    features: ['AI Powered', 'Voice Control', 'Real-time Sync'],
  },
  {
    title: 'Fitness Tracking App',
    description: 'Comprehensive fitness application with workout plans, nutrition tracking, and progress visualization.',
    image: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg',
    tech: ['React Native', 'Node.js', 'MongoDB', 'AWS'],
    liveLink: '#',
    githubLink: '#',
    color: 'from-cyan-500 to-blue-500',
    features: ['Cross-platform', 'Analytics', 'Cloud Sync'],
  },
  {
    title: 'Real Estate Platform',
    description: 'Property listing and management system with virtual tours, booking system, and CRM integration.',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Mapbox'],
    liveLink: '#',
    githubLink: '#',
    color: 'from-violet-500 to-purple-500',
    features: ['Virtual Tours', 'Maps', 'CRM'],
  },
];

// Project Modal Component
const ProjectModal = ({ 
  project, 
  isOpen, 
  onClose 
}: { 
  project: Project | null; 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col md:flex-row"
          >
            {/* Image Section */}
            <div className="relative w-full md:w-1/2 h-48 md:h-auto overflow-hidden">
              <motion.img
                src={project.image}
                alt={project.title}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`} />
              
              {/* Close button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
              >
                <Icon icon="mdi:close" className="text-xl text-gray-700" />
              </motion.button>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium mb-4 bg-gradient-to-r ${project.color}`}>
                  Featured Project
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {project.title}
                </h2>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Features */}
                {project.features && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature) => (
                        <motion.span
                          key={feature}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-900 mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="px-3 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 text-gray-700 rounded-full text-sm font-medium border border-primary/20"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 px-6 py-3 bg-gradient-to-r ${project.color} text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg`}
                  >
                    <Icon icon="mdi:open-in-new" className="text-xl" />
                    View Live
                  </motion.a>
                  <motion.a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl flex items-center justify-center gap-2 hover:border-gray-300 transition-colors"
                  >
                    <Icon icon="mdi:github" className="text-xl" />
                    View Code
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ProjectCard = ({ 
  project, 
  index,
  onSelect,
}: { 
  project: Project; 
  index: number;
  onSelect: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.1, 1.15]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
    >
      <TiltCard 
        tiltAmount={8} 
        glareEnabled={true} 
        scale={1.02}
        className="h-full"
      >
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 h-full flex flex-col border border-gray-100"
        >
          {/* Image with parallax */}
          <div className="relative h-56 overflow-hidden bg-gray-200">
            <motion.img
              src={project.image}
              alt={project.title}
              style={{ y: imageY, scale: imageScale }}
              className="w-full h-full object-cover"
            />
            
            {/* Gradient overlay */}
            <motion.div 
              className={`absolute inset-0 bg-gradient-to-br ${project.color}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.4 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Hover content */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <MagneticButton magneticStrength={0.4}>
                <motion.a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Icon icon="mdi:open-in-new" className="text-xl text-primary" />
                </motion.a>
              </MagneticButton>
              
              <MagneticButton magneticStrength={0.4}>
                <motion.a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Icon icon="mdi:github" className="text-xl text-gray-900" />
                </motion.a>
              </MagneticButton>
              
              <MagneticButton magneticStrength={0.4}>
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onSelect}
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg"
                >
                  <Icon icon="mdi:eye" className="text-xl text-secondary" />
                </motion.button>
              </MagneticButton>
            </motion.div>

            {/* Category tag */}
            <motion.div
              className="absolute top-4 left-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <span className={`px-3 py-1 rounded-full text-white text-xs font-medium bg-gradient-to-r ${project.color} shadow-lg`}>
                {project.tech[0]}
              </span>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <motion.h3 
              className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300"
            >
              {project.title}
            </motion.h3>
            <p className="text-gray-600 mb-4 line-clamp-3 flex-1">{project.description}</p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 4).map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-primary/10 to-secondary/10 text-gray-700 rounded-full border border-primary/20 hover:border-primary/40 transition-colors cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
              {project.tech.length > 4 && (
                <span className="px-3 py-1 text-xs font-medium text-gray-400">
                  +{project.tech.length - 4} more
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section id="projects" className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
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
              My work
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <motion.div 
              className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
              Showcasing my latest work in web development, from concept to deployment
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
              Click the eye icon to view details
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.title} 
                project={project} 
                index={index}
                onSelect={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export default Projects;
