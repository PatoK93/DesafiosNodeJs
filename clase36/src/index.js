import "dotenv/config";
import cluster from "cluster";
import os from "os";
import server from "./services/server.js";
import { initDb } from "./db/db.js";

const numCPUs = os.cpus().length;

const init = async () => {
  if (cluster.isPrimary) {
    console.log(`cantidad de nucleos= ${numCPUs}`);
    console.log(`PID MASTER= ${process.pid}`);
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker, code) => {
      console.log(`Worker ${worker.process.pid} with code ${code}`);
      cluster.fork();
    });
  } else {
    await initDb();
    const port = process.env.PORT || 8080;

    server.listen(port, () =>
      console.log(
        `Servidor express escuchando en el puerto ${port} - PID WORKER ${process.pid}`
      )
    );

    server.on("error", (error) => {
      console.log("Catch de error en servidor!", error);
    });
  }
};

init();
