import React, { useState, useEffect } from 'react';
import sound from './utils/SoundManager';
import WindowControls from './components/WindowControls';
import GLBackground from './components/GLBackground';

import './styles/alche_1.css';
import './styles/alche_2.css';
import './styles/alche_3.css';
import './styles/alche_4.css';

interface WorkItem {
  id: string;
  date: string;
  title: string;
  titleJa: string;
  impression?: string;
  categories: string[];
  image: string;
}

const worksList: WorkItem[] = [
  {
    id: 'kizunaai',
    date: '2026 01.17',
    title: 'KizunaAI “Hello, Fortnite”',
    titleJa: 'KizunaAI “Hello, Fortnite”',
    categories: ['In-Game-Concert', 'fortnite', 'metaverse'],
    image: 'https://images.microcms-assets.io/assets/103f5261d7d3414eb7ba2901a5f42982/689ccc1b858c4e05a2ad55ac35dd58b8/thumbnail_no_flame-2.png?fit=max&w=800&fm=webp'
  },
  {
    id: 'weargoland',
    date: '2025 05.16',
    title: 'WEAR GO LAND',
    titleJa: 'WEAR GO LAND',
    impression: '15ブランド以上が参加、「IS:SUE」がアンバサダーに就任！',
    categories: ['stellla', 'unreal_engine', 'metaverse', 'mobile'],
    image: 'https://images.microcms-assets.io/assets/103f5261d7d3414eb7ba2901a5f42982/0d5f7f5e279f4b62983754b4b6f243bd/%E4%B8%B8%E7%B4%85%E3%81%8B%E3%82%99%E6%8F%90%E4%BE%9B%E3%81%99%E3%82%8B%E6%AC%A1%E4%B8%96%E4%BB%A3%E3%83%95%E3%82%A1%E3%83%83%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%A1%E3%82%BF%E3%83%8F%E3%82%99%E3%83%BC%E3%82%B9%E3%82%A2%E3%83%95%E3%82%9A%E3%83%AA%E3%80%8CWEAR%20GO%20LAND%E3%80%8D%E3%82%92Alche%20Studio%E3%81%8B%E3%82%99%E9%96%8B%E7%99%BA%E3%80%815%E6%9C%8816%E6%97%A5%E9%85%8D%E4%BF%A1%E9%96%8B%E5%A7%8B%E3%80%82%20%20Alche%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE%E3%81%AE%E3%83%95%E3%82%9A%E3%83%AC%E3%82%B9%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9.webp?fit=max&w=800&fm=webp'
  },
  {
    id: 'discoat',
    date: '2025 02.20',
    title: 'DISCOAT 2025SS EXHIBITION in virtual',
    titleJa: 'DISCOAT 2025SS EXHIBITION in virtual',
    impression: '人気ブランドDISCOAT(ディスコート)のファションショーを開催！',
    categories: ['stellla', 'unreal_engine', 'metaverse', 'cloud rendering'],
    image: 'https://images.microcms-assets.io/assets/103f5261d7d3414eb7ba2901a5f42982/17cedf105d3e4a1799bae3709fe41e3a/SSTVer2.webp?fit=max&w=800&fm=webp'
  },
  {
    id: 'matsuken',
    date: '2024 10.18',
    title: 'Matsuken SambaⅡ Rise Up the World',
    titleJa: 'マツケンサンバⅡ Rise Up the World',
    impression: '3000万PV突破！',
    categories: ['fortnite', 'metaverse', 'In-Game-Concert'],
    image: 'https://images.microcms-assets.io/assets/103f5261d7d3414eb7ba2901a5f42982/48d68b50116f4358ba794baca261a957/%E3%83%95%E3%82%A9%E3%83%BC%E3%83%88%E3%83%8A%E3%82%A4%E3%83%88%E3%81%A6%E3%82%99%E3%83%9E%E3%83%84%E3%82%B1%E3%83%B3%E3%82%B5%E3%83%B3%E3%83%8F%E3%82%99%E2%85%A1%20%E3%81%AE%E3%83%A9%E3%82%A4%E3%83%95%E3%82%99%E3%82%A4%E3%83%98%E3%82%99%E3%83%B3%E3%83%88%201018(%E9%87%91)%2020%E6%99%82%E3%82%88%E3%82%8A%E9%96%8B%E5%82%AC%20%20Alche%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE%E3%81%AE%E3%83%95%E3%82%9A%E3%83%AC%E3%82%B9%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9.jpg?fit=max&w=800&fm=webp'
  },
  {
    id: 'runformoney',
    date: '2024 07.29',
    title: 'run for money CREATED IN FORTNITE',
    titleJa: '逃走中 CREATED IN FORTNITE',
    impression: '同時接続人数世界Top3(2.2万人)を達成',
    categories: ['fortnite', 'metaverse'],
    image: 'https://images.microcms-assets.io/assets/103f5261d7d3414eb7ba2901a5f42982/4d6a8a17ca864d86b538e8cc3a8a563e/Clipboard%20-%202024-09-27%2019.03.45.png?fit=max&w=800&fm=webp'
  },
  {
    id: 'radwimps',
    date: '2021 07.16',
    title: 'RADWIMPS ROLE PLAYING MUSIC',
    titleJa: 'SHIN SEKAI “nowhere” RADWIMPS ROLE PLAYING MUSIC',
    impression: 'RADWIMPSとのコラボレーションによる「リアル」と「ヴァーチャル」を行き来する世界初の音楽体験',
    categories: ['metaverse', 'unreal_engine', 'mobile', 'In-Game-Concert'],
    image: 'https://images.microcms-assets.io/assets/103f5261d7d3414eb7ba2901a5f42982/e56081e60f524a11afd3b652d0488eda/1.webp?fit=max&w=800&fm=webp'
  }
];

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(sound.getMutedState());
  const [activeTab, setActiveTab] = useState('kv');
  const [hoveredWork, setHoveredWork] = useState<string | null>(null);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [audioHeights, setAudioHeights] = useState<number[]>([0.2, 0.4, 0.3]);

  useEffect(() => {
    // Hide preloader after 2.5s
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    // Audio frequency visualizer
    sound.onUpdateFrequencies = (freqs) => {
      if (freqs.length >= 3) {
        setAudioHeights([
          0.15 + freqs[0] * 0.85,
          0.15 + freqs[2] * 0.85,
          0.15 + freqs[4] * 0.85
        ]);
      }
    };

    // Scroll active indicator listener
    const handleScroll = () => {
      const sections = ['kv', 'works', 'mission', 'vision', 'service'];
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(s);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      sound.onUpdateFrequencies = null;
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMuteToggle = () => {
    sound.playClick();
    const newState = sound.toggleMute();
    setIsMuted(newState);
    if (newState) {
      setAudioHeights([0.2, 0.4, 0.3]);
    }
  };

  const scrollToSection = (id: string) => {
    sound.playClick();
    setSideMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 3D Canvas rendering background scene */}
      <div className="Layout__wrapper">
        <div className="Layout__gl">
          <div className="Layout__gl_inner">
            <div id="gl-canvas" className="GLCanvas__container">
              <GLBackground />
            </div>
          </div>
        </div>
      </div>

      {/* Electron custom titlebar controls */}
      <WindowControls />

      {/* Preloading Overlay screen */}
      {loading && (
        <div id="loading-overlay" className="Loading__container">
          <div className="Loading__lottieContainer">
            <div id="loading-logo" className="Loading__logo">
              <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="4 4" style={{ animation: 'spin 15s linear infinite', transformOrigin: '50px 50px' }} />
                <polygon points="50,14 81,68 19,68" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="50" cy="52" r="14" stroke="white" strokeWidth="1.5" />
                <line x1="50" y1="14" x2="50" y2="38" stroke="white" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
          <div id="loading-text" className="Loading__text">
            Architect worlds<br />that move hearts and spark hope.
          </div>
        </div>
      )}

      {/* Header element */}
      <header className="Header__container electron-drag">
        <div className="Header__logo electron-no-drag" onClick={() => scrollToSection('kv')} style={{ cursor: 'pointer' }}>
          <svg width="120" height="auto" viewBox="0 0 1000 209" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_401_195)">
              <path d="M781.561 86.7743H694.023V2.63672H652.989V207.224H694.023V120.196H781.561V207.224H822.543V2.63672H781.561V86.7743Z" fill="white"></path>
              <path d="M903.901 35.7548H1000V2.33301H862.918V207.225H1000V173.803H903.901V119.588H1000V87.0792H903.901V35.7548Z" fill="white"></path>
              <path d="M550.962 164.877C542.452 169.847 532.675 172.332 521.53 172.332C510.385 172.332 499.037 169.543 489.767 163.964C480.496 158.386 473.252 150.474 468.085 140.229C462.918 129.985 460.334 118.117 460.334 104.627C460.334 91.1363 462.918 79.0152 468.085 68.8721C473.252 58.7289 480.496 50.8679 489.767 45.2892C499.037 39.7104 509.625 36.9211 521.53 36.9211C533.435 36.9211 542.452 39.3554 550.962 44.2241C559.473 49.0929 566.059 56.4467 570.719 66.1841H617.832C610.993 45.4921 598.987 29.263 581.814 17.5476C564.64 5.83226 544.63 -0.0507812 521.783 -0.0507812C498.936 -0.0507812 484.65 4.41221 468.946 13.2875C453.242 22.1628 440.831 34.5881 431.763 50.5129C422.695 66.4377 418.136 84.4418 418.136 104.576C418.136 124.71 422.695 142.664 431.763 158.487C440.831 174.31 453.242 186.685 468.946 195.56C484.65 204.436 502.28 208.899 521.783 208.899C541.287 208.899 564.894 203.066 581.966 191.452C599.037 179.838 610.993 163.559 617.832 142.664H570.719C566.059 152.452 559.422 159.806 550.962 164.776V164.877Z" fill="white"></path>
              <path d="M0 207.884H43.617L48.0243 200.277H189.108L193.516 207.884H237.133L118.541 2.28223L0 207.884ZM64.691 171.42L118.592 77.9503L172.492 171.42H64.691Z" fill="white"></path>
              <path d="M314.945 171.318V2.63672H273.962V207.224H402.128V171.318H314.945Z" fill="white"></path>
            </g>
            <defs>
              <clipPath id="clip0_401_195">
                <rect width="1000" height="209" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
        </div>

        <nav className="Header__nav electron-no-drag">
          <div className="Header__nav_item" onClick={() => scrollToSection('news')}><span>News</span></div>
          <div className="Header__nav_item" onClick={() => scrollToSection('works')}><span>Works</span></div>
          <div className="Header__nav_item" onClick={() => scrollToSection('mission')}><span>About</span></div>
          <div className="Header__nav_item" onClick={() => scrollToSection('stellla')}><span>stellla</span></div>
        </nav>

        <div className="Header__right_controls electron-no-drag">
          <button onClick={() => scrollToSection('footer')} className="SlotButton__button Header__contact" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
            <span className="SlotButton__text_wrapper">
              <span className="SlotButton__text">Contact / Recruit</span>
              <span className="SlotButton__text_hover">Contact / Recruit</span>
            </span>
          </button>
          <button onClick={handleMuteToggle} className="SoundToggle__button" type="button" aria-label={isMuted ? "Unmute Sound" : "Mute Sound"} title={isMuted ? "Unmute Sound" : "Mute Sound"}>
            <div className="SoundToggle__sound_bars">
              <div className="SoundToggle__bar bar" style={{ transform: `scaleY(${audioHeights[0]})`, backgroundColor: '#ffffff', width: '3px', transition: 'transform 0.1s ease' }}></div>
              <div className="SoundToggle__bar bar" style={{ transform: `scaleY(${audioHeights[1]})`, backgroundColor: '#ffffff', width: '3px', transition: 'transform 0.1s ease' }}></div>
              <div className="SoundToggle__bar bar" style={{ transform: `scaleY(${audioHeights[2]})`, backgroundColor: '#ffffff', width: '3px', transition: 'transform 0.1s ease' }}></div>
            </div>
          </button>
        </div>
      </header>

      {/* Side Menu Overlay panel */}
      <div className={`SideMenu__overlay Header__side_menu ${sideMenuOpen ? 'active' : ''}`} style={{ display: sideMenuOpen ? 'block' : 'none' }}>
        <div className="SideMenu__backdrop" onClick={() => setSideMenuOpen(false)}></div>
        <nav className="SideMenu__menu">
          <div className="SideMenu__menu_inner">
            <div className="SideMenu__menu_item" onClick={() => scrollToSection('kv')}><span>Top</span></div>
            <div className="SideMenu__menu_item" onClick={() => scrollToSection('news')}><span>News</span></div>
            <div className="SideMenu__menu_item" onClick={() => scrollToSection('works')}><span>Works</span></div>
            <div className="SideMenu__menu_item" onClick={() => scrollToSection('mission')}><span>About</span></div>
            <div className="SideMenu__menu_item" onClick={() => scrollToSection('stellla')}><span>stellla</span></div>
          </div>
        </nav>
      </div>

      <button className="HamburgerIcon__hamburger SideMenu__hamburger" type="button" aria-label="Open menu" onClick={() => setSideMenuOpen(!sideMenuOpen)} style={{ position: 'fixed', right: '150px', top: '22px', zIndex: 1000, background: 'none', border: 'none', cursor: 'pointer' }}>
        <span className="HamburgerIcon__line" style={{ display: 'block', width: '24px', height: '2px', backgroundColor: '#fff', margin: '5px 0' }}></span>
        <span className="HamburgerIcon__line" style={{ display: 'block', width: '24px', height: '2px', backgroundColor: '#fff', margin: '5px 0' }}></span>
        <span className="HamburgerIcon__line" style={{ display: 'block', width: '24px', height: '2px', backgroundColor: '#fff', margin: '5px 0' }}></span>
      </button>

      {/* Main Container Layout */}
      <div className="Layout__wrapper" style={{ zIndex: 2, position: 'relative' }}>
        <div className="Layout__inner">
          <main className="Layout__main">
            <div>
              {/* Left Scroll Indicator panel */}
              <div className="TopScrollIndicator__top_scroll_indicator">
                <div className="TopScrollIndicator__section_list">
                  <div className={`TopScrollIndicator__section_item ${activeTab === 'kv' ? 'active' : ''}`} onClick={() => scrollToSection('kv')}>
                    <div className="TopScrollIndicator__section_main">
                      <div className="TopScrollIndicator__section_line">
                        <div className="TopScrollIndicator__section_label">TOP</div>
                      </div>
                    </div>
                  </div>
                  <div className={`TopScrollIndicator__section_item ${activeTab === 'works' ? 'active' : ''}`} onClick={() => scrollToSection('works')}>
                    <div className="TopScrollIndicator__section_main">
                      <div className="TopScrollIndicator__section_line">
                        <div className="TopScrollIndicator__section_label">WORKS</div>
                      </div>
                    </div>
                  </div>
                  <div className={`TopScrollIndicator__section_item ${activeTab === 'mission' ? 'active' : ''}`} onClick={() => scrollToSection('mission')}>
                    <div className="TopScrollIndicator__section_main">
                      <div className="TopScrollIndicator__section_line">
                        <div className="TopScrollIndicator__section_label">ABOUT</div>
                      </div>
                    </div>
                  </div>
                  <div className={`TopScrollIndicator__section_item ${activeTab === 'vision' ? 'active' : ''}`} onClick={() => scrollToSection('vision')}>
                    <div className="TopScrollIndicator__section_main">
                      <div className="TopScrollIndicator__section_line">
                        <div className="TopScrollIndicator__section_label">VISION</div>
                      </div>
                    </div>
                  </div>
                  <div className={`TopScrollIndicator__section_item ${activeTab === 'service' ? 'active' : ''}`} onClick={() => scrollToSection('service')}>
                    <div className="TopScrollIndicator__section_main">
                      <div className="TopScrollIndicator__section_line">
                        <div className="TopScrollIndicator__section_label">SERVICE</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* News Section */}
              <section id="news" className="News__newsArea" style={{ borderBottom: 'none' }}>
                <div className="News__newsTitle">News</div>
                <div className="News__newsList">
                  <div className="News__newsItem">
                    <div className="News__newsDate">2025 06.26</div>
                    <div className="News__newsContent"><a href="#" className="News__newsLink" onClick={() => sound.playClick()}>Unreal Fest Bali 2025で登壇しました</a></div>
                  </div>
                  <div className="News__newsItem">
                    <div className="News__newsDate">2025 05.16</div>
                    <div className="News__newsContent"><a href="#" className="News__newsLink" onClick={() => sound.playClick()}>丸紅が提供する次世代ファッションメタバースアプリ「WEAR GO LAND」をAlche Studioが開発</a></div>
                  </div>
                  <div className="News__newsItem">
                    <div className="News__newsDate">2024 10.29</div>
                    <div className="News__newsContent"><a href="#" className="News__newsLink" onClick={() => sound.playClick()}>博報堂DYメディアパートナーズとクリエイティブチーム「ReIMAGINE」を結成</a></div>
                  </div>
                </div>
              </section>

              {/* KV Section */}
              <div id="kv" className="SectionContainer__container" data-top_section="kv">
                <div className="KV__container">
                  <div className="KV__inner">
                    <div className="KV__scrollText">
                      <span>scroll to explore →</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Works section intro */}
              <div className="SectionContainer__container" data-top_section="works_intro">
                <div className="PageTop__worksIntro"></div>
              </div>

              {/* Works Section */}
              <div id="works" className="SectionContainer__container" data-top_section="works">
                <div className="Works__container">
                  <div className="Works__content">
                    <div className="Works__content_inner">
                      <div className="Works__list">
                        {worksList.map((work) => (
                          <div 
                            key={work.id} 
                            className="Works__item"
                            onMouseEnter={() => { sound.playHover(); setHoveredWork(work.id); }}
                            onMouseLeave={() => setHoveredWork(null)}
                            onClick={() => sound.playClick()}
                          >
                            <div className="Works__item_info">
                              <time className="Works__item_date">{work.date}</time>
                              {work.impression && (
                                <div className="Works__item_impression">
                                  <div className="Works__item_impression_title">{work.impression}</div>
                                </div>
                              )}
                            </div>
                            <h3 className="Works__item_title">
                              <a href="#" className="Works__item_title_link" onClick={(e) => e.preventDefault()}>{work.title}</a>
                            </h3>
                            <p className="Works__item_title_ja">{work.titleJa}</p>
                            <ul className="Works__item_categoryList">
                              {work.categories.map((cat, i) => (
                                <li key={i} className="Works__item_categoryList_item">
                                  <a href="#" onClick={(e) => e.preventDefault()}>{cat}</a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="Works__more" style={{ marginTop: '50px' }}>
                        <a href="#" className="Works__more_link" onClick={(e) => { e.preventDefault(); sound.playClick(); }}>
                          <span>More Works</span>
                          <svg className="Works__more_link_icon" width="12" height="12" viewBox="0 0 14 14" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.57516 13.1495L11.8192 2.91846C11.7272 3.54646 11.6712 4.34046 11.6712 5.13446C11.6712 5.87346 11.7082 6.61246 11.8192 7.29546L12.9472 7.01846C12.8552 6.33546 12.8182 5.61446 12.8182 4.87646C12.8182 3.41746 12.9842 1.90346 13.2612 0.647461C12.0042 0.924461 10.4882 1.09046 9.02716 1.09046C8.28816 1.09046 7.56616 1.05346 6.88216 0.961461L6.60516 2.08746C7.28916 2.19846 8.02916 2.23546 8.76816 2.23546C9.56316 2.23546 10.3582 2.18046 10.9872 2.08746L0.743164 12.3185L1.57516 13.1495Z" fill="#fff"></path>
                          </svg>
                        </a>
                      </div>
                    </div>

                    {/* Floating images which trigger on hover */}
                    <div className="Works__scroll">
                      {worksList.map((work) => (
                        <div 
                          key={work.id} 
                          className="Works__scroll_item" 
                          style={{ 
                            opacity: hoveredWork === work.id ? 1 : 0,
                            transform: hoveredWork === work.id ? 'scale(1.05) translate3d(0, 0, 0)' : 'scale(0.9) translate3d(0, 0, 0)',
                            transition: 'opacity 0.4s ease, transform 0.4s ease',
                            pointerEvents: 'none'
                          }}
                        >
                          <div className="Works__scroll_item_thumb" style={{ backgroundImage: `url(${work.image})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%' }}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mission Section */}
              <div id="mission" className="SectionContainer__container" data-top_section="mission">
                <div className="MissionVision__missionContent"></div>
                <div className="MissionVision__container">
                  <div className="MissionVision__inner">
                    <div className="MissionVision__ttl" style={{ opacity: 1 }}>
                      <svg width="437" height="99" viewBox="0 0 437 99" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M402.352 93.551H383.281V20.979H356.402V5.36398H429.102V20.979H402.352V93.551ZM312.841 94.831C292.874 94.831 275.723 86.768 275.723 57.329V5.36398H294.794V57.841C294.794 74.864 303.498 79.856 313.097 79.856C323.977 79.856 330.76 73.968 330.76 57.841V5.36398H349.959V56.945C349.959 87.152 332.296 94.831 312.841 94.831ZM221.552 94.831C193.777 94.831 179.314 74.736 179.314 49.394C179.314 23.795 195.313 4.08398 222.704 4.08398C248.558 4.08398 264.941 22.131 264.941 49.138C264.941 73.712 250.222 94.831 221.552 94.831ZM221.936 19.572C205.936 19.572 199.025 31.859 199.025 49.01C199.025 66.289 206.576 79.344 222.192 79.344C239.215 79.344 245.23 65.137 245.23 49.394C245.23 32.627 238.319 19.572 221.936 19.572ZM139.26 93.551H99.3271V5.36398H137.852C159.227 5.36398 167.291 16.372 167.291 27.891C167.291 37.875 162.043 44.274 156.027 46.962C162.043 49.266 169.85 55.538 169.85 67.185C169.85 82.288 157.947 93.551 139.26 93.551ZM136.316 20.084H118.013V40.178H135.676C144.764 40.178 148.476 36.083 148.476 29.811C148.476 23.411 143.612 20.084 136.316 20.084ZM135.164 54.898H118.013V78.832H135.292C145.66 78.832 150.268 74.48 150.268 66.545C150.268 59.377 145.66 54.898 135.164 54.898ZM62.3061 73.201H30.0521L23.2681 93.551H4.45312L34.4041 5.36398H58.3381L89.6971 93.551H69.6021L62.3061 73.201ZM45.7951 19.06H45.6671C43.4911 27.763 39.1391 41.586 34.1481 57.585H58.2101C51.9391 38.898 47.9711 26.995 45.7951 19.06Z" stroke="white" strokeWidth="1.5"></path>
                      </svg>
                    </div>
                    <div className="MissionVision__text">
                      <span className="MissionVision__line"><span className="MissionVision__marker">これまでにない</span></span><br />
                      <span className="MissionVision__line"><span className="MissionVision__marker">没入型・体験型のエンターテインメントを</span></span><br />
                      <span className="MissionVision__line"><span className="MissionVision__marker">生み出す</span></span><br />
                    </div>
                    <div className="MissionVision__text_en">
                      Pioneering immersive <br />
                      and experiential entertainment like no other.
                    </div>
                  </div>
                </div>
              </div>

              {/* Vision Section */}
              <div id="vision" className="SectionContainer__container" data-top_section="vision">
                <div className="MissionVision__visionContent"></div>
                <div className="MissionVision__container">
                  <div className="MissionVision__inner">
                    <div className="MissionVision__ttl" style={{ opacity: 1 }}>
                      <svg width="398" height="98" viewBox="0 0 398 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M371.585 93.216C362.113 75.937 339.587 34.98 335.107 24.74H334.851C335.491 32.42 335.747 50.595 335.747 66.338V93.216H318.34V5.02902H342.018C353.026 24.74 373.377 60.578 377.472 70.178H377.728C376.705 60.962 376.705 45.603 376.705 31.14V5.02902H393.984V93.216H371.585ZM266.933 94.496C239.158 94.496 224.695 74.401 224.695 49.059C224.695 23.46 240.694 3.74902 268.085 3.74902C293.939 3.74902 310.322 21.796 310.322 48.803C310.322 73.378 295.603 94.496 266.933 94.496ZM267.317 19.237C251.318 19.237 244.406 31.524 244.406 48.675C244.406 65.954 251.958 79.009 267.573 79.009C284.596 79.009 290.612 64.802 290.612 49.059C290.612 32.292 283.7 19.237 267.317 19.237ZM197.687 5.02902H216.758V93.216H197.687V5.02902ZM158.709 39.203C184.308 45.347 189.939 54.819 189.939 67.362C189.939 83.361 177.78 94.496 154.485 94.496C132.087 94.496 120.183 83.489 118.135 67.362H137.334C139.382 76.193 145.654 80.161 155.893 80.161C166.133 80.161 170.484 76.065 170.484 69.666C170.484 62.37 166.261 59.298 151.158 55.843C127.095 50.211 121.207 41.379 121.207 29.476C121.207 14.117 132.727 3.74902 153.589 3.74902C177.012 3.74902 186.356 16.293 187.635 29.22H168.437C167.413 23.716 164.469 17.829 153.077 17.829C145.27 17.829 140.662 21.028 140.662 27.3C140.662 33.444 144.374 36.004 158.709 39.203ZM92.5354 5.02902H111.606V93.216H92.5354V5.02902ZM35.4204 93.216L4.31836 5.02902H24.7974L37.8524 45.731C41.9484 58.018 44.8924 68.514 46.9404 77.601H47.1964C48.9874 69.282 52.4434 58.53 56.6674 45.987L70.4904 5.02902H89.9454L57.9474 93.216H35.4204Z" stroke="white" strokeWidth="1.5"></path>
                      </svg>
                    </div>
                    <div className="MissionVision__text">
                      <span className="MissionVision__line"><span className="MissionVision__marker">心を揺さぶり、希望を持てる</span></span><br />
                      <span className="MissionVision__line"><span className="MissionVision__marker">“世界”を作る</span></span><br />
                    </div>
                    <div className="MissionVision__text_en">
                      Architect worlds <br />that move hearts and spark hope.
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Section */}
              <div id="service" className="SectionContainer__container" data-top_section="service">
                <div className="Service__container">
                  <div className="Service__content">
                    <div className="Service__content_inner">
                      <div className="Service__list">
                        <div className="Service__item" data-service_id="1">
                          <div className="Service__item_icon">
                            <img src="https://alche.studio/top/fortnite.png" alt="Fortnite Creative Works" />
                          </div>
                          <div className="Service__item_title" style={{ fontSize: '1.5rem', fontWeight: 700, margin: '12px 0' }}>Fortnite Creative Works</div>
                          <div className="Service__item_description">Fortnite上での体験制作に強みを持ち、エンターテイメント性と拡張性のある空間を企画・制作。ブランドやIP、アーティストの世界観を表現し、世界中のユーザーに向けて新たな参加型イベントやインタラクティブコンテンツを展開します。</div>
                          <div className="Service__item_description_en" style={{ marginTop: '16px', opacity: 0.7 }}>We specialize in creating experiences in Fortnite - planning and producing entertaining and scalable works. We express the worldviews of brands, IPs, and artists from unique perspectives, delivering new experiences to users worldwide!</div>
                        </div>

                        <div className="Service__item" data-service_id="2" style={{ marginTop: '60px' }}>
                          <div className="Service__item_icon">
                            <img src="https://alche.studio/top/ue2.png" alt="Unreal Engine Works" />
                          </div>
                          <div className="Service__item_title" style={{ fontSize: '1.5rem', fontWeight: 700, margin: '12px 0' }}>Unreal Engine Works</div>
                          <div className="Service__item_description">クラウドレンダリングから各デバイス向けのコンテンツを制作。ゲームエンジンの可能性を従来の枠組みを超えたエンターテインメント領域に展開し、没入感のある世界創造を通じてデジタル空間の新たな体験価値を拡張します。</div>
                          <div className="Service__item_description_en" style={{ marginTop: '16px', opacity: 0.7 }}>From Cloud Rendering, to devices including iOS, Android and PC, we create content for many platforms! Expanding a game engine's potential beyond traditional frameworks into entertainment. Design new experiences in digital spaces by creating immersive worlds.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stellla Platform Section */}
              <div id="stellla" className="SectionContainer__container" data-top_section="stellla" style={{ paddingTop: '80px', paddingBottom: '120px' }}>
                <div className="Stellla__container">
                  <div className="Stellla__inner">
                    <div className="Stellla__contentWrap">
                      <div className="Stellla__content">
                        <div className="Stellla__main">
                          <div className="Stellla__main_logo">
                            <div className="Stellla__main_logo_img">
                              <img src="https://alche.studio/stellla/logo_stellla.png" style={{ height: '36px' }} alt="Stellla Logo" />
                            </div>
                          </div>
                          <div className="Stellla__main_text" style={{ marginTop: '24px' }}>
                            <p style={{ lineHeight: '1.8' }}>
                              メタバース構築基盤として、ライブイベント、ファッションショー、<br />
                              そして工場・都市計画など産業系デジタル空間まで幅広く対応。<br />
                              多人数同時接続・アバターカスタマイズなど基本機能を、<br />
                              PC/モバイル/VR向けに提供。Unreal Engineのビジュアルとコスト効率を両立。
                            </p>
                            <div className="Stellla__en" style={{ marginTop: '16px', opacity: 0.7 }}>
                              <p>
                                A metaverse platform for diverse digital applications from live events to industrial environments. Supports multi-user access, avatars, e-commerce, and 3D audio. Multi-platform support is possible with Unreal Engine.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>

      {/* Footer Element */}
      <footer id="footer" className="Footer__footer" style={{ zIndex: 10, position: 'relative' }}>
        <div className="Footer__inner">
          <div className="Footer__top">
            <div className="Footer__top_links">
              <div className="Footer__column">
                <span className="Footer__pageLink" onClick={() => scrollToSection('kv')} style={{ cursor: 'pointer' }}>Top</span>
                <span className="Footer__pageLink" onClick={() => scrollToSection('news')} style={{ cursor: 'pointer' }}>News</span>
                <span className="Footer__pageLink" onClick={() => scrollToSection('works')} style={{ cursor: 'pointer' }}>Works</span>
              </div>
              <div className="Footer__column">
                <span className="Footer__pageLink" onClick={() => scrollToSection('mission')} style={{ cursor: 'pointer' }}>About</span>
                <span className="Footer__pageLink" onClick={() => scrollToSection('stellla')} style={{ cursor: 'pointer' }}>stellla</span>
                <span className="Footer__pageLink" onClick={() => scrollToSection('footer')} style={{ cursor: 'pointer' }}>Contact</span>
              </div>
              <div className="Footer__column" data-type="links">
                <h3 className="Footer__linksTitle">Links</h3>
                <div className="Footer__linkList">
                  <a className="Footer__link" href="https://blog.alche.studio/" target="_blank" rel="noopener noreferrer">TECH BLOG</a>
                  <a className="Footer__link" href="https://note.com/taiki_alche" target="_blank" rel="noopener noreferrer">note</a>
                  <div className="Footer__social">
                    <a className="Footer__link" href="https://x.com/alche_studio" target="_blank" rel="noopener noreferrer">X</a>
                    <a className="Footer__link" href="https://www.youtube.com/@alchestudio" target="_blank" rel="noopener noreferrer">YouTube</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="Footer__top_contact" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <a href="https://alche.notion.site/2488a66d791180af8037c174b9cee8ab" target="_blank" rel="noopener noreferrer" className="Footer__contact_button" style={{ textDecoration: 'none' }}>
                <span className="Footer__contact_button_text">Contact</span>
              </a>
              <a href="https://career.alche.studio/" target="_blank" rel="noopener noreferrer" className="Footer__contact_button" style={{ textDecoration: 'none' }}>
                <span className="Footer__contact_button_text">Recruit</span>
              </a>
            </div>
          </div>

          <div className="Footer__copyright">
            &copy; 2026 Alche, inc.
          </div>
          <div className="Footer__logo">
            <h2 style={{ fontFamily: 'Syncopate', fontSize: '3rem', opacity: 0.05, color: '#fff', letterSpacing: '0.1em' }}>ALCHE</h2>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
