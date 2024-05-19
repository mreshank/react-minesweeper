import { useEffect, useState } from "react";
import Box from "./Box";
import createBoard from "../utilities/createBoard";
import { revealBox } from "../utilities/revealBox";

const GridBoard = ({ isRunning, setRunning }) => {
  const [board, setBoard] = useState([]);
  const [mines, setMines] = useState([]);
  const [flags, setFlags] = useState(10);
  const [nonMine, setNonMine] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    NewBoard();
  }, []);

  const NewBoard = () => {
    const gameboard = createBoard(10, 10, 10);
    setNonMine(gameboard.nonMinesCount);
    setMines(gameboard.mineLocation);
    setBoard(gameboard.board);
    setFlags(10);
  };

  const updateFlag = (x, y) => {
    const newBoard = JSON.parse(JSON.stringify(board));
    if (newBoard[x][y].flag) {
      newBoard[x][y].flag = false;
      setFlags(flags - 1);
    } else {
      newBoard[x][y].flag = true;
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
      console.log("Game Ended!", isRunning);
      setBoard(newBoard);
      setGameEnded(true);
      // setTimeout(() => setRunning(false), 2500);
      // alert("Mined!");
    } else {
      let revealBoard = revealBox(newBoard, x, y, nonMine);
      setBoard(revealBoard.arr);
      setNonMine(revealBoard.nonMine);
      if (revealBoard.nonMine === 0) {
        setRunning(false);
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center text-xl border border-4 border-grey-200 w-fit">
      {board.map((row) => (
        <div className="flex">
          {row.map((box) => (
            <Box Flag={updateFlag} Reveal={Reveal}>
              {box}
            </Box>
          ))}
        </div>
      ))}
      {gameEnded && (
        <div className="absolute flex flex-col gap-12 items-center justify-center font-bold text-white bg-[#00000080] w-full h-full z-10">
          <span className="text-2xl">{"- - - GAME OVER - - -"}</span>
          <button
            // onClick={() => setRunning(false)}
            onClick={() => {
              NewBoard();
              setGameEnded(false);
            }}
            className="border border-white rounded-full py-4 px-8"
          >
            {"Play Again ↺"}
          </button>
        </div>
      )}
    </div>
  );
};
export default GridBoard;
