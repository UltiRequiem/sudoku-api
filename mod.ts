const { href: workerPath } = new URL("./worker.ts", import.meta.url);

const worker = new Worker(workerPath, { type: "module" });

const sudoku = new Uint8Array([
  5, 3, 0, 0, 7, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 8, 0, 0, 0, 0, 6,
  0, 8, 0, 0, 0, 6, 0, 0, 0, 3, 4, 0, 0, 8, 0, 3, 0, 0, 1, 7, 0, 0, 0, 2, 0, 0,
  0, 6, 0, 6, 0, 0, 0, 0, 2, 8, 0, 0, 0, 0, 4, 1, 9, 0, 0, 5, 0, 0, 0, 0, 8, 0,
  0, 7, 9,
]);

worker.postMessage(sudoku);

worker.onmessage = (event) => {
  const { data } = event;
  console.log(data);
};
