import checklistImage from "./assets/check-list.png";
import "./App.css";
import Tasks from "./Tasks";

function App() {
  return (
    <div className="App">
      <header className="header">
        <p style={{ color: "#66FCF1" }}>#kANBANbOARD</p>
      </header>
      <Tasks />
    </div>
  );
}

export default App;
