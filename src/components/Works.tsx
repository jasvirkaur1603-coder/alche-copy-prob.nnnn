import React, { useState, useEffect, useRef } from 'react';
import sound from '../utils/SoundManager';
import gsap from 'gsap';

interface Project {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  categories: string[];
  image: string;
}

const projects: Project[] = [
  {
    id: 'kizuna-fortnite',
    date: '2026 01.17',
    title: 'KizunaAI "Hello, Fortnite"',
    subtitle: 'KizunaAI "Hello, Fortnite" In-Game Live',
    categories: ['In-Game-Concert', 'Fortnite', 'Metaverse'],
    image: '/concert.png'
  },
  {
    id: 'wear-go-land',
    date: '2025 05.16',
    title: 'WEAR GO LAND',
    subtitle: 'Next-Gen Fashion Metaverse Application',
    categories: ['Stellla', 'Unreal Engine', 'Metaverse', 'Mobile'],
    image: '/fashion.png'
  },
  {
    id: 'discoat-virtual',
    date: '2025 02.20',
    title: 'DISCOAT 2025SS virtual',
    subtitle: 'DISCOAT 2025SS Exhibition in Virtual Space',
    categories: ['Stellla', 'Unreal Engine', 'Cloud Rendering'],
    image: '/platform.png'
  },
  {
    id: 'matsuken-samba',
    date: '2024 10.18',
    title: 'Matsuken Samba II Festival',
    subtitle: 'Matsuken Samba II Rise Up the World in Fortnite',
    categories: ['Fortnite', 'Metaverse', 'In-Game-Concert'],
    image: '/concert.png'
  },
  {
    id: 'radwimps-nowhere',
    date: '2021 07.16',
    title: 'RADWIMPS ROLE PLAYING MUSIC',
    subtitle: 'SHIN SEKAI "nowhere" Music Experience',
    categories: ['Metaverse', 'Unreal Engine', 'Mobile', 'In-Game-Concert'],
    image: '/fashion.png'
  }
];

export const Works: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (hoveredProject && thumbRef.current) {
      // Smoothly animate the floating thumbnail to follow mouse coordinates
      gsap.to(thumbRef.current, {
        x: mousePos.x + 20,
        y: mousePos.y + 20,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
  }, [mousePos, hoveredProject]);

  const handleMouseEnter = (project: Project) => {
    sound.playHover();
    setHoveredProject(project);
    if (thumbRef.current) {
      gsap.to(thumbRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredProject(null);
    if (thumbRef.current) {
      gsap.to(thumbRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in'
      });
    }
  };

  return (
    <section id="works" style={sectionStyle}>
      <div style={headerContainerStyle}>
        <h2 style={sectionTitleStyle}>SELECTED WORKS</h2>
        <div style={lineStyle} />
      </div>

      <div style={listStyle}>
        {projects.map((proj) => (
          <div
            key={proj.id}
            onMouseEnter={() => handleMouseEnter(proj)}
            onMouseLeave={handleMouseLeave}
            onClick={() => sound.playClick()}
            style={rowStyle}
            className="works-row"
          >
            <div style={dateStyle}>{proj.date}</div>
            
            <div style={titleColStyle}>
              <h3 style={titleStyle}>{proj.title}</h3>
              <p style={subStyle}>{proj.subtitle}</p>
            </div>

            <div style={categoriesContainerStyle}>
              {proj.categories.map((cat, idx) => (
                <span key={idx} style={tagStyle}>
                  {cat}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cursor Thumbnail */}
      <div
        ref={thumbRef}
        style={{
          ...floatingThumbStyle,
          opacity: hoveredProject ? 1 : 0,
          transform: hoveredProject ? 'scale(1)' : 'scale(0.5)',
        }}
      >
        {hoveredProject && (
          <img
            src={hoveredProject.image}
            alt={hoveredProject.title}
            style={thumbImgStyle}
          />
        )}
      </div>

      <style>{`
        .works-row {
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          transition: border-color 0.3s ease, background-color 0.3s ease;
          cursor: pointer;
        }
        .works-row:hover {
          border-color: rgba(255, 255, 255, 0.2);
          background-color: rgba(255, 255, 255, 0.015);
        }
      `}</style>
    </section>
  );
};

const sectionStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '100px 8%',
  backgroundColor: 'transparent',
  position: 'relative',
};

const headerContainerStyle: React.CSSProperties = {
  marginBottom: '60px',
};

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sync)',
  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
  color: '#ffffff',
  letterSpacing: '0.1em',
  marginBottom: '16px',
};

const lineStyle: React.CSSProperties = {
  width: '60px',
  height: '2px',
  backgroundColor: 'var(--accent-blue)',
};

const listStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const rowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '150px 1fr 300px',
  alignItems: 'center',
  padding: '36px 16px',
  boxSizing: 'border-box',
  gap: '24px',
};

const dateStyle: React.CSSProperties = {
  fontFamily: 'var(--font-tech)',
  fontSize: '0.85rem',
  color: 'var(--text-secondary)',
  letterSpacing: '0.05em',
};

const titleColStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
  fontWeight: 600,
  color: '#ffffff',
};

const subStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.9rem',
  color: 'var(--text-secondary)',
};

const categoriesContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  justifyContent: 'flex-end',
};

const tagStyle: React.CSSProperties = {
  fontFamily: 'var(--font-tech)',
  fontSize: '0.75rem',
  padding: '4px 10px',
  borderRadius: '4px',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  color: 'var(--text-secondary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const floatingThumbStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '280px',
  height: '180px',
  pointerEvents: 'none',
  zIndex: 1000,
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 82, 255, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  transformOrigin: 'center center',
};

const thumbImgStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

export default Works;
