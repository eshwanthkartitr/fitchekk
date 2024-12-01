"use client";

import { useState, useRef, Key } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { 
  Loader2, 
  Shield, 
  Sword, 
  X,
  Twitter,
  Linkedin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
// import { Space_Grotesk } from 'next/font/google';
import { TopRatedFits } from './components/TopRatedFits';
import Image from 'next/image';

// const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

// const THEME = {
//   primary: {
//     from: 'from-emerald-600',
//     to: 'to-teal-800',
//     text: 'text-emerald-400',
//     hover: 'hover:bg-emerald-800/50',
//     border: 'border-emerald-900/30',
//   },
//   secondary: {
//     from: 'from-teal-900',
//     to: 'to-emerald-900',
//     text: 'text-teal-400',
//   },
//   accent: 'bg-gradient-to-r from-emerald-500 to-teal-500',
// };

const PARTNERS = [
  {
    name: "Audrey Chen 👩🏻‍💻",
    logo: "https://placehold.co/200x80/111111/FFFFFF/svg?text=Audrey Chen",
  },
  {
    name: "Sigmas",
    logo: "https://placehold.co/200x80/111111/FFFFFF/svg?text=Sigmas",
  },
  {
    name: "Beta",
    logo: "https://placehold.co/200x80/111111/FFFFFF/svg?text=Beta",
  },
  {
    name: "Gigachad developers",
    logo: "https://placehold.co/200x80/111111/FFFFFF/svg?text=Gigachad",
  },
];

const AuraPointsDisplay = ({ points }: { points: number }) => {
  return (
    <motion.div
      className="fixed top-4 right-[200px] bg-emerald-900/50 backdrop-blur-sm px-4 py-2 rounded-full
                 flex items-center gap-2 border border-emerald-500/20  text-emerald-400 font-bold" 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <span className="text-emerald-400 font-bold">
        {points.toLocaleString()} 🔥
      </span>
      <span className="text-xs text-emerald-500/70">
        (${(points * 0.001).toFixed(3)})
      </span>
    </motion.div>
  );
};

const FloatingPoints = ({ x, y }: { x: number; y: number }) => {
  return (
    <motion.div
      initial={{ opacity: 1, y, x }}
      animate={{ 
        opacity: 0, 
        y: y - 100,
        scale: [1, 1.2, 1],
      }}
      exit={{ opacity: 0 }}
      className="fixed pointer-events-none z-50 text-emerald-400 font-bold"
      transition={{ 
        duration: 1,
        scale: {
          duration: 0.2,
          repeat: 0,
        }
      }}
    >
      <span className="flex items-center gap-1 z-50">
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          +1000
        </motion.span>
        <motion.span
          animate={{ 
            rotate: [0, 20, -20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          🔥
        </motion.span>
      </span>
    </motion.div>
  );
};

const ChillGuyEyes = ({ setAuraPoints }: { setAuraPoints: (points: number | ((prev: number) => number)) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [auraSize, setAuraSize] = useState(1);
  const [floatingPoints, setFloatingPoints] = useState<{ id: number; x: number; y: number }[]>([]);
  const pointsIdRef = useRef(0);
  const [showNotification, setShowNotification] = useState(false);
  const [isCollecting, setIsCollecting] = useState(false);
  
  const collectAura = (e: React.MouseEvent) => {
    if (isCollecting) return;
    setIsCollecting(true);
    setAuraPoints((prev: number) => prev + 1000);
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setFloatingPoints(prev => [...prev, { 
      id: pointsIdRef.current++, 
      x: rect.left + rect.width / 2,
      y: rect.top
    }]);
    
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
    
    setTimeout(() => {
      setFloatingPoints(prev => prev.filter(p => p.id !== pointsIdRef.current - 1));
    }, 1000);
    
    setTimeout(() => setIsCollecting(false), 500);
  };

  return (
    <div className="relative">
      <div className="fixed inset-0 pointer-events-none">
        <AnimatePresence>
          {floatingPoints.map(point => (
            <FloatingPoints key={point.id} x={point.x} y={point.y} />
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full
                       bg-emerald-900/80 text-emerald-300 px-4 py-2 rounded-full text-sm font-bold
                       shadow-lg shadow-emerald-900/50 z-50"
          >
            +1000 Sigma Points Collected!
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        ref={containerRef}
        className="relative w-full max-w-[300px] mx-auto cursor-pointer"
        whileHover={{ scale: 1.02 }}
        onHoverStart={() => setAuraSize(1.2)}
        onHoverEnd={() => setAuraSize(1)}
        onClick={collectAura}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 
                     blur-2xl -z-10"
          animate={{
            scale: auraSize,
            opacity: isCollecting ? 0.8 : 0.5,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
        />
        
        <div className="relative">
          <motion.div
            style={{
              perspective: 1000,
              transformStyle: 'preserve-3d',
            }}
          >
            <motion.div
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30
              }}
            >
              <Image 
                src="/chill-guy.png" 
                alt="Chill Guy"
                width={300}
                height={300}
                className="w-full drop-shadow-2xl relative z-10"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const Wardrobe = ({ showWardrobe, setShowWardrobe, personImage }: { 
  showWardrobe: boolean, 
  setShowWardrobe: (show: boolean) => void,
  personImage?: string 
}) => {
  const wardrobeItems = [
    { id: 1, image: "/wardrobe/skib-shirt.png", name: "Classic Tee" },
    { id: 2, image: "/wardrobe/ohio-shirt.png", name: "Leather Jacket" },
    // Add more items as needed
  ];

  return (
    <AnimatePresence mode="wait">
      {showWardrobe && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            initial={{ x: "-50%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-50%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black to-black"
          />
          
          <motion.div
            initial={{ x: "50%" }}
            animate={{ x: "0%" }}
            exit={{ x: "50%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed inset-y-0 right-0 w-1/2 bg-gradient-to-l from-black to-black"
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="relative z-10 bg-black/90 rounded-lg p-8 max-w-6xl w-full mx-4 max-h-[90vh] overflow-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
                SIGMA WARDROBE
              </h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowWardrobe(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                <X />
              </motion.button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wardrobeItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group rounded-lg overflow-hidden"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="aspect-square bg-gradient-to-br from-red-900/20 to-purple-900/20 rounded-lg p-4"
                  >
                    <Image 
                      src={item.image} 
                      alt={item.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent 
                           flex items-end p-4"
                  >
                    <p className="text-white font-medium">{item.name}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Sidebar = ({ showSidebar, setShowSidebar }: { showSidebar: boolean, setShowSidebar: (show: boolean) => void }) => {
  const blindCount = 12;
  const [ setShowTopRated] = useState(false);
  
  return (
    <AnimatePresence mode="wait">
      {showSidebar && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSidebar(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
          />
          
          <motion.div 
            className="fixed right-0 top-0 h-full w-80 z-50"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
          >
            <div className="relative h-full">
              {[...Array(blindCount)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-full bg-[#0a0a0a]"
                  style={{ 
                    height: `${100 / blindCount}%`,
                    top: `${(100 / blindCount) * i}%`,
                  }}
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{
                    type: "spring",
                    mass: 0.5,
                    damping: 12,
                    stiffness: 100,
                    delay: i * 0.03,
                  }}
                />
              ))}
              
              <motion.div
                className="relative h-full bg-gradient-to-b from-gray-900 to-black p-6 space-y-6 overflow-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
                    SIGMA COLLECTION
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowSidebar(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                <div className="space-y-4">
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="p-4 rounded-lg bg-white/10 backdrop-blur-sm
                             border border-neutral-200/20 hover:border-[#FF5722]/20 transition-colors"
                  >
                    <button 
                    //   onClick={() => setShowTopRated(False)}
                      className="font-medium text-[#FF5722] w-full text-left"
                    >
                      Top Rated
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="p-4 rounded-lg bg-gradient-to-r from-red-900/20 to-purple-900/20
                             border border-red-900/20 hover:border-red-900/40 transition-colors"
                  >
                    <h3 className="font-bold text-red-400">Recent Fits</h3>
                    {/* Add content for recent fits here */}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const SocialSidebar = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-6"
    >
      {[
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
      ].map((social, i) => (
        <motion.a
          key={social.label}
          href={social.href}
          whileHover={{ scale: 1.1, x: -5 }}
          className="w-10 h-10 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800
                     flex items-center justify-center rounded-full
                     hover:border-[#FF5722]/50 transition-colors group"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * i }}
        >
          <social.icon className="w-5 h-5 text-neutral-400 group-hover:text-[#FF5722] transition-colors" />
        </motion.a>
      ))}
    </motion.div>
  );
};

const Partners = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-400">OUR PARTNERS</span>
            <div className="h-[1px] w-12 bg-neutral-800" />
          </div>
          <div className="flex items-center gap-12">
            {PARTNERS.map((partner, i) => (
              <motion.img
                key={partner.name}
                src={partner.logo}
                alt={partner.name}
                
                className="h-[50] text-ellipsis opacity-50 hover:opacity-100 transition-opacity"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.5, y: 0 }}
                transition={{ delay: 0.1 * i }}
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <ChevronLeft className="w-5 h-5 text-neutral-400" />
            <ChevronRight className="w-5 h-5 text-neutral-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

const GridBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Animated grid */}
      <div className="absolute inset-0">
        <div className="h-full w-full grid grid-cols-[repeat(auto-fit,minmax(4rem,1fr))] 
                       grid-rows-[repeat(auto-fit,minmax(4rem,1fr))]">
          {[...Array(200)].map((_, i) => (
            <motion.div
              key={i}
              className="border-[0.5px] border-neutral-200/5 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.01 * i }}
            >
              {/* Random dots */}
              {Math.random() > 0.9 && (
                <motion.div
                  className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#FF5722]/20 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced corner decorations */}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
        <motion.div
          key={corner}
          className={`absolute ${corner.replace('-', '-8 ')} w-24 h-24`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="absolute top-0 left-0 w-2 h-2 bg-[#FF5722]" />
          <div className="absolute top-0 left-0 w-12 h-[1px] bg-neutral-200/20" />
          <div className="absolute top-0 left-0 w-[1px] h-12 bg-neutral-200/20" />
        </motion.div>
      ))}

      {/* Enhanced gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
    </div>
  );
};

const FitAnalysis = ({ feedback }: { feedback: any }) => {
  // Split feedback into sections based on **
  const sections = feedback.split('**').filter(Boolean);
  
  // Helper function to extract rating number
  const extractRating = (text: string) => {
    const match = text.match(/(\d+\.?\d*)\s*\/\s*10/);
    return match ? parseFloat(match[1]) : 0;
  };

  // Helper function to extract numbered points
  const extractPoints = (text: string) => {
    return text.split(/\d+\./).filter(Boolean).map(point => point.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-sm border border-neutral-200/20 p-8 rounded-lg"
    >
      {sections.map((section: string, idx: Key | null | undefined) => {
        const isRating = section.includes('/10');
        const isImprovements = section.includes('How to Make it More');
        
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx !== null && idx !== undefined ? (idx as number) * 0.1 : 0 }}
            className={`mb-6 ${idx !== null && idx !== undefined && idx !== 0 ? 'border-t border-neutral-200/10 pt-6' : ''}`}
          >
            {isRating ? (
              // Rating Display
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-[#FF5722]">Rating</h3>
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                >
                  <span className="text-4xl font-bold">
                    {extractRating(section)}/10
                  </span>
                  <motion.span
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    🔥
                  </motion.span>
                </motion.div>
              </div>
            ) : isImprovements ? (
              // Improvements Section
              <div>
                <h3 className="text-xl font-bold text-[#FF5722] mb-4">
                  How to Level Up
                </h3>
                <div className="space-y-4">
                  {extractPoints(section).map((point, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-[#FF5722] font-bold">{i + 1}.</span>
                      <p className="text-neutral-200">{point}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              // Regular Sections
              <div>
                <h3 className="text-xl font-bold text-[#FF5722] mb-3">
                  {section.split(':')[0]}
                </h3>
                <p className="text-neutral-200">
                  {section.split(':')[1]}
                </p>
              </div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default function SigmaRealm() {
  const [image, setImage] = useState<string | null>(null);
  const [occasion, setOccasion] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const [useGemini, setUseGemini] = useState(false);
  const [showWardrobe, setShowWardrobe] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [auraPoints, setAuraPoints] = useState(0);
  const [setPersonImage] = useState<string | null>(null);
  const [showTopRated, setShowTopRated] = useState(false);

  const occasions = [
    "Interview",
    "Date Night",
    "Casual Hangout",
    "Wedding",
    "Gym",
    "Business Meeting",
  ];

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1,
    onDrop
  });

  const analyzeFit = async () => {
    if (!image || !occasion) return;
    
    setLoading(true);
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      
      const imageType = blob.type || 'image/jpeg';
      const fileName = `outfit.${imageType.split('/')[1]}`;
      const file = new File([blob], fileName, { 
        type: imageType,
        lastModified: Date.now()
      });
      
      const formData = new FormData();
      formData.append('image', file);
      formData.append('occasion', occasion);
      formData.append('useGemini', useGemini.toString());

      const result = await fetch('/api/analyze-fit', {
        method: 'POST',
        body: formData,
      });

      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }

      const data = await result.json();
      console.log(data)
      
      if (data.success) {
        setFeedback(data.feedback);
      } else {
        console.error('Analysis failed:', data.error);
        setFeedback({
          rating: "Error",
          analysis: "Failed to analyze image. Please try again.",
          suggestion: "Try uploading a different image.",
          dominanceScore: 0
        });
      }
    } catch (error) {
      console.error('Error analyzing fit:', error);
      setFeedback({
        rating: "Error",
        analysis: "Something went wrong during analysis.",
        suggestion: "Please try again later.",
        dominanceScore: 0
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-mono relative overflow-hidden">
      <GridBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-200/10">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <h1 className="text-2xl font-bold tracking-tighter">SIGMA REALM</h1>
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => setShowWardrobe(true)}
                className="text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                WARDROBE
              </button>
              <button 
                onClick={() => setShowSidebar(true)}
                className="text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                COLLECTION
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setUseGemini(!useGemini)}
              className="px-6 py-2 border border-neutral-200/20 hover:bg-white/5 text-sm font-medium"
            >
              {useGemini ? 'BRAINROT MODE' : 'NORMAL MODE'}
            </motion.button>
            <div className="h-6 w-[1px] bg-neutral-200/20" />
            <button className="text-sm opacity-70 hover:opacity-100">
              Upload Designs
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-32 px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column */}
            <div className="space-y-12">
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-[#FF5722]" />
                  <span className="opacity-70">BACKING</span>
                  <span className="opacity-70">TOMORROW</span>
                </div>
                <h1 className="text-7xl font-bold tracking-tighter leading-none">
                  SIGMA
                  <br />
                  REALM
                </h1>
              </motion.div>

              {/* Stats Card */}
              <motion.div 
                className="bg-white/5 backdrop-blur-sm border border-neutral-200/20 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#FF5722]">{auraPoints.toLocaleString()}</h3>
                    <p className="text-sm opacity-70">Sigma Points</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#FF5722]">
                      ${(auraPoints * 0.001).toFixed(2)}
                    </h3>
                    <p className="text-sm opacity-70">Value</p>
                  </div>
                </div>
              </motion.div>

              {/* Interactive Character */}
              <ChillGuyEyes setAuraPoints={setAuraPoints} />
            </div>

            {/* Right Column - Upload and Analysis */}
            <div className="space-y-6">
              {/* Upload Zone */}
              <div {...getRootProps()} className="relative group">
                <div className="absolute inset-0 bg-[#FF5722]/10 rounded-none opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="border border-neutral-200/20 p-8 text-center cursor-pointer 
                             hover:border-[#FF5722]/50 transition-colors bg-white/5 backdrop-blur-sm">
                  <input {...getInputProps()} />
                  {image ? (
                    <Image 
                      src={image} 
                      alt="Your fit" 
                      width={400}
                      height={400}
                      className="max-h-[400px] w-auto mx-auto object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center space-y-4 py-12">
                      <Shield className="w-16 h-16 text-[#FF5722]" />
                      <p className="text-2xl font-medium">DROP YOUR FIT HERE FR FR</p>
                      <p className="opacity-70">NO CAP ALLOWED</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Occasions Grid */}
              <div className="grid grid-cols-3 gap-3">
                {occasions.map((occ) => (
                  <motion.button
                    key={occ}
                    onClick={() => setOccasion(occ)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-3 text-sm font-medium transition-all ${
                      occasion === occ 
                        ? "bg-[#FF5722] text-white" 
                        : "bg-white/5 hover:bg-[#FF5722]/20 text-white/70"
                    }`}
                  >
                    {occ}
                  </motion.button>
                ))}
              </div>

              {/* Analysis Button/Results */}
              {feedback ? (
                <FitAnalysis feedback={feedback} />
              ) : (
                <motion.button
                  onClick={analyzeFit}
                  disabled={!image || !occasion || loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 bg-[#FF5722] disabled:opacity-50 disabled:cursor-not-allowed 
                           hover:bg-[#FF5722]/90 transition-all font-bold text-xl relative overflow-hidden"
                >
                  {loading ? (
                    <Loader2 className="animate-spin mx-auto w-6 h-6" />
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      <Sword className="w-6 h-6" />
                      {useGemini ? "ANALYZE THE RIZZ FR FR" : "ANALYZE DOMINANCE"}
                      <span className="text-2xl group-hover:animate-bounce">🔥</span>
                    </span>
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </main>

      <SocialSidebar />
      <AuraPointsDisplay points={auraPoints} />
      <Wardrobe showWardrobe={showWardrobe} setShowWardrobe={setShowWardrobe} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Partners />
      <AnimatePresence>
        {showTopRated && (
          <TopRatedFits onClose={() => setShowTopRated(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

