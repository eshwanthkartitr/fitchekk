import { motion } from 'framer-motion';
import Image from 'next/image';
import { VotingSystem } from './VotingSystem';
import type { Fit } from '@/types';
import { useState } from 'react';
import { X } from 'lucide-react';

export const TopRatedFits = ({ onClose }: { onClose: () => void }) => {
  const [fits] = useState<Fit[]>([
    // ... your fits data
  ]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#f5f5f5] z-50 overflow-auto"
    >
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold text-neutral-800">Top Rated Fits</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="p-2 rounded-full bg-neutral-200 hover:bg-neutral-300"
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Fits Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {fits.map((fit) => (
            <motion.div
              key={fit.id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                show: { y: 0, opacity: 1 }
              }}
              className="bg-white rounded-lg overflow-hidden shadow-sm"
            >
              <div className="aspect-square relative group">
                <Image 
                  src={fit.image} 
                  alt={fit.description}
                  width={400}
                  height={400}
                  className="object-cover rounded-lg"
                />
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center"
                >
                  <button className="px-6 py-3 bg-[#FF5722] text-white rounded-full">
                    Try This Fit
                  </button>
                </motion.div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={fit.userImage} 
                    alt={fit.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium text-neutral-800">{fit.username}</span>
                </div>
                
                <VotingSystem 
                  itemId={fit.id}
                  initialVotes={fit.votes}
                  initialComments={fit.comments}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}; 