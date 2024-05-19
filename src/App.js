import { useState } from "react";
import "./App.css";
import GridBoard from "./components/GridBoard";
import MainMenu from "./components/MainMenu";

function App() {
  const [isRunning, setRunning] = useState(false);
  return (
    <div className="App flex justify-center items-center-xxx h-[100dvh] p-4">
      <div className="container flex flex-col items-center border border-grey gap-4">
        <h1 className="text-4xl font-bold p-4">{"Minesweeper"}</h1>
        <span>{"Flags : 10, etc. . ."}</span>
        {isRunning ? (
          <GridBoard isRunning={isRunning} setRunning={setRunning} />
        ) : (
          <MainMenu setRunning={setRunning} />
        )}
      </div>
    </div>
  );
}

export default App;
