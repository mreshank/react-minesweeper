const createBoard = (row, col, bombs) => {
    let board = [];
    let mineLocation = [];
    // Create a blank board

    // Loop through each column
    for (let x = 0; x < row; x++) {
        let subCol = [];
        // Loop through each row
        for (let y = 0; y < col; y++) {
            subCol.push({
                value: 0, // The value of the cell (0 represents no bomb nearby)
                reveal: false, // Whether the cell is revealed or not
                x: x, // The x-coordinate of the cell
                y: y, // The y-coordinate of the cell
                flag: false, // Whether the cell is flagged or not
            });
        }
        board.push(subCol);
    }

    // Randomize Bomb Placement
    let bombsCount = 0;
    while (bombsCount < bombs) {
        let x = randomNum(0, row - 1); // Generate a random x-coordinate
        let y = randomNum(0, col - 1); // Generate a random y-coordinate

        if (board[x][y].value === 0) {
            board[x][y].value = "X"; // Set the cell as a bomb
            mineLocation.push([x, y]); // Store the bomb's location
            bombsCount++;
        }
    }

    // Add Numbers
    for (let roww = 0; roww < row; roww++) {
        for (let coll = 0; coll < col; coll++) {
            if (board[roww][coll].value === "X") {
                continue; // Skip the cell if it's a bomb
            }

            // Check neighboring cells to count the number of bombs

            // Top
            if (roww > 0 && board[roww - 1][coll].value === "X") {
                board[roww][coll].value++;
            }

            // Top Right
            if (
                roww > 0 &&
                coll < col - 1 &&
                board[roww - 1][coll + 1].value === "X"
            ) {
                board[roww][coll].value++;
            }

            // Right
            if (coll < col - 1 && board[roww][coll + 1].value === "X") {
                board[roww][coll].value++;
            }

            // Bottom Right
            if (
                roww < row - 1 &&
                coll < col - 1 &&
                board[roww + 1][coll + 1].value === "X"
            ) {
                board[roww][coll].value++;
            }

            // Bottom
            if (roww < row - 1 && board[roww + 1][coll].value === "X") {
                board[roww][coll].value++;
            }

            // Bottom Left
            if (
                roww < row - 1 &&
                coll > 0 &&
                board[roww + 1][coll - 1].value === "X"
            ) {
                board[roww][coll].value++;
            }

            // Left
            if (coll > 0 && board[roww][coll - 1].value === "X") {
                board[roww][coll].value++;
            }

            // Top Left
            if (roww > 0 && coll > 0 && board[roww - 1][coll - 1].value === "X") {
                board[roww][coll].value++;
            }
        }
    }
    return { board, mineLocation };
};

function randomNum(min = 0, max) {
    // Generate a random number between min and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default createBoard;