export class SudokuError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SudokuError";
  }
}

export function solveSudoku(sudoku: number[]) {
  const unknownIndex = sudoku.indexOf(0);

  if (unknownIndex === -1) {
    return sudoku;
  }

  const [x, y] = indexToXY(unknownIndex);

  const forbiddenValues = new Uint8Array(10);

  for (let y2 = 0; y2 < 9; y2++) {
    forbiddenValues[sudoku[xyToIndex(x, y2)]] = 1;
  }

  for (let x2 = 0; x2 < 9; x2++) {
    forbiddenValues[sudoku[xyToIndex(x2, y)]] = 1;
  }

  for (let x2 = x - (x % 3); x2 < x - (x % 3) + 3; x2++) {
    for (let y2 = y - (y % 3); y2 < y - (y % 3) + 3; y2++) {
      forbiddenValues[sudoku[xyToIndex(x2, y2)]] = 1;
    }
  }

  for (let value = 1; value <= 9; value++) {
    if (forbiddenValues[value]) {
      continue;
    }

    sudoku[unknownIndex] = value;

    if (solveSudoku(sudoku)) {
      return sudoku;
    }
  }

  sudoku[unknownIndex] = 0;
}

function indexToXY(index: number) {
  const x = index % 9;
  const y = (index - x) / 9;
  return [x, y];
}

function xyToIndex(x: number, y: number) {
  return x + y * 9;
}
