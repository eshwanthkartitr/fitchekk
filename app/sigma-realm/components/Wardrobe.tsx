import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

interface WardrobeItem {
  id: string;
  name: string;
  image: string;
  category: string;
  price: string;
}

// Mock wardrobe items
const wardrobeItems: WardrobeItem[] = [
  {
    id: '1',
    name: 'Classic White Tee',
    image: '/wardrobe/tee-1.jpg',
    category: 'upper_body',
    price: '$29.99'
  },
  {
    id: '2',
    name: 'Black Jeans',
    image: '/wardrobe/jeans-1.jpg',
    category: 'lower_body',
    price: '$59.99'
  },
  {
    id: '3',
    name: 'Summer Dress',
    image: '/wardrobe/dress-1.jpg',
    category: 'dresses',
    price: '$79.99'
  },
  // Add more items as needed
];

const WardrobeItemCard = ({ item, onTryOn, loading }: { 
  item: WardrobeItem; 
  onTryOn: () => void;
  loading: boolean;
}) => (
  <div className="bg-white/5 rounded-lg p-4">
    <Image 
      src={item.image} 
      alt={item.name}
      width={200}
      height={200}
      className="w-full h-48 object-cover rounded-lg mb-4"
    />
    <h3 className="text-lg font-bold mb-2">{item.name}</h3>
    <p className="text-gray-400 mb-4">{item.price}</p>
    <button
      onClick={onTryOn}
      disabled={loading}
      className="w-full px-4 py-2 bg-[#FF5722] rounded-full text-white disabled:opacity-50"
    >
      {loading ? 'Trying on...' : 'Try On'}
    </button>
  </div>
);

const TryOnModal = ({ isOpen, onClose, image }: {
  isOpen: boolean;
  onClose: () => void;
  image: string | null;
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <motion.div className="bg-white/10 backdrop-blur-xl p-8 rounded-lg max-w-2xl w-full">
          <div className="flex justify-between mb-4">
            <h3 className="text-2xl font-bold">Try-On Result</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              Close
            </button>
          </div>
          {image && (
            <Image 
              src={image} 
              alt="Try-on result"
              width={600}
              height={600}
              className="w-full rounded-lg"
            />
          )}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Wardrobe = ({ showWardrobe, setShowWardrobe, personImage }: { 
  showWardrobe: boolean;
  setShowWardrobe: (show: boolean) => void;
  personImage?: string;
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [tryOnResult, setTryOnResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'upper_body', name: 'Upper Body' },
    { id: 'lower_body', name: 'Lower Body' },
    { id: 'dresses', name: 'Dresses' }
  ];

  // Filter items based on active category
  const filteredItems = wardrobeItems.filter(item => 
    activeCategory === 'all' || item.category === activeCategory
  );

  const tryOnGarment = async (garmentImage: string) => {
    if (!personImage) {
      toast.error('Please upload your photo first!');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('person_image', personImage);
      formData.append('garment_image', garmentImage);

      const response = await fetch('/api/try-on', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setTryOnResult(data.result);
      }
    } catch (error) {
      console.error('Try-on failed:', error);
      toast.error('Virtual try-on failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {showWardrobe && (
        <motion.div 
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          
          <motion.div 
            className="relative z-10 bg-white/10 backdrop-blur-xl rounded-lg p-8 max-w-6xl mx-auto mt-20"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold">SIGMA WARDROBE</h2>
              <button 
                onClick={() => setShowWardrobe(false)} 
                className="px-4 py-2 bg-red-500 rounded-full text-white"
              >
                Close
              </button>
            </div>

            {/* Categories */}
            <div className="flex gap-4 mb-8">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    activeCategory === cat.id 
                      ? 'bg-[#FF5722] text-white' 
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Grid of items */}
            <div className="grid grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <WardrobeItemCard
                  key={item.id}
                  item={item}
                  onTryOn={() => tryOnGarment(item.image)}
                  loading={loading}
                />
              ))}
            </div>

            {/* Try-on Result Modal */}
            <TryOnModal 
              isOpen={!!tryOnResult}
              onClose={() => setTryOnResult(null)}
              image={tryOnResult}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 

export default Wardrobe;    