import {
  serve,
  type Handler,
} from "https://deno.land/std@0.132.0/http/server.ts";

import { solveSudoku } from "./sudoku.ts";

const { href: workerPath } = new URL("./worker.ts", import.meta.url);

const workerPool = Array.from(
  { length: 5 },
  () => new Worker(workerPath, { type: "module" })
);

function onload(worker: Worker) {
  return new Promise((resolve) => {
    worker.onmessage = (event) => {
      resolve(event.data);
    };
  });
}

type waitlist = (worker: Worker) => void;
const waitingList: waitlist[] = [];

const handler: Handler = async (request) => {
  if (!request.body) {
    return new Response("Send body Please");
  }

  const data = request.body 

  return new Response("Hey", { status: 200 });
};

async function handleWithWorker(sudokuData: ReadableStream, worker: Worker) {
  worker.postMessage(sudokuData);

  const result = await onload(worker);

  if (waitingList && waitingList.length > 0) {
    waitingList.shift()!(worker);
  } else {
    workerPool.push(worker);
  }

  return result;
}

const port = 8080;

await serve(handler, { port });
