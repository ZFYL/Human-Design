import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Category = 'Events' | 'News' | 'Photo Library';

interface Item {
  id: string;
  title: string;
  lead?: string;
  content?: string;
  image?: string;
}

const data: Record<Category, Item[]> = {
  'Events': [
    { id: 'e1', title: 'Design Conference 2026', lead: 'The future of interfaces.', content: 'Join us for a three-day exploration of post-screen interfaces, neural links, and ambient computing. Keynote speakers include leading researchers in cognitive science and human-computer interaction.' },
    { id: 'e2', title: 'Local Art Exhibition', lead: 'Abstract works by emerging artists.', content: 'A showcase of contemporary abstract art focusing on color theory and emotional resonance. The exhibition runs for two weeks at the downtown gallery.' },
  ],
  'News': [
    { id: 'n1', title: 'Global Summit Reaches Agreement', lead: 'Historic climate pact signed.', content: 'After weeks of negotiations, leaders have finally agreed on a comprehensive framework to reduce carbon emissions by 50% over the next decade. The treaty includes provisions for technology transfer and financial aid to developing nations.' },
    { id: 'n2', title: 'New Exoplanet Discovered', lead: 'Potentially habitable world found.', content: 'Astronomers using the James Webb Space Telescope have identified a rocky exoplanet in the habitable zone of a nearby red dwarf star. The planet, designated Kepler-186f, shows signs of water vapor in its atmosphere.', image: 'https://picsum.photos/seed/space/800/600' },
  ],
  'Photo Library': [
    { id: 'p1', title: 'Summer Vacation', image: 'https://picsum.photos/seed/summer/800/600' },
    { id: 'p2', title: 'Architecture Walk', image: 'https://picsum.photos/seed/arch/800/600' },
  ]
};

const TRANSITION = { duration: 0.2, ease: 'easeInOut' };

function UnblurText({ text, className }: { text: string, className?: string }) {
  const words = text.split(' ');
  return (
    <p className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(8px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ delay: i * 0.015, duration: 0.2, ease: 'easeInOut' }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

const getCategoryGradient = (cat: Category) => {
  if (cat === 'News') return 'from-indigo-900 to-purple-900';
  if (cat === 'Events') return 'from-orange-900 to-red-900';
  if (cat === 'Photo Library') return 'from-blue-900 to-cyan-900';
  return 'from-black to-gray-800';
};

const getCategoryDecoration = (cat: Category) => {
  if (cat === 'News') return 'decoration-indigo-800/30';
  if (cat === 'Events') return 'decoration-orange-800/30';
  if (cat === 'Photo Library') return 'decoration-blue-800/30';
  return 'decoration-black/30';
};

export default function App() {
  const [view, setView] = useState<'home' | 'list' | 'detail'>('home');
  const [category, setCategory] = useState<Category | null>(null);
  const [item, setItem] = useState<Item | null>(null);

  const goBack = () => {
    if (view === 'detail') {
      setView('list');
      setItem(null);
    } else if (view === 'list') {
      setView('home');
      setCategory(null);
    }
  };

  const getBackground = () => {
    if (view === 'home') return 'radial-gradient(circle at 50% 0%, #fdfbfb 0%, #ebedee 100%)';
    if (category === 'News') return 'radial-gradient(circle at 0% 0%, #f3e8ff 0%, transparent 60%), radial-gradient(circle at 100% 100%, #e0e7ff 0%, #fdfbfb 100%)';
    if (category === 'Events') return 'radial-gradient(circle at 100% 0%, #ffedd5 0%, transparent 60%), radial-gradient(circle at 0% 100%, #ffe4e6 0%, #fdfbfb 100%)';
    if (category === 'Photo Library') return 'radial-gradient(circle at 50% 0%, #e0f2fe 0%, transparent 60%), radial-gradient(circle at 50% 100%, #cffafe 0%, #fdfbfb 100%)';
    return 'radial-gradient(circle at 50% 50%, #fdfbfb 0%, #ebedee 100%)';
  };

  return (
    <div className="min-h-screen w-full text-[#1a1a1a] font-sans selection:bg-black selection:text-white">
      <motion.div
        className="fixed inset-0 -z-10"
        animate={{ background: getBackground() }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      
      <div className="max-w-5xl mx-auto px-8 py-12 md:py-24 min-h-screen flex flex-col">
        {/* Header Area for Back Button */}
        <div className="h-20 flex items-center shrink-0">
          <AnimatePresence>
            {view !== 'home' && (
              <motion.button
                initial={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                transition={TRANSITION}
                onClick={goBack}
                whileHover={{ x: -8, opacity: 0.6 }}
                whileTap={{ scale: 0.95 }}
                className="text-3xl font-medium tracking-tight transition-opacity cursor-pointer underline decoration-2 underline-offset-8 decoration-black/30 pr-4 pb-2"
              >
                Back
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-1 relative mt-8">
          {/* HOME VIEW */}
          {view === 'home' && (
            <div className="flex flex-col justify-center h-full gap-16 pb-32">
              {(['Events', 'News', 'Photo Library'] as Category[]).map((cat) => (
                <motion.div
                  key={cat}
                  layoutId={`category-${cat}`}
                  onClick={() => {
                    setCategory(cat);
                    setView('list');
                  }}
                  whileHover={{ x: 20, opacity: 0.8 }}
                  whileTap={{ scale: 0.95 }}
                  className={`pr-4 pb-4 text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter cursor-pointer w-fit underline decoration-[4px] underline-offset-[16px] transition-opacity bg-clip-text text-transparent bg-gradient-to-br ${getCategoryGradient(cat)} ${getCategoryDecoration(cat)}`}
                  transition={TRANSITION}
                >
                  {cat}
                </motion.div>
              ))}
            </div>
          )}

          {/* LIST VIEW */}
          {view === 'list' && category && (
            <div className="flex flex-col h-full">
              <motion.div
                layoutId={`category-${category}`}
                className={`pr-4 pb-4 w-fit mx-auto text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter mb-24 bg-clip-text text-transparent bg-gradient-to-br ${getCategoryGradient(category)}`}
                transition={TRANSITION}
              >
                {category}
              </motion.div>

              <div className="flex flex-col gap-24 pb-32 items-start">
                {data[category].map((listItem) => (
                  <div key={listItem.id} className="flex flex-col gap-6 w-full">
                    <motion.div
                      layoutId={`item-title-${listItem.id}`}
                      onClick={() => {
                        setItem(listItem);
                        setView('detail');
                      }}
                      whileHover={{ x: 15, opacity: 0.8 }}
                      whileTap={{ scale: 0.95 }}
                      className={`pr-4 pb-4 text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight cursor-pointer w-fit underline decoration-[3px] underline-offset-[12px] transition-opacity leading-tight bg-clip-text text-transparent bg-gradient-to-br ${getCategoryGradient(category)} ${getCategoryDecoration(category)}`}
                      transition={TRANSITION}
                    >
                      {listItem.title}
                    </motion.div>
                    
                    {listItem.lead && (
                      <motion.div
                        layoutId={`item-lead-${listItem.id}`}
                        className="text-3xl md:text-4xl text-black/60 tracking-tight leading-snug max-w-3xl"
                        transition={TRANSITION}
                      >
                        {listItem.lead}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DETAIL VIEW */}
          {view === 'detail' && item && category && (
            <div className="flex flex-col h-full pb-32 items-center text-center">
              <motion.div
                layoutId={`item-title-${item.id}`}
                className={`pr-4 pb-4 w-fit text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-12 leading-none bg-clip-text text-transparent bg-gradient-to-br ${getCategoryGradient(category)}`}
                transition={TRANSITION}
              >
                {item.title}
              </motion.div>

              {item.lead && (
                <motion.div
                  layoutId={`item-lead-${item.id}`}
                  className="w-fit text-4xl md:text-5xl text-black/70 tracking-tight mb-16 leading-tight max-w-4xl font-medium"
                  transition={TRANSITION}
                >
                  {item.lead}
                </motion.div>
              )}

              {item.content && (
                <div className="max-w-4xl text-left w-full">
                  <UnblurText 
                    text={item.content} 
                    className="text-3xl md:text-4xl leading-relaxed tracking-tight text-black/80 font-medium"
                  />
                </div>
              )}

              {item.image && (
                <motion.img
                  initial={{ opacity: 0, filter: 'blur(20px)', scale: 0.95 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                  transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="mt-20 w-full max-w-5xl rounded-[2rem] shadow-2xl object-cover aspect-video"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
