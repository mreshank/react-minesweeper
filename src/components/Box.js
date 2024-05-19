const Box = ({ children: box, Flag, Reveal }) => {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        if (!box.flag) Reveal(box.x, box.y);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        if (!box.reveal) Flag(box.x, box.y);
      }}
      className={`cursor-pointer flex justify-center items-center size-10 ${
        (box.x + box.y) % 2
          ? box.reveal
            ? "bg-[#D7B899]"
            : "bg-[#A2D148] hover:bg-[#B9DD76]"
          : box.reveal
          ? "bg-[#E5C29F]"
          : "bg-[#AAD750] hover:bg-[#BFE17D]"
      }`}
    >
      {box.reveal
        ? box.value !== 0
          ? box.value === "X"
            ? "💣"
            : box.value
          : " "
        : box.flag
        ? "🚩"
        : " "}
      {/* : box.value} */}
    </div>
  );
};
export default Box;

// AAD750 A2D148 BFE17D
