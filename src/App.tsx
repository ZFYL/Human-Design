import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, animate } from 'motion/react';

type Category = 'Events' | 'News' | 'Photo Library';

interface Link {
  text: string;
  targetCategory: Category;
  targetId: string;
}

interface Item {
  id: string;
  title: string;
  lead?: string;
  content?: string;
  image?: string;
  links?: Link[];
}

const data: Record<Category, Item[]> = {
  'Events': [
    { id: 'e1', title: 'Design Conference 2026', lead: 'The future of interfaces.', content: 'Join us for a three-day exploration of post-screen interfaces, neural links, and ambient computing. Keynote speakers include leading researchers in cognitive science and human-computer interaction. We will explore how environments shape our digital consumption and the ethical implications of direct neural interfaces.', links: [{text: 'Read about the new Quantum Computing breakthrough', targetCategory: 'News', targetId: 'n3'}] },
    { id: 'e2', title: 'Local Art Exhibition', lead: 'Abstract works by emerging artists.', content: 'A showcase of contemporary abstract art focusing on color theory and emotional resonance. The exhibition runs for two weeks at the downtown gallery. Expect immersive installations that react to the viewer\'s presence, blurring the line between observer and artwork.', links: [{text: 'See Abstract Textures in Photo Library', targetCategory: 'Photo Library', targetId: 'p5'}] },
    { id: 'e3', title: 'Symphony in the Park', lead: 'An evening of classical masterpieces.', content: 'The city symphony orchestra returns for its annual open-air concert. Bring a blanket and enjoy an evening under the stars featuring works by Beethoven, Mozart, and contemporary composers. Food trucks and local vendors will be available on site.' },
    { id: 'e4', title: 'Tech Startup Mixer', lead: 'Connect with local innovators.', content: 'An informal networking event for founders, investors, and tech enthusiasts. Share ideas, find co-founders, and learn about the latest trends in the local startup ecosystem. Hosted at the Innovation Hub downtown.', links: [{text: 'City Unveils Green Transit Initiative', targetCategory: 'News', targetId: 'n4'}] },
    { id: 'e5', title: 'Culinary Masterclass', lead: 'Learn the secrets of French cuisine.', content: 'Join Michelin-starred chef Jean-Pierre for an intimate, hands-on cooking class. You will learn how to prepare a classic three-course French meal, from perfecting the mother sauces to creating delicate pastries.' }
  ],
  'News': [
    { id: 'n1', title: 'Global Summit Reaches Agreement', lead: 'Historic climate pact signed.', content: 'After weeks of negotiations, leaders have finally agreed on a comprehensive framework to reduce carbon emissions by 50% over the next decade. The treaty includes provisions for technology transfer and financial aid to developing nations, marking a significant step forward in global cooperation.', links: [{text: 'City Unveils Green Transit Initiative', targetCategory: 'News', targetId: 'n4'}] },
    { id: 'n2', title: 'New Exoplanet Discovered', lead: 'Potentially habitable world found.', content: 'Astronomers using the James Webb Space Telescope have identified a rocky exoplanet in the habitable zone of a nearby red dwarf star. The planet, designated Kepler-186f, shows signs of water vapor in its atmosphere, raising hopes for the discovery of extraterrestrial life.', image: 'https://picsum.photos/seed/space/800/600' },
    { id: 'n3', title: 'Breakthrough in Quantum Computing', lead: 'Researchers achieve quantum supremacy.', content: 'A team of scientists at the National Quantum Institute has successfully demonstrated a quantum computer capable of solving complex problems millions of times faster than the most powerful supercomputers. This breakthrough could revolutionize fields ranging from cryptography to drug discovery.', links: [{text: 'Attend the Design Conference 2026', targetCategory: 'Events', targetId: 'e1'}] },
    { id: 'n4', title: 'City Unveils Green Transit Initiative', lead: 'Major expansion of public transportation.', content: 'The mayor has announced a multi-billion dollar plan to overhaul the city\'s transit system. The initiative includes the construction of three new light rail lines, a massive expansion of the electric bus fleet, and the creation of hundreds of miles of protected bike lanes.', links: [{text: 'Global Summit Reaches Agreement', targetCategory: 'News', targetId: 'n1'}] },
    { id: 'n5', title: 'Major Archaeological Find in Egypt', lead: 'Ancient tomb unearthed near Luxor.', content: 'Archaeologists have discovered a previously unknown tomb in the Valley of the Kings. Preliminary excavations suggest it belongs to a high-ranking official from the 18th Dynasty. The tomb is remarkably well-preserved, containing intricate wall paintings and numerous artifacts.' },
    { id: 'n6', title: 'AI Models Reach New Milestones', lead: 'Generative systems understand context better.', content: 'The latest iteration of large language models has demonstrated unprecedented ability to maintain context over long interactions, effectively acting as symbiotic companions rather than simple tools.', links: [{text: 'Design Conference 2026', targetCategory: 'Events', targetId: 'e1'}] }
  ],
  'Photo Library': [
    { id: 'p1', title: 'Summer Vacation', image: 'https://picsum.photos/seed/summer/800/600' },
    { id: 'p2', title: 'Architecture Walk', image: 'https://picsum.photos/seed/arch/800/600' },
    { id: 'p3', title: 'Mountain Hike', image: 'https://picsum.photos/seed/mountain/800/600' },
    { id: 'p4', title: 'City Lights', image: 'https://picsum.photos/seed/city/800/600', links: [{text: 'City Unveils Green Transit Initiative', targetCategory: 'News', targetId: 'n4'}] },
    { id: 'p5', title: 'Abstract Textures', image: 'https://picsum.photos/seed/texture/800/600', links: [{text: 'Local Art Exhibition', targetCategory: 'Events', targetId: 'e2'}] },
    { id: 'p6', title: 'Forest Path', image: 'https://picsum.photos/seed/forest/800/600' },
    { id: 'p7', title: 'Ocean Waves', image: 'https://picsum.photos/seed/ocean/800/600' },
    { id: 'p8', title: 'Desert Dunes', image: 'https://picsum.photos/seed/desert/800/600' }
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
          transition={{ delay: i * 0.002, duration: 0.2, ease: 'easeInOut' }}
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

type ViewState = {
  view: 'home' | 'list' | 'detail';
  category: Category | null;
  item: Item | null;
};

export default function App() {
  const [history, setHistory] = useState<ViewState[]>([{ view: 'home', category: null, item: null }]);
  const { scrollY } = useScroll();
  const backButtonOpacity = useTransform(scrollY, [0, 300], [1, 0.1]);

  const navigate = (newView: 'home' | 'list' | 'detail', newCategory: Category | null, newItem: Item | null) => {
    animate(window.scrollY, 0, {
      duration: 0.2,
      ease: 'easeInOut',
      onUpdate: (latest) => window.scrollTo(0, latest)
    });
    setHistory(prev => [...prev, { view: newView, category: newCategory, item: newItem }]);
  };

  const goBack = () => {
    if (history.length > 1) {
      animate(window.scrollY, 0, {
        duration: 0.2,
        ease: 'easeInOut',
        onUpdate: (latest) => window.scrollTo(0, latest)
      });
      setHistory(prev => prev.slice(0, -1));
    }
  };

  const current = history[history.length - 1];
  const { view, category, item } = current;

  const getBackground = () => {
    if (view === 'home') return 'radial-gradient(circle at 50% 0%, #fdfbfb 0%, #ebedee 100%)';
    if (category === 'News') return 'radial-gradient(circle at 0% 0%, #f3e8ff 0%, transparent 60%), radial-gradient(circle at 100% 100%, #e0e7ff 0%, #fdfbfb 100%)';
    if (category === 'Events') return 'radial-gradient(circle at 100% 0%, #ffedd5 0%, transparent 60%), radial-gradient(circle at 0% 100%, #ffe4e6 0%, #fdfbfb 100%)';
    if (category === 'Photo Library') return 'radial-gradient(circle at 50% 0%, #e0f2fe 0%, transparent 60%), radial-gradient(circle at 50% 100%, #cffafe 0%, #fdfbfb 100%)';
    return 'radial-gradient(circle at 50% 50%, #fdfbfb 0%, #ebedee 100%)';
  };

  return (
    <div className="min-h-screen w-full text-[#1a1a1a] font-sans selection:bg-black selection:text-white relative">
      <motion.div
        className="fixed inset-0 -z-10"
        animate={{ background: getBackground() }}
        transition={TRANSITION}
      />
      
      {/* Fixed Back Button */}
      <AnimatePresence>
        {view !== 'home' && (
          <motion.div
            initial={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
            transition={TRANSITION}
            className="fixed top-8 left-8 md:top-12 md:left-12 z-50 mix-blend-multiply"
          >
            <motion.button
              style={{ opacity: backButtonOpacity }}
              onClick={goBack}
              whileHover={{ x: -8 }}
              whileTap={{ scale: 0.95 }}
              className="text-3xl font-medium tracking-tight cursor-pointer pr-4 pb-2"
            >
              Back
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-8 py-24 md:py-32 min-h-screen flex flex-col">
        <div className="flex-1 relative">
          {/* HOME VIEW */}
          {view === 'home' && (
            <div className="flex flex-col justify-center h-full gap-16 pb-32 pt-12">
              {(['Events', 'News', 'Photo Library'] as Category[]).map((cat) => (
                <motion.div
                  key={cat}
                  layoutId={`category-${cat}`}
                  onClick={() => navigate('list', cat, null)}
                  whileHover={{ x: 20 }}
                  whileTap={{ scale: 0.95 }}
                  className={`pr-4 pb-4 text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter cursor-pointer w-fit transition-opacity bg-clip-text text-transparent bg-gradient-to-br ${getCategoryGradient(cat)}`}
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
                      onClick={() => navigate('detail', category, listItem)}
                      whileHover={{ x: 15 }}
                      whileTap={{ scale: 0.95 }}
                      className={`pr-4 pb-4 text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight cursor-pointer w-fit transition-opacity leading-tight bg-clip-text text-transparent bg-gradient-to-br ${getCategoryGradient(category)}`}
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

              {item.links && item.links.length > 0 && (
                <div className="max-w-4xl text-left w-full mt-16 flex flex-col gap-8">
                  {item.links.map((link, idx) => {
                    const targetItem = data[link.targetCategory].find(i => i.id === link.targetId);
                    if (!targetItem) return null;
                    return (
                      <motion.div
                        key={idx}
                        onClick={() => navigate('detail', link.targetCategory, targetItem)}
                        whileHover={{ x: 15 }}
                        whileTap={{ scale: 0.95 }}
                        className={`text-4xl md:text-5xl font-medium tracking-tight cursor-pointer w-fit transition-opacity leading-tight bg-clip-text text-transparent bg-gradient-to-br ${getCategoryGradient(link.targetCategory)}`}
                      >
                        {link.text}
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {item.image && (
                <motion.img
                  initial={{ opacity: 0, filter: 'blur(20px)', scale: 0.95 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                  transition={TRANSITION}
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
