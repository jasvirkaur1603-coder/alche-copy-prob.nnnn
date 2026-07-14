import React from 'react';
import { Gamepad2, Cpu, Globe } from 'lucide-react';
import sound from '../utils/SoundManager';

interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  titleEn: string;
  desc: string;
  descEn: string;
}

const services: ServiceItem[] = [
  {
    id: 'fortnite',
    icon: <Gamepad2 size={32} style={{ color: 'var(--accent-blue)' }} />,
    title: 'Fortnite Creative Works',
    titleEn: 'Fortnite Creative Production',
    desc: 'Fortnite上での体験制作に強みを持ち、エンターテインメント性と拡張性のある空間を企画・制作。ブランドやIPの世界観を表現し、世界中のユーザーに向けて参加型イベントを展開します。',
    descEn: 'We specialize in crafting immersive, engaging games and events in Fortnite, scaling world-views of major brands and artists to millions of players worldwide.'
  },
  {
    id: 'unreal',
    icon: <Cpu size={32} style={{ color: 'var(--accent-purple)' }} />,
    title: 'Unreal Engine Works',
    titleEn: 'Next-Gen Game Engine Development',
    desc: 'クラウドレンダリングから各種デバイス向けコンテンツを制作。ゲームエンジンの可能性を従来の枠組みを超えたエンターテインメント領域に展開し、没入感のある世界創造を行います。',
    descEn: 'Pioneering cloud rendering pipelines and multi-platform experiences on iOS, Android, and PC, pushing Unreal Engine beyond conventional gaming boundaries.'
  },
  {
    id: 'webgl',
    icon: <Globe size={32} style={{ color: '#00ffcc' }} />,
    title: 'WebGL & Interactive Web Systems',
    titleEn: 'Immersive Browser Platforms',
    desc: 'ブラウザ上で動く高精細3D空間やインタラクティブUIの開発。ローカル実行の手軽さとリッチなグラフィック表現を両立し、デジタル空間の新たな体験価値を拡張します。',
    descEn: 'Building high-performance interactive 3D web portals and tools directly inside the browser, offering accessible yet visually stunning digital experiences.'
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" style={sectionStyle}>
      <div style={headerContainerStyle}>
        <h2 style={sectionTitleStyle}>SERVICES</h2>
        <div style={lineStyle} />
      </div>

      <div style={gridStyle}>
        {services.map((svc) => (
          <div
            key={svc.id}
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            className="glass-card"
            style={cardStyle}
          >
            <div style={iconContainerStyle}>{svc.icon}</div>
            
            <h3 style={cardTitleStyle}>{svc.title}</h3>
            <span style={cardSubTitleStyle}>{svc.titleEn}</span>
            
            <div style={descContainerStyle}>
              <p style={descJaStyle}>{svc.desc}</p>
              <p style={descEnStyle}>{svc.descEn}</p>
            </div>
          </div>
        ))}
      </div>
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

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '30px',
  width: '100%',
  maxWidth: '1200px',
};

const cardStyle: React.CSSProperties = {
  padding: '40px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
};

const iconContainerStyle: React.CSSProperties = {
  marginBottom: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '64px',
  height: '64px',
  borderRadius: '16px',
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
};

const cardTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '1.25rem',
  fontWeight: 650,
  color: '#ffffff',
  marginBottom: '4px',
};

const cardSubTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-tech)',
  fontSize: '0.75rem',
  color: 'var(--text-secondary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '24px',
  display: 'block',
};

const descContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const descJaStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.9rem',
  lineHeight: '1.6',
  color: 'var(--text-secondary)',
};

const descEnStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.85rem',
  lineHeight: '1.65',
  color: 'var(--text-muted)',
};

export default Services;
