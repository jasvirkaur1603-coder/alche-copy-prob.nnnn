import React from 'react';
import { Minus, Square, X } from 'lucide-react';
import sound from '../utils/SoundManager';

export const WindowControls: React.FC = () => {
  const isElectron = typeof window !== 'undefined' && typeof (window as any).require === 'function';

  if (!isElectron) return null;

  const handleMinimize = () => {
    sound.playClick();
    try {
      const { ipcRenderer } = (window as any).require('electron');
      ipcRenderer.send('window-minimize');
    } catch (e) {
      console.error(e);
    }
  };

  const handleMaximize = () => {
    sound.playClick();
    try {
      const { ipcRenderer } = (window as any).require('electron');
      ipcRenderer.send('window-maximize');
    } catch (e) {
      console.error(e);
    }
  };

  const handleClose = () => {
    sound.playClick();
    try {
      const { ipcRenderer } = (window as any).require('electron');
      ipcRenderer.send('window-close');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={containerStyle} className="electron-no-drag">
      <button style={btnStyle} onClick={handleMinimize} className="control-btn minimize" aria-label="Minimize">
        <Minus size={12} />
      </button>
      <button style={btnStyle} onClick={handleMaximize} className="control-btn maximize" aria-label="Maximize">
        <Square size={10} />
      </button>
      <button style={btnCloseStyle} onClick={handleClose} className="control-btn close" aria-label="Close">
        <X size={12} />
      </button>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  position: 'fixed',
  top: '16px',
  right: '24px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  zIndex: 9999,
};

const btnStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '50%',
  width: '28px',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'rgba(255, 255, 255, 0.6)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  outline: 'none',
};

const btnCloseStyle: React.CSSProperties = {
  ...btnStyle,
  background: 'rgba(239, 68, 68, 0.15)',
  borderColor: 'rgba(239, 68, 68, 0.3)',
  color: 'rgba(239, 68, 68, 0.8)',
};

export default WindowControls;
