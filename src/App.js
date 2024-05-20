import { useState } from "react";
import "./App.css";
import GridBoard from "./components/GridBoard";
import MainMenu from "./components/MainMenu";

function App() {
  const [isRunning, setRunning] = useState(false);
  return (
    <div className="App flex justify-center items-center-xxx h-[100dvh] p-4">
      <div className="container flex flex-col items-center justify-center border border-4 border-[#ffffff40] shadow-inner shadow-lg shadow-white backdrop-blur-md backdrop-saturate-150 rounded-3xl gap-8 p-4">
        {isRunning ? (
          <GridBoard setRunning={setRunning} />
        ) : (
          <MainMenu setRunning={setRunning} />
        )}
      </div>
    </div>
  );
}

export default App;

// 10 10 10
// 18 18 40
// 24 24 99
