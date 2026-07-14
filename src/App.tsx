import React, { useState } from 'react';
import Preloader from './components/Preloader';
import WindowControls from './components/WindowControls';
import GLBackground from './components/GLBackground';
import Header from './components/Header';
import Hero from './components/Hero';
import Works from './components/Works';
import MissionVision from './components/MissionVision';
import Services from './components/Services';
import StelllaSection from './components/StelllaSection';
import ContactModal from './components/ContactModal';
import sound from './utils/SoundManager';

export const App: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpenContact = () => {
    sound.playClick();
    setIsContactOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
  };

  return (
    <>
      {/* 3D WebGL Constellation Background */}
      <GLBackground />

      {/* Preloading Screen */}
      <Preloader />

      {/* Desktop App Frameless Controls */}
      <WindowControls />

      {/* Navigation & Controls */}
      <Header onOpenContact={handleOpenContact} />

      {/* Main Section Narrative */}
      <main>
        <Hero />
        <Works />
        <MissionVision />
        <Services />
        <StelllaSection />
      </main>

      {/* Immersive Footer */}
      <footer style={footerStyle}>
        <div style={footerInnerStyle}>
          <div style={footerColumnsStyle}>
            <div style={footerColStyle}>
              <h4 style={footerHeaderStyle}>NAVIGATION</h4>
              <span onClick={() => { sound.playClick(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={footerLinkStyle}>TOP</span>
              <a href="#works" onClick={() => sound.playClick()} style={footerLinkStyle}>WORKS</a>
              <a href="#about" onClick={() => sound.playClick()} style={footerLinkStyle}>ABOUT</a>
              <a href="#services" onClick={() => sound.playClick()} style={footerLinkStyle}>SERVICES</a>
            </div>
            
            <div style={footerColStyle}>
              <h4 style={footerHeaderStyle}>PLATFORM</h4>
              <a href="#stellla" onClick={() => sound.playClick()} style={footerLinkStyle}>STELLLA</a>
              <span onClick={handleOpenContact} style={footerLinkStyle}>CONTACT</span>
              <span onClick={handleOpenContact} style={footerLinkStyle}>RECRUIT</span>
            </div>

            <div style={footerColStyle}>
              <h4 style={footerHeaderStyle}>SOCIAL</h4>
              <a href="https://x.com/alche_studio" target="_blank" rel="noopener noreferrer" onClick={() => sound.playClick()} style={footerLinkStyle}>X (TWITTER)</a>
              <a href="https://www.youtube.com/@alchestudio" target="_blank" rel="noopener noreferrer" onClick={() => sound.playClick()} style={footerLinkStyle}>YOUTUBE</a>
              <a href="https://note.com/taiki_alche" target="_blank" rel="noopener noreferrer" onClick={() => sound.playClick()} style={footerLinkStyle}>NOTE</a>
              <a href="https://blog.alche.studio/" target="_blank" rel="noopener noreferrer" onClick={() => sound.playClick()} style={footerLinkStyle}>TECH BLOG</a>
            </div>
          </div>

          <div style={footerBottomStyle}>
            <p style={copyrightStyle}>&copy; 2026 ALCHE STUDIO, INC. ALL RIGHTS RESERVED.</p>
            <div style={logoOutlineStyle}>ALCHE</div>
          </div>
        </div>
      </footer>

      {/* Inquiry Form Drawer Overlay */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
    </>
  );
};

const footerStyle: React.CSSProperties = {
  width: '100%',
  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  backgroundColor: 'rgba(5, 5, 8, 0.95)',
  padding: '80px 8% 40px',
  boxSizing: 'border-box',
  position: 'relative',
  zIndex: 10,
};

const footerInnerStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '60px',
};

const footerColumnsStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '40px',
};

const footerColStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const footerHeaderStyle: React.CSSProperties = {
  fontFamily: 'var(--font-tech)',
  fontSize: '0.8rem',
  color: 'var(--text-muted)',
  letterSpacing: '0.15em',
  marginBottom: '8px',
};

const footerLinkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.9rem',
  color: 'var(--text-secondary)',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'color 0.2s ease',
  width: 'fit-content',
};

const footerBottomStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '40px',
  borderTop: '1px solid rgba(255, 255, 255, 0.03)',
  paddingTop: '30px',
  position: 'relative',
};

const copyrightStyle: React.CSSProperties = {
  fontFamily: 'var(--font-tech)',
  fontSize: '0.75rem',
  color: 'var(--text-muted)',
  letterSpacing: '0.05em',
};

const logoOutlineStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sync)',
  fontSize: '4.5rem',
  fontWeight: 700,
  lineHeight: 1,
  color: 'rgba(255, 255, 255, 0.015)',
  userSelect: 'none',
  pointerEvents: 'none',
  position: 'absolute',
  right: 0,
  bottom: 0,
};

export default App;
