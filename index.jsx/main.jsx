import React, { useState, useEffect, useRef } from 'react';

// Main App component that holds all sections
const App = () => {
  // Data for the portfolio sections, populated from the resume
  const portfolioData = {
    name: "Nirvan Naveen",
    tagline: "AI Enthusiast & Full-Stack Developer",
    skills: [
      { name: "Python", icon: "🐍" },
      { name: "C", icon: "⚙️" },
      { name: "React", icon: "⚛️" },
      { name: "TensorFlow/Keras", icon: "🧠" },
      { name: "OpenCV", icon: "👁️" },
      { name: "Scikit-learn", icon: "📊" },
      { name: "LangChain", icon: "🔗" },
      { name: "Firebase", icon: "🔥" },
      { name: "Streamlit", icon: "📦" },
      { name: "Data Analysis", icon: "📈" },
      { name: "Web Development", icon: "🌐" },
      { name: "Cloud Computing", icon: "☁️" },
    ],
    projects: [
      {
        title: "Multimodal RAG-Enabled LLM Assistant",
        description: "Built a local multimodal assistant capable of processing documents, images, and videos offline using Retrieval-Augmented Generation (RAG) and local LLMs.",
        image: "https://placehold.co/400x300/F59E0B/FFFFFF?text=RAG+Assistant",
        tech: ["LangChain", "Hugging Face", "RAG", "Python"],
        link: "https://www.linkedin.com/in/nirvan-naveen-bo6a47242/", // Using LinkedIn as a placeholder link
      },
      {
        title: "SparkFeed: News Summarizing App",
        description: "Developed an AI-powered news aggregator with personalized summaries and predictive analytics.",
        image: "https://placehold.co/400x300/10B981/FFFFFF?text=SparkFeed",
        tech: ["Streamlit", "Firebase", "Android SDK", "Python"],
        link: "https://www.linkedin.com/in/nirvan-naveen-bo6a47242/",
      },
      {
        title: "Lung Cancer Detection using CNNs",
        description: "Built a deep learning-based system using CNNs to predict lung cancer malignancy from medical imaging datasets.",
        image: "https://placehold.co/400x300/3B82F6/FFFFFF?text=Lung+Cancer+Detection",
        tech: ["TensorFlow", "Keras", "OpenCV", "Python"],
        link: "https://www.linkedin.com/in/nirvan-naveen-bo6a47242/",
      },
    ]
  };

  // State to manage which sections are visible for scroll animations
  const [visibleSections, setVisibleSections] = useState({});
  // Refs to each section for IntersectionObserver
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // State to track the scroll position for the parallax effect
  const [scrollPosition, setScrollPosition] = useState(0);

  // Effect to set up the IntersectionObserver for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
            // Do not unobserve here if you want to re-run animations
            // when element goes in and out of view.
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    // Observe each section
    const sections = [heroRef, aboutRef, skillsRef, projectsRef, contactRef];
    sections.forEach(section => {
      if (section.current) {
        observer.observe(section.current);
      }
    });

    return () => {
      sections.forEach(section => {
        if (section.current) {
          observer.unobserve(section.current);
        }
      });
    };
  }, []);

  // Effect to track the window's scroll position for parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProjects = () => {
    projectsRef.current.scrollIntoView({ behavior: 'smooth' });
  };


  // Animated Hero component
  const Hero = ({ name, tagline }) => {
    const [typedText, setTypedText] = useState("");
    const [isTyping, setIsTyping] = useState(true);

    // Typing effect for the tagline
    useEffect(() => {
      let timeout;
      if (isTyping && typedText.length < tagline.length) {
        timeout = setTimeout(() => {
          setTypedText(tagline.slice(0, typedText.length + 1));
        }, 50); // Typing speed
      } else {
        setIsTyping(false);
      }
      return () => clearTimeout(timeout);
    }, [typedText, isTyping, tagline]);

    return (
      <section ref={heroRef} id="hero" className={`h-screen flex flex-col justify-center items-center text-center text-white bg-gray-900 transition-opacity duration-1000 ${visibleSections.hero ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Animated background element with parallax effect */}
          <div className="absolute top-1/2 left-1/2 w-[200vw] h-[200vh] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.3)_0%,transparent_70%)] animate-pulse" style={{ transform: `translate(-50%, calc(-50% - ${scrollPosition * 0.2}px))` }}></div>
        </div>
        <div className="relative z-10 p-6 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4 animate-fade-in-up">
            Hi, I'm <span className="text-blue-400">{name}</span>
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl font-light mb-8 h-8">
            {typedText}
          </p>
          <div className="flex justify-center space-x-4 animate-fade-in-up-delay">
            <button onClick={scrollToProjects} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-transform transform hover:scale-105 duration-300 shadow-lg">
              View My Work
            </button>
          </div>
        </div>
      </section>
    );
  };

  // Section component with fade-in animation and parallax effect
  const Section = ({ id, title, children, sectionRef, isVisible, parallaxContent }) => {
    // Calculate parallax transform based on scroll position and section's offset
    const translateY = sectionRef.current ? (scrollPosition - sectionRef.current.offsetTop) * 0.15 : 0;
    
    return (
      <section ref={sectionRef} id={id} className={`relative py-20 px-4 text-gray-200 transition-opacity duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} overflow-hidden`}>
        {/* Parallax background element */}
        <div className="absolute inset-0 z-0" style={{ transform: `translateY(${translateY}px)` }}>
          {parallaxContent}
        </div>
        <div className="relative z-10 container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">{title}</h2>
          {children}
        </div>
      </section>
    );
  };

  // About Me section
  const About = () => (
    <Section
      id="about"
      title="About Me"
      sectionRef={aboutRef}
      isVisible={visibleSections.about}
      parallaxContent={
        <div className="bg-gray-800 absolute inset-0 opacity-80"></div>
      }
    >
      <p className="relative z-20 text-center text-lg max-w-3xl mx-auto leading-relaxed">
        As a final-year Computer Science student, I'm passionate about the intersection of AI and full-stack development. My projects, including an AI-powered news aggregator and a deep learning system for lung cancer detection, showcase my ability to transform complex problems into elegant, functional solutions. I thrive on creative problem-solving and am always eager to learn new technologies to build impactful and intuitive applications.
      </p>
    </Section>
  );

  // Skills section
  const Skills = ({ skills }) => (
    <Section
      id="skills"
      title="Skills"
      sectionRef={skillsRef}
      isVisible={visibleSections.skills}
      parallaxContent={
        <div className="bg-gray-900 absolute inset-0 opacity-80"></div>
      }
    >
      <div className="relative z-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`p-6 bg-gray-700 rounded-lg text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp ${visibleSections.skills ? '' : 'opacity-0 scale-90'}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="text-4xl mb-2 block">{skill.icon}</span>
            <p className="text-lg font-semibold text-gray-100">{skill.name}</p>
          </div>
        ))}
      </div>
    </Section>
  );

  // Projects section
  const Projects = ({ projects }) => (
    <Section
      id="projects"
      title="My Work"
      sectionRef={projectsRef}
      isVisible={visibleSections.projects}
      parallaxContent={
        <div className="bg-gray-800 absolute inset-0 opacity-80"></div>
      }
    >
      <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`bg-gray-700 rounded-lg shadow-md overflow-hidden transition-all duration-500 transform hover:scale-105
            ${visibleSections.projects ? '' : 'opacity-0 translate-y-10'}`}
          >
            <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-blue-300">{project.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span key={i} className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-600 text-gray-200">
                    {tech}
                  </span>
                ))}
              </div>
              <a href={project.link} className="inline-block bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-full hover:bg-blue-700 transition-colors">
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );

  // Contact section
  const Contact = () => (
    <Section
      id="contact"
      title="Get In Touch"
      sectionRef={contactRef}
      isVisible={visibleSections.contact}
      parallaxContent={
        <div className="bg-gray-900 absolute inset-0 opacity-80"></div>
      }
    >
      <div className="relative z-20 max-w-xl mx-auto text-center">
        <p className="text-lg mb-8">
          I'm always open to new opportunities and collaborations. Feel free to reach out to me!
        </p>
        <a href="mailto:nirvan.naveenn@gmail.com" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 duration-300 shadow-lg">
          Email Me
        </a>
      </div>
    </Section>
  );

  return (
    <div className="font-sans bg-gray-900 min-h-screen text-gray-200">
      {/* Tailwind CSS keyframe animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }
        .animate-fade-in-up-delay { animation: fadeInUp 0.8s ease-out 0.5s forwards; opacity: 0; }
        .animate-pulse { animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>

      <Hero name={portfolioData.name} tagline={portfolioData.tagline} />
      <About />
      <Skills skills={portfolioData.skills} />
      <Projects projects={portfolioData.projects} />
      <Contact />
    </div>
  );
};

export default App;



