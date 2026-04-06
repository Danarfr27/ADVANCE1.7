import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchIntro from './components/GlitchIntro';
import CustomCursor from './components/CustomCursor';
import ChatInterface from './components/ChatInterface';
import Sidebar from './components/Sidebar';
import MatrixRain from './components/MatrixRain';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const preload = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsLoaded(true);
    };
    preload();

    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-[#050505] flex items-center justify-center z-[9999]">
        <div className="hexagon-spinner" />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute mt-24 text-[#00ff88] text-sm font-mono tracking-wider"
        >
          INITIALIZING WORM AI...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#050505] to-[#0a0a0a]">
      {/* Background Effects */}
      <MatrixRain />
      
      {/* Scanlines overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[1000] opacity-20"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)'
        }}
      />

      {/* Glitch Intro */}
      <AnimatePresence>
        {showIntro && <GlitchIntro onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 min-h-screen p-4 lg:p-6"
      >
        <div className="max-w-[1800px] mx-auto h-[calc(100vh-48px)]">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-4">
              {/* Logo */}
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00ff88]/20 to-[#00f0ff]/10 border border-[#00ff88]/40 flex items-center justify-center">
                  <span className="text-xl font-bold text-[#00ff88] font-display">W</span>
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-[#00ff88] rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>

              <div>
                <h1 className="text-xl font-bold text-[#00ff88] glitch font-display" data-text="WORM AI">
                  WORM AI
                </h1>
                <p className="text-xs text-gray-500 tracking-wider font-mono">
                  CYBER INTELLIGENCE INTERFACE v2.0
                </p>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                <span className="text-xs text-gray-400 font-mono">SYSTEM ONLINE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
                <span className="text-xs text-gray-400 font-mono">ENCRYPTED</span>
              </div>
              <div className="text-xs text-gray-500 font-mono">
                {currentTime.toLocaleTimeString('en-US', { hour12: false })}
              </div>
            </div>
          </motion.header>

          {/* Main Layout */}
          <div className="flex flex-col lg:flex-row gap-4 h-[calc(100%-80px)]">
            {/* Chat Interface */}
            <div className="flex-1 min-h-0">
              <ChatInterface />
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block h-full overflow-y-auto scrollbar-cyber">
              <Sidebar />
            </div>
          </div>
        </div>
      </motion.main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-2 left-4 z-30 text-[10px] text-gray-600 font-mono"
      >
        <span>WORM AI v2.0 | Direct Access Mode | OSINT Ready</span>
      </motion.footer>
    </div>
  );
}

export default App;
