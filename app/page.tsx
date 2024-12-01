"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SparklesCore } from "../components/ui/sparkles";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function VibeCheck() {
  const router = useRouter();
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const [showBetaConfirm, setShowBetaConfirm] = useState(false);
  const [showSigmaMessage, setShowSigmaMessage] = useState(false);
  const [betaSeizure, setBetaSeizure] = useState(false);

  const handleSelection = (choice: string) => {
    if (choice === "beta" && !showBetaConfirm) {
      setShowBetaConfirm(true);
      return;
    }

    setSelectedVibe(choice);
    localStorage.setItem("userVibe", choice);
    
    if (choice === "sigma") {
      setShowSigmaMessage(true);
      document.body.classList.add('warp-speed');
      document.querySelectorAll('.sparkle').forEach((particle: any) => {
        particle.style.transformOrigin = 'center center';
        particle.classList.add('particle-ray');
      });
      setTimeout(() => {
        router.push("/sigma-realm");
      }, 2500);
    } else {
      setBetaSeizure(true);
      document.body.classList.add('reality-distortion');
      document.body.classList.add('brain-melt');
      setTimeout(() => {
        document.body.classList.add('beta-psychedelic');
      }, 500);
      setTimeout(() => {
        router.push("/beta-realm");
      }, 3000);
    }
  };

  // Clean up effects on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('warp-speed', 'reality-distortion', 'brain-melt', 'beta-psychedelic');
    };
  }, []);

  return (
    <div className="h-[100vh] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full particles-container"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        <motion.h1 
          className="md:text-7xl text-5xl lg:text-6xl font-bold text-center text-slate-200 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Choose Your Destiny 
        </motion.h1>

        <motion.div 
          className="flex flex-col md:flex-row gap-8 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* Sigma Button */}
          <motion.button
            className="inline-flex h-16 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#1a1a1a,45%,#262626,55%,#1a1a1a)] bg-[length:200%_100%] px-12 font-bold text-2xl text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelection("sigma")}
          >
            🗿 Sigma 
          </motion.button>

          {/* Beta Button */}
          <motion.button
            className="inline-flex h-16 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#1a1a1a,45%,#262626,55%,#1a1a1a)] bg-[length:200%_100%] px-12 font-bold text-2xl text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelection("beta")}
          >
            🤓 Beta 
          </motion.button>
        </motion.div>

        {/* Beta Confirmation Modal */}
        <AnimatePresence>
          {showBetaConfirm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <div className="bg-black p-8 rounded-lg border border-blue-500 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Choose Carefully</h2>
                <p className="text-blue-400 mb-6">Are you sure you want to remain in the Beta realm?</p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => handleSelection("beta")}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Confirm Beta
                  </button>
                  <button
                    onClick={() => setShowBetaConfirm(false)}
                    className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sigma Message Flash */}
        <AnimatePresence>
          {showSigmaMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 2 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [2, 1, 1, 0.5] }}
              transition={{ duration: 2, times: [0, 0.3, 0.7, 1] }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <div className="text-6xl font-bold text-purple-500 text-center">
                CERTIFIED SIGMA<br/>
                <span className="text-3xl">Entering Sigma Realm...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Beta Seizure Effect */}
        <AnimatePresence>
          {betaSeizure && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 1, 1, 0],
                scale: [1, 1.2, 1.5, 2, 2.5],
              }}
              transition={{ 
                duration: 3,
                times: [0, 0.2, 0.4, 0.6, 1],
                ease: "easeInOut"
              }}
              className="fixed inset-0 z-50 beta-seizure-container"
            >
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1">
                {Array(9).fill(0).map((_, i) => (
                  <div 
                    key={i}
                    className="beta-image-container overflow-hidden"
                    style={{ 
                      animationDelay: `${i * 0.1}s`,
                      transform: `rotate(${Math.random() * 360}deg)`
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Selection Effect */}
        {selectedVibe && (
          <motion.div
            initial={{ scale: 0, x: "-50%", y: "-50%" }}
            animate={{ 
              scale: [0, 1, 40],
              rotate: selectedVibe === "beta" ? [0, 180, 720] : 0
            }}
            transition={{ 
              duration: 2.5,
              times: [0, 0.3, 1],
              ease: "easeInOut"
            }}
            className={`fixed top-1/2 left-1/2 w-[500px] h-[500px] pointer-events-none ${
              selectedVibe === "sigma" ? "bg-slate-800" : "bg-slate-900"
            }`}
            style={{ 
              borderRadius: "50%",
              zIndex: 100 
            }}
          />
        )}
      </div>
    </div>
  );
}
