const MainMenu = ({ setRunning }) => {
  return (
    <div>
      <button
        className="border border-2 border-black shadow-lg hover:shadow-md rounded-full text-2xl font-medium py-5 px-10"
        onClick={() => setRunning(true)}
      >
        {"START GAME"}
      </button>
    </div>
  );
};
export default MainMenu;
