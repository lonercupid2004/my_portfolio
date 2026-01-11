
import React from 'react';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  year: string;
   link: string;
}

interface PortfolioGridProps {
  projects: Project[];
}

const PortfolioGrid: React.FC<PortfolioGridProps> = ({ projects }) => {
  return (
    <section className="px-6 md:px-12 py-24 bg-black">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="font-heading text-6xl md:text-8xl tracking-tighter mb-4">SELECTED WORKS</h2>
          <div className="flex items-center gap-4">
            <span className="w-12 h-1 bg-red-600"></span>
            <p className="text-white/40 uppercase tracking-[0.3em] text-xs font-bold">The Complete Archive (01 - {projects.length})</p>
          </div>
        </div>
        <div className="max-w-xs text-right hidden md:block">
            <p className="text-white/60 text-sm italic font-light">
                "We don't just capture moments, we manufacture emotions. Every frame is a symphony of light and shadow."
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="group relative aspect-[2/3] overflow-hidden bg-neutral-900 border border-white/5 cursor-pointer"
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
            />
            
            {/* Hover Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black via-black/40 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-red-600 font-bold text-xs tracking-widest uppercase mb-2 block">{project.category}</span>
              <h3 className="font-heading text-4xl leading-none mb-4 group-hover:text-red-500 transition-colors">{project.title}</h3>
              <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <span className="text-xs font-bold uppercase tracking-widest">{project.year}</span>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] uppercase font-black border border-white/40 px-3 py-1 hover:bg-white hover:text-black transition-colors"
                >
                  View Project
                </a>
              </div>
            </div>

            {/* Corner Decorative */}
            <div className="absolute top-4 right-4 text-white/20 font-heading text-2xl">0{project.id}</div>
          </div>
        ))}
      </div>

      <div className="mt-20 flex justify-center">
        <button className="group relative px-12 py-5 bg-transparent border border-red-600 overflow-hidden">
            <span className="relative z-10 font-heading text-xl tracking-widest group-hover:text-black transition-colors">COMING SOON PROJECTS</span>
            <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        </button>
      </div>
    </section>
  );
};

export default PortfolioGrid;
