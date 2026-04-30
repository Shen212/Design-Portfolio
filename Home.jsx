import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const RESUME_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6982c841a897702d6e66ef31/b24cafe04_NathanResume26.pdf";
const LINKEDIN_URL = "https://www.linkedin.com/in/nathanshen47";

const heroImages = [
  { url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_698282883fa86103c9b09eae/4fe4638ec_IMG_6969.jpg", position: "30% 45%" },
  { url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_698282883fa86103c9b09eae/7b50b60b9_20251216_120733.jpg", position: "50% 25%" },
  { url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6982c841a897702d6e66ef31/4f3af46e7_aweawewaeawea.jpg", position: "50% 20%" },
  { url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_698282883fa86103c9b09eae/d1c9395d7_VID_20250818_161957.jpg", position: "50% 35%" },
  { url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_698282883fa86103c9b09eae/be554a8ba_IMG_4497.jpg", position: "50% 25%" }
];

const navItems = [
  { num: "001", label: "Projects", id: "projects" },
  { num: "002", label: "Experience", id: "experience" },
  { num: "003", label: "About Me", id: "about" },
  { num: "004", label: "Contact", id: "contact" }
];

const projects = [
  { title: "Wave Energy Converter", desc: "Designed and manufactured a miniature WEC to power ocean telemetry devices.", fullDesc: "Designed, manufactured and presented a miniature wave energy converter to power ocean telemetry devices which won the award for 'Most Practical Design' at the engineering capstone symposium.", tags: ["Capstone", "Manufacturing", "Renewable Energy"], images: [] },
  { title: "Robotic Manufacturing Cells", desc: "Engineered robotic manufacturing cells and custom tooling for FANUC arms.", fullDesc: "Engineered robotic manufacturing cells and custom tooling for FANUC arms using SolidWorks, DFMA principles, and simulation.", tags: ["Robotics", "FANUC", "SolidWorks"], images: [] },
  { title: "Precision Laser Optics Fixtures", desc: "Designed fixtures for manufacturing precision laser optics with 100 micron accuracy.", fullDesc: "Designed fixtures for the manufacturing of precision laser optics accounting for Hermetics, light exposure and ESD properties.", tags: ["Precision Engineering", "Optics", "PLM"], images: [] },
  { title: "Stainless Steel Bolt-Action Pen", desc: "Precision machined a functional pen using manual lathe and mill.", fullDesc: "Precision machined a functional pen using a manual lathe and mill, applying advanced GD&T principles.", tags: ["Machining", "GD&T", "Personal Project"], images: [] },
  { title: "EV3 Robot Simulations", desc: "Designed MATLAB Simscape simulations for virtual robotics education.", fullDesc: "Designed MATLAB Simscape simulations of EV3 robots with 3D parametric modeling.", tags: ["MATLAB", "Simscape", "Education"], images: [] },
  { title: "CNC Wooden Catch-All Tray", desc: "Designed and CNC-routed a wooden tray with optimized toolpaths.", fullDesc: "Designed and CNC-routed a wooden catch-all tray, developing optimal toolpaths using CAM software.", tags: ["CNC", "CAM", "Woodworking"], images: [] }
];

const experiences = [
  { company: "Tesla", role: "Mechanical Engineering Intern", period: "Summer 2024", description: "Worked on battery thermal management systems for next-generation EV platforms." },
  { company: "Boeing", role: "Design Engineering Co-op", period: "2023 - 2024", description: "Contributed to structural analysis of aircraft components using CATIA and ANSYS." },
  { company: "University Research Lab", role: "Research Assistant", period: "2022 - 2023", description: "Assisted in developing novel manufacturing processes for composite materials." }
];

const ScrambleName = () => {
  const targetName = "NATHAN SHEN";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [displayText, setDisplayText] = useState(targetName.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join(''));
  const [iteration, setIteration] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayText(prev =>
        prev.split('').map((char, idx) => {
          if (idx < iteration) return targetName[idx];
          if (targetName[idx] === ' ') return ' ';
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      if (iteration >= targetName.length) clearInterval(interval);
      setIteration(prev => prev + 0.7);
    }, 70);
    return () => clearInterval(interval);
  }, [iteration]);

  return <span>{displayText}</span>;
};

const LiveClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const h = time.getHours().toString().padStart(2, '0');
  const m = time.getMinutes().toString().padStart(2, '0');
  const s = time.getSeconds().toString().padStart(2, '0');
  return <span>{h}:{m}:{s}</span>;
};

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  if (!project) return null;
  const images = project.images || [];
  const nextImage = (e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev + 1) % images.length); };
  const prevImage = (e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length); };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-gray-100">
              {images.length > 0 ? (
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${images[currentImageIndex]})` }} />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-200" />
              )}
              {images.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                  </button>
                  <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <ChevronRight className="w-6 h-6 text-gray-800" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, idx) => (
                      <button key={idx} onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }} className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`} />
                    ))}
                  </div>
                </>
              )}
              <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                <X className="w-5 h-5 text-gray-800" />
              </button>
            </div>
            <div className="p-6 md:p-8">
              <h3 className="font-antonio text-black text-2xl md:text-3xl mb-4">{project.title}</h3>
              <p className="font-sofia text-gray-600 mb-6 leading-relaxed">{project.fullDesc || project.desc}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span key={i} className="font-sofia text-xs text-gray-500 px-3 py-1 border border-gray-200 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ImageStrips = ({ mobile }) => (
  <div className={mobile
    ? "flex gap-1 sm:gap-2 w-[80%] sm:w-[70%] pointer-events-none mt-24 sm:mt-28"
    : "flex gap-2 lg:gap-3 xl:gap-4 w-[32%] lg:w-[36%] xl:w-[40%] 2xl:w-[45%] max-w-[600px]"
  }>
    {heroImages.map((img, idx) => (
      <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + idx * 0.1, duration: 0.6 }} className="flex-1" style={{ aspectRatio: '1/4.5' }}>
        <div className="w-full h-full bg-gray-200 overflow-hidden" style={{ backgroundImage: `url(${img.url})`, backgroundSize: 'cover', backgroundPosition: img.position }} />
      </motion.div>
    ))}
  </div>
);

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const openResume = () => window.open(`https://docs.google.com/viewer?url=${encodeURIComponent(RESUME_URL)}&embedded=true`, '_blank');
  const openLinkedIn = () => window.open(LINKEDIN_URL, '_blank');

  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: "'Sofia Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Antonio:wght@700&family=Sofia+Sans:wght@400;500;600&family=Sofia+Sans+Condensed:wght@400;500&display=swap');
        .font-antonio { font-family: 'Antonio', sans-serif; font-weight: 700; }
        .font-sofia-condensed { font-family: 'Sofia Sans Condensed', sans-serif; }
        .font-sofia { font-family: 'Sofia Sans', sans-serif; }
      `}</style>

      {/* Hero Section */}
      <section className="h-screen w-full bg-white relative overflow-hidden">

        {/* MOBILE layout */}
        <div className="md:hidden absolute inset-x-0 flex flex-col items-center z-10 px-6" style={{ top: '10%' }}>
          <h1 className="font-antonio text-black text-6xl sm:text-7xl tracking-tight text-center leading-none">
            <ScrambleName />
          </h1>
          <ImageStrips mobile />
          <nav className="font-sofia-condensed w-full mt-24 sm:mt-28">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-center">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button onClick={() => scrollTo(item.id)} className="text-gray-600 hover:text-gray-900 transition-colors bg-transparent border-none p-0 text-base sm:text-lg">
                    {item.num}&nbsp;&nbsp;&nbsp;&nbsp;{item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile: bottom bar */}
        <div className="md:hidden absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-between items-center px-4 sm:px-6 z-10">
          <span className="font-sofia-condensed text-gray-600 text-sm sm:text-base"><LiveClock /></span>
          <button onClick={openResume} className="font-sofia-condensed text-gray-600 hover:text-gray-900 transition-colors bg-transparent border-none p-0 text-sm sm:text-base">Resume</button>
          <button onClick={openLinkedIn} className="font-sofia-condensed text-gray-600 hover:text-gray-900 transition-colors bg-transparent border-none p-0 text-sm sm:text-base">Linkedin</button>
        </div>

        {/* DESKTOP layout */}
        <div className="hidden md:flex absolute top-8 lg:top-12 left-8 lg:left-12 flex-col items-start z-10">
          <h1 className="font-antonio text-black text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl tracking-tight"><ScrambleName /></h1>
          <nav className="mt-6 lg:mt-8 font-sofia-condensed">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button onClick={() => scrollTo(item.id)} className="text-gray-600 hover:text-gray-900 transition-colors bg-transparent border-none p-0 text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                    {item.num}&nbsp;&nbsp;&nbsp;&nbsp;{item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="hidden md:block absolute top-8 lg:top-12 right-8 lg:right-12 z-10">
          <button onClick={openResume} className="font-sofia-condensed text-gray-600 hover:text-gray-900 transition-colors bg-transparent border-none p-0 text-base lg:text-lg xl:text-xl 2xl:text-2xl">Resume</button>
        </div>
        <div className="hidden md:block absolute bottom-8 lg:bottom-12 right-8 lg:right-12 z-10">
          <button onClick={openLinkedIn} className="font-sofia-condensed text-gray-600 hover:text-gray-900 transition-colors bg-transparent border-none p-0 text-base lg:text-lg xl:text-xl 2xl:text-2xl">Linkedin</button>
        </div>
        <div className="hidden md:block absolute bottom-8 lg:bottom-12 left-8 lg:left-12 z-10">
          <span className="font-sofia-condensed text-gray-600 text-base lg:text-lg xl:text-xl 2xl:text-2xl"><LiveClock /></span>
        </div>
        <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
          <ImageStrips />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-24 px-8 md:px-12 lg:px-24 bg-gray-50">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="font-antonio text-black text-4xl md:text-5xl lg:text-6xl mb-16">PROJECTS</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {projects.map((project, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1, duration: 0.5 }} viewport={{ once: true }} className="group cursor-pointer" onClick={() => { setSelectedProject(project); setIsModalOpen(true); }}>
                <div className="aspect-video bg-gray-100 mb-6 overflow-hidden rounded-lg">
                  {project.images && project.images.length > 0 ? (
                    <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url(${project.images[0]})` }} />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform duration-500" />
                  )}
                </div>
                <h3 className="font-antonio text-black text-xl md:text-2xl mb-3">{project.title}</h3>
                <p className="font-sofia text-gray-600 mb-4 leading-relaxed line-clamp-2">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="font-sofia text-xs text-gray-500 px-3 py-1 border border-gray-200 rounded-full bg-white">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Experience Section */}
      <section id="experience" className="min-h-screen py-24 px-8 md:px-12 lg:px-24 bg-white">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="font-antonio text-black text-4xl md:text-5xl lg:text-6xl mb-16">EXPERIENCE</h2>
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.15, duration: 0.5 }} viewport={{ once: true }} className="border-l-2 border-black pl-8 py-2">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                  <h3 className="font-antonio text-black text-2xl md:text-3xl">{exp.company}</h3>
                  <span className="font-sofia text-gray-500 text-sm mt-1 md:mt-0">{exp.period}</span>
                </div>
                <p className="font-sofia text-gray-700 font-medium mb-2">{exp.role}</p>
                <p className="font-sofia text-gray-600 leading-relaxed">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen py-24 px-8 md:px-12 lg:px-24 bg-gray-50">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="font-antonio text-black text-4xl md:text-5xl lg:text-6xl mb-16">ABOUT ME</h2>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div className="space-y-6">
              <p className="font-sofia text-gray-600 text-lg leading-relaxed">I'm Nathan Shen, a passionate mechanical engineer with a focus on innovative design and sustainable solutions. Currently pursuing my degree at a top engineering program, I combine theoretical knowledge with hands-on experience.</p>
              <p className="font-sofia text-gray-600 text-lg leading-relaxed">My interests span across robotics, thermal systems, and advanced manufacturing. I believe in engineering that makes a positive impact on people's lives and the environment.</p>
              <p className="font-sofia text-gray-600 text-lg leading-relaxed">Outside of engineering, you'll find me kayaking, snowboarding, rock climbing, or perfecting my golf swing. I believe staying active and adventurous keeps the creative mind sharp.</p>
            </div>
            <div className="aspect-[4/5] bg-gray-200 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
                <span className="font-sofia text-gray-400 text-sm">Photo</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-8 md:px-12 lg:px-24 bg-black text-white">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="font-antonio text-white text-4xl md:text-5xl lg:text-6xl mb-16">CONTACT</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="font-sofia text-gray-300 text-lg mb-8 leading-relaxed">Interested in collaborating or have an opportunity? I'd love to hear from you.</p>
              <div className="space-y-4">
                <a href="mailto:nathan.shen@email.com" className="font-sofia text-white text-lg hover:underline block">nathan.shen@email.com</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="font-sofia text-white text-lg hover:underline block">LinkedIn</a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="font-sofia text-white text-lg hover:underline block">GitHub</a>
              </div>
            </div>
            <div className="flex items-end justify-start md:justify-end">
              <p className="font-sofia-condensed text-gray-500 text-sm">© 2024 Nathan Shen. All rights reserved.</p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
