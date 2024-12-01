import { motion } from "framer-motion";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wardrobe = ({ showWardrobe, setShowWardrobe, personImage }: { 
  showWardrobe: boolean, 
  setShowWardrobe: (show: boolean) => void,
  personImage?: string 
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
        <motion.div className="fixed inset-0 z-50">
          {/* Existing backdrop code */}
          
          <motion.div className="relative z-10 bg-white/10 backdrop-blur-xl rounded-lg p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold">SIGMA WARDROBE</h2>
              <div className="flex items-center gap-4">
                <button 
                  className="px-4 py-2 bg-[#FF5722] rounded-full"
                  onClick={() => setShowUploadModal(true)}
                >
                  Upload Design
                </button>
                <CloseButton onClick={() => setShowWardrobe(false)} />
              </div>
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
              {filteredItems.map(item => (
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