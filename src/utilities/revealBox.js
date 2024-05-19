export const revealBox = (arr, x, y, newNonMinesCount) => {
    console.log(arr[x][y]);
    if (arr[x][y].reveal) {
        // If the cell is already revealed, do nothing
        return;
    }

    // Stack of all the cells which we would like to reveal/flip
    let flipped = [];
    flipped.push(arr[x][y]);
    while (flipped.length !== 0) {
        let single = flipped.pop();

        if (!single.reveal) {
            // If the cell is not already revealed, reveal it and decrement the count of non-mines
            newNonMinesCount--;
            single.reveal = true;
        }

        if (single.value !== 0) {
            // If the cell value is not zero, stop revealing adjacent cells
            break;
        }

        // Reveal adjacent cells if they meet the conditions

        // Top - Left
        if (
            single.x > 0 &&
            single.y > 0 &&
            arr[single.x - 1][single.y - 1].value === 0 &&
            !arr[single.x - 1][single.y - 1].reveal
        ) {
            flipped.push(arr[single.x - 1][single.y - 1]);
        }

        // Bottom - Right
        if (
            single.x < arr.length - 1 &&
            single.y < arr[0].length - 1 &&
            arr[single.x + 1][single.y + 1].value === 0 &&
            !arr[single.x + 1][single.y + 1].reveal
        ) {
            flipped.push(arr[single.x + 1][single.y + 1]);
        }

        // Bottom - Left
        if (
            single.x < arr.length - 1 &&
            single.y > 0 &&
            arr[single.x + 1][single.y - 1].value === 0 &&
            !arr[single.x + 1][single.y - 1].reveal
        ) {
            flipped.push(arr[single.x + 1][single.y - 1]);
        }

        // Top - Right
        if (
            single.x > 0 &&
            single.y < arr[0].length - 1 &&
            arr[single.x - 1][single.y + 1].value === 0 &&
            !arr[single.x - 1][single.y + 1].reveal
        ) {
            flipped.push(arr[single.x - 1][single.y + 1]);
        }

        // Single ones

        // Top
        if (
            single.x > 0 &&
            arr[single.x - 1][single.y].value === 0 &&
            !arr[single.x - 1][single.y].reveal
        ) {
            flipped.push(arr[single.x - 1][single.y]);
        }

        // Bottom
        if (
            single.x < arr.length - 1 &&
            arr[single.x + 1][single.y].value === 0 &&
            !arr[single.x + 1][single.y].reveal
        ) {
            flipped.push(arr[single.x + 1][single.y]);
        }

        // Left
        if (
            single.y > 0 &&
            arr[single.x][single.y - 1].value === 0 &&
            !arr[single.x][single.y - 1].reveal
        ) {
            flipped.push(arr[single.x][single.y - 1]);
        }

        // Right
        if (
            single.y < arr[0].length - 1 &&
            arr[single.x][single.y + 1].value === 0 &&
            !arr[single.x][single.y + 1].reveal
        ) {
            flipped.push(arr[single.x][single.y + 1]);
        }

        // Start Revealing Items

        // Top Left Reveal
        if (
            single.x > 0 &&
            single.y > 0 &&
            !arr[single.x - 1][single.y - 1].reveal
        ) {
            arr[single.x - 1][single.y - 1].reveal = true;
            newNonMinesCount--;
        }

        // Left Reveal
        if (single.y > 0 && !arr[single.x][single.y - 1].reveal) {
            arr[single.x][single.y - 1].reveal = true;
            newNonMinesCount--;
        }

        // Bottom Left Reveal
        if (
            single.x < arr.length - 1 &&
            single.y > 0 &&
            !arr[single.x + 1][single.y - 1].reveal
        ) {
            arr[single.x + 1][single.y - 1].reveal = true;
            newNonMinesCount--;
        }

        // Top Reveal
        if (single.x > 0 && !arr[single.x - 1][single.y].reveal) {
            arr[single.x - 1][single.y].reveal = true;
            newNonMinesCount--;
        }

        // Bottom Reveal
        if (single.x < arr.length - 1 && !arr[single.x + 1][single.y].reveal) {
            arr[single.x + 1][single.y].reveal = true;
            newNonMinesCount--;
        }

        // Top Right Reveal
        if (
            single.x > 0 &&
            single.y < arr[0].length - 1 &&
            !arr[single.x - 1][single.y + 1].reveal
        ) {
            arr[single.x - 1][single.y + 1].reveal = true;
            newNonMinesCount--;
        }

        // Right Reveal
        if (single.y < arr[0].length - 1 && !arr[single.x][single.y + 1].reveal) {
            arr[single.x][single.y + 1].reveal = true;
            newNonMinesCount--;
        }

        // Bottom Right Reveal
        if (
            single.x < arr.length - 1 &&
            single.y < arr[0].length - 1 &&
            !arr[single.x + 1][single.y + 1].reveal
        ) {
            arr[single.x + 1][single.y + 1].reveal = true;
            newNonMinesCount--;
        }
    }

    return { arr, newNonMinesCount };
};
