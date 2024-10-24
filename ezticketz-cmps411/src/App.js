import './App.css';
import NavBar from "./NavBar.js";

function App() {
  return (
    <div className="App">
      <NavBar />
      <h2>Hello, Welcome to Ez Tickets</h2>
      <div className="description-container">
        <p>
        Our IT ticket platform simplifies the process of requesting computer repairs and software assistance.

        If your PC is malfunctioning or you’re facing software issues, we quickly assign a technician to help. You can submit a ticket, track its status, and receive updates throughout the repair.

        We focus on getting your devices back to normal with minimal downtime, so you can concentrate on what matters.
        </p>
        <button className="sign-in-button" onClick={() => window.location.href = "/signin"}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default App;
