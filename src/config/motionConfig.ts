// Spring-based animations for smooth, natural movement
export const springTransition = {
  type: 'spring',
  stiffness: 60,
  damping: 18,
  mass: 0.8,
};

export const smoothSpring = {
  type: 'spring',
  stiffness: 150,
  damping: 25,
};

// Fade animations with spring physics
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: {
    ...springTransition,
    duration: 0.8,
  },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -60 },
  animate: { opacity: 1, y: 0 },
  transition: {
    ...springTransition,
    duration: 0.8,
  },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] },
};

// Scale animations
export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { ...smoothSpring },
};

export const popIn = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    type: 'spring',
    stiffness: 200,
    damping: 20,
    duration: 0.6,
  },
};

// Slide animations
export const slideInLeft = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  transition: { ...springTransition },
};

export const slideInRight = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  transition: { ...springTransition },
};

// Container animations with improved stagger
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const fastStaggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

// Smooth reveal container
export const smoothReveal = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// 3D Card effect
export const card3D = {
  rest: {
    scale: 1,
    rotateX: 0,
    rotateY: 0,
  },
  hover: {
    scale: 1.05,
    rotateX: 5,
    rotateY: 5,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

// Enhanced card hover
export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.03,
    y: -8,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 17,
    },
  },
};

// Image effects
export const imageZoom = {
  scale: 1.15,
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

export const imageReveal = {
  initial: { scale: 1.2, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
};

// Page transitions
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
};

// Text reveal animations - enhanced
export const textReveal = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: {
    type: 'spring',
    stiffness: 50,
    damping: 10,
  },
};

export const charReveal = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

// Word reveal
export const wordReveal = {
  initial: { y: 100, opacity: 0, rotateX: -90 },
  animate: { y: 0, opacity: 1, rotateX: 0 },
  transition: {
    type: 'spring',
    stiffness: 100,
    damping: 12,
  },
};

// Parallax effect
export const parallaxVariants = {
  initial: { y: 0 },
  animate: (custom: number) => ({
    y: custom,
    transition: {
      duration: 0.5,
      ease: 'linear',
    },
  }),
};

// Rotate animations
export const rotateIn = {
  initial: { opacity: 0, rotate: -180 },
  animate: { opacity: 1, rotate: 0 },
  transition: { ...smoothSpring },
};

// Bounce effect
export const bounceIn = {
  initial: { opacity: 0, scale: 0.3 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    type: 'spring',
    stiffness: 250,
    damping: 20,
    duration: 0.7,
  },
};

// Elastic animation
export const elastic = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};

// Magnetic hover effect
export const magneticHover = (strength = 10) => ({
  scale: 1.05,
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 15,
  },
});

// Gradient animation
export const gradientShift = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Pulsing effect
export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Float effect
export const float = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Slide up reveal with blur
export const blurSlideUp = {
  initial: { opacity: 0, y: 40, filter: 'blur(10px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: {
    duration: 0.6,
    ease: [0.25, 0.1, 0.25, 1],
  },
};

// Enhanced stagger with blur
export const staggerBlur = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

