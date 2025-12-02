import { motion, useScroll, useTransform } from 'framer-motion';
import { Icon } from '@iconify/react';
import { fadeInUp, staggerContainer, scaleIn } from '../config/motionConfig';
import { useRef } from 'react';
import BrainwaveImg from '../assets/Brainwave.png';
import DocTimeImg from '../assets/DocTime.png';
interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveLink: string;
  githubLink: string;
  color: string;
}

const projects: Project[] = [
  {
    title: 'AI skeleton Frontend',
    description: 'A fully designed frontend website with sections for pricing plans, a beginner-friendly guide, and a roadmap showcasing future updates, all crafted with a clean, responsive, and user-friendly design.',
    image: BrainwaveImg,
    tech: ['Next.js', 'Tailwind',],
    liveLink: 'https://brainwave-chi-topaz.vercel.app/',
    githubLink: 'https://github.com/MTayyabso/Brainwave',
    color: 'from-blue-500 to-purple-500',
  },
  {
    title: 'DocTime',
    description: 'Built a full-stack web app for booking doctor appointments with user roles (Admin, Doctor, Patient), JWT authentication, real-time notifications, and responsive UI. Implemented secure APIs, schedule management, and MongoDB data handling',
    image: DocTimeImg, 
    tech: ['Next.js', 'Tailwind', 'Express', 'MongoDB',],
    liveLink: 'https://doc-time-nu.vercel.app/',
    githubLink: 'https://github.com/MTayyabso/DocTime',
    color: 'from-green-500 to-teal-500',
  },
  {
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard for social media management with data visualization, scheduling, and engagement tracking.',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg',
    tech: ['React', 'TypeScript', 'GraphQL', 'Redis'],
    liveLink: '#',
    githubLink: '#',
    color: 'from-pink-500 to-rose-500',
  },
  {
    title: 'AI Content Generator',
    description: 'AI-powered content creation tool that generates high-quality articles, social posts, and marketing copy.',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    tech: ['Next.js', 'OpenAI', 'Tailwind', 'Prisma'],
    liveLink: '#',
    githubLink: '#',
    color: 'from-orange-500 to-amber-500',
  },
  {
    title: 'Fitness Tracking App',
    description: 'Comprehensive fitness application with workout plans, nutrition tracking, and progress visualization.',
    image: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg',
    tech: ['React Native', 'Node.js', 'MongoDB', 'AWS'],
    liveLink: '#',
    githubLink: '#',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'Real Estate Platform',
    description: 'Property listing and management system with virtual tours, booking system, and CRM integration.',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Mapbox'],
    liveLink: '#',
    githubLink: '#',
    color: 'from-violet-500 to-purple-500',
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <motion.div
      ref={cardRef}
      variants={scaleIn}
      whileHover={{ scale: 1.02, y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Image with parallax */}
      <div className="relative h-56 overflow-hidden bg-gray-200">
        <motion.img
          src={project.image}
          alt={project.title}
          style={{ y: imageY }}
          className="w-full h-full object-cover scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />

        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <motion.a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Icon icon="mdi:open-in-new" className="text-xl text-primary" />
          </motion.a>
          <motion.a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.15, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Icon icon="mdi:github" className="text-xl text-gray-900" />
          </motion.a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <motion.h3 
          className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300"
          whileHover={{ x: 5 }}
        >
          {project.title}
        </motion.h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, techIndex) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + techIndex * 0.05 }}
              className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-primary/10 to-secondary/10 text-gray-700 rounded-full border border-primary/20 hover:border-primary/40 transition-colors"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            Showcasing my latest work in web development, from concept to deployment
          </p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
