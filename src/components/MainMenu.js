const MainMenu = ({ setRunning }) => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-white md:text-7xl text-5xl font-bold p-4">
        {"Minesweeper"}
      </h1>
      <button
        className="text-white font-extrabold border border-4 border-white shadow-inner-lg shadow-inner shadow-white hover:shadow-md hover:shadow-white active:shadow-sm active-shadow-white rounded-full text-2xl font-medium py-5 px-10"
        onClick={() => setRunning(true)}
      >
        {"START GAME"}
      </button>
    </div>
  );
};
export default MainMenu;
