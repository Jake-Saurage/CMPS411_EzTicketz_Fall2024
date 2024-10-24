import React from 'react';
import './App.css'; // Ensure you have a CSS file for the styles

function App() {
  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="app-header">
        <h1>Welcome to EZ Ticketz</h1>
        <p>Effortlessly manage your tickets, stay organized, and solve problems faster!</p>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-item">
            <i className="bx bx-notepad"></i> {/* Using Boxicons */}
            <h3>Easy Ticket Management</h3>
            <p>Create, track, and resolve tickets with just a few clicks. Simplify your workflow today!</p>
          </div>
          <div className="feature-item">
            <i className="bx bx-group"></i>
            <h3>Team Collaboration</h3>
            <p>Assign tickets to team members and collaborate seamlessly.</p>
          </div>
        </div>
      </section>

     
    </div>
  );
}

export default App;
