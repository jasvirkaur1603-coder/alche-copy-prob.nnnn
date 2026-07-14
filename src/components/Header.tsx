import React, { useEffect, useState } from 'react';
import sound from '../utils/SoundManager';

interface HeaderProps {
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact }) => {
  const [isMuted, setIsMuted] = useState(sound.getMutedState());
  const [heights, setHeights] = useState<number[]>([0.2, 0.4, 0.3]);

  useEffect(() => {
    // Register frequency analyzer update callback
    sound.onUpdateFrequencies = (freqs: number[]) => {
      if (freqs.length >= 3) {
        setHeights([
          0.15 + freqs[0] * 0.85,
          0.15 + freqs[2] * 0.85,
          0.15 + freqs[4] * 0.85,
        ]);
      }
    };
    return () => {
      sound.onUpdateFrequencies = null;
    };
  }, []);

  const handleMuteToggle = () => {
    const newState = sound.toggleMute();
    setIsMuted(newState);
    sound.playClick();
    if (newState) {
      setHeights([0.2, 0.4, 0.3]);
    }
  };

  const scrollToSection = (id: string) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="glass electron-drag" style={headerStyle}>
      <div style={logoWrapperStyle} className="electron-no-drag" onClick={() => scrollToSection('hero')}>
        <svg width="125" height="26" viewBox="0 0 1000 209" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_header_logo)">
            <path d="M781.561 86.7743H694.023V2.63672H652.989V207.224H694.023V120.196H781.561V207.224H822.543V2.63672H781.561V86.7743Z" fill="white"></path>
            <path d="M903.901 35.7548H1000V2.33301H862.918V207.225H1000V173.803H903.901V119.588H1000V87.0792H903.901V35.7548Z" fill="white"></path>
            <path d="M550.962 164.877C542.452 169.847 532.675 172.332 521.53 172.332C510.385 172.332 499.037 169.543 489.767 163.964C480.496 158.386 473.252 150.474 468.085 140.229C462.918 129.985 460.334 118.117 460.334 104.627C460.334 91.1363 462.918 79.0152 468.085 68.8721C473.252 58.7289 480.496 50.8679 489.767 45.2892C499.037 39.7104 509.625 36.9211 521.53 36.9211C533.435 36.9211 542.452 39.3554 550.962 44.2241C559.473 49.0929 566.059 56.4467 570.719 66.1841H617.832C610.993 45.4921 598.987 29.263 581.814 17.5476C564.64 5.83226 544.63 -0.0507812 521.783 -0.0507812C498.936 -0.0507812 484.65 4.41221 468.946 13.2875C453.242 22.1628 440.831 34.5881 431.763 50.5129C422.695 66.4377 418.136 84.4418 418.136 104.576C418.136 124.71 422.695 142.664 431.763 158.487C440.831 174.31 453.242 186.685 468.946 195.56C484.65 204.436 502.28 208.899 521.783 208.899C541.287 208.899 564.894 203.066 581.966 191.452C599.037 179.838 610.993 163.559 617.832 142.664H570.719C566.059 152.452 559.422 159.806 550.962 164.776V164.877Z" fill="white"></path>
            <path d="M0 207.884H43.617L48.0243 200.277H189.108L193.516 207.884H237.133L118.541 2.28223L0 207.884ZM64.691 171.42L118.592 77.9503L172.492 171.42H64.691Z" fill="white"></path>
            <path d="M314.945 171.318V2.63672H273.962V207.224H402.128V171.318H314.945Z" fill="white"></path>
          </g>
          <defs>
            <clipPath id="clip0_header_logo">
              <rect width="1000" height="209" fill="white"></rect>
            </clipPath>
          </defs>
        </svg>
      </div>

      <nav style={navStyle} className="electron-no-drag">
        <span onMouseEnter={() => sound.playHover()} onClick={() => scrollToSection('works')} style={linkStyle}>Works</span>
        <span onMouseEnter={() => sound.playHover()} onClick={() => scrollToSection('about')} style={linkStyle}>About</span>
        <span onMouseEnter={() => sound.playHover()} onClick={() => scrollToSection('services')} style={linkStyle}>Services</span>
        <span onMouseEnter={() => sound.playHover()} onClick={() => scrollToSection('stellla')} style={linkStyle}>Stellla</span>
      </nav>

      <div style={rightControlsStyle} className="electron-no-drag">
        <button 
          onMouseEnter={() => sound.playHover()} 
          onClick={onOpenContact} 
          className="slide-btn"
          style={contactBtnStyle}
        >
          <span className="btn-text-wrapper">
            <span style={btnSpanStyle}>Contact / Recruit</span>
            <span className="btn-hover-text">Open Drawer</span>
          </span>
        </button>

        <button 
          onClick={handleMuteToggle}
          style={soundToggleStyle}
          title={isMuted ? "Unmute Sound" : "Mute Sound"}
          onMouseEnter={() => sound.playHover()}
        >
          <div style={soundBarsStyle}>
            <div style={{...soundBarStyle, height: `${heights[0] * 100}%`}}></div>
            <div style={{...soundBarStyle, height: `${heights[1] * 100}%`}}></div>
            <div style={{...soundBarStyle, height: `${heights[2] * 100}%`}}></div>
          </div>
        </button>
      </div>
    </header>
  );
};

const headerStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '70px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 4%',
  zIndex: 999,
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
};

const logoWrapperStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
};

const navStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '32px',
};

const linkStyle: React.CSSProperties = {
  fontFamily: "var(--font-tech)",
  fontSize: '0.85rem',
  letterSpacing: '0.05em',
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  transition: 'color 0.2s ease',
  textTransform: 'uppercase',
};

const rightControlsStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
};

const contactBtnStyle: React.CSSProperties = {
  padding: '8px 20px',
};

const btnSpanStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8rem',
};

const soundToggleStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
};

const soundBarsStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  width: '16px',
  height: '14px',
};

const soundBarStyle: React.CSSProperties = {
  width: '3px',
  backgroundColor: '#ffffff',
  transition: 'height 0.1s ease',
  transformOrigin: 'bottom',
};

export default Header;
