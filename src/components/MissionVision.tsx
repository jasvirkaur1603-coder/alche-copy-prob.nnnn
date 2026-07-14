import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const MissionVision: React.FC = () => {
  useEffect(() => {
    // Reveal text block lines sequentially on scroll
    const trigger = ScrollTrigger.create({
      trigger: '#about',
      start: 'top 75%',
      onEnter: () => {
        gsap.to('.reveal-line', {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out'
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section id="about" style={sectionStyle}>
      <div style={innerStyle}>
        <div style={columnStyle}>
          <span style={labelStyle}>MISSION</span>
          <div style={textboxStyle}>
            <div style={lineWrapperStyle}>
              <h2 className="reveal-line" style={lineJaStyle}>これまでにない</h2>
            </div>
            <div style={lineWrapperStyle}>
              <h2 className="reveal-line" style={lineJaStyle}>没入型・体験型の</h2>
            </div>
            <div style={lineWrapperStyle}>
              <h2 className="reveal-line" style={lineJaStyle}>エンターテインメントを</h2>
            </div>
            <div style={lineWrapperStyle}>
              <h2 className="reveal-line" style={lineJaStyle}>生み出す</h2>
            </div>

            <div style={{ ...lineWrapperStyle, marginTop: '24px' }}>
              <p className="reveal-line" style={lineEnStyle}>
                Pioneering immersive and experiential<br />
                entertainment like no other.
              </p>
            </div>
          </div>
        </div>

        <div style={columnStyle}>
          <span style={{ ...labelStyle, color: 'var(--accent-purple)' }}>VISION</span>
          <div style={textboxStyle}>
            <div style={lineWrapperStyle}>
              <h2 className="reveal-line" style={lineJaStyle}>心を揺さぶり、</h2>
            </div>
            <div style={lineWrapperStyle}>
              <h2 className="reveal-line" style={lineJaStyle}>希望を持てる</h2>
            </div>
            <div style={lineWrapperStyle}>
              <h2 className="reveal-line" style={lineJaStyle}>“世界”を作る</h2>
            </div>

            <div style={{ ...lineWrapperStyle, marginTop: '24px' }}>
              <p className="reveal-line" style={lineEnStyle}>
                Architect worlds that move hearts<br />
                and spark hope.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const sectionStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '100px 8%',
  backgroundColor: 'transparent',
};

const innerStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '1100px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '80px',
};

const columnStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sync)',
  fontSize: '1.25rem',
  color: 'var(--accent-blue)',
  letterSpacing: '0.15em',
  fontWeight: 700,
};

const textboxStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const lineWrapperStyle: React.CSSProperties = {
  overflow: 'hidden',
};

const lineJaStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
  fontWeight: 700,
  lineHeight: '1.45',
  color: '#ffffff',
  transform: 'translateY(50px)',
  opacity: 0,
};

const lineEnStyle: React.CSSProperties = {
  fontFamily: 'var(--font-tech)',
  fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)',
  lineHeight: '1.6',
  color: 'var(--text-secondary)',
  transform: 'translateY(50px)',
  opacity: 0,
};

export default MissionVision;
