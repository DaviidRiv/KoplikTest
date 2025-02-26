// src/components/LayoutWrapper.tsx
import React from 'react';
import astroLogo from '../assets/KoplikLogo.png';
import background from '../assets/background.svg';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutWrapper = ({ children }: LayoutProps) => {
  return (
    <div id="container" style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      padding: '2rem',
    }}>
      {/* Fondo difuminado */}
      <img
        id="background"
        src={background.src}
        alt="background"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          filter: 'blur(100px)',
          objectFit: 'cover',
        }}
      />

      {/* Logo en esquina superior izquierda */}
      <div style={{
        position: 'absolute',
        top: '2rem',
        left: '2rem',
        zIndex: 1
      }}>
        <a href="/">
          <img
            src={astroLogo.src}
            alt="Logo"
            style={{
              width: '115px',
              height: 'auto',
              maxWidth: '100%'
            }}
          />
        </a>
      </div>

      {/* Contenido centrado */}
      <main style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 4rem)',
        width: '100%',
        padding: '2rem 0',        
      }}>
        <section style={{
          maxWidth: '800px',
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem'
        }}>
          {children}
        </section>
      </main>

      {/* Estilos responsive (media queries) */}
      <style>{`
        @media (max-width: 768px) {
          #container {
            padding: 1rem;
          }
          
          main {
            min-height: calc(100vh - 2rem);
            padding: 1rem 0;
          }
          
          section {
            gap: 1.5rem;
          }
        }
        
        @media (max-width: 480px) {
          #container {
            padding: 0.5rem;
          }
          
          main {
            padding: 0.5rem 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LayoutWrapper;