import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import sound from '../utils/SoundManager';
import gsap from 'gsap';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'project',
    message: ''
  });

  useEffect(() => {
    if (isOpen) {
      // Slide in from right
      gsap.to('.contact-overlay', {
        opacity: 1,
        duration: 0.3,
        pointerEvents: 'all'
      });
      gsap.to('.contact-drawer', {
        x: 0,
        duration: 0.5,
        ease: 'power3.out'
      });
    } else {
      // Slide out to right
      gsap.to('.contact-overlay', {
        opacity: 0,
        duration: 0.3,
        pointerEvents: 'none'
      });
      gsap.to('.contact-drawer', {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in'
      });
      // Reset submitted state on close transition
      const timer = setTimeout(() => setSubmitted(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    
    // Simulate API request
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', type: 'project', message: '' });
    }, 800);
  };

  const handleClose = () => {
    sound.playClick();
    onClose();
  };

  return (
    <>
      {/* Background Overlay */}
      <div 
        onClick={handleClose}
        className="contact-overlay"
        style={overlayStyle}
      />

      {/* Drawer Panel */}
      <div className="contact-drawer glass" style={drawerStyle}>
        <div style={headerStyle}>
          <h3 style={titleStyle}>INQUIRY</h3>
          <button 
            onClick={handleClose}
            onMouseEnter={() => sound.playHover()}
            style={closeBtnStyle}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div style={successContainerStyle}>
            <div style={successIconStyle}>
              <Check size={32} />
            </div>
            <h4 style={successTitleStyle}>Thank you!</h4>
            <p style={successDescStyle}>
              Your inquiry has been successfully sent. <br />
              Our creative producers will get back to you shortly.
            </p>
            <button 
              onClick={handleClose}
              className="slide-btn"
              style={{ marginTop: '24px' }}
            >
              <span className="btn-text-wrapper">
                <span>Close window</span>
                <span className="btn-hover-text">Back to page</span>
              </span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={fieldStyle}>
              <label style={labelStyle}>NAME</label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => sound.playHover()}
                style={inputStyle}
                placeholder="Your name"
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>EMAIL ADDRESS</label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => sound.playHover()}
                style={inputStyle}
                placeholder="your.email@domain.com"
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>INQUIRY TYPE</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                onFocus={() => sound.playHover()}
                style={selectStyle}
              >
                <option value="project">Project / Brand Inquiry</option>
                <option value="recruit">Recruitment / Join us</option>
                <option value="other">Other Collaboration</option>
              </select>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>MESSAGE</label>
              <textarea
                required
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                onFocus={() => sound.playHover()}
                style={textareaStyle}
                placeholder="Tell us about your project or background..."
              />
            </div>

            <button 
              type="submit"
              className="slide-btn"
              style={submitBtnStyle}
              onMouseEnter={() => sound.playHover()}
            >
              <span className="btn-text-wrapper">
                <span>Submit Inquiry</span>
                <span className="btn-hover-text">Send Message →</span>
              </span>
            </button>
          </form>
        )}
      </div>
    </>
  );
};

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  backdropFilter: 'blur(4px)',
  zIndex: 1001,
  opacity: 0,
  pointerEvents: 'none',
  transition: 'opacity 0.3s ease',
};

const drawerStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  right: 0,
  width: '450px',
  maxWidth: '100vw',
  height: '100vh',
  zIndex: 1002,
  padding: '40px 30px',
  display: 'flex',
  flexDirection: 'column',
  transform: 'translateX(100%)',
  borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
  boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.5)',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '40px',
};

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sync)',
  fontSize: '1.25rem',
  color: '#ffffff',
  letterSpacing: '0.1em',
};

const closeBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  padding: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const fieldStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-tech)',
  fontSize: '0.75rem',
  color: 'var(--text-secondary)',
  letterSpacing: '0.05em',
};

const inputStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '8px',
  color: '#ffffff',
  padding: '12px 16px',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 0.2s ease',
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 16px center',
  paddingRight: '40px',
  backgroundColor: '#0a0a0c', // fix options styling
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  resize: 'none',
};

const submitBtnStyle: React.CSSProperties = {
  marginTop: '16px',
  width: '100%',
  padding: '12px 0',
};

const successContainerStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '0 20px',
};

const successIconStyle: React.CSSProperties = {
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  backgroundColor: 'rgba(0, 255, 204, 0.1)',
  border: '2px solid rgba(0, 255, 204, 0.3)',
  color: '#00ffcc',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '24px',
};

const successTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sync)',
  fontSize: '1.25rem',
  color: '#ffffff',
  marginBottom: '12px',
};

const successDescStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.9rem',
  color: 'var(--text-secondary)',
  lineHeight: '1.6',
};

export default ContactModal;
