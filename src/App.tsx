import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import IntroLoader from './components/IntroLoader';
import CustomCursor from './components/CustomCursor';
import { pageTransition } from './config/motionConfig';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Custom Cursor - always visible */}
      <CustomCursor 
        ringColor="#00BCD4"
        dotColor="#00BCD4"
        ringSize={40}
        dotSize={8}
      />
      {/* Intro Loader */}
      <AnimatePresence>
        {isLoading && (
          <IntroLoader
            minLoadTime={3500}
            onComplete={() => setIsLoading(false)}
            brandFirst="Tayyab"
            brandSecond="Sohail"
          />
        )}
      </AnimatePresence>

      {/* Main Content - only visible after loading */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ScrollProgress />
            <Navbar />
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
              className="min-h-screen bg-white"
            >
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Contact />
              <Footer />
            </motion.div>
            <BackToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
