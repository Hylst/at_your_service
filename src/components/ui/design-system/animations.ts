/**
 * Design System Animations
 * Comprehensive animation system with consistent transitions and effects
 */

import { designSystem } from '@/lib/design-system';
import type { MotionToken } from './types';

/**
 * Animation Presets
 * Pre-defined animation configurations for common use cases
 */
export const animationPresets = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  
  fadeInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  
  fadeInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  
  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  
  scaleUp: {
    initial: { scale: 0.8 },
    animate: { scale: 1 },
    exit: { scale: 0.8 },
    transition: { duration: 0.2, ease: 'backOut' }
  },
  
  // Slide animations
  slideInUp: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  
  slideInDown: {
    initial: { y: '-100%' },
    animate: { y: 0 },
    exit: { y: '-100%' },
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  
  slideInLeft: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  
  slideInRight: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  
  // Rotation animations
  rotateIn: {
    initial: { opacity: 0, rotate: -180 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 180 },
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  
  // Bounce animations
  bounceIn: {
    initial: { opacity: 0, scale: 0.3 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.3 },
    transition: { duration: 0.5, ease: 'bounceOut' }
  },
  
  // Flip animations
  flipIn: {
    initial: { opacity: 0, rotateY: -90 },
    animate: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, rotateY: 90 },
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  
  // Zoom animations
  zoomIn: {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  
  // Elastic animations
  elasticIn: {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
    transition: { duration: 0.6, ease: 'elasticOut' }
  }
} as const;

/**
 * Hover Animation Presets
 * Animations for interactive states
 */
export const hoverAnimations = {
  // Scale effects
  scaleUp: {
    scale: 1.05,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  
  scaleDown: {
    scale: 0.95,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  
  // Lift effects
  lift: {
    y: -2,
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  
  // Glow effects
  glow: {
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  
  // Rotate effects
  rotate: {
    rotate: 5,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  
  // Shake effect
  shake: {
    x: [0, -2, 2, -2, 2, 0],
    transition: { duration: 0.4, ease: 'easeInOut' }
  },
  
  // Pulse effect
  pulse: {
    scale: [1, 1.05, 1],
    transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' }
  },
  
  // Bounce effect
  bounce: {
    y: [0, -4, 0],
    transition: { duration: 0.4, repeat: Infinity, ease: 'easeInOut' }
  }
} as const;

/**
 * Loading Animation Presets
 * Animations for loading states
 */
export const loadingAnimations = {
  // Spinner
  spin: {
    rotate: 360,
    transition: { duration: 1, repeat: Infinity, ease: 'linear' }
  },
  
  // Pulse
  pulse: {
    opacity: [0.5, 1, 0.5],
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
  },
  
  // Bounce
  bounce: {
    y: [0, -10, 0],
    transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' }
  },
  
  // Wave
  wave: {
    scaleY: [1, 1.5, 1],
    transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' }
  },
  
  // Dots
  dots: {
    scale: [1, 1.2, 1],
    opacity: [0.3, 1, 0.3],
    transition: { duration: 1, repeat: Infinity, ease: 'easeInOut' }
  }
} as const;

/**
 * Transition Presets
 * Common transition configurations
 */
export const transitionPresets = {
  // Duration-based
  instant: { duration: 0 },
  fast: { duration: 0.15, ease: 'easeOut' },
  normal: { duration: 0.2, ease: 'easeOut' },
  slow: { duration: 0.3, ease: 'easeOut' },
  slower: { duration: 0.5, ease: 'easeOut' },
  
  // Easing-based
  easeIn: { duration: 0.2, ease: 'easeIn' },
  easeOut: { duration: 0.2, ease: 'easeOut' },
  easeInOut: { duration: 0.2, ease: 'easeInOut' },
  
  // Spring-based
  spring: { type: 'spring', stiffness: 300, damping: 30 },
  springBouncy: { type: 'spring', stiffness: 400, damping: 20 },
  springGentle: { type: 'spring', stiffness: 200, damping: 40 },
  
  // Custom easing
  backOut: { duration: 0.3, ease: [0.175, 0.885, 0.32, 1.275] },
  bounceOut: { duration: 0.4, ease: [0.68, -0.55, 0.265, 1.55] },
  elasticOut: { duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] }
} as const;

/**
 * Animation Utilities
 */
export const animationUtils = {
  /**
   * Create staggered animation for multiple elements
   */
  createStagger: (baseAnimation: any, staggerDelay: number = 0.1) => ({
    ...baseAnimation,
    transition: {
      ...baseAnimation.transition,
      staggerChildren: staggerDelay,
      delayChildren: 0.1
    }
  }),
  
  /**
   * Create delayed animation
   */
  createDelayed: (baseAnimation: any, delay: number) => ({
    ...baseAnimation,
    transition: {
      ...baseAnimation.transition,
      delay
    }
  }),
  
  /**
   * Create repeated animation
   */
  createRepeated: (baseAnimation: any, repeatCount: number = Infinity) => ({
    ...baseAnimation,
    transition: {
      ...baseAnimation.transition,
      repeat: repeatCount
    }
  }),
  
  /**
   * Combine multiple animations
   */
  combineAnimations: (...animations: any[]) => {
    return animations.reduce((combined, animation) => ({
      initial: { ...combined.initial, ...animation.initial },
      animate: { ...combined.animate, ...animation.animate },
      exit: { ...combined.exit, ...animation.exit },
      transition: { ...combined.transition, ...animation.transition }
    }), { initial: {}, animate: {}, exit: {}, transition: {} });
  },
  
  /**
   * Create responsive animation based on screen size
   */
  createResponsive: (mobileAnimation: any, desktopAnimation: any) => {
    return {
      mobile: mobileAnimation,
      desktop: desktopAnimation
    };
  },
  
  /**
   * Create conditional animation based on state
   */
  createConditional: (condition: boolean, trueAnimation: any, falseAnimation: any) => {
    return condition ? trueAnimation : falseAnimation;
  }
};

/**
 * CSS Animation Classes
 * Tailwind-compatible animation classes
 */
export const cssAnimations = {
  // Fade animations
  'animate-fade-in': 'animate-in fade-in duration-200',
  'animate-fade-in-up': 'animate-in fade-in slide-in-from-bottom-4 duration-300',
  'animate-fade-in-down': 'animate-in fade-in slide-in-from-top-4 duration-300',
  'animate-fade-in-left': 'animate-in fade-in slide-in-from-left-4 duration-300',
  'animate-fade-in-right': 'animate-in fade-in slide-in-from-right-4 duration-300',
  
  // Scale animations
  'animate-scale-in': 'animate-in zoom-in-95 duration-200',
  'animate-scale-up': 'animate-in zoom-in-75 duration-200',
  
  // Slide animations
  'animate-slide-in-up': 'animate-in slide-in-from-bottom duration-300',
  'animate-slide-in-down': 'animate-in slide-in-from-top duration-300',
  'animate-slide-in-left': 'animate-in slide-in-from-left duration-300',
  'animate-slide-in-right': 'animate-in slide-in-from-right duration-300',
  
  // Loading animations
  'animate-spin-slow': 'animate-spin duration-1000',
  'animate-pulse-slow': 'animate-pulse duration-1500',
  'animate-bounce-slow': 'animate-bounce duration-600',
  
  // Hover effects
  'hover-scale-up': 'hover:scale-105 transition-transform duration-200',
  'hover-scale-down': 'hover:scale-95 transition-transform duration-200',
  'hover-lift': 'hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200',
  'hover-glow': 'hover:shadow-blue-500/50 hover:shadow-lg transition-shadow duration-200'
};

/**
 * Animation Hooks
 * React hooks for managing animations
 */
export const useAnimationSequence = (animations: any[], interval: number = 1000) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % animations.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [animations.length, interval]);
  
  return animations[currentIndex];
};

export const useHoverAnimation = (hoverAnimation: any, restAnimation: any = {}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return {
    animation: isHovered ? hoverAnimation : restAnimation,
    handlers: {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false)
    }
  };
};

export const useLoadingAnimation = (isLoading: boolean, loadingAnimation: any) => {
  return isLoading ? loadingAnimation : {};
};

/**
 * Animation Variants for Framer Motion
 */
export const motionVariants = {
  // Container variants
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  },
  
  // Item variants
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  },
  
  // Modal variants
  modal: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.15, ease: 'easeIn' }
    }
  },
  
  // Drawer variants
  drawer: {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    exit: {
      x: '100%',
      transition: { duration: 0.2, ease: 'easeIn' }
    }
  },
  
  // Dropdown variants
  dropdown: {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.15, ease: 'easeOut' }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.1, ease: 'easeIn' }
    }
  }
};

// All animations are exported as named exports above

// Import React for hooks
import React from 'react';