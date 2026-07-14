import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

export const Preloader: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Fade out preloader after 2.8s
    const timer = setTimeout(() => {
      gsap.to('.preloader-container', {
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        onComplete: () => setVisible(false),
      });
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="preloader-container" style={containerStyle}>
      <div style={contentStyle}>
        <div className="preloader-logo" style={logoStyle}>
          {/* Immersive Alchemy Geometric symbol */}
          <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="4 4" className="anim-dash-spin" />
            <circle cx="50" cy="50" r="36" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
            <polygon points="50,14 81,68 19,68" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="50" cy="52" r="14" stroke="white" strokeWidth="1.5" />
            <line x1="50" y1="14" x2="50" y2="38" stroke="white" strokeWidth="1.5" />
          </svg>
        </div>
        <h1 style={textStyle}>
          Architect worlds<br />
          that move hearts and spark hope.
        </h1>
      </div>
      <style>{`
        @keyframes dash-spin {
          to { transform: rotate(-360deg); }
        }
        .anim-dash-spin {
          transform-origin: 50px 50px;
          animation: dash-spin 20s linear infinite;
        }
        .preloader-logo {
          animation: glowPulse 2.5s ease-in-out infinite;
        }
        @keyframes glowPulse {
          0% { transform: scale(1); filter: drop-shadow(0 0 8px rgba(0, 82, 255, 0.4)); }
          50% { transform: scale(1.04); filter: drop-shadow(0 0 20px rgba(126, 34, 206, 0.8)); }
          100% { transform: scale(1); filter: drop-shadow(0 0 8px rgba(0, 82, 255, 0.4)); }
        }
      `}</style>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: '#000000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10000,
  flexDirection: 'column',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '0 20px',
};

const logoStyle: React.CSSProperties = {
  marginBottom: '36px',
  display: 'flex',
  justifyContent: 'center',
};

const textStyle: React.CSSProperties = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 400,
  fontSize: '1.15rem',
  lineHeight: '1.8',
  letterSpacing: '0.12em',
  color: '#ffffff',
  textTransform: 'uppercase',
};

export default Preloader;
