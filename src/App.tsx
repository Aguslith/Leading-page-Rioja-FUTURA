import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ChevronRight, Play, Globe, Zap, Terminal, Rocket, Users, Cpu } from 'lucide-react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InteractiveBackground from './components/InteractiveBackground';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselImages = [
    '/carousel/1.jpeg',
    '/carousel/2.jpeg',
    '/carousel/3.jpeg',
    '/carousel/4.jpeg',
    '/carousel/5.jpeg',
    '/carousel/6.jpeg',
    '/carousel/7.jpeg',
    '/carousel/8.jpeg',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // GSAP Revelations
    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach((el) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  return (
    <div ref={containerRef} className="relative bg-bg text-white selection:bg-accent-blue selection:text-black">
      <div className="grain-overlay" />
      <InteractiveBackground />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-[100] px-6 py-4 flex justify-between items-center bg-bg/20 backdrop-blur-sm">
        <div className="flex items-center gap-2">
           <img src="/Rioja Futura Logo.PNG" alt="Rioja Futura" className="h-16 w-auto" />
        </div>
        <div className="hidden md:flex gap-12 font-sans text-[10px] tracking-[0.3em] uppercase font-bold">
          <a href="#inicio" className="hover:text-accent-blue transition-colors">Inicio</a>
          <a href="#evento" className="hover:text-accent-pink transition-colors">El Evento</a>
          <a href="#participantes" className="hover:text-accent-purple transition-colors">Participantes</a>
          <a href="#contacto" className="px-4 py-2 border border-white/20 hover:bg-white hover:text-black transition-all rounded-full">Contacto</a>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="inicio" className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
          <motion.div 
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="z-10"
          >
            <h1 className="h1-editorial">
              Rioja <br />
              <span className="text-accent-blue italic-serif font-serif normal-case">Futura</span>
            </h1>
            <p className="mt-8 text-white/50 font-sans tracking-[0.2em] uppercase text-xs max-w-xl mx-auto reveal-up">
              La convergencia definitiva entre la tradición <br /> y la vanguardia tecnológica argentina
            </p>
            
            <div className="mt-12 flex flex-col md:flex-row gap-6 items-center justify-center reveal-up">
              <button className="group relative px-10 py-4 overflow-hidden rounded-full border border-white/20 hover:border-accent-blue transition-colors">
                <span className="relative z-10 font-sans text-xs tracking-widest uppercase font-bold group-hover:text-black transition-colors">Explorar</span>
                <div className="absolute inset-x-0 bottom-0 h-0 bg-accent-blue transition-all group-hover:h-full" />
              </button>
              <button className="flex items-center gap-3 text-xs tracking-widest uppercase font-bold text-white/60 hover:text-accent-pink transition-colors">
                <Play className="w-4 h-4 fill-current" /> Ver Trailer
              </button>
            </div>
          </motion.div>

          {/* Background Video Parallax */}
          <div className="absolute inset-0 z-0 opacity-40 grayscale">
             <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-110"
                src="/video-rioja-futura.mp4"
                style={{ filter: 'brightness(0.5)' }}
              />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-bg/0 via-bg/20 to-bg" />
        </section>

        {/* Marquee Section */}
        <section className="py-24 border-y border-white/5 bg-white/[0.02]">
          <div className="marquee-container">
            <div className="marquee-content flex gap-20 items-center">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-20 items-center">
                  <span className="text-4xl font-serif italic text-white/20 hover:text-accent-blue transition-colors cursor-default">Innovación Digital</span>
                  <Zap className="w-8 h-8 text-accent-pink" />
                  <span className="text-4xl font-sans font-black uppercase text-white/20 hover:text-accent-purple transition-colors cursor-default">Blockchain</span>
                  <Globe className="w-8 h-8 text-accent-blue" />
                  <span className="text-4xl font-serif italic text-white/20 hover:text-accent-pink transition-colors cursor-default">Inteligencia Artificial</span>
                  <Cpu className="w-8 h-8 text-accent-purple" />
                  <span className="text-4xl font-sans font-black uppercase text-white/20 hover:text-accent-blue transition-colors cursor-default">Vanguardia</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content Section 1: The Event */}
        <section id="evento" className="py-40 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-24 items-end">
              <div className="reveal-up">
                <span className="text-accent-blue font-sans text-[10px] tracking-[0.4em] uppercase font-bold block mb-6">El Evento / 2024</span>
                <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
                  ¿Qué es <br /> 
                  <em className="font-serif italic font-light text-accent-pink normal-case">Rioja Futura</em>?
                </h2>
                <div className="mt-12 space-y-8 text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-lg">
                  <p>
                    Rioja Futura es el epicentro de la innovación en el norte argentino. Un evento inmersivo de 3 días donde mentes brillantes, tecnología disruptiva y cultura digital colisionan.
                  </p>
                  <p>
                    Desde IA y blockchain hasta biotecnología, exploramos las fronteras de lo posible en un entorno diseñado para inspirar.
                  </p>
                  <div className="pt-8">
                    <button className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                        <ChevronRight />
                      </div>
                      <span className="text-xs tracking-widest uppercase font-bold">Conocer más</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl reveal-up bg-white/5" style={{ transform: 'translateY(100px)' }}>
                <AnimatePresence mode="wait">
                    <motion.img 
                        key={currentSlide}
                        src={carouselImages[currentSlide]} 
                        alt="Innovation Gallery" 
                        initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg via-bg/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-10 left-10 pointer-events-none">
                   <p className="text-4xl font-serif italic text-white tracking-tight drop-shadow-2xl">
                    Galeria <br/> 
                    <span className="text-accent-blue font-sans font-black uppercase text-xs tracking-[0.4em]">Inmersiva {currentSlide + 1}/{carouselImages.length}</span>
                   </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section with floating cards */}
        <section className="py-40 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
            {[
              { val: "50+", label: "Speakers Globales", icon: <Users className="text-accent-blue" /> },
              { val: "10k", label: "Asistentes", icon: <Zap className="text-accent-pink" /> },
              { val: "3", label: "Días de Inmersión", icon: <Globe className="text-accent-purple" /> }
            ].map((stat, i) => (
              <div key={i} className="glass-card p-12 rounded-3xl reveal-up group hover:bg-white/5 transition-all">
                <div className="w-12 h-12 mb-8 flex items-center justify-center border border-white/10 rounded-xl group-hover:rotate-12 transition-transform">
                  {stat.icon}
                </div>
                <h3 className="text-7xl font-black mb-2 tracking-tighter group-hover:text-accent-blue transition-colors">
                  {stat.val}
                </h3>
                <p className="text-white/40 font-sans text-xs tracking-widest uppercase font-bold">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Participants Section */}
        <section id="participantes" className="py-40 px-6">
          <div className="max-w-7xl mx-auto text-center mb-32 reveal-up">
             <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
               ¿Para <em className="font-serif italic font-light text-accent-purple normal-case">quiénes</em>?
             </h2>
             <p className="text-white/40 max-w-xl mx-auto uppercase tracking-widest text-[10px] font-bold">
               Un ecosistema diseñado para todos los actores de la revolución digital.
             </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-1 px-6">
            {[
              { title: "Desarrolladores", icon: <Terminal />, color: "accent-blue" },
              { title: "Emprendedores", icon: <Rocket />, color: "accent-pink" },
              { title: "Estudiantes", icon: <Users />, color: "accent-purple" }
            ].map((item, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden bg-white/[0.03] reveal-up border border-white/5">
                <div className="absolute inset-0 flex flex-col justify-center items-center p-12 text-center z-10">
                   <div className="w-20 h-20 mb-8 border border-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                     {item.icon}
                   </div>
                   <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">{item.title}</h3>
                   <p className="text-white/40 text-sm font-light max-w-[200px]">
                     Workshops técnicos y charlas sobre las últimas tecnologías del mercado.
                   </p>
                </div>
                <div className={`absolute inset-0 bg-${item.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contacto" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-20">
            <div>
               <img src="/Rioja Futura Logo.PNG" alt="Rioja Futura" className="h-20 w-auto mb-8" />
               <p className="text-white/40 max-w-xs font-light">
                 Dando forma al mañana desde el corazón de Argentina. La Rioja Futura es innovación, cultura y tecnología.
               </p>
            </div>
            <div className="grid grid-cols-2 gap-20">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-white/20 mb-6">Social</p>
                <div className="space-y-4 font-sans font-bold text-sm">
                  <a href="#" className="block hover:text-accent-blue">Instagram</a>
                  <a href="#" className="block hover:text-accent-pink">Twitter (X)</a>
                  <a href="#" className="block hover:text-accent-purple">LinkedIn</a>
                </div>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-white/20 mb-6">Evento</p>
                <div className="space-y-4 font-sans font-bold text-sm">
                  <a href="#inicio" className="block hover:text-accent-blue">Tickets</a>
                  <a href="#evento" className="block hover:text-accent-pink">Programa</a>
                  <a href="#participantes" className="block hover:text-accent-purple">Sponsors</a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-40 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] tracking-widest uppercase font-bold text-white/20">
            <p>© 2024 La Rioja, Argentina. Todos los derechos reservados.</p>
            <div className="flex gap-8">
               <a href="#" className="hover:text-white transition-colors">Politica de Privacidad</a>
               <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
