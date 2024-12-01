"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const BETA_MEMES = [
  {
    src: 'https://c.tenor.com/p0AAooUFf6cAAAAd/tenor.gif',
    alt: 'Ohio Rizz Level',
    caption: "When the rizz is giving Ohio energy 💀"
  },
  {
    src: 'https://c.tenor.com/AN2p1JhF0akAAAAd/tenor.gif',
    alt: 'NPC Reaction',
    caption: "NPCs when they see your fit"
  },
  {
    src: 'https://d3bdodgok16pxc.cloudfront.net/images/VL10-ED-43-BRAINROT-INARTICLEIMAGE_v2.gif',
    alt: 'Skibidi Toilet',
    caption: "Your fit got that skibidi energy fr fr"
  },
  {
    src: 'https://media.tenor.com/-8PYBF3S9HEAAAAi/gojo-twerk.gif',
    alt: 'GYATT Gone Wrong',
    caption: "When the GYATT detector malfunctions"
  }
];

const ERROR_MESSAGES = [
  "RIZZ.exe has stopped working",
  "Error 404: Sigma not found",
  "Task failed successfully (real)",
  "Your rizz level is too low to access this page fr fr",
];

export default function BetaRealm() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-mono p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto space-y-12"
      >
        {/* Glitch Effect Title */}
        <motion.h1 
          className="text-6xl font-bold text-center glitch-text"
          animate={{ 
            x: [0, -2, 2, -2, 0],
            y: [0, 2, -2, 2, 0],
          }}
          transition={{ 
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          BETA REALM
          <span className="block text-[#FF5722] text-2xl mt-2">
            (Still cooking fr fr)
          </span>
        </motion.h1>

        {/* Error Message */}
        <motion.div
          className="bg-red-500/20 border border-red-500/40 p-6 rounded-lg text-center"
          animate={{ 
            scale: [1, 1.02, 1],
            rotate: [-1, 1, -1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <h2 className="text-2xl font-bold mb-4">🚨 GYATT ERROR 🚨</h2>
          {ERROR_MESSAGES.map((message, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              className="text-lg mb-2"
            >
              {message}
            </motion.p>
          ))}
        </motion.div>

        {/* Meme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BETA_MEMES.map((meme, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/5 p-4 rounded-lg"
            >
              <div className="relative aspect-square mb-4">
                <Image
                  src={meme.src}
                  alt={meme.alt}
                  fill
                  unoptimized
                  className="object-cover rounded-lg"
                />
              </div>
              <p className="text-center text-lg">{meme.caption}</p>
            </motion.div>
          ))}
        </div>

        {/* Loading Bar */}
        <motion.div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#FF5722]"
            animate={{ 
              width: ["0%", "100%", "0%"],
              x: ["-100%", "0%", "100%"]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>

        <p className="text-center text-sm opacity-50">
          Beta access loading... (real) (no cap) (fr fr)
        </p>
      </motion.div>
    </div>
  );
} 
