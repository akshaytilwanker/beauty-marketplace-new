export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f9fafb'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#333' }}>
        Welcome to Beauty Marketplace
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#555', maxWidth: 400, textAlign: 'center' }}>
        Discover and book beauty services from top professionals near you.
      </p>
      <button
        style={{
          marginTop: '2rem',
          padding: '0.75rem 2rem',
          fontSize: '1rem',
          background: '#e91e63',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
        onClick={() => alert('Get Started!')}
      >
        Get Started
      </button>
    </main>
  );
}