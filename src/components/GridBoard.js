import { useEffect, useRef, useState } from "react";
import Box from "./Box";
import createBoard from "../utilities/createBoard";
import { revealBox } from "../utilities/revealBox";

const GridBoard = ({ setRunning }) => {
  const [board, setBoard] = useState([]);
  const [mines, setMines] = useState([]);
  const [level, setLevel] = useState("Easy");
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [flags, setFlags] = useState(0);
  const [userFlags, setUserFlags] = useState(0);
  const [nonMine, setNonMine] = useState(0);
  const [gameEnded, setGameEnded] = useState(0);
  const [cheatMode, setCheatMode] = useState(false);

  const NewBoard = () => {
    if (level === "Easy") {
      setFlags(10);
      setCols(10);
      setRows(10);
    } else if (level === "Medium") {
      setFlags(40);
      setCols(18);
      setRows(18);
    } else {
      setFlags(99);
      setCols(24);
      setRows(24);
    }
    setUserFlags(flags);
    console.log("Creating Game from : ", rows, cols, flags);
    const gameboard = createBoard(rows, cols, flags);
    console.log(gameboard);
    setNonMine(cols * cols - flags);
    setMines(gameboard.mineLocation);
    setBoard(gameboard.board);
  };

  useEffect(() => {
    NewBoard();
  }, [level, rows, cols]);

  const boardRef = useRef(null);

  const vibrate = () => {
    let b = boardRef.current;
    b.style.animation = "vibrate 0.5s";
    setTimeout(() => {
      b.style.animation = "";
    }, 500);
  };

  const updateFlag = (x, y) => {
    const newBoard = JSON.parse(JSON.stringify(board));
    if (newBoard[x][y].flag) {
      newBoard[x][y].flag = false;
      setUserFlags(userFlags + 1);
    } else {
      newBoard[x][y].flag = true;
      setUserFlags(userFlags - 1);
    }
    setBoard(newBoard);
  };

  const Reveal = (x, y) => {
    if (board[x][y].reveal) return;
    const newBoard = JSON.parse(JSON.stringify(board));
    console.log("Reveal -> ", newBoard[x][y]);
    if (newBoard[x][y].value === "X") {
      for (let i = 0; i < mines.length; i++)
        newBoard[mines[i][0]][mines[i][1]].reveal = true;
      console.log("Game Ended!");
      setBoard(newBoard);
      setGameEnded(1);
      vibrate();
    } else {
      let revealBoard = revealBox(newBoard, x, y, nonMine);
      setBoard(revealBoard.arr);
      if (nonMine - revealBoard.newNonMinesCount > 1) vibrate();
      setNonMine(revealBoard.newNonMinesCount);
      if (revealBoard.newNonMinesCount === 0) {
        setGameEnded(2);
      }
      console.log("Non Mines  ->  ", revealBoard.newNonMinesCount, nonMine);
    }
  };

  return (
    <div
      ref={boardRef}
      className="Main relative Board flex flex-col items-center justify-center rounded-sm"
    >
      <div className="flex justify-between items-center text-white text-lg font-semibold bg-[#4A752C] gap-4 w-full p-2.5">
        <select
          className="text-black rounded-lg px-2 py-1"
          value={level}
          onChange={(e) => {
            setLevel(e.target.value);
          }}
        >
          <option value={"Easy"}>Easy</option>
          <option value={"Medium"}>Medium</option>
          <option value={"Hard"}>Hard</option>
        </select>
        <span className="flex-1 text-lg scale-125">{`🚩 ${userFlags}`}</span>
        <button
          className="font-light scale-90 border rounded px-2 py-0.5"
          onClick={() => setCheatMode(!cheatMode)}
          title="Enable Cheats to know the positions of all Values and Mines"
        >{`Cheat Mode : ${cheatMode ? "On" : "Off"}`}</button>
        <button
          className="shadow shadow-white active:shadow-sm active:shadow-white rounded-full size-8"
          onClick={() => setRunning(false)}
          title="Exit Game"
        >
          ✕
        </button>
      </div>
      <div className="relative flex flex-col items-center justify-center text-xl rounded-xs w-fit">
        {board.map((row) => (
          <div className="flex">
            {row.map((box) => (
              <Box
                box={box}
                Flag={updateFlag}
                Reveal={Reveal}
                Level={level}
                cheatMode={cheatMode}
              />
            ))}
          </div>
        ))}
        {gameEnded ? (
          <div className="absolute flex flex-col gap-12 items-center justify-center font-bold text-white bg-[#00000080] w-full h-full z-10">
            <span className="text-2xl">
              {gameEnded === 2
                ? "- 🎊 - YOU WON - 🎊 -"
                : "- - - GAME OVER - - -"}
            </span>
            <button
              onClick={() => {
                NewBoard();
                setGameEnded(0);
              }}
              className="border border-white rounded-full py-4 px-8"
            >
              {"Play Again ↺"}
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default GridBoard;
