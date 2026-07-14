import React from 'react';
import sound from '../utils/SoundManager';

export const StelllaSection: React.FC = () => {
  return (
    <section id="stellla" style={sectionStyle}>
      <div style={containerStyle} className="glass-card">
        {/* Decorative HUD crosshairs */}
        <div style={hudCrosshairTopLeft}></div>
        <div style={hudCrosshairTopRight}></div>
        <div style={hudCrosshairBottomLeft}></div>
        <div style={hudCrosshairBottomRight}></div>

        <div style={contentLayoutStyle}>
          <div style={textColStyle}>
            <div style={logoWrapperStyle}>
              {/* STELLLA text and brand icon */}
              <div style={stelllaBadgeStyle}>PLATFORM</div>
              <h2 style={titleStyle}>stellla</h2>
              <p style={subTitleStyle}>METAVERSE ENGINE FOUNDATION</p>
            </div>

            <p style={descJaStyle}>
              メタバース構築基盤として、ライブイベント、ファッションショー、そして工場・都市計画など産業系デジタル空間まで幅広く対応。多人数同時接続・アバターカスタマイズなど基本機能を、PC/モバイル/VR向けに提供。Unreal Engineのビジュアルとコスト効率を両立します。
            </p>

            <p style={descEnStyle}>
              A high-fidelity metaverse foundation for diverse digital applications ranging from live concerts to industrial digital twin projects. Featuring out-of-the-box support for multi-user connections, avatar engines, e-commerce, and 3D spatialized audio.
            </p>

            <button 
              onMouseEnter={() => sound.playHover()} 
              onClick={() => sound.playClick()} 
              className="slide-btn"
              style={{ marginTop: '24px', alignSelf: 'flex-start' }}
            >
              <span className="btn-text-wrapper">
                <span>Explore Platform specs</span>
                <span className="btn-hover-text">Download PDF</span>
              </span>
            </button>
          </div>

          <div style={specColStyle}>
            <h4 style={specHeaderStyle}>CORE SPECIFICATIONS</h4>
            <div style={dividerStyle}></div>

            <div style={specListStyle}>
              <div style={specItemStyle}>
                <span style={specLabelStyle}>AVATAR GENERATOR</span>
                <span style={specValStyle}>Full customizing / Blendshapes</span>
              </div>
              <div style={specItemStyle}>
                <span style={specLabelStyle}>AUDIO SYSTEM</span>
                <span style={specValStyle}>3D Spatialized / Dolby Atmos integration</span>
              </div>
              <div style={specItemStyle}>
                <span style={specLabelStyle}>MAX CONCURRENCY</span>
                <span style={specValStyle}>10,000+ players per instance</span>
              </div>
              <div style={specItemStyle}>
                <span style={specLabelStyle}>COMPATIBILITY</span>
                <span style={specValStyle}>PC / WebGL / iOS / Android / Vision Pro</span>
              </div>
              <div style={specItemStyle}>
                <span style={specLabelStyle}>GRAPHICS PIPELINE</span>
                <span style={specValStyle}>Unreal Engine 5 Cloud Rendering / Nanite</span>
              </div>
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

const containerStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '1100px',
  padding: '60px 50px',
  position: 'relative',
  borderRadius: '16px',
};

const contentLayoutStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1.2fr 0.8fr',
  gap: '60px',
  zIndex: 2,
  position: 'relative',
  alignItems: 'center',
};

const textColStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const logoWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

const stelllaBadgeStyle: React.CSSProperties = {
  fontFamily: 'var(--font-tech)',
  fontSize: '0.7rem',
  color: 'var(--accent-blue)',
  border: '1px solid var(--accent-blue)',
  padding: '2px 8px',
  borderRadius: '4px',
  width: 'fit-content',
  letterSpacing: '0.1em',
  fontWeight: 600,
};

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sync)',
  fontSize: '3rem',
  color: '#ffffff',
  textTransform: 'lowercase',
  letterSpacing: '0.05em',
  marginTop: '8px',
};

const subTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-tech)',
  fontSize: '0.8rem',
  color: 'var(--text-secondary)',
  letterSpacing: '0.15em',
};

const descJaStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.95rem',
  lineHeight: '1.75',
  color: '#ffffff',
};

const descEnStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.9rem',
  lineHeight: '1.7',
  color: 'var(--text-secondary)',
};

const specColStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.015)',
  border: '1px solid rgba(255, 255, 255, 0.03)',
  borderRadius: '12px',
  padding: '30px 24px',
};

const specHeaderStyle: React.CSSProperties = {
  fontFamily: 'var(--font-tech)',
  fontSize: '0.85rem',
  letterSpacing: '0.1em',
  color: 'var(--text-primary)',
  marginBottom: '16px',
};

const dividerStyle: React.CSSProperties = {
  height: '1px',
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  marginBottom: '20px',
};

const specListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
};

const specItemStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

const specLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-tech)',
  fontSize: '0.7rem',
  color: 'var(--text-muted)',
  letterSpacing: '0.05em',
};

const specValStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.85rem',
  color: 'var(--text-secondary)',
  fontWeight: 500,
};

// HUD Elements
const hudCrosshairStyle: React.CSSProperties = {
  position: 'absolute',
  width: '16px',
  height: '16px',
  borderColor: 'rgba(255, 255, 255, 0.25)',
  borderStyle: 'solid',
  pointerEvents: 'none',
};

const hudCrosshairTopLeft: React.CSSProperties = {
  ...hudCrosshairStyle,
  top: '20px',
  left: '20px',
  borderWidth: '1.5px 0 0 1.5px',
};

const hudCrosshairTopRight: React.CSSProperties = {
  ...hudCrosshairStyle,
  top: '20px',
  right: '20px',
  borderWidth: '1.5px 1.5px 0 0',
};

const hudCrosshairBottomLeft: React.CSSProperties = {
  ...hudCrosshairStyle,
  bottom: '20px',
  left: '20px',
  borderWidth: '0 0 1.5px 1.5px',
};

const hudCrosshairBottomRight: React.CSSProperties = {
  ...hudCrosshairStyle,
  bottom: '20px',
  right: '20px',
  borderWidth: '0 1.5px 1.5px 0',
};

export default StelllaSection;
