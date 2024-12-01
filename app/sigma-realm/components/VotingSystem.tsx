import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

interface VotingSystemProps {
  itemId: string;
  initialVotes: number;
  initialComments: number;
  userVote?: 'up' | 'down' | null;
}

export const VotingSystem = ({ itemId, initialVotes, initialComments, userVote: initialUserVote }: VotingSystemProps) => {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(initialUserVote || null);

  const handleVote = async (voteType: 'up' | 'down') => {
    if (userVote === voteType) {
      // Remove vote
      try {
        await fetch('/api/votes', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ itemId })
        });
        setVotes(prev => prev + (userVote === 'up' ? -1 : 1));
        setUserVote(null);
      } catch (error) {
        toast.error('Failed to remove vote');
      }
    } else {
      // Add or change vote
      try {
        await fetch('/api/votes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ itemId, voteType })
        });
        setVotes(prev => prev + (
          voteType === 'up' ? 1 : -1 + (userVote ? (userVote === 'up' ? -1 : 1) : 0)
        ));
        setUserVote(voteType);
      } catch (error) {
        toast.error('Failed to vote');
      }
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleVote('up')}
          className={`p-2 rounded-full transition-colors ${
            userVote === 'up' 
              ? 'bg-[#FF5722] text-white' 
              : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-600'
          }`}
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
        <span className="font-medium text-neutral-700">{votes}</span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleVote('down')}
          className={`p-2 rounded-full transition-colors ${
            userVote === 'down'
              ? 'bg-red-500 text-white'
              : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-600'
          }`}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.button>
      </div>
      
      <div className="flex items-center gap-2 text-neutral-500">
        <MessageCircle className="w-4 h-4" />
        <span>{initialComments}</span>
      </div>
    </div>
  );
}; 