/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from 'react';
import { 
  Menu, X, ArrowRight, Speaker, Mic, Music, Settings, 
  Lightbulb, MonitorPlay, Check, Star, MapPin, Phone, 
  Mail, Instagram, Linkedin, Twitter, PlayCircle
} from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const featuredScrollRef = useRef<HTMLDivElement>(null);

  const scrollFeatured = (direction: 'left' | 'right') => {
    if (featuredScrollRef.current) {
      const scrollAmount = 350;
      featuredScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Scroll listener for Navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for fade-up animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navLinks = ['Products', 'Services', 'Gallery', 'About', 'Contact'];

  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-white text-brand-black selection:bg-brand-black selection:text-white">
      {/* 1. NAVIGATION BAR */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-neutral-200 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <img 
              src="/logo.png" 
              alt="CRESCENDO Logo" 
              className="h-[150px] md:h-[200px] w-auto object-contain -my-16 md:-my-20 translate-y-1 md:translate-y-2"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
                target.nextElementSibling?.classList.add('flex');
              }}
            />
            {/* Fallback SVG + text logo if image upload is missing */}
            <div className="hidden items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center bg-black text-white group-hover:bg-neutral-800 transition-colors">
                <PlayCircle size={18} strokeWidth={1.5} />
              </div>
              <span className="font-bold tracking-tight text-xl">CRESCENDO</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase()}`}
                  className="text-sm font-medium text-neutral-500 hover:text-black transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
            <a href="#contact" className="text-sm font-medium bg-black text-white px-5 py-2 hover:bg-neutral-800 transition-colors">
              Get a Quote
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-black"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-neutral-200 py-4 px-6 flex flex-col gap-4 shadow-xl md:hidden">
            {navLinks.map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-neutral-600 hover:text-black"
              >
                {link}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 text-center text-sm font-medium bg-black text-white px-5 py-3"
            >
              Get a Quote
            </a>
          </div>
        )}
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center justify-center text-center mt-12 mb-8">
        <h1 className="fade-up text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-[1.1] text-black max-w-5xl">
          Where sound <span className="font-semibold block md:inline">meets vision.</span>
        </h1>
        <p className="fade-up delay-100 mt-8 text-neutral-500 text-lg md:text-xl max-w-2xl font-light">
          Professional instruments, sound systems, LED walls, and comprehensive AV solutions for stages, studios, and spaces that demand excellence.
        </p>
        <div className="fade-up delay-200 mt-10 flex flex-col sm:flex-row gap-4 w-full justify-center">
          <a href="#products" className="bg-black text-white px-8 py-4 font-medium flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors border border-black">
            Explore Products
          </a>
          <a href="#contact" className="bg-white text-black px-8 py-4 font-medium flex items-center justify-center gap-2 hover:bg-neutral-50 transition-colors border border-neutral-200">
            Request a Quote <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* Ticker Below Hero */}
      <div className="border-y border-neutral-100 py-4 overflow-hidden bg-neutral-50 flex whitespace-nowrap">
        <div className="animate-marquee flex gap-16 uppercase tracking-[0.2em] text-xs font-semibold text-neutral-400">
          <span>Musical Instruments</span>
          <span className="w-1 h-1 rounded-full bg-neutral-300 self-center"></span>
          <span>Sound Systems</span>
          <span className="w-1 h-1 rounded-full bg-neutral-300 self-center"></span>
          <span>Stage Lighting</span>
          <span className="w-1 h-1 rounded-full bg-neutral-300 self-center"></span>
          <span>LED Video Walls</span>
          <span className="w-1 h-1 rounded-full bg-neutral-300 self-center"></span>
          <span>Acoustic Solutions</span>
          <span className="w-1 h-1 rounded-full bg-neutral-300 self-center"></span>
          <span>AV Integration</span>
          <span className="w-1 h-1 rounded-full bg-neutral-300 self-center"></span>
          {/* Duplicate for infinite loop illusion */}
          <span>Musical Instruments</span>
          <span className="w-1 h-1 rounded-full bg-neutral-300 self-center"></span>
          <span>Sound Systems</span>
          <span className="w-1 h-1 rounded-full bg-neutral-300 self-center"></span>
          <span>Stage Lighting</span>
        </div>
      </div>

      {/* 3. STATS BAR */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 gap-y-16">
          {[
            { num: "500+", label: "Projects Completed" },
            { num: "200+", label: "Happy Clients" },
            { num: "20+", label: "Years Experience" },
            { num: "50+", label: "Brands Available" },
          ].map((stat, i) => (
            <div key={i} className={`fade-up border-l border-neutral-200 pl-6`} style={{transitionDelay: `${i * 100}ms`}}>
              <p className="text-4xl md:text-5xl font-light tracking-tight">{stat.num}</p>
              <p className="text-xs uppercase tracking-widest text-neutral-500 mt-2 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PRODUCT CATEGORIES */}
      <section id="products" className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 fade-up">
            <div>
              <h2 className="text-sm uppercase tracking-widest font-semibold text-neutral-500 mb-2">Inventory</h2>
              <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">Our Product Range</h3>
            </div>
            <a href="#contact" className="mt-6 md:mt-0 text-sm font-medium hover:text-neutral-500 flex items-center gap-1 transition-colors">
              View Full Catalog <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {[
              { icon: Music, title: "Musical Instruments", desc: "Guitars, Keyboards, Drums & More" },
              { icon: Speaker, title: "Sound Systems", desc: "PA, Mixers, Amplifiers & Mics" },
              { icon: Mic, title: "Acoustic Solutions", desc: "Studio Treatment & Soundproofing" },
              { icon: Lightbulb, title: "Stage Lighting", desc: "LED, Moving Heads & Effects" },
              { icon: Settings, title: "Stage & Truss", desc: "Platforms, Rigging & Aluminium Truss" },
              { icon: MonitorPlay, title: "LED Video Walls", desc: "Indoor/Outdoor Panels & Processors" },
            ].map((cat, i) => (
              <div key={i} className="fade-up bg-white p-10 border border-neutral-100 hover:border-black transition-colors group cursor-pointer" style={{transitionDelay: `${i * 50}ms`}}>
                <div className="w-12 h-12 bg-neutral-50 flex items-center justify-center mb-8 text-black transition-colors">
                  <cat.icon strokeWidth={1.5} size={24} />
                </div>
                <h4 className="text-lg font-semibold mb-2 group-hover:translate-x-1 transition-transform">{cat.title}</h4>
                <p className="text-sm text-neutral-500 font-light">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="relative">
            <div className="sticky top-32">
              <div className="fade-up">
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
                  Engineering the perfect sensory experience.
                </h2>
                <p className="mt-6 text-neutral-500 font-light leading-relaxed">
                  At CRESCENDO, we don't just sell equipment. We design, source, and integrate premium audio, visual, and lighting solutions tailored precisely to your technical requirements and creative vision.
                </p>
                <a href="#about" className="mt-8 inline-block border-b border-black pb-1 hover:text-neutral-500 hover:border-neutral-500 font-medium transition-colors">
                  Learn more about our methodology
                </a>
              </div>
            </div>
          </div>
          
          <div className="space-y-12">
            {[
              { title: "Expert Consultation", desc: "Our engineers analyze your space and requirements to architect flawless technical solutions before any hardware is specified." },
              { title: "Premium Brands", desc: "As authorized partners, we supply vetted, industry-standard equipment guaranteed to perform reliably under pressure." },
              { title: "Installation & Integration", desc: "Precision installation by certified technicians, ensuring clean aesthetics and optimal acoustic/visual performance." },
              { title: "Ongoing Support", desc: "Comprehensive calibration, maintenance, and rapid-response technical support to protect your investment." }
            ].map((feature, i) => (
              <div key={i} className="fade-up flex gap-6" style={{transitionDelay: `${i * 100}ms`}}>
                <div className="w-6 h-6 flex-shrink-0 mt-1">
                  <Check size={20} className="text-black" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                  <p className="text-neutral-500 font-light flex-1">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURED PRODUCTS SHOWCASE */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-12 fade-up">
            <h2 className="text-3xl font-semibold tracking-tight">Featured Gear</h2>
            <div className="flex gap-2">
              <button onClick={() => scrollFeatured('left')} className="w-10 h-10 border border-neutral-800 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><ArrowRight className="rotate-180" size={16}/></button>
              <button onClick={() => scrollFeatured('right')} className="w-10 h-10 border border-neutral-800 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><ArrowRight size={16}/></button>
            </div>
          </div>

          <div ref={featuredScrollRef} className="flex overflow-x-auto hide-scroll gap-6 pb-8 snap-x">
            {[
              { name: "Yamaha MG Series", cat: "Mixers", spec: "Analog Mixing Console" },
              { name: "Shure SM58", cat: "Mic", spec: "Dynamic Vocal Microphone" },
              { name: "Martin ERA 300", cat: "Lighting", spec: "Profile Moving Head" },
              { name: "ROE Black Pearl", cat: "Video", spec: "2.8mm LED Panel" },
              { name: "Crown XLS Drivecore", cat: "Amps", spec: "Two-channel, 1050W" },
            ].map((prod, i) => (
              <div key={i} className="fade-up min-w-[280px] md:min-w-[320px] snap-start border border-neutral-800 p-8 hover:border-neutral-500 transition-colors group flex flex-col">
                <div className="h-48 bg-neutral-900 mb-6 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                  <span className="text-neutral-800 text-xs tracking-widest uppercase">Image</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-widest text-neutral-500">{prod.cat}</span>
                </div>
                <h4 className="text-lg font-semibold mb-1">{prod.name}</h4>
                <p className="text-sm font-light text-neutral-400 mb-8">{prod.spec}</p>
                <a href="#contact" className="mt-auto text-sm border-b border-neutral-700 pb-1 self-start group-hover:border-white transition-colors">
                  Enquire Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PROJECT GALLERY (Minimal Masonry style simulated with CSS grid) */}
      <section id="gallery" className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 fade-up">
            <h2 className="text-3xl tracking-tight font-semibold">Our Work</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="fade-up md:col-span-8 aspect-video bg-neutral-100 group relative overflow-hidden">
               <div className="absolute inset-0 bg-neutral-200 transition-transform duration-700 group-hover:scale-105"></div>
               <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                 <span className="text-xs tracking-widest uppercase mb-1">Corporate Event</span>
                 <h4 className="text-xl font-medium">Annual Tech Summit Stage</h4>
               </div>
            </div>
            <div className="fade-up md:col-span-4 aspect-square md:aspect-auto bg-neutral-100 group relative overflow-hidden">
               <div className="absolute inset-0 bg-neutral-200 transition-transform duration-700 group-hover:scale-105"></div>
               <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                 <span className="text-xs tracking-widest uppercase mb-1">Recording Studio</span>
                 <h4 className="text-lg font-medium">Acoustic Treatment</h4>
               </div>
            </div>
            <div className="fade-up md:col-span-4 aspect-square bg-neutral-100 group relative overflow-hidden">
               <div className="absolute inset-0 bg-neutral-200 transition-transform duration-700 group-hover:scale-105"></div>
               <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                 <span className="text-xs tracking-widest uppercase mb-1">House of Worship</span>
                 <h4 className="text-lg font-medium">PA & Display Integration</h4>
               </div>
            </div>
            <div className="fade-up md:col-span-8 aspect-video md:aspect-auto bg-neutral-100 group relative overflow-hidden">
               <div className="absolute inset-0 bg-neutral-200 transition-transform duration-700 group-hover:scale-105"></div>
               <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                 <span className="text-xs tracking-widest uppercase mb-1">Concert Setup</span>
                 <h4 className="text-xl font-medium">Open Air Festival Rigging</h4>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BRANDS WE CARRY */}
      <section className="py-20 border-y border-neutral-100 bg-neutral-50 overflow-hidden">
        <div className="text-center mb-10 fade-up">
           <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">Authorized Partners</h3>
        </div>
        <div className="flex whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity duration-500">
          <div className="animate-marquee flex gap-16 font-bold text-2xl tracking-tight text-neutral-400 items-center">
            {[
              { name: 'Yamaha', domain: 'yamaha.com' },
              { name: 'Shure', domain: 'shure.com' },
              { name: 'JBL', domain: 'jbl.com' },
              { name: 'Crown', domain: 'crownaudio.com' },
              { name: 'Martin', domain: 'martin.com' },
              { name: 'Bose', domain: 'bose.com' },
              { name: 'ROE Visual', domain: 'roevisual.com' },
              { name: 'd&b audiotechnik', domain: 'dbaudio.com' },
              { name: 'Allen & Heath', domain: 'allen-heath.com' },
              { name: 'Midas', domain: 'midasconsoles.com' }
            ].map((brand, i) => (
              <div key={i} className="flex items-center justify-center min-w-[120px]">
                <img 
                  src={`https://logo.clearbit.com/${brand.domain}`} 
                  alt={brand.name} 
                  className="h-8 md:h-10 max-w-[140px] object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <span className="hidden hover:text-black transition-colors cursor-default">{brand.name}</span>
              </div>
            ))}
            {/* Repeat for continuous marquee */}
            {[
              { name: 'Yamaha', domain: 'yamaha.com' },
              { name: 'Shure', domain: 'shure.com' },
              { name: 'JBL', domain: 'jbl.com' },
              { name: 'Crown', domain: 'crownaudio.com' },
              { name: 'Martin', domain: 'martin.com' },
              { name: 'Bose', domain: 'bose.com' },
              { name: 'ROE Visual', domain: 'roevisual.com' },
              { name: 'd&b audiotechnik', domain: 'dbaudio.com' },
              { name: 'Allen & Heath', domain: 'allen-heath.com' },
              { name: 'Midas', domain: 'midasconsoles.com' }
            ].map((brand, i) => (
              <div key={`dup-${i}`} className="flex items-center justify-center min-w-[120px]">
                <img 
                  src={`https://logo.clearbit.com/${brand.domain}`} 
                  alt={brand.name} 
                  className="h-8 md:h-10 max-w-[140px] object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <span className="hidden hover:text-black transition-colors cursor-default">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIALS */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { text: "CRESCENDO completely transformed our sanctuary. The acoustic treatment and new line array system have given us unprecedented clarity.", author: "David M.", role: "Tech Director" },
            { text: "Fast turnaround, precise installation, and zero technical hitches during the entire 3-day conference. Absolutely top tier professionals.", author: "Sarah L.", role: "Event Organizer" },
            { text: "The LED wall they spec'd and installed in our lobby makes a stunning first impression. Their team's attention to detail is unmatched.", author: "Marcus T.", role: "Hotel GM" }
          ].map((testimonial, i) => (
            <div key={i} className="fade-up border border-neutral-100 p-10 flex flex-col h-full bg-white" style={{transitionDelay: `${i * 100}ms`}}>
              <div className="flex gap-1 text-black mb-6">
                {[...Array(5)].map((_, idx) => <Star key={idx} size={14} fill="currentColor" />)}
              </div>
              <p className="font-light text-neutral-600 leading-relaxed flex-1 mb-8">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-xs text-neutral-400 uppercase tracking-widest mt-1">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11 & 12. CONTACT / CTA SECTION */}
      <section id="contact" className="py-24 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          <div className="fade-up">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">Start your project.</h2>
            <p className="text-neutral-500 font-light text-lg mb-12 max-w-md">
              Speak with our engineers today for a consultation and customized quote tailored to your venue.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="text-neutral-400 mt-1" size={20} />
                <div>
                  <h4 className="font-medium">Headquarters</h4>
                  <p className="text-neutral-500 font-light mt-1 text-sm md:text-base">Middle Point Colony, Tajen Ao Rd, <br />opposite Metro Hospital, Fellowship Colony, <br className="hidden md:block" />Dimapur, Nagaland 797113</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-neutral-400" size={20} />
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-neutral-500 font-light mt-1">+91 94360 04467</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="text-neutral-400" size={20} />
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-neutral-500 font-light mt-1">hello@crescendo-av.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="fade-up delay-100 border border-neutral-100 p-8 md:p-12 bg-white">
            <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <input type="text" id="name" required className="peer w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-black font-light placeholder-transparent" placeholder="Name" />
                  <label htmlFor="name" className="absolute left-0 -top-4 text-xs tracking-widest uppercase text-neutral-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-400 peer-placeholder-shown:top-2 peer-placeholder-shown:normal-case peer-focus:-top-4 peer-focus:text-xs peer-focus:uppercase peer-focus:text-black">Full Name</label>
                </div>
                <div className="relative">
                  <input type="email" id="email" required className="peer w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-black font-light placeholder-transparent" placeholder="Email" />
                  <label htmlFor="email" className="absolute left-0 -top-4 text-xs tracking-widest uppercase text-neutral-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-400 peer-placeholder-shown:top-2 peer-placeholder-shown:normal-case peer-focus:-top-4 peer-focus:text-xs peer-focus:uppercase peer-focus:text-black">Email Address</label>
                </div>
              </div>
              
              <div className="relative mt-4">
                <select id="interest" required defaultValue="" className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-black font-light appearance-none bg-transparent">
                  <option value="" disabled>Select Area of Interest</option>
                  <option value="av">AV Integration & Install</option>
                  <option value="equipment">Equipment Purchase</option>
                  <option value="lighting">Stage & Lighting Setup</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>

              <div className="relative mt-4">
                <textarea id="message" rows={4} required className="peer w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-black font-light placeholder-transparent resize-none" placeholder="Message"></textarea>
                <label htmlFor="message" className="absolute left-0 -top-4 text-xs tracking-widest uppercase text-neutral-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-400 peer-placeholder-shown:top-2 peer-placeholder-shown:normal-case peer-focus:-top-4 peer-focus:text-xs peer-focus:uppercase peer-focus:text-black">Project Details</label>
              </div>

              <button type="submit" className="bg-black text-white px-8 py-4 font-medium mt-4 hover:bg-neutral-800 transition-colors w-full md:w-auto self-start">
                Send Request
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="bg-neutral-50 pt-20 pb-10 px-6 md:px-12 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <img 
              src="/logo.png" 
              alt="CRESCENDO Logo" 
              className="h-[150px] md:h-[200px] w-auto object-contain -my-16 md:-my-20 mb-4"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
                target.nextElementSibling?.classList.add('block');
              }}
            />
            <span className="hidden font-bold tracking-tight text-xl mb-4">CRESCENDO</span>
            <p className="text-neutral-500 font-light text-sm max-w-xs">
              Where sound meets vision. Premium audio-visual equipment and integration services for the modern stage.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-6 uppercase tracking-widest text-xs">Categories</h5>
            <ul className="flex flex-col gap-3 font-light text-sm text-neutral-500">
              <li><a href="#" className="hover:text-black transition-colors">Musical Instruments</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Sound Systems</a></li>
              <li><a href="#" className="hover:text-black transition-colors">LED Video Walls</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Stage Lighting</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-6 uppercase tracking-widest text-xs">Company</h5>
            <ul className="flex flex-col gap-3 font-light text-sm text-neutral-500">
              <li><a href="#" className="hover:text-black transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Project Gallery</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-6 uppercase tracking-widest text-xs">Connect</h5>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/crescendo_nagaland/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-neutral-200 flex items-center justify-center rounded-full hover:bg-black hover:text-white transition-colors"><Instagram size={16} /></a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-neutral-200 text-xs text-neutral-400 font-light">
          <p>&copy; {new Date().getFullYear()} CRESCENDO. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Floating Action Button for Mobile */}
      <a href="#contact" className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl z-50 hover:bg-neutral-800 transition-colors">
        <Mail size={24} />
      </a>
    </div>
  );
}
