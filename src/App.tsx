import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Menu, 
  X, 
  Instagram, 
  Twitter, 
  Facebook,
  ChevronRight,
  Star,
  Shield,
  Zap,
  Heart
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-pearl/80 backdrop-blur-md border-b border-payne/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="text-2xl font-serif font-bold tracking-tighter text-payne">
          PEARL & PAYNE
        </div>
        
        <div className="hidden md:flex items-center gap-12">
          {['Collections', 'About', 'Studio', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium uppercase tracking-widest hover:text-payne/60 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <button className="px-8 py-3 bg-payne text-pearl rounded-full text-sm font-semibold hover:bg-payne/90 transition-all transform hover:scale-105">
            Inquire Now
          </button>
        </div>

        <button 
          className="md:hidden text-payne"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-pearl border-b border-payne/10 px-6 py-8 flex flex-col gap-6"
          >
            {['Collections', 'About', 'Studio', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-lg font-serif italic"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1 rounded-full border border-payne/20 text-xs font-bold tracking-widest uppercase mb-6">
            Spring Collection 2026
          </span>
          <h1 className="text-6xl md:text-8xl font-serif leading-[0.9] mb-8 text-payne">
            The Art of <br />
            <span className="italic">Refinement</span>
          </h1>
          <p className="text-lg text-payne/70 max-w-md mb-10 leading-relaxed">
            Discover a curated experience where timeless elegance meets modern sophistication. 
            Crafted with the finest materials and an eye for detail.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-10 py-4 bg-payne text-pearl rounded-full font-bold flex items-center gap-2 hover:gap-4 transition-all">
              Explore Collection <ArrowRight size={18} />
            </button>
            <button className="px-10 py-4 border border-payne text-payne rounded-full font-bold hover:bg-payne/5 transition-all">
              Our Story
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-[4/5] bg-payne/10 rounded-[40px] overflow-hidden relative">
            <img 
              src="https://picsum.photos/seed/luxury/800/1000" 
              alt="Luxury Interior" 
              className="w-full h-full object-cover mix-blend-multiply opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pearl/40 to-transparent" />
          </div>
          
          {/* Floating elements */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -left-10 bg-pearl p-8 rounded-3xl shadow-2xl border border-payne/5 hidden lg:block"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-payne rounded-full flex items-center justify-center text-pearl">
                <Star size={20} fill="currentColor" />
              </div>
              <div>
                <div className="text-sm font-bold">Premium Quality</div>
                <div className="text-xs text-payne/50">Certified Excellence</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-2/3 bg-payne/5 rounded-l-full -z-10 blur-3xl" />
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="p-10 bg-payne/5 rounded-[32px] border border-payne/10 hover:border-payne/30 transition-all group"
  >
    <div className="w-14 h-14 bg-pearl rounded-2xl flex items-center justify-center text-payne mb-8 group-hover:scale-110 transition-transform shadow-sm">
      <Icon size={28} />
    </div>
    <h3 className="text-2xl font-serif mb-4">{title}</h3>
    <p className="text-payne/60 leading-relaxed">{description}</p>
  </motion.div>
);

const Features = () => {
  return (
    <section id="studio" className="py-32 bg-pearl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-payne/50 mb-4 block">Our Philosophy</span>
            <h2 className="text-5xl md:text-6xl font-serif leading-tight">
              Crafting experiences that <span className="italic">resonate</span> with the soul.
            </h2>
          </div>
          <p className="text-payne/60 max-w-sm pb-2">
            We believe in the power of simplicity and the beauty of natural materials. 
            Every piece is a testament to our dedication.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Shield}
            title="Timeless Design"
            description="Our aesthetic transcends trends, focusing on enduring beauty and functional elegance."
            delay={0.1}
          />
          <FeatureCard 
            icon={Zap}
            title="Modern Craft"
            description="Combining traditional techniques with contemporary innovation for superior results."
            delay={0.2}
          />
          <FeatureCard 
            icon={Heart}
            title="Ethical Sourcing"
            description="We prioritize sustainability and fair practices in every step of our creative process."
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-payne text-pearl pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-2">
            <div className="text-3xl font-serif font-bold mb-8">PEARL & PAYNE</div>
            <p className="text-pearl/60 max-w-md leading-relaxed mb-10">
              Elevating the everyday through thoughtful design and impeccable craftsmanship. 
              Join our journey towards a more refined world.
            </p>
            <div className="flex gap-6">
              <Instagram className="hover:text-pearl/50 cursor-pointer transition-colors" />
              <Twitter className="hover:text-pearl/50 cursor-pointer transition-colors" />
              <Facebook className="hover:text-pearl/50 cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-8">Quick Links</h4>
            <ul className="flex flex-col gap-4 text-pearl/70">
              <li className="hover:text-pearl transition-colors cursor-pointer">Collections</li>
              <li className="hover:text-pearl transition-colors cursor-pointer">Our Studio</li>
              <li className="hover:text-pearl transition-colors cursor-pointer">Journal</li>
              <li className="hover:text-pearl transition-colors cursor-pointer">Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-8">Newsletter</h4>
            <p className="text-sm text-pearl/60 mb-6">Stay updated with our latest releases.</p>
            <div className="flex border-b border-pearl/20 pb-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-transparent border-none outline-none flex-1 text-sm placeholder:text-pearl/30"
              />
              <button className="text-pearl/50 hover:text-pearl transition-colors">
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-pearl/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-pearl/40 uppercase tracking-widest">
          <div>© 2026 Pearl & Payne. All rights reserved.</div>
          <div className="flex gap-8">
            <span className="hover:text-pearl cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-pearl cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="bg-pearl selection:bg-payne selection:text-pearl">
      <Navbar />
      <main>
        <Hero />
        <Features />
        
        {/* Quote Section */}
        <section className="py-40 bg-payne/5 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-serif italic mb-12 text-payne leading-tight">
                "Simplicity is the ultimate sophistication."
              </h2>
              <div className="w-20 h-px bg-payne/20 mx-auto mb-8" />
              <p className="text-sm font-bold uppercase tracking-[0.4em] text-payne/40">Leonardo da Vinci</p>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-payne rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-serif text-pearl mb-8">Ready to transform your space?</h2>
                <p className="text-pearl/70 max-w-xl mx-auto mb-12 text-lg">
                  Book a consultation with our design experts and start your journey towards elegance today.
                </p>
                <button className="px-12 py-5 bg-pearl text-payne rounded-full font-bold text-lg hover:scale-105 transition-transform">
                  Get Started
                </button>
              </div>
              
              {/* Abstract shapes */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-pearl/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-pearl/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
