
import React, { useState, useRef } from 'react';
// Added Sparkles to the lucide-react imports
import { X, Save, RotateCcw, Image as ImageIcon, Briefcase, ShieldAlert, KeyRound, UploadCloud, Type, Terminal, Cpu, Layout, Info, User, Sparkles } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  year: string;
    link: string;
}

interface ProcessData {
  languages: string[];
  videoUrl: string;
  gameSpeed: number;
  gameCharacter: string;
}

interface AboutData {
  bio: string;
  capabilities: { title: string; desc: string }[];
}

interface AdminPanelProps {
  heroImage: string;
  heroTitle: string;
  heroSubTitle: string;
  projects: Project[];
  processData: ProcessData;
  aboutData: AboutData;
  onUpdateHero: (url: string, title: string, subtitle: string) => void;
  onUpdateProjects: (projects: Project[]) => void;
  onUpdateProcess: (data: ProcessData) => void;
  onUpdateAbout: (data: AboutData) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  heroImage, heroTitle, heroSubTitle, projects, processData, aboutData,
  onUpdateHero, onUpdateProjects, onUpdateProcess, onUpdateAbout, onClose 
}) => {
  const [activeTab, setActiveTab] = useState<'landing' | 'process' | 'about'>('landing');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [authError, setAuthError] = useState(false);
  
  // States
  const [tempHero, setTempHero] = useState(heroImage);
  const [tempTitle, setTempTitle] = useState(heroTitle);
  const [tempSubTitle, setTempSubTitle] = useState(heroSubTitle);
  const [tempProjects, setTempProjects] = useState([...projects]);
  const [tempProcess, setTempProcess] = useState({ ...processData });
  const [tempAbout, setTempAbout] = useState({ ...aboutData });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessKey === '1234') { setIsAuthorized(true); setAuthError(false); }
    else { setAuthError(true); setAccessKey(''); setTimeout(() => setAuthError(false), 2000); }
  };

  const processFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.readAsDataURL(file);
    });
  };

  const handleSave = () => {
    onUpdateHero(tempHero, tempTitle, tempSubTitle);
    onUpdateProjects(tempProjects);
    onUpdateProcess(tempProcess);
    onUpdateAbout(tempAbout);
    onClose();
  };

  const ImageDropzone = ({ onDrop, currentImage, label, isHero = false }: any) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    return (
      <div 
        onClick={() => fileInputRef.current?.click()}
        className={`relative cursor-pointer transition-all duration-300 group overflow-hidden border-2 border-dashed border-white/10 hover:border-red-600/50 bg-neutral-950 ${isHero ? 'aspect-square' : 'aspect-video'}`}
      >
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file) onDrop(await processFile(file));
        }} />
        {currentImage ? (
          <img src={currentImage} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-all" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/20">
            <UploadCloud size={24} />
            <span className="text-[8px] font-black uppercase">{label}</span>
          </div>
        )}
      </div>
    );
  };

  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose}></div>
        <div className={`relative w-full max-w-md bg-neutral-900 border ${authError ? 'border-red-600' : 'border-white/10'} p-10 shadow-2xl transition-all duration-300`}>
          <div className="flex flex-col items-center text-center space-y-6">
            <KeyRound size={32} className={authError ? 'text-red-600' : 'text-white'} />
            <h2 className="font-heading text-3xl tracking-tight uppercase">Secure Entry</h2>
            <form onSubmit={handleAuth} className="w-full space-y-4">
              <input type="password" autoFocus value={accessKey} onChange={(e) => setAccessKey(e.target.value)} placeholder="••••" className="w-full bg-black border border-white/10 p-5 text-center text-3xl tracking-[0.5em] font-mono focus:border-red-600 outline-none transition-colors" />
              <button type="submit" className="w-full bg-red-600 text-white py-4 font-black uppercase tracking-[0.3em] text-xs hover:bg-red-700 transition-colors">Decrypt Console</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-neutral-900 border border-white/10 overflow-hidden flex flex-col shadow-2xl">
        
        {/* Header Tabs */}
        <div className="flex bg-neutral-950 border-b border-white/10">
          <button 
            onClick={() => setActiveTab('landing')}
            className={`flex items-center gap-2 px-8 py-6 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'landing' ? 'bg-red-600 text-white' : 'text-white/40 hover:bg-white/5'}`}
          >
            <Layout size={14} /> Landing
          </button>
          <button 
            onClick={() => setActiveTab('process')}
            className={`flex items-center gap-2 px-8 py-6 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'process' ? 'bg-red-600 text-white' : 'text-white/40 hover:bg-white/5'}`}
          >
            <Terminal size={14} /> Process
          </button>
          <button 
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-2 px-8 py-6 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'about' ? 'bg-red-600 text-white' : 'text-white/40 hover:bg-white/5'}`}
          >
            <User size={14} /> About
          </button>
          <div className="flex-1"></div>
          <button onClick={onClose} className="p-6 text-white/40 hover:text-red-600"><X size={24} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-12">
          {activeTab === 'landing' && (
            <>
              <section className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-white/40">Title</label>
                    <input type="text" value={tempTitle} onChange={(e) => setTempTitle(e.target.value)} className="w-full bg-black border border-white/10 p-4 font-heading text-2xl outline-none focus:border-red-600" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-white/40">Subtitle</label>
                    <input type="text" value={tempSubTitle} onChange={(e) => setTempSubTitle(e.target.value)} className="w-full bg-black border border-white/10 p-4 font-bold text-xs outline-none focus:border-red-600" />
                  </div>
                </div>
                <ImageDropzone isHero currentImage={tempHero} onDrop={setTempHero} label="Hero PNG" />
              </section>
              <section className="grid grid-cols-3 gap-6">
                {tempProjects.map((p, i) => (
                  <div key={p.id} className="bg-neutral-950 border border-white/5 p-4 space-y-4">
                    <ImageDropzone currentImage={p.image} onDrop={(base64: any) => {
                      const up = [...tempProjects]; up[i] = { ...up[i], image: base64 }; setTempProjects(up);
                    }} label={`Project ${i+1}`} />
                    <div className="space-y-2">
                      <input type="text" value={p.title} placeholder="Title" onChange={(e) => {
                        const up = [...tempProjects]; up[i] = { ...up[i], title: e.target.value }; setTempProjects(up);
                      }} className="w-full bg-black border border-white/10 p-2 text-[10px] uppercase font-bold outline-none" />
                      <input type="text" value={p.link} placeholder="External Link (URL)" onChange={(e) => {
                        const up = [...tempProjects]; up[i] = { ...up[i], link: e.target.value }; setTempProjects(up);
                      }} className="w-full bg-black border border-white/10 p-2 text-[8px] font-mono outline-none focus:border-red-600" />
                    </div>
                  </div>
                ))}
              </section>
            </>
          )}

          {activeTab === 'process' && (
            <>
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <Cpu className="text-red-600" size={18} />
                  <h3 className="text-xs font-black uppercase tracking-widest">Tech Stack Management</h3>
                </div>
                <textarea 
                  value={tempProcess.languages.join(', ')}
                  onChange={(e) => setTempProcess({ ...tempProcess, languages: e.target.value.split(',').map(s => s.trim()) })}
                  className="w-full bg-black border border-white/10 p-6 font-mono text-sm outline-none focus:border-red-600 min-h-[100px]"
                  placeholder="React, TypeScript, Node.js..."
                />
              </section>
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <ImageIcon className="text-red-600" size={18} />
                  <h3 className="text-xs font-black uppercase tracking-widest">Showreel Feed (Video URL)</h3>
                </div>
                <input 
                  type="text" 
                  value={tempProcess.videoUrl}
                  onChange={(e) => setTempProcess({ ...tempProcess, videoUrl: e.target.value })}
                  className="w-full bg-black border border-white/10 p-4 font-mono text-sm outline-none focus:border-red-600"
                />
              </section>
              <section className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] text-white/40 uppercase font-black">Scroll Velocity: {tempProcess.gameSpeed}</label>
                  <input type="range" min="2" max="15" value={tempProcess.gameSpeed} onChange={(e) => setTempProcess({ ...tempProcess, gameSpeed: parseInt(e.target.value) })} className="w-full accent-red-600 bg-white/10" />
                </div>
                <ImageDropzone isHero currentImage={tempProcess.gameCharacter} onDrop={(base64: any) => setTempProcess({ ...tempProcess, gameCharacter: base64 })} label="Drop Character" />
              </section>
            </>
          )}

          {activeTab === 'about' && (
            <div className="space-y-12">
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <Info className="text-red-600" size={18} />
                  <h3 className="text-xs font-black uppercase tracking-widest">About Me Bio</h3>
                </div>
                <textarea 
                  value={tempAbout.bio}
                  onChange={(e) => setTempAbout({ ...tempAbout, bio: e.target.value })}
                  className="w-full bg-black border border-white/10 p-6 font-light text-xl outline-none focus:border-red-600 min-h-[150px] leading-relaxed italic"
                />
              </section>

              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <Sparkles className="text-red-600" size={18} />
                  <h3 className="text-xs font-black uppercase tracking-widest">What I Can Do (Capabilities)</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {tempAbout.capabilities.map((cap, idx) => (
                    <div key={idx} className="bg-neutral-950 border border-white/5 p-6 space-y-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-white/20">Skill Title</label>
                        <input 
                          type="text" 
                          value={cap.title}
                          onChange={(e) => {
                            const newCaps = [...tempAbout.capabilities];
                            newCaps[idx].title = e.target.value;
                            setTempAbout({ ...tempAbout, capabilities: newCaps });
                          }}
                          className="w-full bg-black border border-white/10 p-2 text-xs font-bold outline-none focus:border-red-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-white/20">Description</label>
                        <textarea 
                          value={cap.desc}
                          onChange={(e) => {
                            const newCaps = [...tempAbout.capabilities];
                            newCaps[idx].desc = e.target.value;
                            setTempAbout({ ...tempAbout, capabilities: newCaps });
                          }}
                          className="w-full bg-black border border-white/10 p-2 text-[10px] outline-none focus:border-red-600 min-h-[80px]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-white/10 bg-neutral-950 flex justify-between">
          <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="flex items-center gap-2 px-6 py-3 border border-red-600/20 text-red-600 text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"><RotateCcw size={12}/> Reset</button>
          <div className="flex gap-4">
            <button onClick={onClose} className="px-8 py-3 text-white/40 text-[10px] font-black uppercase tracking-widest">Abort</button>
            <button onClick={handleSave} className="flex items-center gap-2 px-10 py-3 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-red-700 shadow-xl shadow-red-600/20"><Save size={14}/> Publish Updates</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
