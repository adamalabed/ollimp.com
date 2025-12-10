import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, Globe, BarChart3, PenTool, Zap, MessageCircle, ChevronRight, ArrowUpRight } from 'lucide-react';

/**
 * TRANSLATIONS & CONTENT DATA
 */
const TRANSLATIONS = {
  en: {
    nav: {
      agency: 'Agency',
      cases: 'Cases',
      services: 'Services',
      start: 'Start Project'
    },
    home: {
      subtitle: 'Building decisions & strategies for market dominance.',
      cta: 'Explore Work'
    },
    agency: {
      title: 'Agency',
      manifesto_label: 'THE MANIFESTO',
      manifesto_headline: (
        <>We don't just design. We cause <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9BAFF] to-blue-500">Resonance</span>.</>
      ),
      p1: 'The most risky thing for a brand today is to be unnoticed. Silence is fatal. We operate as an open platform for bold ideas, rejecting the safety of "best practices" in favor of breakthrough strategies.',
      p2: 'We bring together thinkers, creators, and pioneers to collectively realize projects in diverse fields—from deep market analysis to virtual worlds, from music to linguistics, from art to commerce.',
      p3: 'Our process is brutal yet refined. We strip away the noise to find the core truth of your business, then we amplify it until it\'s impossible to ignore.',
      stats: { clients: 'Global Clients', growth: 'Avg. Growth', awards: 'Industry Awards', est: 'Established' }
    },
    services: {
      title: 'Services',
      items: [
        {
          id: '01',
          title: 'Analysis',
          desc: 'Deep investigations to identify precise market positioning. We uncover competitive advantages before we design a single pixel.',
          skills: ['Market Research', 'Competitor Audits', 'User Persona', 'Trend Forecasting']
        },
        {
          id: '02',
          title: 'Strategy',
          desc: 'We define your brand\'s core purpose. Our strategies aren’t just documents; they are actionable roadmaps for market dominance.',
          skills: ['Brand Architecture', 'Communication Strategy', 'Tone of Voice', 'Growth Roadmap']
        },
        {
          id: '03',
          title: 'Design',
          desc: 'Visual systems that speak louder than words. From corporate identity to digital product design, we ensure your brand looks as innovative as it feels.',
          skills: ['Visual Identity', 'UI/UX Design', 'Motion Graphics', 'Packaging']
        },
        {
          id: '04',
          title: 'Marketing',
          desc: 'Seeding, influencer marketing, and media buying. We amplify your message across the right channels to ensure maximum resonance.',
          skills: ['Social Media', 'Influencer Marketing', 'Performance', 'Content Creation']
        }
      ]
    },
    cases: {
      title: 'Selected Work',
      view_project: 'View Case'
    },
    contact: {
      title: 'Contact',
      intro: 'Ready to break the silence? We are looking for ambitious partners who are ready to dominate their market.',
      sections: { new: 'New Business', partners: 'Partnerships', careers: 'Careers' },
      form: { name: 'Name', email: 'Email', details: 'Details', submit: 'Submit Request' }
    }
  },
  ru: {
    nav: {
      agency: 'Агентство',
      cases: 'Кейсы',
      services: 'Услуги',
      start: 'Обсудить проект'
    },
    home: {
      subtitle: 'Строим решения и создаем стратегии, помогаем вашей компании развиваться.',
      cta: 'Смотреть кейсы'
    },
    agency: {
      title: 'Агентство',
      manifesto_label: 'ФИЛОСОФИЯ',
      manifesto_headline: (
        <>МЫ СОЗДАЁМ РАБОТЫ, КОТОРЫЕ ВЫЗЫВАЮТ <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9BAFF] to-blue-500">РЕЗОНАНС</span>.</>
      ),
      p1: 'Самое рискованное для бренда — это быть незамеченным. Мы — открытая площадка для смелых идей и коллабораций.',
      p2: 'Здесь мы объединяем мыслителей, творцов и первопроходцев, чтобы совместно воплощать проекты в самых разных областях — от исследований до виртуальных миров, от музыки до лингвистики.',
      p3: 'Вместе мы раздвигаем границы возможного и вносим свой вклад в будущее. Мы убираем лишний шум, чтобы найти истину вашего бизнеса и усилить её.',
      stats: { clients: 'Клиентов', growth: 'Рост продаж', awards: 'Наград', est: 'Основано' }
    },
    services: {
      title: 'Услуги',
      items: [
        {
          id: '01',
          title: 'Analysis',
          desc: 'Глубокие исследования для точного позиционирования на рынке. Понимание конкурентных преимуществ.',
          skills: ['Маркетинговые исследования', 'Аудит конкурентов', 'Анализ трендов', 'Customer Journey']
        },
        {
          id: '02',
          title: 'Strategy',
          desc: 'Бренд-стратегия и коммуникационная стратегия. Мы определяем цель бренда и прокладываем маршрут к доминированию на рынке.',
          skills: ['Бренд-платформа', 'Tone of Voice', 'Стратегия роста', 'Позиционирование']
        },
        {
          id: '03',
          title: 'Design',
          desc: 'Фирменный стиль и дизайн-поддержка. Мы создаем визуальные системы, которые говорят громче слов.',
          skills: ['Айдентика', 'UI/UX Дизайн', 'Моушн-дизайн', 'Упаковка']
        },
        {
          id: '04',
          title: 'Marketing',
          desc: 'Медийная реклама, инфлюенс-маркетинг, поддержка рекламных кампаний и посевы.',
          skills: ['SMM', 'Influencer Marketing', 'Таргетинг', 'Контент-продакшн']
        }
      ]
    },
    cases: {
      title: 'Кейсы',
      view_project: 'Смотреть кейс'
    },
    contact: {
      title: 'Контакты',
      intro: 'Готовы нарушить тишину? Мы ищем амбициозных партнеров, готовых стать лидерами в своей нише.',
      sections: { new: 'Вопросы', partners: 'Партнерства', careers: 'Вакансии' },
      form: { name: 'Имя', email: 'Email', details: 'Детали проекта', submit: 'Отправить заявку' }
    }
  }
};

const CASES_DATA = {
  en: [
    {
      id: 'beesline',
      title: 'Beesline',
      category: 'Medical Cosmetics',
      year: '2024',
      description: 'A complete rebranding for a medical cosmetics giant. We shifted the perception from generic skincare to scientific precision.',
      color: 'from-orange-500/20 to-amber-900/40',
      tags: ['Rebranding', 'Packaging', 'Strategy'],
      video: '1138619534' // Added Video ID
    },
    {
      id: 'zielinski',
      title: 'Zielinski & Rozen',
      category: 'Perfume House',
      year: '2024',
      description: 'Digital experience for the artisan perfume house. Focusing on texture and sensory translation through the screen.',
      color: 'from-neutral-800 to-stone-900',
      tags: ['Web Design', 'Content Direction']
    },
    {
      id: 'artell',
      title: 'Artell',
      category: 'Art Studio',
      year: '2023',
      description: 'Identity for a modern art studio. The logo system is dynamic, changing based on the medium it is displayed on.',
      color: 'from-blue-900/30 to-slate-900',
      tags: ['Identity', 'Motion Design']
    },
    {
      id: 'coffeemania',
      title: 'Coffeemania',
      category: 'Restaurant Chain',
      year: '2025',
      description: 'Refreshing the visual language of an iconic restaurant chain. Integrating the brand seamlessly into the city rhythm.',
      color: 'from-red-900/20 to-neutral-900',
      tags: ['Brand Update', 'Social Media']
    },
    {
      id: 'zhivi',
      title: 'Zhivi',
      category: 'Foundation',
      year: '2024',
      description: 'A charity foundation focused on life. Creating a vibrant, life-affirming identity that encourages action and hope.',
      color: 'from-pink-900/20 to-purple-900/20',
      tags: ['Strategy', 'Identity', 'Web']
    }
  ],
  ru: [
    {
      id: 'beesline',
      title: 'Beesline',
      category: 'Медицинская косметика',
      year: '2024',
      description: 'Полный ребрендинг гиганта медицинской косметики. Мы сместили восприятие от обычного ухода к научной точности.',
      color: 'from-orange-500/20 to-amber-900/40',
      tags: ['Ребрендинг', 'Упаковка', 'Стратегия'],
      video: '1138619534' // Added Video ID
    },
    {
      id: 'zielinski',
      title: 'Zielinski & Rozen',
      category: 'Парфюмерный дом',
      year: '2024',
      description: 'Digital-experience для артизанального парфюмерного дома. Акцент на текстуры и передачу ощущений через экран.',
      color: 'from-neutral-800 to-stone-900',
      tags: ['Web Design', 'Контент']
    },
    {
      id: 'artell',
      title: 'Artell',
      category: 'Арт-студия',
      year: '2023',
      description: 'Айдентика для студии современного искусства. Динамическая система логотипов, меняющаяся в зависимости от носителя.',
      color: 'from-blue-900/30 to-slate-900',
      tags: ['Айдентика', 'Моушн']
    },
    {
      id: 'coffeemania',
      title: 'Кофемания',
      category: 'Сеть ресторанов',
      year: '2025',
      description: 'Обновление визуального языка культовой сети ресторанов. Интеграция бренда в ритм современного мегаполиса.',
      color: 'from-red-900/20 to-neutral-900',
      tags: ['Обновление бренда', 'SMM']
    },
    {
      id: 'zhivi',
      title: 'Фонд ЖИВИ',
      category: 'Благотворительность',
      year: '2024',
      description: 'Благотворительный фонд, ориентированный на жизнь. Мы создали жизнеутверждающую айдентику, побуждающую к действию.',
      color: 'from-pink-900/20 to-purple-900/20',
      tags: ['Стратегия', 'Айдентика', 'Web']
    }
  ]
};

/**
 * CUSTOM HOOK: USE CANVAS SPHERE
 */
const useCanvasSphere = (canvasRef) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    
    const GLOBE_RADIUS = width < 768 ? 240 : 440;
    const DOT_RADIUS = 1.5;
    const DOT_COUNT = 600;
    const PROJECTION_CENTER_X = width / 2;
    const PROJECTION_CENTER_Y = height / 2;
    const FIELD_OF_VIEW = width * 0.8;

    let dots = [];
    let rotation = 0.002;
    let mouseX = 0;
    let mouseY = 0;

    for (let i = 0; i < DOT_COUNT; i++) {
      const theta = Math.random() * 2 * Math.PI; 
      const phi = Math.acos((Math.random() * 2) - 1); 
      dots.push({
        x: GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta),
        y: GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta),
        z: GLOBE_RADIUS * Math.cos(phi)
      });
    }

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - width / 2) * 0.0005;
      mouseY = (e.clientY - rect.top - height / 2) * 0.0005;
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      const rotationX = rotation + mouseX;
      const rotationY = rotation + mouseY;

      dots.forEach(dot => {
        let x1 = dot.x * Math.cos(rotationX) - dot.z * Math.sin(rotationX);
        let z1 = dot.z * Math.cos(rotationX) + dot.x * Math.sin(rotationX);
        let y2 = dot.y * Math.cos(rotationY) - z1 * Math.sin(rotationY);
        let z2 = z1 * Math.cos(rotationY) + dot.y * Math.sin(rotationY);

        const scale = FIELD_OF_VIEW / (FIELD_OF_VIEW + z2 + GLOBE_RADIUS);
        const x2d = (x1 * scale) + PROJECTION_CENTER_X;
        const y2d = (y2 * scale) + PROJECTION_CENTER_Y;

        const alpha = Math.max(0.1, (scale - 0.5)); 
        ctx.fillStyle = `rgba(220, 220, 220, ${alpha})`;
        
        ctx.beginPath();
        ctx.arc(x2d, y2d, DOT_RADIUS * scale, 0, Math.PI * 2);
        ctx.fill();
      });

      rotation += 0.002;
      requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);
};

/**
 * COMPONENTS
 */

const NavItem = ({ children, page, activePage, setPage }) => (
  <button 
    onClick={() => setPage(page)}
    className={`
      text-sm tracking-widest uppercase transition-all duration-300 relative group
      ${activePage === page ? 'text-white font-bold' : 'text-neutral-500 hover:text-white'}
    `}
  >
    {children}
    <span className={`absolute -bottom-2 left-0 h-[2px] bg-[#E9BAFF] transition-all duration-300 ${activePage === page ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
  </button>
);

// --- PAGE: HOME ---
const PageHome = ({ setPage, content }) => {
  const canvasRef = useRef(null);
  useCanvasSphere(canvasRef);

  return (
    <div className="relative flex-grow flex flex-col justify-center items-center overflow-hidden h-[calc(100vh-100px)] md:h-screen">
      {/* Canvas z-0 ensures it's behind text */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-60 pointer-events-auto z-0"
      />
      {/* Content z-10 ensures it's above canvas */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mix-blend-difference">
        <h2 className="text-[12vw] md:text-[9rem] leading-[0.85] font-black tracking-tighter uppercase mb-6 mix-blend-overlay">
          Ollimp
        </h2>
        <p className="text-sm md:text-lg font-mono text-neutral-400 max-w-xl mx-auto leading-relaxed uppercase tracking-wide">
          {content.subtitle}
        </p>
        
        <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center">
          <button 
            onClick={() => setPage('cases')}
            className="group relative px-8 py-3 overflow-hidden border border-white/20 bg-transparent text-white transition-all hover:border-[#E9BAFF]"
          >
            <span className="relative z-10 text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2">
              {content.cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
            </span>
            <div className="absolute inset-0 bg-[#E9BAFF]/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- PAGE: AGENCY ---
const PageAgency = ({ content }) => (
  <div className="pt-32 px-6 flex-grow flex flex-col justify-center">
    <div className="container mx-auto max-w-5xl">
      <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-20">{content.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-20">
        <div className="sticky top-32">
          <span className="text-[#E9BAFF] font-mono text-xs tracking-widest mb-4 block">{content.manifesto_label}</span>
          <h2 className="text-3xl md:text-4xl font-bold uppercase leading-tight">
            {content.manifesto_headline}
          </h2>
        </div>
        <div className="text-neutral-400 text-lg md:text-xl leading-relaxed font-light space-y-8">
          <p>{content.p1}</p>
          <p>{content.p2}</p>
          <p>{content.p3}</p>
        </div>
      </div>

      <div className="border-t border-neutral-800 pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
        <div>
          <h3 className="text-4xl font-bold text-white mb-2">43+</h3>
          <p className="text-neutral-500 text-xs uppercase tracking-widest">{content.stats.clients}</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-white mb-2">40%</h3>
          <p className="text-neutral-500 text-xs uppercase tracking-widest">{content.stats.growth}</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-white mb-2">10</h3>
          <p className="text-neutral-500 text-xs uppercase tracking-widest">{content.stats.awards}</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-white mb-2">2020</h3>
          <p className="text-neutral-500 text-xs uppercase tracking-widest">{content.stats.est}</p>
        </div>
      </div>
    </div>
  </div>
);

// --- PAGE: SERVICES ---
const PageServices = ({ content }) => (
  <div className="pt-32 px-6 flex-grow flex flex-col justify-center">
    <div className="container mx-auto max-w-5xl">
      <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-20">{content.title}</h1>
      
      <div className="space-y-4 mb-20">
        {content.items.map((service) => (
          <div key={service.id} className="group border border-neutral-800 hover:border-[#E9BAFF]/50 hover:bg-neutral-900/30 transition-all duration-500 p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 justify-between items-start">
              <div className="md:w-1/3">
                <span className="text-[#E9BAFF] font-mono text-sm block mb-4">/{service.id}</span>
                <h3 className="text-3xl md:text-4xl font-bold uppercase">{service.title}</h3>
              </div>
              <div className="md:w-2/3">
                <p className="text-neutral-400 text-lg mb-8 max-w-xl">{service.desc}</p>
                <div className="flex flex-wrap gap-3">
                  {service.skills.map(skill => (
                    <span key={skill} className="text-xs font-mono uppercase border border-neutral-700 px-3 py-1 rounded-full text-neutral-500 group-hover:text-white group-hover:border-neutral-500 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- PAGE: CASES ---
const PageCases = ({ lang, content }) => (
  <div className="pt-32 px-6 flex-grow flex flex-col justify-center">
    <div className="container mx-auto max-w-6xl">
      <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-20">{content.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {CASES_DATA[lang].map((item, index) => (
          <div 
            key={item.id} 
            className={`group relative min-h-[500px] bg-neutral-900 overflow-hidden flex flex-col justify-end p-8 md:p-12 cursor-pointer ${index === 0 || index === 3 ? 'md:col-span-2 md:min-h-[600px]' : ''}`}
          >
            {/* Render video background if available */}
            {item.video && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <iframe 
                  src={`https://player.vimeo.com/video/${item.video}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`}
                  className="absolute inset-0 w-full h-full scale-110"
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture" 
                  title={item.title}
                ></iframe>
              </div>
            )}

            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-40 group-hover:opacity-60 transition-all duration-700 z-1`}></div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-1"></div>

            <div className="relative z-10 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
              <div className="flex justify-between items-start mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <div className="flex gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono uppercase bg-white/10 backdrop-blur-sm px-2 py-1">{tag}</span>
                  ))}
                </div>
                <ArrowUpRight className="text-white" />
              </div>
              
              <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-2 text-white">{item.title}</h3>
              <p className="text-neutral-300 font-mono text-sm uppercase tracking-widest mb-6">{item.category} — {item.year}</p>
              
              <p className="text-neutral-300 max-w-xl text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 hidden md:block">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- PAGE: CONTACT ---
const PageContact = ({ content }) => (
  <div className="pt-32 px-6 flex-grow flex flex-col justify-center bg-[#050505]">
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-12">{content.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
        <div>
          <p className="text-xl text-neutral-400 leading-relaxed mb-8">
            {content.intro}
          </p>
          
          <div className="space-y-8">
            <div>
              <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">{content.sections.new}</h4>
              <a href="mailto:info@ollimp.com" className="text-2xl text-white hover:text-[#E9BAFF] transition-colors border-b border-neutral-800 pb-1">info@ollimp.com</a>
            </div>
            <div>
              <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">{content.sections.partners}</h4>
              <a href="mailto:partners@ollimp.com" className="text-2xl text-white hover:text-[#E9BAFF] transition-colors border-b border-neutral-800 pb-1">partners@ollimp.com</a>
            </div>
            <div>
              <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">{content.sections.careers}</h4>
              <a href="mailto:hr@ollimp.com" className="text-2xl text-white hover:text-[#E9BAFF] transition-colors border-b border-neutral-800 pb-1">hr@ollimp.com</a>
            </div>
          </div>
        </div>

        <form className="space-y-8 bg-neutral-900/20 p-8 border border-neutral-800">
          <div className="group">
            <label className="block text-xs font-mono text-neutral-500 mb-2 uppercase tracking-widest group-focus-within:text-[#E9BAFF] transition-colors">{content.form.name}</label>
            <input type="text" className="w-full bg-transparent border-b border-neutral-700 py-3 text-white focus:outline-none focus:border-[#E9BAFF] transition-colors" />
          </div>
          <div className="group">
            <label className="block text-xs font-mono text-neutral-500 mb-2 uppercase tracking-widest group-focus-within:text-[#E9BAFF] transition-colors">{content.form.email}</label>
            <input type="email" className="w-full bg-transparent border-b border-neutral-700 py-3 text-white focus:outline-none focus:border-[#E9BAFF] transition-colors" />
          </div>
          <div className="group">
            <label className="block text-xs font-mono text-neutral-500 mb-2 uppercase tracking-widest group-focus-within:text-[#E9BAFF] transition-colors">{content.form.details}</label>
            <textarea rows="4" className="w-full bg-transparent border-b border-neutral-700 py-3 text-white focus:outline-none focus:border-[#E9BAFF] transition-colors resize-none"></textarea>
          </div>
          <button className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-[#E9BAFF] hover:text-white transition-all duration-300">
            {content.form.submit}
          </button>
        </form>
      </div>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---
export default function OllimpRebuild() {
  const [activePage, setActivePage] = useState('home');
  const [lang, setLang] = useState('ru'); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const content = TRANSLATIONS[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [activePage]);

  const toggleLang = () => setLang(l => l === 'en' ? 'ru' : 'en');

  const renderPage = () => {
    switch(activePage) {
      case 'home': return <PageHome setPage={setActivePage} content={content.home} />;
      case 'agency': return <PageAgency content={content.agency} />;
      case 'cases': return <PageCases lang={lang} content={content.cases} />;
      case 'services': return <PageServices content={content.services} />;
      case 'contact': return <PageContact content={content.contact} />;
      default: return <PageHome setPage={setActivePage} content={content.home} />;
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen flex flex-col text-white font-sans selection:bg-[#E9BAFF] selection:text-black">
      
      {/* HEADER */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled || activePage !== 'home' ? 'bg-[#050505]/90 backdrop-blur-md border-neutral-800 py-4' : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-8 z-50">
            <div onClick={() => setActivePage('home')}>
              <h1 className="text-2xl font-black tracking-tighter uppercase relative group cursor-pointer">
                Ollimp
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#E9BAFF] transition-all duration-300 group-hover:w-full"></span>
              </h1>
            </div>

            {/* Language Switcher */}
            <button 
              onClick={toggleLang} 
              className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors border border-neutral-800 rounded-full px-3 py-1"
            >
              {lang === 'en' ? 'RU' : 'EN'}
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-12 items-center">
            <NavItem page="agency" activePage={activePage} setPage={setActivePage}>{content.nav.agency}</NavItem>
            <NavItem page="cases" activePage={activePage} setPage={setActivePage}>{content.nav.cases}</NavItem>
            <NavItem page="services" activePage={activePage} setPage={setActivePage}>{content.nav.services}</NavItem>
            <button 
              onClick={() => setActivePage('contact')}
              className="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-[#E9BAFF] hover:text-white transition-colors duration-300"
            >
              {content.nav.start}
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden z-50 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 md:hidden ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <button onClick={() => setActivePage('agency')} className="text-3xl font-bold uppercase hover:text-[#E9BAFF]">{content.nav.agency}</button>
        <button onClick={() => setActivePage('cases')} className="text-3xl font-bold uppercase hover:text-[#E9BAFF]">{content.nav.cases}</button>
        <button onClick={() => setActivePage('services')} className="text-3xl font-bold uppercase hover:text-[#E9BAFF]">{content.nav.services}</button>
        <button onClick={() => setActivePage('contact')} className="text-xl text-neutral-400 mt-8">{content.nav.contact}</button>
      </div>

      {/* PAGE CONTENT */}
      <main className="flex-grow flex flex-col pt-0">
        {renderPage()}
      </main>

      {/* FOOTER */}
      {activePage !== 'home' && (
        <footer className="py-12 px-6 border-t border-neutral-900 text-neutral-500 text-xs font-mono uppercase tracking-widest bg-[#050505] mt-auto">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-white font-bold text-lg">Ollimp</span>
              <span>© 2020 Ollimp Agency</span>
            </div>
            
            <div className="flex gap-8">
              <a href="https://www.instagram.com/ollimpdotcom/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Telegram</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}