import React from 'react'

export default function Layout({ children }) {
  return (
    <div>
      <header>
        <h1>Beauty Market Place</h1>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <p>&copy; 2025 Beauty Market Place</p>
      </footer>
    </div>
  )
}