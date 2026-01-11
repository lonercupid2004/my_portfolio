
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import PortfolioGrid from './components/PortfolioGrid';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import InquireModal from './components/InquireModal';
import ProcessPage from './components/ProcessPage';
import AboutPage from './components/AboutPage';
import { Settings } from 'lucide-react';

const DEFAULT_HERO_IMAGE = "/asset/0c27aa004c7384158c55fb36356fd654.png";
const DEFAULT_HERO_TITLE = "FAIM";
const DEFAULT_HERO_SUBTITLE = "PATHAN";

const DEFAULT_PROJECTS = [
  { id: 1, title: 'DAIRY STORE', category: 'Organic', year: '2025', image: '/asset/dairy store.PNG' , link: ''},
  { id: 2, title: 'SOLO LEVELING', category: 'Fantasy', year: '2025', image: '/asset/solo leveling.PNG' , link: '#'},
  { id: 3, title: 'E-COMMERCE', category: 'ESSENTIAL', year: '2025', image: '/asset/amitrjmart.PNG', link: 'https://amitrjmart.com/' },
  { id: 4, title: 'VOID CALLER', category: 'Horror', year: '2023', image: 'https://images.unsplash.com/photo-1478720143034-8fa356b21473?auto=format&fit=crop&q=80&w=800' },
  { id: 5, title: 'URBAN NOIR', category: 'Thriller', year: '2022', image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=800' },
  { id: 6, title: 'SILENT STORM', category: 'Adventure', year: '2024', image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=800' },
];

const DEFAULT_PROCESS_DATA = {
  languages: ['React', 'Java', 'Node.js', 'Python', 'Php', 'Blender'],
  videoUrl: '/asset/Video by inactive_acc2004 [DSg_4uMCICs].mp4',
  gameSpeed: 5,
  gameCharacter: 'https://r2.erweima.ai/ai_image/95196395-8968-45e0-843e-f191b248a3c5.png'
};

const DEFAULT_ABOUT_DATA = {
  bio: "I am a visual artist and software developer pushing the boundaries of interactive cinema & codes. My work explores the intersection of high-fidelity aesthetics and performance-driven technology.",
  capabilities: [
    { title: "FREESTYLE EDITING", desc: "Crafting atmospheric environments and cinematic lighting systems." },
    { title: "INTERACTIVE DESIGN WEBPAGES", desc: "Building immersive web experiences that feel alive and responsive." },
    { title: "TECHNICAL AND FUNCTIONAL WEB APPS", desc: "Engineering robust full-stack solutions for modern digital problems." }
  ]
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'process' | 'about'>('home');
  const [scrollY, setScrollY] = useState(0);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isInquireOpen, setIsInquireOpen] = useState(false);
  
  const [heroImage, setHeroImage] = useState(() => localStorage.getItem('portfolio_hero_image') || DEFAULT_HERO_IMAGE);
  const [heroTitle, setHeroTitle] = useState(() => localStorage.getItem('portfolio_hero_title') || DEFAULT_HERO_TITLE);
  const [heroSubTitle, setHeroSubTitle] = useState(() => localStorage.getItem('portfolio_hero_subtitle') || DEFAULT_HERO_SUBTITLE);
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('portfolio_projects');
    return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
  });

  const [processData, setProcessData] = useState(() => {
    const saved = localStorage.getItem('portfolio_process_data');
    return saved ? JSON.parse(saved) : DEFAULT_PROCESS_DATA;
  });

  const [aboutData, setAboutData] = useState(() => {
    const saved = localStorage.getItem('portfolio_about_data');
    return saved ? JSON.parse(saved) : DEFAULT_ABOUT_DATA;
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === 'a') setIsAdminOpen(prev => !prev);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleUpdateHero = (url: string, title: string, subtitle: string) => {
    setHeroImage(url); setHeroTitle(title); setHeroSubTitle(subtitle);
    localStorage.setItem('portfolio_hero_image', url);
    localStorage.setItem('portfolio_hero_title', title);
    localStorage.setItem('portfolio_hero_subtitle', subtitle);
  };

  const handleUpdateProjects = (newProjects: any[]) => {
    setProjects(newProjects);
    localStorage.setItem('portfolio_projects', JSON.stringify(newProjects));
  };

  const handleUpdateProcess = (newData: any) => {
    setProcessData(newData);
    localStorage.setItem('portfolio_process_data', JSON.stringify(newData));
  };

  const handleUpdateAbout = (newData: any) => {
    setAboutData(newData);
    localStorage.setItem('portfolio_about_data', JSON.stringify(newData));
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden selection:bg-red-600 selection:text-white">
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-repeat transition-all duration-1000" 
        style={{ 
          backgroundImage: `url(${heroImage})`,
          backgroundSize: '300px',
          filter: currentPage === 'process' ? 'hue-rotate(90deg)' : currentPage === 'about' ? 'hue-rotate(240deg)' : 'none'
        }}
      ></div>

      <Navbar 
        onInquireClick={() => setIsInquireOpen(true)} 
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentPage={currentPage}
      />
      
      <main className="transition-opacity duration-500">
        {currentPage === 'home' && (
          <>
            <Hero scrollY={scrollY} characterImage={heroImage} title={heroTitle} subtitle={heroSubTitle} />
            <Ticker />
            <PortfolioGrid projects={projects} />
          </>
        )}
        {currentPage === 'process' && <ProcessPage data={processData} />}
        {currentPage === 'about' && <AboutPage data={aboutData} />}
      </main>

      <Footer onInquireClick={() => setIsInquireOpen(true)} />

      <button 
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-6 right-6 z-[100] w-12 h-12 bg-red-600 flex items-center justify-center rounded-full hover:scale-110 active:scale-95 transition-all shadow-lg shadow-red-600/20 group"
      >
        <Settings className="text-white group-hover:rotate-90 transition-transform duration-500" size={24} />
      </button>

      {isAdminOpen && (
        <AdminPanel 
          heroImage={heroImage} 
          heroTitle={heroTitle}
          heroSubTitle={heroSubTitle}
          projects={projects}
          processData={processData}
          aboutData={aboutData}
          onUpdateHero={handleUpdateHero}
          onUpdateProjects={handleUpdateProjects}
          onUpdateProcess={handleUpdateProcess}
          onUpdateAbout={handleUpdateAbout}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

      {isInquireOpen && <InquireModal onClose={() => setIsInquireOpen(false)} />}
    </div>
  );
};

export default App;
