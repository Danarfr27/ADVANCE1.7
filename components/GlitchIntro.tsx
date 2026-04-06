import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GlitchIntroProps {
  onComplete: () => void;
}

/**
 * WORM AI - Elegant Glitch Intro Animation
 * Professional cyberpunk-style boot sequence
 */

const GlitchIntro = ({ onComplete }: GlitchIntroProps) => {
  const [phase, setPhase] = useState<'boot' | 'type' | 'glitch' | 'fade'>('boot');
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);
  const fullText = 'WORM AI';
  
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  // Boot sequence
  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setPhase('type');
    }, 800);
    return () => clearTimeout(bootTimer);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (phase !== 'type') return;

    let index = 0;
    const typeInterval = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        setProgress((index / fullText.length) * 50);
        index++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setPhase('glitch'), 400);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [phase]);

  // Glitch effect
  useEffect(() => {
    if (phase !== 'glitch') return;

    let glitchCount = 0;
    const maxGlitches = 12;
    
    const glitchInterval = setInterval(() => {
      if (glitchCount < maxGlitches) {
        const glitched = fullText
          .split('')
          .map((char, i) => {
            if (Math.random() > 0.6 && i < glitchCount * 0.8) {
              return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            }
            return char;
          })
          .join('');
        setText(glitched);
        setProgress(50 + (glitchCount / maxGlitches) * 40);
        glitchCount++;
      } else {
        setText(fullText);
        setProgress(100);
        clearInterval(glitchInterval);
        setTimeout(() => setPhase('fade'), 500);
      }
    }, 60);

    return () => clearInterval(glitchInterval);
  }, [phase]);

  // Fade out
  useEffect(() => {
    if (phase !== 'fade') return;

    const fadeTimer = setTimeout(() => {
      onComplete();
    }, 600);

    return () => clearTimeout(fadeTimer);
  }, [phase, onComplete]);

  const getStatusText = useCallback(() => {
    switch (phase) {
      case 'boot':
        return '> BOOT SEQUENCE INITIATED...';
      case 'type':
        return '> LOADING CORE MODULES...';
      case 'glitch':
        return '> DECRYPTING SECURITY LAYERS...';
      case 'fade':
        return '> SYSTEM READY';
      default:
        return '';
    }
  }, [phase]);

  return (
    <AnimatePresence>
      {phase !== 'fade' && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
          style={{ background: '#050505' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* Animated grid background */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite'
            }}
          />

          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-[1px]"
            style={{ 
              background: 'linear-gradient(90deg, transparent, #00ff88, transparent)',
              boxShadow: '0 0 10px #00ff88'
            }}
            animate={{
              top: ['0%', '100%', '0%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo container */}
            <div className="relative mb-8">
              {/* Glitch layers */}
              {phase === 'glitch' && (
                <>
                  <motion.span
                    className="absolute inset-0 text-[#ff0040] text-6xl md:text-8xl font-bold"
                    style={{ fontFamily: 'Orbitron' }}
                    animate={{
                      x: [-3, 3, -3, 0],
                      opacity: [0.7, 0.3, 0.7, 0],
                    }}
                    transition={{ duration: 0.15, repeat: 3 }}
                  >
                    {text}
                  </motion.span>
                  <motion.span
                    className="absolute inset-0 text-[#00f0ff] text-6xl md:text-8xl font-bold"
                    style={{ fontFamily: 'Orbitron' }}
                    animate={{
                      x: [3, -3, 3, 0],
                      opacity: [0.7, 0.3, 0.7, 0],
                    }}
                    transition={{ duration: 0.15, repeat: 3, delay: 0.05 }}
                  >
                    {text}
                  </motion.span>
                </>
              )}
              
              {/* Main title */}
              <motion.h1
                className="text-6xl md:text-8xl font-bold"
                style={{ 
                  fontFamily: 'Orbitron', 
                  color: '#00ff88',
                  textShadow: '0 0 30px rgba(0, 255, 136, 0.5)'
                }}
                animate={phase === 'glitch' ? {
                  scale: [1, 1.02, 1],
                } : {}}
                transition={{ duration: 0.1, repeat: 2 }}
              >
                {text}
              </motion.h1>

              {/* Glow effect */}
              <div 
                className="absolute inset-0 blur-2xl opacity-50"
                style={{
                  background: 'radial-gradient(circle, rgba(0, 255, 136, 0.3) 0%, transparent 70%)',
                  transform: 'scale(1.5)'
                }}
              />
            </div>

            {/* Subtitle */}
            <motion.p
              className="text-center text-[#00f0ff] text-sm md:text-base tracking-[0.4em] mb-8"
              style={{ fontFamily: 'Share Tech Mono' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              CYBER INTELLIGENCE INTERFACE
            </motion.p>

            {/* Progress bar */}
            <div className="w-72 h-1 bg-gray-800 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00ff88] to-[#00f0ff]"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />
            </div>

            {/* Status text */}
            <motion.p
              className="text-center text-xs text-gray-500 font-mono"
              style={{ fontFamily: 'Share Tech Mono' }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {getStatusText()}
            </motion.p>

            {/* Version badge */}
            <motion.div
              className="absolute -bottom-20 text-[10px] text-gray-600 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              v2.0.0 | DIRECT ACCESS MODE
            </motion.div>
          </div>
          
          {/* Corner decorations */}
          <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-[#00ff88]/30" />
          <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-[#00ff88]/30" />
          <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-[#00ff88]/30" />
          <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-[#00ff88]/30" />

          {/* Side scanlines */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-1"
            style={{
              background: 'linear-gradient(180deg, transparent, #00ff88, transparent)',
              opacity: 0.3
            }}
          />
          <div 
            className="absolute right-0 top-0 bottom-0 w-1"
            style={{
              background: 'linear-gradient(180deg, transparent, #00ff88, transparent)',
              opacity: 0.3
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlitchIntro;
