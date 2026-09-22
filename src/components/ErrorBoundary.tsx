import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#050505',
          color: '#F3F0E8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          fontFamily: 'sans-serif',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem', letterSpacing: '0.2em' }}>VÉRAN HAUTE PARFUMERIE</h1>
          <p style={{ color: '#C9A45C', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            We encountered an unexpected presentation error while rendering this session.
          </p>
          <pre style={{
            background: '#111',
            padding: '1rem',
            border: '1px solid #333',
            borderRadius: '4px',
            maxWidth: '600px',
            overflowX: 'auto',
            textAlign: 'left',
            fontSize: '0.8rem',
            color: '#ff8888',
            marginBottom: '1.5rem'
          }}>
            {this.state.error?.message}
          </pre>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#C9A45C',
              color: '#050505',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.15em'
            }}
          >
            CLEAR CACHE & RELOAD
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
