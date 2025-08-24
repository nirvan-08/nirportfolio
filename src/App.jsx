import React, { useState, useEffect, useRef } from 'react';

// Main App component
const App = () => {
  const portfolioData = {
    name: "Nirvan Naveen",
    tagline: "AI Enthusiast & Full-Stack Developer",
    about: [
      "I'm a passionate and project-driven developer currently pursuing my B.Tech in Computer Science. I enjoy creating real-world solutions that bring together AI, multimodal processing, and innovative design.",
      "Over the past few years, I've led and contributed to several impactful projects—from building a local multimodal assistant that processes documents, images, and videos offline, to developing AI-powered news summarization platforms and deep learning systems for medical imaging analysis.",
      "My work focuses on blending intelligence with usability, and I'm deeply interested in crafting secure, efficient, and scalable tech solutions. Outside of academics and projects, I'm passionate about football, sports, and music. I was proud to serve as the Captain of the B Team at Woxsen University, leading my team with dedication and teamwork both on and off the field.",
      "I'm always excited to take on new challenges, work on meaningful projects, and keep evolving—whether it's through building technology or growing personally. I look forward to opportunities that allow me to combine my project experience with new learning and real-world impact. Looking for an opportunity to work in a challenging position combining my skills in Software Engineering, which provides professional development, interesting experiences and personal growth."
    ],
    skills: [
      { name: "Python", icon: "🐍" },
      { name: "C", icon: "💻" },
      { name: "React", icon: "⚛️" },
      { name: "TensorFlow/Keras", icon: "🧠" },
      { name: "OpenCV", icon: "👁️" },
      { name: "Scikit-learn", icon: "🔬" },
      { name: "LangChain", icon: "🔗" },
      { name: "Firebase", icon: "🔥" },
      { name: "Streamlit", icon: "🚀" },
      { name: "Data Analysis", icon: "📊" },
      { name: "Web Development", icon: "🌐" },
      { name: "Cloud Computing", icon: "☁️" },
      { name: "Bootstrap", icon: "🎨" },
      { name: "Material-UI", icon: "🎨" },
      { name: "Node.js", icon: "🟢" },
      { name: "Express.js", icon: "⚡" },
      { name: "Django", icon: "🎸" },
      { name: "JWT Auth", icon: "🔐" },
      { name: "FCM", icon: "🔔" },
      { name: "MongoDB", icon: "🍃" },
      { name: "NoSQL", icon: "🗄️" },
      { name: "BART model", icon: "🤖" },
      { name: "Collaborative Filtering", icon: "🤝" },
      { name: "Power BI", icon: "📊" },
      { name: "Matplotlib", icon: "📈" },
      { name: "pandas", icon: "🐼" },
      { name: "Ethereum", icon: "💎" },
      { name: "Polygon", icon: "🔷" },
      { name: "Docker", icon: "🐳" },
      { name: "Microfrontends", icon: "🧩" },
      { name: "Git & GitHub", icon: "🐙" },
      { name: "Routing", icon: "🗺️" },
      { name: "Responsive Design", icon: "📱" },
    ],
    projects: [
      {
        title: "SparkFeed (AI News App)",
        description: "AI-powered news aggregator with summarization and personalization.",
        tech: ["Streamlit", "Firebase", "Android SDK", "Python"],
        link: "#",
      },
      {
        title: "Lost and Found Application",
        description: "A community platform for listing and finding lost and found items.",
        tech: ["React", "Firebase", "Google Maps API"],
        link: "#",
      },
      {
        title: "Food Delivery Analysis Dashboard",
        description: "A Power BI dashboard providing deep analytics on food delivery trends.",
        tech: ["Power BI", "Data Analysis", "SQL"],
        link: "#",
      },
      {
        title: "Protocol Upgrade Monitor",
        description: "A blockchain monitoring system providing real-time trading insights.",
        tech: ["Blockchain", "Web3.js", "Python"],
        link: "#",
      },
      {
        title: "OrbitalTrack (Satellite Tracker)",
        description: "A platform for tracking satellites with real-time analytics.",
        tech: ["Python", "API Integration", "Data Visualization"],
        link: "#",
      },
      {
        title: "Microfrontend News Aggregator",
        description: "A responsive news aggregator app built using microfrontend architecture.",
        tech: ["React", "Microfrontends", "Webpack"],
        link: "#",
      },
    ],
  };

  const [visibleSections, setVisibleSections] = useState({});
  const [scrollPosition, setScrollPosition] = useState(0);

  const refs = {
    hero: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({ ...prev, [entry.target.id]: true }));
          } else {
            setVisibleSections(prev => ({ ...prev, [entry.target.id]: false }));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(refs).forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      Object.values(refs).forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (refName) => {
    const ref = refs[refName];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const calculateParallaxTranslate = (refName, factor = 0.15) => {
    const ref = refs[refName];
    if (!ref.current) return 0;
    return (scrollPosition - ref.current.offsetTop) * factor;
  };

  const Header = () => (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0d1117] bg-opacity-70 backdrop-blur-md transition-all duration-300">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-[#3a86ff]">Nirvan Naveen</div>
        <ul className="hidden md:flex space-x-6">
          <li><button onClick={() => scrollToSection('about')} className="text-[#e6e6e6] hover:text-[#00f5d4] transition-colors duration-300">About</button></li>
          <li><button onClick={() => scrollToSection('skills')} className="text-[#e6e6e6] hover:text-[#00f5d4] transition-colors duration-300">Skills</button></li>
          <li><button onClick={() => scrollToSection('projects')} className="text-[#e6e6e6] hover:text-[#00f5d4] transition-colors duration-300">Projects</button></li>
          <li><button onClick={() => scrollToSection('contact')} className="text-[#e6e6e6] hover:text-[#00f5d4] transition-colors duration-300">Contact</button></li>
        </ul>
      </nav>
    </header>
  );

  const Footer = () => (
    <footer className="bg-[#0d1117] text-[#e6e6e6] py-4 px-4 text-center border-t border-[#00f5d4]">
      <div className="container mx-auto">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://www.linkedin.com/in/nirvan-naveen-b06a47242/" target="_blank" rel="noopener noreferrer" className="text-[#e6e6e6] hover:text-[#00f5d4] transition-colors duration-300 transform hover:scale-125">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.768s.784-1.767 1.75-1.767 1.75.79 1.75 1.767-.783 1.768-1.75 1.768zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.763 7 2.45v6.785z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/nirvan.08/" target="_blank" rel="noopener noreferrer" className="text-[#e6e6e6] hover:text-[#00f5d4] transition-colors duration-300 transform hover:scale-125">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07c3.252.148 4.619 1.403 4.867 4.59.058 1.265.07 1.645.07 4.849s-.012 3.583-.07 4.849c-.248 3.187-1.615 4.442-4.867 4.59-.12.006-.24.01-.36.012l-.01.001c-1.265.057-1.645.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.619-1.403-4.867-4.59-.058-1.265-.07-1.645-.07-4.849s.012-3.583.07-4.849c.248-3.187 1.615-4.442 4.867-4.59.12-.006.24-.01.36-.012l.01-.001c1.265-.057 1.645-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.254.218-6.173 2.13-6.391 6.388-.057 1.28-.071 1.688-.071 4.946s.014 3.666.071 4.946c.218 4.257 2.137 6.169 6.391 6.388 1.28.058 1.688.072 4.947.072s3.666-.014 4.946-.072c4.257-.218 6.169-2.137 6.388-6.391.058-1.28.072-1.688.072-4.946s-.014-3.667-.072-4.947c-.218-4.254-2.137-6.173-6.388-6.391-1.28-.057-1.688-.071-4.946-.071zm0 6.848c-2.827 0-5.127 2.302-5.127 5.127s2.301 5.127 5.127 5.127 5.127-2.301 5.127-5.127-2.302-5.127-5.127-5.127zm0 8.127c-1.654 0-2.999-1.345-2.999-2.999s1.345-2.999 2.999-2.999 2.999 1.345 2.999 2.999-1.345 2.999-2.999 2.999zm6.658-9.988c-.803 0-1.455.652-1.455 1.454s.652 1.455 1.455 1.455 1.455-.652 1.455-1.455-.652-1.454-1.455-1.454z"/>
            </svg>
          </a>
          <a href="https://github.com/nirvan-08" target="_blank" rel="noopener noreferrer" className="text-[#e6e6e6] hover:text-[#00f5d4] transition-colors duration-300 transform hover:scale-125">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.82-.25.82-.557v-2.09c-3.338.724-4.043-1.424-4.043-1.424-.546-1.387-1.332-1.756-1.332-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.467-1.334-5.467-5.931 0-1.311.465-2.381 1.236-3.221-.124-.303-.535-1.524.118-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.771.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .307.218.67.824.555 4.771-1.586 8.204-6.084 8.204-11.389 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} Nirvan Naveen. All rights reserved.</p>
      </div>
    </footer>
  );
  
  return (
    <div className="font-sans bg-[#0d1117] min-h-screen text-[#e6e6e6] antialiased">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blink {
          0%, 50% { border-color: transparent; }
          51%, 100% { border-color: #3a86ff; }
        }
        .animate-fadeInUp { 
          animation: fadeInUp 0.8s ease-out forwards; 
          opacity: 0;
        }
        .animate-slideInLeft { 
          animation: slideInLeft 0.8s ease-out forwards; 
          opacity: 0;
        }
        .animate-slideInRight { 
          animation: slideInRight 0.8s ease-out forwards; 
          opacity: 0;
        }
        .animate-scaleIn { 
          animation: scaleIn 0.6s ease-out forwards; 
          opacity: 0;
        }
        .animate-fade-in-up-delay { 
          animation: fadeInUp 0.8s ease-out 0.5s forwards; 
          opacity: 0; 
        }
        .animate-stagger-1 { animation-delay: 0.1s; }
        .animate-stagger-2 { animation-delay: 0.2s; }
        .animate-stagger-3 { animation-delay: 0.3s; }
        .animate-stagger-4 { animation-delay: 0.4s; }
        .animate-stagger-5 { animation-delay: 0.5s; }
        .animate-stagger-6 { animation-delay: 0.6s; }
        @keyframes pulse-shadow {
          0%, 100% { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
          50% { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
        }
        .animate-pulse-shadow { animation: pulse-shadow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes reveal {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
        .reveal-mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #0d1117;
          transform-origin: center;
          transition: transform 1.5s cubic-bezier(0.7, 0, 0.3, 1);
        }
        .parallax-bg {
          will-change: transform;
        }
        .text-reveal {
          overflow: hidden;
          position: relative;
        }
        .text-reveal::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #0d1117;
          transform: translateX(-100%);
          transition: transform 0.8s cubic-bezier(0.7, 0, 0.3, 1);
        }
        .text-reveal.revealed::after {
          transform: translateX(100%);
        }
      `}</style>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
      <script src="https://cdn.skypack.dev/lottie-web"></script>
      <Header />
      <section ref={refs.hero} id="hero" className={`h-screen relative flex flex-col justify-center items-center text-center text-[#e6e6e6] bg-[#0d1117] transition-opacity duration-1000 ${visibleSections.hero ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 w-[200vw] h-[200vh] bg-[radial-gradient(ellipse_at_center,rgba(58,134,255,0.3)_0%,transparent_70%)] animate-pulse" style={{ transform: `translate(-50%, calc(-50% - ${scrollPosition * 0.2}px))` }}></div>
        </div>
        <div className="relative z-10 p-6 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4 animate-fade-in-up">
            Hi, I'm <span className="text-[#3a86ff]">{portfolioData.name}</span>
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl font-light mb-8 h-8">
            {portfolioData.tagline}
          </p>
          <div className="flex justify-center space-x-4 animate-fade-in-up-delay">
            <button onClick={() => scrollToSection('projects')} className="bg-[#3a86ff] hover:bg-[#00f5d4] text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 transform hover:scale-105 shadow-lg">
              View My Work
            </button>
          </div>
        </div>
      </section>

      <section ref={refs.about} id="about" className={`relative py-20 px-4 text-[#e6e6e6] bg-[#0d1117] transition-opacity duration-1000 transform ${visibleSections.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} overflow-hidden`}>
        <div className="absolute inset-0 z-0 parallax-bg" style={{ transform: `translateY(${calculateParallaxTranslate('about', 0.1)}px)` }}>
          <div className="bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] absolute inset-0 opacity-60"></div>
        </div>
        <div className="relative z-10 container mx-auto max-w-6xl">
          <div className="relative overflow-hidden inline-block mx-auto mb-12">
            <h2 className={`text-3xl font-bold text-center text-[#3a86ff] ${visibleSections.about ? 'animate-slideInLeft' : ''}`}>About Me</h2>
            <div className={`reveal-mask ${visibleSections.about ? 'transform scale-x-0' : ''}`}></div>
          </div>
          <div className="relative z-20 text-center text-lg max-w-3xl mx-auto leading-relaxed">
            {portfolioData.about.map((p, i) => (
              <p key={i} className={`mb-6 ${visibleSections.about ? `animate-fadeInUp animate-stagger-${i + 1}` : ''}`}>{p}</p>
            ))}
          </div>
        </div>
      </section>
      
      <section ref={refs.skills} id="skills" className={`relative py-20 px-4 text-[#e6e6e6] bg-[#0d1117] transition-opacity duration-1000 transform ${visibleSections.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} overflow-hidden`}>
        <div className="absolute inset-0 z-0 parallax-bg" style={{ transform: `translateY(${calculateParallaxTranslate('skills', 0.08)}px)` }}>
          <div className="bg-gradient-to-tl from-[#0d1117] via-[#1a202c] to-[#0d1117] absolute inset-0 opacity-50"></div>
        </div>
        <div className="relative z-10 container mx-auto max-w-6xl">
          <div className="relative overflow-hidden inline-block mx-auto mb-12">
            <h2 className={`text-3xl font-bold text-center text-[#3a86ff] ${visibleSections.skills ? 'animate-slideInRight' : ''}`}>Skills</h2>
            <div className={`reveal-mask ${visibleSections.skills ? 'transform scale-x-0' : ''}`}></div>
          </div>
          <div className="relative z-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {portfolioData.skills.map((skill, index) => (
              <div
                key={index}
                className={`p-6 bg-[#1a202c] rounded-lg text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 ${visibleSections.skills ? 'animate-scaleIn' : 'opacity-0 scale-75'}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="text-4xl mb-2 block transform transition-transform duration-300 hover:scale-125">{skill.icon}</span>
                <p className="text-lg font-semibold text-[#e6e6e6]">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section ref={refs.projects} id="projects" className={`relative py-20 pb-0 px-4 text-[#e6e6e6] bg-[#0d1117] transition-opacity duration-1000 transform ${visibleSections.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} overflow-hidden`}>
        <div className="absolute inset-0 z-0 parallax-bg" style={{ transform: `translateY(${calculateParallaxTranslate('projects', 0.06)}px)` }}>
          <div className="bg-gradient-to-tr from-[#0d1117] via-[#161b22] to-[#0d1117] absolute inset-0 opacity-40"></div>
        </div>
        <div className="relative z-10 container mx-auto max-w-6xl">
          <div className="relative overflow-hidden inline-block mx-auto mb-12">
            <h2 className={`text-3xl font-bold text-center text-[#3a86ff] ${visibleSections.projects ? 'animate-slideInLeft' : ''}`}>My Work</h2>
            <div className={`reveal-mask ${visibleSections.projects ? 'transform scale-x-0' : ''}`}></div>
          </div>
          <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project, index) => (
              <div key={index} className={`${visibleSections.projects ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: `${index * 0.15}s` }}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>


      <section ref={refs.contact} id="contact" className={`relative py-20 px-4 text-[#e6e6e6] bg-[#0d1117] transition-opacity duration-1000 transform ${visibleSections.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} overflow-hidden`}>
        <div className="absolute inset-0 z-0 parallax-bg" style={{ transform: `translateY(${calculateParallaxTranslate('contact', 0.05)}px)` }}>
          <div className="bg-gradient-to-bl from-[#0d1117] via-[#1a202c] to-[#0d1117] absolute inset-0 opacity-30"></div>
        </div>
        <div className="relative z-10 max-w-xl mx-auto text-center">
          <div className="relative overflow-hidden inline-block mx-auto mb-12">
            <h2 className={`text-3xl font-bold text-center text-[#3a86ff] ${visibleSections.contact ? 'animate-slideInRight' : ''}`}>Get In Touch</h2>
            <div className={`reveal-mask ${visibleSections.contact ? 'transform scale-x-0' : ''}`}></div>
          </div>
          <p className={`text-lg mb-8 ${visibleSections.contact ? 'animate-fadeInUp animate-stagger-1' : ''}`}>
            I'm always open to new opportunities and collaborations. Feel free to reach out to me!
          </p>
          <form className={`mt-8 flex justify-center ${visibleSections.contact ? 'animate-scaleIn animate-stagger-2' : ''}`} onSubmit={e => { e.preventDefault(); e.target.reset(); }}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-3 rounded-l-full bg-[#1a202c] text-[#e6e6e6] placeholder-[#8c929a] focus:outline-none focus:ring-2 focus:ring-[#3a86ff] transition-all duration-300 w-full max-w-xs transform hover:scale-105"
            />
            <button type="submit" className="bg-[#3a86ff] hover:bg-[#00f5d4] text-white font-bold py-3 px-6 rounded-r-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              Send
            </button>
          </form>
          <div className={`mt-8 flex justify-center ${visibleSections.contact ? 'animate-fadeInUp animate-stagger-3' : ''}`}>
            <a 
              href="/resume.pdf"
              download="Nirvan_Naveen_Resume.pdf"
              className="bg-gradient-to-r from-[#3a86ff] to-[#00f5d4] hover:from-[#00f5d4] hover:to-[#3a86ff] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </section>
      
      
      <Footer />
    </div>
  );
};


const ProjectCard = ({ project }) => {
  return (
    <div className="bg-[#1a202c] rounded-lg shadow-md overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
      <div className="w-full p-6">
        <h3 className="text-xl font-bold mb-2 text-[#3a86ff]">{project.title}</h3>
        <p className="text-[#e6e6e6] text-sm mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, i) => (
            <span key={i} className="text-xs font-semibold px-2 py-1 rounded-full bg-[#0d1117] text-[#e6e6e6]">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};


const LottieRocket = ({ isVisible }) => {
  const lottieContainerRef = useRef(null);

  useEffect(() => {
    let animation = null;
    if (lottieContainerRef.current && isVisible && window.lottie) {
      animation = window.lottie.loadAnimation({
        container: lottieContainerRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: 'https://lottie.host/81b21852-5204-4b5b-9d41-d575c3f91574/8rG8aB4mD4.json',
      });
    }
    return () => {
      if (animation) {
        animation.destroy();
      }
    };
  }, [isVisible]);

  return (
    <div className={`relative flex justify-center items-center h-[200px] my-12 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div ref={lottieContainerRef} className="w-full h-full max-w-sm" />
    </div>
  );
};


export default App;
