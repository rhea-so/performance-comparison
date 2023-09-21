import cluster from 'node:cluster';

export default function clustering(callback: Function, howMany: number): void {
  if (!cluster.isPrimary) {
    console.log(`[WORKER: ${process.pid}] started`);
    callback();
    return void 0;
  }

  console.log(`[PRIMARY: ${process.pid}] started`);

  cluster.on('exit', (worker) => {
    console.log(`[WORKER: ${worker.process.pid}] died`);
    cluster.fork();
  });

  for (let i = 0; i < howMany; i++) {
    cluster.fork();
  }
}
