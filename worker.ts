/// <reference no-default-lib="true" />
/// <reference lib="deno.worker" />

import { solveSudoku } from "./sudoku.ts";

self.onmessage = async (event) => {
  const solution = solveSudoku(event.data);

  self.postMessage(solution);

  self.close();
};
