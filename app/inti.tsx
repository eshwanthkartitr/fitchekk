"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function SigmaRealm() {
  useEffect(() => {
    // Set up random interval for distractions
    const interval = setInterval(() => {
      // Play random sigma male sound effect
      const audio = new Audio("/sigma-grindset.mp3");
      audio.play();
    }, Math.random() * 20000 + 10000); // Random interval between 10-30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 to-black text-white">
      {/* Add your brainrot UI components here */}
    </div>
  );
}