import './App.css';
import NavBar from "./NavBar.js";


function App() {
  return (
    
      <div className="App">
        <NavBar/>
          <h2>Hello welcome to Ez Tickets</h2>
          <div className="description-container"> <p>Our IT ticket platform streamlines the process of requesting and managing computer repairs and software issues. Whether your PC is malfunctioning or you're facing software glitches,
         our system ensures that technicians are promptly assigned to resolve the problem. Submit a ticket, track its status in real time, 
         and receive updates throughout the repair process. We prioritize efficiency and clarity to get your devices and programs back in working order with minimal downtime.
         Let us handle your tech problems so you can focus on what matters.</p>
            <a href="/signin">Sign In</a> {/* Link to Sign In */}</div>


          
      
      </div>
   
  );
}

export default App;