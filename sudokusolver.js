function sudokuSolver(sudoku) {
    var x, y, found = false;
    for (x = 0; x < 9; x++) {
        for (y = 0; y < 9; y++) {
            if (!sudoku[x][y]) {
                found = true;
                break;
            }
        }
        if (found) break;
    }
    if (!found) {
        // All cells filled
        return sudoku;
    } else {
        var choices = getChoices(sudoku, x, y),
            solution;
        for(var choice of choices) {
            solution = move(sudoku, x, y, choice);
            solution = sudokuSolver(solution);
            if (solution) return solution;
        }
        return null;
    }
}

function getChoices(sudoku, x, y) {
    var val = sudoku[x][y];
    if (val) return val;
    var dict = {};
    for (var index = 0; index < 9; index++) {
        dict[sudoku[index][y]] = true;
        dict[sudoku[x][index]] = true;
    }
    for (var basei = x - (x % 3), i = basei; i < basei + 3; i++) {
        for (var basej = y - (y % 3), j = basej; j < basej + 3; j++) {
            dict[sudoku[i][j]] = true;
        }
    }
    var choices = [];
    for (var choice = 1; choice <= 9; choice++) {
        if (!dict[choice]) choices.push(choice);
    }
    return choices;
}

function move(sudoku, x, y, val) {
    var newBoard = sudoku.slice();
    newBoard[x] = newBoard[x].slice();
    newBoard[x][y] = val;
    return newBoard;
}