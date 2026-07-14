import React, { useEffect } from 'react';
import gsap from 'gsap';

export const Hero: React.FC = () => {
  useEffect(() => {
    // Reveal text animations using GSAP
    const tl = gsap.timeline();
    tl.fromTo('.hero-title-line', {
      y: 60,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out',
      delay: 3.2 // wait for preloader to fade out
    });

    tl.fromTo('.hero-scroll-text', {
      opacity: 0,
      x: 20
    }, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.4');
  }, []);

  return (
    <section id="hero" style={heroSectionStyle}>
      {/* Background Layout lines for high-concept feel */}
      <div style={gridOverlayStyle}></div>
      <div style={gridVerticalLineLeftStyle}></div>
      <div style={gridVerticalLineRightStyle}></div>

      <div style={contentStyle}>
        <div style={titleContainerStyle}>
          <div className="hero-title-line" style={subTitleStyle}>CREATIVE TECH STUDIO</div>
          <h1 className="hero-title-line" style={mainTitleStyle}>
            ARCHITECTING<br />
            DIGITAL WORLDS
          </h1>
          <p className="hero-title-line" style={descStyle}>
            Blending imagination and game-engine technology to create immersive,<br />
            experiential entertainment that moves hearts and sparks hope.
          </p>
        </div>
      </div>

      <div className="hero-scroll-text" style={scrollPromptStyle}>
        <span>SCROLL TO EXPLORE →</span>
      </div>
    </section>
  );
};

const heroSectionStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0 8%',
  overflow: 'hidden',
  boxSizing: 'border-box',
};

const contentStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 2,
  maxWidth: '850px',
  marginTop: '40px',
};

const titleContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const subTitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-tech)",
  fontSize: '0.9rem',
  color: 'var(--accent-blue)',
  letterSpacing: '0.25em',
  fontWeight: 600,
};

const mainTitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-sync)",
  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
  lineHeight: '1.05',
  color: 'var(--text-primary)',
  textShadow: '0 0 40px rgba(0, 0, 0, 0.5)',
};

const descStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
  lineHeight: '1.7',
  color: 'var(--text-secondary)',
  marginTop: '16px',
};

const gridOverlayStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(0, 82, 255, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(126, 34, 206, 0.03) 0%, transparent 50%)',
  pointerEvents: 'none',
  zIndex: 1,
};

const gridVerticalLineLeftStyle: React.CSSProperties = {
  position: 'absolute',
  left: '4%',
  top: 0,
  width: '1px',
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  zIndex: 1,
};

const gridVerticalLineRightStyle: React.CSSProperties = {
  position: 'absolute',
  right: '4%',
  top: 0,
  width: '1px',
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  zIndex: 1,
};

const scrollPromptStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '12%',
  right: '4.5%',
  transform: 'rotate(90deg)',
  transformOrigin: 'right bottom',
  fontFamily: "var(--font-tech)",
  fontSize: '0.8rem',
  letterSpacing: '0.15em',
  color: 'var(--text-secondary)',
  pointerEvents: 'none',
  zIndex: 2,
};

export default Hero;
